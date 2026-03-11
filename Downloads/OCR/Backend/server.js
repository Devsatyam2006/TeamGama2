const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");
const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});
// ================= CONNECT MONGODB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Atlas Connected"))
  .catch(err => console.log(err));

// ================= USER SCHEMA =================
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "examiner" }
});

const User = mongoose.model("User", UserSchema);
const path = require("path");


// ================= REGISTER =================
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "Registration successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= OLLAMA GRADING =================

app.post("/api/grade", async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer || answer.trim().length === 0) {
      return res.json({
        marks: 0,
        percentage: 0,
        classification: "Fail",
        breakdown: {
          content_depth: 0,
          structure: 0,
          presentation: 0,
          relevance: 0
        },
        feedback: "Blank answer"
      });
    }

    const prompt = `
You are evaluating a 5-mark university exam answer.

Mark distribution:
5 marks: Excellent explanation, detailed, 150+ words
4 marks: Good explanation, 120+ words
3 marks: Adequate explanation, 80+ words
2 marks: Limited explanation, 50+ words
1 mark: Very short or incorrect
0 mark: Blank

Instructions:
- Consider word count.
- Consider conceptual clarity.
- Be fair like a Mumbai University examiner.
- Most average answers should fall between 3 and 4.
- Provide breakdown percentages for each category.

Return ONLY valid JSON in this format:

{
  "marks": number,
  "percentage": number,
  "classification": "Pass" or "Fail",
  "breakdown": {
    "content_depth": number,
    "structure": number,
    "presentation": number,
    "relevance": number
  },
  "feedback": "short explanation"
}

All breakdown values must be between 0 and 100.
Do NOT omit breakdown.

Answer:
${answer}
`;

const completion = await client.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    { role: "user", content: prompt }
  ],
  temperature: 0.3
});

    const clean = completion.choices[0].message.content.trim();


    const jsonMatch = clean.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("AI did not return valid JSON");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // ✅ Safety: Ensure breakdown exists
    if (!parsed.breakdown) {
      parsed.breakdown = {
        content_depth: Math.round(parsed.percentage * 0.4),
        structure: Math.round(parsed.percentage * 0.3),
        presentation: Math.round(parsed.percentage * 0.2),
        relevance: Math.round(parsed.percentage * 0.1)
      };
    }

    res.json(parsed);

  } catch (error) {
    console.error("GRADING ERROR:", error.message);

    res.status(500).json({
      marks: 0,
      percentage: 0,
      classification: "Fail",
      breakdown: {
        content_depth: 0,
        structure: 0,
        presentation: 0,
        relevance: 0
      },
      feedback: "AI grading failed"
    });
  }
});
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port", PORT));