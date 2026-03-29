import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from "../../Services/LoginService";
import './RegisterPage.css';  // We'll create this CSS file next

/* ── Inline SVG illustration ─────────────────────────────────────────── */
const RegisterIllustration = () => (
  <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Registration illustration">
    
    {/* ── Background with geometric pattern ── */}
    <rect x="30" y="30" width="420" height="340" rx="18" fill="rgba(255,255,255,0.07)" />
    
    {/* ── User profile icon ── */}
    <circle cx="240" cy="120" r="50" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
    <circle cx="240" cy="100" r="18" fill="rgba(255,255,255,0.4)" />
    <circle cx="240" cy="100" r="8" fill="#ffffff" />
    <path d="M200 150 Q240 180, 280 150" stroke="rgba(255,255,255,0.4)" strokeWidth="4" fill="none" />
    
    {/* ── Document / registration form icon ── */}
    <rect x="170" y="190" width="140" height="120" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
    <line x1="190" y1="215" x2="290" y2="215" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
    <line x1="190" y1="235" x2="290" y2="235" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
    <line x1="190" y1="255" x2="260" y2="255" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
    <line x1="190" y1="275" x2="280" y2="275" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
    
    {/* ── Checkmark ── */}
    <circle cx="340" cy="270" r="25" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
    <polyline points="330,270 340,280 360,255" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
    {/* ── Floating elements ── */}
    <circle cx="80" cy="320" r="15" fill="#f59e0b" fillOpacity="0.3" />
    <circle cx="80" cy="320" r="6" fill="#f59e0b" />
    <circle cx="400" cy="100" r="20" fill="#3b82f6" fillOpacity="0.2" />
    <circle cx="400" cy="100" r="8" fill="#3b82f6" />
    
    {/* ── Sparkles ── */}
    {[
      { cx: 120, cy: 70 }, { cx: 360, cy: 350 }, { cx: 60, cy: 180 }, { cx: 420, cy: 250 }
    ].map((s, i) => (
      <g key={i}>
        <circle cx={s.cx} cy={s.cy} r="4" fill="white" fillOpacity="0.5" />
        <circle cx={s.cx} cy={s.cy} r="2" fill="white" fillOpacity="0.9" />
      </g>
    ))}
  </svg>
);

const RegisterUser = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [inventoryUser, setInventoryUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });
  const [flag, setFlag] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setFlag(false);
  }, []);

  const createNewUser = (event) => {
    event.preventDefault();
    if (inventoryUser.password === confirmPassword) {
      registerNewUser(inventoryUser).then((response) => {
        setFlag(true);
      });
    }
  };

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setInventoryUser(values => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!inventoryUser.username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    }

    if (!inventoryUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (inventoryUser.password.length < 5 || inventoryUser.password.length > 10) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    } else if (inventoryUser.password !== confirmPassword) {
      tempErrors.password = "Passwords do not match";
      isValid = false;
    }

    if (!inventoryUser.personalName.trim()) {
      tempErrors.personalName = "Personal Name is required";
      isValid = false;
    }
    
    if (!inventoryUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(inventoryUser.email)) {
      tempErrors.email = "Invalid Email Format";
      isValid = false;
    }
    
    if (!inventoryUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }
    
    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      createNewUser(event);
    }
  };

  const returnBack = () => {
    navigate('/');
  };

  return (
    <div className="rp-root">
      {/* ── LEFT PANEL ── */}
      <div className="rp-left">
        <div className="rp-left-inner">
          <div className="rp-illustration">
            <RegisterIllustration />
          </div>
          <h1 className="rp-brand">Join InventoryPro</h1>
          <p className="rp-tagline">Create your account and start managing</p>
          
          {/* Stats/Features */}
          <div className="rp-features">
            <div className="rp-feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Smart Inventory Tracking</span>
            </div>
            <div className="rp-feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Real-time Analytics</span>
            </div>
            <div className="rp-feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Role-based Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="rp-right">
        <div className="rp-card">
          {/* Logo badge */}
          <div className="rp-logo-badge">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#7c3aed" />
              <path d="M7 9h14M7 14h10M7 19h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 className="rp-title">Create Account</h2>
          <p className="rp-subtitle">Fill in your details to register</p>

          <form noValidate onSubmit={handleValidation}>
            {/* Username */}
            <div className="rp-field">
              <label htmlFor="username" className="rp-label">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={inventoryUser.username}
                onChange={onChangeHandler}
                className={`rp-input ${errors.username ? 'rp-input-error' : ''}`}
              />
              {errors.username && <p className="rp-error">{errors.username}</p>}
            </div>

            {/* Personal Name */}
            <div className="rp-field">
              <label htmlFor="personalName" className="rp-label">Full Name</label>
              <input
                id="personalName"
                type="text"
                name="personalName"
                placeholder="Enter your full name"
                value={inventoryUser.personalName}
                onChange={onChangeHandler}
                className={`rp-input ${errors.personalName ? 'rp-input-error' : ''}`}
              />
              {errors.personalName && <p className="rp-error">{errors.personalName}</p>}
            </div>

            {/* Email */}
            <div className="rp-field">
              <label htmlFor="email" className="rp-label">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={inventoryUser.email}
                onChange={onChangeHandler}
                className={`rp-input ${errors.email ? 'rp-input-error' : ''}`}
              />
              {errors.email && <p className="rp-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="rp-field">
              <label htmlFor="password" className="rp-label">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password (5-10 characters)"
                value={inventoryUser.password}
                onChange={onChangeHandler}
                className={`rp-input ${errors.password ? 'rp-input-error' : ''}`}
              />
            </div>

            {/* Confirm Password */}
            <div className="rp-field">
              <label htmlFor="confirmPassword" className="rp-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={`rp-input ${errors.confirmPassword ? 'rp-input-error' : ''}`}
              />
              {errors.password && <p className="rp-error">{errors.password}</p>}
              {errors.confirmPassword && <p className="rp-error">{errors.confirmPassword}</p>}
            </div>

            {/* Role Selection */}
            <div className="rp-field">
              <label htmlFor="role" className="rp-label">Select Role</label>
              <select
                id="role"
                name="role"
                value={inventoryUser.role}
                onChange={onChangeHandler}
                className={`rp-select ${errors.role ? 'rp-input-error' : ''}`}
              >
                <option value="" disabled>Choose a role</option>
                <option value="Manager">Manager</option>
                <option value="Vendor">Vendor</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && <p className="rp-error">{errors.role}</p>}
            </div>

            {/* Success Message */}
            {flag && (
              <div className="rp-success">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>New User Created Successfully!</span>
                <button type="button" className="rp-success-btn" onClick={returnBack}>
                  Go to Login
                </button>
              </div>
            )}

            <button type="submit" className="rp-btn-primary">
              Create Account
            </button>
          </form>

          <div className="rp-divider"><span>Already have an account?</span></div>

          <button className="rp-btn-secondary" onClick={returnBack}>
            Sign in instead
          </button>

          <p className="rp-footer-note">
            By signing up, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;