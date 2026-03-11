import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GraduationCap,
  UserPlus,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  FileText,
  Wand2,
  Clock,
  Cloud,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  FileImage,
  AlertCircle,
  Loader2,
  PieChart,
  File,
  GitBranch,
  Paintbrush,
  Target,
  Percent,
  AlignLeft,
  List,
  Check,
  Download,
  BarChart3,
  Star,
  Type
} from 'lucide-react';
import './App.css';

// ==================== CSS STYLES ====================
const cssStyles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.app-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 420px;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.logo { text-align: center; margin-bottom: 30px; }
.logo-icon { margin-bottom: 10px; color: #6c5ce7; }
.logo h1 { color: #2d3436; font-size: 24px; margin-bottom: 5px; }
.logo p { color: #636e72; font-size: 14px; }

.form-group { margin-bottom: 20px; }
label { display: block; margin-bottom: 8px; color: #2d3436; font-weight: 600; font-size: 14px; }

input[type="text"], input[type="password"], input[type="email"] {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s;
  background: #fafafa;
  outline: none;
}

input:focus {
  border-color: #6c5ce7;
  background: white;
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
}

.password-wrapper { position: relative; }
.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #636e72;
  user-select: none;
}

.btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #6c5ce7, #5b4cdb);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(108, 92, 231, 0.4);
}

.btn-secondary {
  background: #f8f9fa;
  color: #6c5ce7;
  border: 2px solid #6c5ce7;
}

.btn-secondary:hover {
  background: #6c5ce7;
  color: white;
}

.switch-form {
  text-align: center;
  margin-top: 20px;
  color: #636e72;
  font-size: 14px;
}

.switch-link {
  color: #6c5ce7;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;
}

.switch-link:hover { text-decoration: underline; }

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border-left: 4px solid #c33;
}

.success-message {
  background: #efe;
  color: #3c3;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border-left: 4px solid #3c3;
}

.main-app { width: 100%; max-width: 1200px; }

.app-header {
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user-info { display: flex; align-items: center; gap: 15px; }
.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6c5ce7, #5b4cdb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.logout-btn {
  width: auto;
  padding: 10px 20px;
  background: #e74c3c;
  color: white;
  margin: 0;
}

.logout-btn:hover { background: #c0392b; }

.container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.grade-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 16px;
  margin-left: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.grade-5 { background: linear-gradient(135deg, #00b894, #00cec9); color: white; }
.grade-4 { background: linear-gradient(135deg, #74b9ff, #0984e3); color: white; }
.grade-3 { background: linear-gradient(135deg, #fdcb6e, #f39c12); color: white; }
.grade-2 { background: linear-gradient(135deg, #e17055, #d63031); color: white; }
.grade-1 { background: linear-gradient(135deg, #636e72, #2d3436); color: white; }
.grade-0 { background: #b2bec3; color: white; }

.grade-details {
  margin-top: 10px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 13px;
  color: #2d3436;
  border-left: 4px solid #0984e3;
}

.mu-criteria {
  background: white;
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  border: 1px solid #dfe6e9;
}

.criteria-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px dashed #dfe6e9;
}

.criteria-row:last-child { border-bottom: none; }
.criteria-label { font-weight: 600; color: #2d3436; display: flex; align-items: center; gap: 6px; }
.criteria-value {
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.pass { background: #d5f4e6; color: #00b894; }
.poor { background: #fab1a0; color: #d63031; }

.process-btn {
  width: auto;
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  margin-right: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.process-btn:hover:not(:disabled) {
  background: #5b4cdb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
}

.process-btn:disabled {
  background: #b2bec3;
  cursor: not-allowed;
}

.progress {
  margin: 20px 0;
  padding: 15px;
  background: linear-gradient(90deg, #e3f2fd, #f3e5f5);
  border-radius: 8px;
  color: #2d3436;
  font-weight: 500;
  border-left: 4px solid #6c5ce7;
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-card {
  margin-bottom: 25px;
  border-left: 4px solid #6c5ce7;
  background: white;
  padding: 20px;
  border-radius: 0 12px 12px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.result-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 15px;
}

.file-info { flex: 1; min-width: 200px; }

pre {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  border: 2px solid #e9ecef;
  margin: 10px 0;
}

.word-count-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 8px;
}

.wc-excellent { background: #d5f4e6; color: #00b894; }
.wc-good { background: #cce5ff; color: #0984e3; }
.wc-average { background: #fff3cd; color: #856404; }
.wc-poor { background: #f8d7da; color: #721c24; }

.file-input {
  padding: 15px;
  border: 2px dashed #a29bfe;
  border-radius: 8px;
  width: 100%;
  margin: 15px 0;
  background: #f8f9fa;
}

.stats-summary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 25px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  background: rgba(255,255,255,0.15);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-value { font-size: 28px; font-weight: bold; }
.stat-label { font-size: 13px; opacity: 0.9; margin-top: 6px; }

.marks-display { font-size: 32px; font-weight: bold; color: #fff; }
.marks-fraction { font-size: 18px; opacity: 0.9; }

.result-pass {
  background: linear-gradient(135deg, #00b894, #00cec9) !important;
  color: white !important;
  animation: pulse 2s infinite;
}

.result-fail {
  background: linear-gradient(135deg, #e17055, #d63031) !important;
  color: white !important;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.save-btn {
  width: auto;
  background: #00b894;
  margin-top: 20px;
}

.save-btn:hover { background: #00a383; }

.timer-display {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0,0,0,0.05);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #6c5ce7;
  margin-left: 10px;
}

.timer-display.active {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.processing-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.puter-auth-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.puter-auth-box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  max-width: 400px;
}

.puter-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6c5ce7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spin { animation: spin 1s linear infinite; }

.hidden { display: none !important; }
`;



// ==================== GRADING UTILITIES ====================
const MU_STANDARDS = {
  WORD_COUNT: { EXCELLENT: 150, GOOD: 120, AVERAGE: 80, MINIMUM: 40 },
  SENTENCE_MIN: 4, POINTS_MIN: 2, EXPLANATION_RATIO: 0.3
};

const fileToDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

const pdfPageToImage = async (pdfDocument, pageNumber) => {
  const page = await pdfDocument.getPage(pageNumber);
  const scale = 2.0;
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: context, viewport: viewport }).promise;
  return canvas.toDataURL('image/png');
};

const removeWordScanning = (text) => {
  if (!text) return text;
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 10) return text;

  for (let i = 8; i < lines.length - 3; i++) {
    let shortLines = [];
    for (let j = i; j < lines.length && shortLines.length < 8; j++) {
      const wordCount = lines[j].split(/\s+/).filter(w => w.length > 0).length;
      if (lines[j].length <= 20 || wordCount <= 2) {
        shortLines.push(lines[j]);
      } else break;
    }

    if (shortLines.length >= 3) {
      const joined = shortLines.join(' ').toLowerCase().replace(/[^\w]/g, '');
      const firstPart = lines.slice(0, i).join(' ').toLowerCase().replace(/[^\w]/g, '');
      if (joined.length > 5 && firstPart.substring(0, joined.length) === joined) {
        return lines.slice(0, i).join('\n');
      }
      if (joined.length > 10 && firstPart.includes(joined)) {
        const firstWords = lines[0].toLowerCase().replace(/[^\w]/g, '');
        const shortFirstWord = shortLines[0].toLowerCase().replace(/[^\w]/g, '');
        if (firstWords.includes(shortFirstWord) || shortFirstWord.includes(firstWords.substring(0, shortFirstWord.length))) {
          return lines.slice(0, i).join('\n');
        }
      }
    }
  }

  const seenLines = new Map();
  for (let i = 0; i < lines.length; i++) {
    const normalized = lines[i].toLowerCase().replace(/[^\w]/g, '');
    if (normalized.length < 2) continue;
    if (seenLines.has(normalized)) {
      const firstIdx = seenLines.get(normalized);
      if (i - firstIdx > 5) {
        const next1 = lines[i + 1]?.toLowerCase().replace(/[^\w]/g, '') || '';
        const orig1 = lines[firstIdx + 1]?.toLowerCase().replace(/[^\w]/g, '') || '';
        const next2 = lines[i + 2]?.toLowerCase().replace(/[^\w]/g, '') || '';
        const orig2 = lines[firstIdx + 2]?.toLowerCase().replace(/[^\w]/g, '') || '';
        if ((next1 && orig1 && (next1 === orig1 || Math.abs(next1.length - orig1.length) < 3)) ||
          (next2 && orig2 && (next2 === orig2 || Math.abs(next2.length - orig2.length) < 3))) {
          return lines.slice(0, firstIdx).join('\n');
        }
      }
    } else {
      seenLines.set(normalized, i);
    }
  }
  return text;
};



// ==================== COMPONENTS ====================

const PuterAuthOverlay = ({ isVisible, onCancel }) => {
  if (!isVisible) return null;
  return (
    <div className="puter-auth-overlay">
      <div className="puter-auth-box">
        <div className="logo-icon"><Cloud size={48} color="#6c5ce7" /></div>
        <h3 style={{ color: '#2d3436', marginBottom: '15px' }}>Connecting to Puter AI</h3>
        <p style={{ color: '#636e72', marginBottom: '20px' }}>Please complete authentication in the popup...</p>
        <div className="puter-spinner"></div>
        <button onClick={onCancel} className="btn btn-secondary" style={{ marginTop: '10px', width: 'auto' }}>
          <X size={16} /> Cancel
        </button>
      </div>
    </div>
  );
};

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      onLogin(data.user);

    } catch (err) {
      setError("Server not responding");
    }
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <div className="logo-icon"><GraduationCap size={48} /></div>
        <h1>Welcome Back</h1>
        <p>Automated Grading System</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} className='text-black'  onChange={(e) => setUsername(e.target.value)} required placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input type={showPassword ? "text" : "password"} className='text-black' value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div> 
        </div>
        <button type="submit" className="btn btn-primary"><LogIn size={18} /> Sign In</button>
      </form>
      <div className="switch-form">
        Don't have an account? <span className="switch-link" onClick={onSwitchToRegister}>Register here</span>
      </div>
    </div>
  );
};

const RegisterForm = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setSuccess("Account created successfully!");
      setTimeout(() => onSwitchToLogin(), 1500);

    } catch (err) {
      setError("Server not responding");
    }
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <div className="logo-icon"><UserPlus size={48} /></div>
        <h1>Create Account</h1>
        <p>Join Automated Grading System</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} placeholder="Choose a username" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Create a password" />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input type={showConfirm ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} required placeholder="Confirm your password" />
            <span className="toggle-password" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary"><UserPlus size={18} /> Create Account</button>
      </form>
      <div className="switch-form">
        Already have an account? <span className="switch-link" onClick={() => onSwitchToLogin('')}>Sign in here</span>
      </div>
    </div>
  );
};

const GradeDisplay = ({ grade }) => {
  const getGradeClass = (score) => `grade-${score}`;
  const getWCClass = (g) => g;
  const getCritClass = (v) => v >= 60 ? 'pass' : 'poor';

  const renderStars = (count) => Array(5).fill(0).map((_, i) => (
    <Star key={i} size={14} fill={i < count ? "currentColor" : "none"} style={{ marginRight: '2px' }} />
  ));

  return (
    <div style={{ display: 'inline-block', verticalAlign: 'top', maxWidth: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span className={`grade-badge ${getGradeClass(grade.score)}`}>
          {renderStars(grade.score)} <span style={{ marginLeft: '4px' }}>{grade.score}/5</span>
        </span>
        <span className={`word-count-badge ${getWCClass(grade.details.wordCountGrade)}`}>
          <Type size={12} style={{ marginRight: '4px' }} /> {grade.details.wordCount} words
        </span>
      </div>
      <div className="grade-details">
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#2d3436', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <PieChart size={16} /> Assessment
        </div>
        <div className="mu-criteria">
          <div className="criteria-row">
            <span className="criteria-label"><File size={14} /> Content Depth (40%)</span>
            <span className={`criteria-value ${getCritClass(grade.breakdown.content_depth)}`}>{grade.breakdown.content_depth}%</span>
          </div>
          <div className="criteria-row">
            <span className="criteria-label"><GitBranch size={14} /> Structure & Format (30%)</span>
            <span className={`criteria-value ${getCritClass(grade.breakdown.structure)}`}>{grade.breakdown.structure}%</span>
          </div>
          <div className="criteria-row">
            <span className="criteria-label"><Paintbrush size={14} /> Presentation (20%)</span>
            <span className={`criteria-value ${getCritClass(grade.breakdown.presentation)}`}>{grade.breakdown.presentation}%</span>
          </div>
          <div className="criteria-row">
            <span className="criteria-label"><Target size={14} /> Relevance & Quality (10%)</span>
            <span className={`criteria-value ${getCritClass(grade.breakdown.relevance)}`}>{grade.breakdown.relevance}%</span>
          </div>
          <div className="criteria-row" style={{ borderTop: '2px solid #dfe6e9', marginTop: '8px', paddingTop: '8px' }}>
            <span className="criteria-label"><Percent size={14} /> Overall Percentage</span>
            <span className={`criteria-value ${getCritClass(grade.percentage)}`}>{grade.percentage}%</span>
          </div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', lineHeight: 1.6 }}>
          {grade.feedback.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', color: item.type === 'error' ? '#c33' : item.type === 'warning' ? '#f39c12' : item.type === 'success' ? '#00b894' : '#0984e3' }}>
              {item.type === 'error' ? <X size={14} style={{ marginRight: '4px' }} /> :
                item.type === 'warning' ? <AlertTriangle size={14} style={{ marginRight: '4px' }} /> :
                  item.type === 'success' ? <CheckCircle size={14} style={{ marginRight: '4px' }} /> :
                    <Info size={14} style={{ marginRight: '4px' }} />}
              {item.text}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', fontSize: '11px', color: '#636e72', fontStyle: 'italic' }}>
          <AlignLeft size={11} style={{ marginRight: '4px' }} /> {grade.details.sentenceCount} sentences •
          <List size={11} style={{ margin: '0 4px' }} /> {grade.details.pointCount} points •
          {grade.details.hasDefinition ? <><Check size={11} style={{ margin: '0 4px' }} /> Has intro</> : <><X size={11} style={{ margin: '0 4px' }} /> No intro</>} •
          {grade.details.hasConclusion ? <><Check size={11} style={{ margin: '0 4px' }} /> Has conclusion</> : <><X size={11} style={{ margin: '0 4px' }} /> No conclusion</>}
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ result }) => {
  const borderColor = result.error ? '#e74c3c' : result.grade.score >= 4 ? '#27ae60' : result.grade.score >= 2 ? '#f39c12' : '#e74c3c';
  return (
    <div className="result-card" style={{ borderLeftColor: borderColor }}>
      <div className="result-header">
        <div className="file-info">
          <strong style={{ fontSize: '16px', color: '#2d3436', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {result.originalFile ? <FileText size={18} /> : <FileImage size={18} />} {result.filename}
          </strong>
          {!result.error ? <GradeDisplay grade={result.grade} /> :
            <span className="grade-badge grade-0"><AlertCircle size={16} /> ERROR</span>
          }
        </div>
      </div>
      <pre>{result.text || 'No text detected'}</pre>
    </div>
  );
};

const MainApp = ({ user, onLogout }) => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [puterAuthVisible, setPuterAuthVisible] = useState(false);
  const [puterAuthenticated, setPuterAuthenticated] = useState(false);

  const timerRef = useRef(null);
  const gradeWithOllama = async (text) => {
    try {
      const response = await fetch("http://localhost:5000/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ answer: text })
      });

      if (!response.ok) throw new Error("Grading failed");

      return await response.json();

    } catch (error) {
      return {
        marks: 0,
        percentage: 0,
        classification: "Fail",
        feedback: "Local server error"
      };
    }
  };
  const startTimer = useCallback(() => {
    setIsTimerActive(true); setTimer(0);
    timerRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);
  }, []);

  const stopTimer = useCallback(() => {
    setIsTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => setTimer(0), 5000);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const initPuter = useCallback(async () => {
    return new Promise((resolve, reject) => {
      setPuterAuthVisible(true);
      const timeout = setTimeout(() => {
        setPuterAuthVisible(false);
        reject(new Error('Authentication timeout'));
      }, 120000);

      if (typeof window.puter !== 'undefined' && window.puter.auth?.isSignedIn) {
        clearTimeout(timeout);
        setPuterAuthVisible(false);
        setPuterAuthenticated(true);
        resolve();
        return;
      }

      const checkPuter = setInterval(() => {
        if (typeof window.puter !== 'undefined') {
          clearInterval(checkPuter);
          const checkAuth = setInterval(() => {
            if (window.puter.auth?.isSignedIn) {
              clearInterval(checkAuth); clearTimeout(timeout);
              setPuterAuthVisible(false);
              setPuterAuthenticated(true);
              resolve();
            }
          }, 1000);
          setTimeout(() => { if (!puterAuthenticated) clearInterval(checkAuth); }, 10000);
        }
      }, 500);
      setTimeout(() => {
        clearInterval(checkPuter);
        if (typeof window.puter !== 'undefined') {
          clearTimeout(timeout);
          setPuterAuthVisible(false);
          setPuterAuthenticated(true);
          resolve();
        }
      }, 5000);
    });
  }, [puterAuthenticated]);

  const cancelPuterAuth = () => {
    setPuterAuthVisible(false);
    setProgress('Authentication cancelled. Click "Process & Grade All" to retry.');
    setIsProcessing(false);
    stopTimer();
  };

  const processPDF = async (file, progressCallback) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const pageResults = [];

    for (let i = 1; i <= numPages; i++) {
      progressCallback(`Processing ${file.name} - Page ${i} of ${numPages}...`);

      try {
        const imageDataUrl = await pdfPageToImage(pdf, i);

        if (!window.puter?.ai?.img2txt)
          throw new Error("OCR service not available");

        let text = await window.puter.ai.img2txt(imageDataUrl);
        text = removeWordScanning(text);

        // 🔥 Call Ollama / AI grading
        const aiGrade = await gradeWithOllama(text);

        pageResults.push({
          page: i,
          text,
          filename: `${file.name} (Page ${i})`,
          grade: {
            score: aiGrade.marks || 0,
            percentage: aiGrade.percentage || 0,
            classification: aiGrade.classification || "Fail",
            feedback: [
              { type: "info", text: aiGrade.feedback || "No feedback" }
            ],
            details: {
              wordCount: text.split(/\s+/).length,
              sentenceCount: text.split(/[.!?]+/).length,
              hasConclusion: false,
              hasDefinition: false,
              pointCount: 0,
              wordCountGrade: ""
            },
            breakdown: aiGrade.breakdown || {
              content_depth: 0,
              structure: 0,
              presentation: 0,
              relevance: 0
            }
          }
        });

      } catch (error) {
        pageResults.push({
          page: i,
          text: `Error: ${error.message}`,
          filename: `${file.name} (Page ${i})`,
          error: true,
          grade: {
            score: 0,
            percentage: 0,
            classification: "Fail",
            feedback: [{ type: "error", text: "Processing failed" }],
            details: {
              wordCount: 0,
              sentenceCount: 0,
              hasConclusion: false,
              hasDefinition: false,
              pointCount: 0,
              wordCountGrade: ""
            },
            breakdown: aiGrade.breakdown || {
              content_depth: 0,
              structure: 0,
              presentation: 0,
              relevance: 0
            }
          }
        });
      }
    }

    return pageResults;
  };

  const processBatch = async () => {
    if (files.length === 0) {
      alert("Please select images or PDFs first");
      return;
    }

    setIsProcessing(true);
    setProgress("Initializing...");
    setResults([]);
    setShowSaveButton(false);
    setStats(null);

    if (!puterAuthenticated) {
      setProgress("Initializing OCR...");
      try {
        await initPuter();
      } catch (error) {
        setProgress(`Authentication failed: ${error.message}`);
        setIsProcessing(false);
        return;
      }
    }

    startTimer();

    const processedResults = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isPDF =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      try {
        if (isPDF) {
          const pdfResults = await processPDF(file, setProgress);

          pdfResults.forEach((pageResult) => {
            processedResults.push({
              ...pageResult,
              originalFile: file.name,
              timestamp: new Date().toISOString(),
            });
          });
        } else {
          setProgress(
            `Processing image ${i + 1} of ${files.length}: ${file.name}...`
          );

          const dataUrl = await fileToDataURL(file);

          if (!window.puter?.ai?.img2txt)
            throw new Error("OCR service not available");

          let text = await window.puter.ai.img2txt(dataUrl);
          text = removeWordScanning(text);

          // 🔥 AI grading
          const aiGrade = await gradeWithOllama(text);

          processedResults.push({
            filename: file.name,
            text,
            timestamp: new Date().toISOString(),
            grade: {
              score: aiGrade.marks || 0,
              percentage: aiGrade.percentage || 0,
              classification: aiGrade.classification || "Fail",
              feedback: [
                { type: "info", text: aiGrade.feedback || "No feedback" },
              ],
              details: {
                wordCount: text.split(/\s+/).length,
                sentenceCount: text.split(/[.!?]+/).length,
                hasConclusion: false,
                hasDefinition: false,
                pointCount: 0,
                wordCountGrade: "",
              },
              breakdown: aiGrade.breakdown || {
                content_depth: 0,
                structure: 0,
                presentation: 0,
                relevance: 0
              },
            },
          });
        }
      } catch (error) {
        processedResults.push({
          filename: file.name,
          text: `Error: ${error.message}`,
          timestamp: new Date().toISOString(),
          error: true,
          grade: {
            score: 0,
            percentage: 0,
            classification: "Fail",
            feedback: [{ type: "error", text: "Processing failed" }],
            details: {
              wordCount: 0,
              sentenceCount: 0,
              hasConclusion: false,
              hasDefinition: false,
              pointCount: 0,
              wordCountGrade: "",
            },
            breakdown: {
              content_depth: 0,
              structure: 0,
              presentation: 0,
              relevance: 0,
            },
          },
        });
      }
    }

    stopTimer();
    setIsProcessing(false);
    setResults(processedResults);

    // 📊 Calculate total stats
    const totalObtained = processedResults.reduce(
      (acc, r) => acc + (r.grade?.score || 0),
      0
    );

    const totalMax = processedResults.length * 5;
    const totalPercentage =
      totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;

    setStats({
      totalPercentage,
      totalObtained,
      totalMax,
      totalFiles: processedResults.length,
      isPass: parseFloat(totalPercentage) >= 35,
      resultText:
        parseFloat(totalPercentage) >= 35 ? "PASS" : "FAIL",
    });

    setProgress("Assessment Complete!");
    setShowSaveButton(true);
  };

  const saveResults = () => {
    try {
      const totalObtained = results.reduce((acc, r) => acc + (r.grade?.score || 0), 0);
      const totalMax = results.length * 5;
      const totalPercentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;
      const isPass = parseFloat(totalPercentage) >= 35;
      const now = new Date();
      const filename = `Assessment_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}.txt`;
      let resultsText = `AUTOMATED GRADING SYSTEM - OCR ASSESSMENT REPORT\nGenerated: ${now.toLocaleString()}\nExaminer: ${user.username} (${user.email})\n========================================\nSUMMARY:\nTotal Scripts: ${results.length}\nTotal Marks: ${totalObtained}/${totalMax}\nPercentage: ${totalPercentage}%\nResult: ${isPass ? 'PASS' : 'FAIL'} (Threshold: 35%)\n========================================\n\n`;
      results.forEach((result, idx) => {
        const g = result.grade;
        resultsText += `ROLL NO: ${idx + 1}\nFILE: ${result.filename}\nMARKS: ${g.score}/5\nCLASSIFICATION: ${g.classification}\nWORD COUNT: ${g.details.wordCount}\nPERCENTAGE: ${g.percentage}%\nREMARKS: ${g.feedback.map(f => f.text).join('; ')}\n---\nANSWER:\n${result.text}\n========================================\n\n`;
      });
      const blob = new Blob([resultsText], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert(`✅ Saved! File: ${filename}\nMarks: ${totalObtained}/${totalMax}\nResult: ${isPass ? 'PASS' : 'FAIL'}`);
    } catch (error) { alert('❌ Error: ' + error.message); }
  };

  useEffect(() => {
    let puterScript = null;
    let pdfScript = null;

    // Load Puter only if not already loaded
    if (!window.puter) {
      puterScript = document.createElement("script");
      puterScript.src = "https://js.puter.com/v2/";
      puterScript.async = true;
      document.body.appendChild(puterScript);
    }

    // Load PDF.js
    if (!window.pdfjsLib) {
      pdfScript = document.createElement("script");
      pdfScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      pdfScript.async = true;
      pdfScript.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
      };
      document.body.appendChild(pdfScript);
    }

    return () => {
      if (puterScript) document.body.removeChild(puterScript);
      if (pdfScript) document.body.removeChild(pdfScript);
    };
  }, []);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  return (
    <div className="main-app">
      <PuterAuthOverlay isVisible={puterAuthVisible} onCancel={cancelPuterAuth} />
      <div className="app-header">
        <div className="user-info">
          <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
          <div>
            <div style={{ fontWeight: 600, color: '#2d3436' }}>Welcome, {user.username}</div>
            <div style={{ fontSize: '12px', color: '#636e72' }}>{user.role === 'admin' ? 'Administrator' : 'Examiner'}</div>
          </div>
        </div>
        <button className="btn logout-btn" onClick={onLogout}><LogOut size={18} /> Logout</button>
      </div>
      <div className="container">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}><FileText size={24} /> Automated Grading System</h2>
        <p style={{ color: '#636e72', marginBottom: '15px' }}>
          <strong>Grading Standards:</strong> 5 marks = 150+ words. 4 marks = 120-150. 3 marks = 80-120. 2 marks = 40-80. 1 mark = &lt;40 words.<br />
          <strong>Pass Criteria:</strong> Overall ≥35% to PASS.
        </p>
        <input type="file" className="file-input" accept="image/*,.pdf,application/pdf" multiple onChange={(e) => setFiles(Array.from(e.target.files))} />
        <div className="processing-info">
          <button className="process-btn" onClick={processBatch} disabled={isProcessing}>
            {isProcessing ? <Loader2 size={16} className="spin" /> : <Wand2 size={16} />}
            {isProcessing ? ' Processing...' : ' Process & Grade All'}
          </button>
          {(isTimerActive || timer > 0) && (
            <div className={`timer-display ${isTimerActive ? 'active' : ''}`}>
              <Clock size={16} /> {formatTime(timer)}
            </div>
          )}
        </div>
        {progress && (
          <div className="progress">
            {isProcessing && <Loader2 size={16} className="spin" />}
            {!isProcessing && progress.includes('Complete') && <CheckCircle size={16} color="#27ae60" />}
            {!isProcessing && progress.includes('failed') && <X size={16} color="#e74c3c" />}
            {!isProcessing && !progress.includes('Complete') && !progress.includes('failed') && <Info size={16} />}
            <strong style={{ marginLeft: '8px' }}>{progress}</strong>
          </div>
        )}
        {stats && (
          <div className="stats-summary">
            <h3 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={20} /> Assessment Report</h3>
            <div className="stats-grid">
              <div className="stat-item"><div className="stat-value">{stats.totalPercentage}%</div><div className="stat-label">Total Percentage</div></div>
              <div className="stat-item"><div className="marks-display">{stats.totalObtained}<span className="marks-fraction">/{stats.totalMax}</span></div><div className="stat-label">Total Marks</div></div>
              <div className="stat-item"><div className="stat-value">{stats.totalFiles}</div><div className="stat-label">Scripts Checked</div></div>
              <div className={`stat-item ${stats.isPass ? 'result-pass' : 'result-fail'}`}><div className="stat-value">{stats.resultText}</div><div className="stat-label">Result</div></div>
            </div>
          </div>
        )}
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}><Target size={18} /> Graded Results:</h4>
          <div>{results.map((result, idx) => <ResultCard key={idx} result={result} />)}</div>
        </div>
        {showSaveButton && <button className="btn save-btn" onClick={saveResults}><Download size={18} /> Export Marksheet</button>}
      </div>
    </div>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("login");

  const handleLogin = (user) => {
    setCurrentUser(user);
    setView("main");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setView("login");
  };

  return (
    <div className="app-container">
      <style>{cssStyles}</style>
      {view === "login" && (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setView("register")}
        />
      )}
      {view === "register" && (
        <RegisterForm onSwitchToLogin={() => setView("login")} />
      )}
      {view === "main" && currentUser && (
        <MainApp user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;