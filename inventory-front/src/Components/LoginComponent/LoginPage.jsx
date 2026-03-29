import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from "../../Services/LoginService";
import './LoginPage.css';

/* ── Inline SVG illustration ─────────────────────────────────────────── */
const InventoryIllustration = () => (
  <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Inventory illustration">

    {/* ── Background shelf structure ── */}
    <rect x="30" y="30" width="420" height="340" rx="18" fill="rgba(255,255,255,0.07)" />

    {/* Shelf 1 */}
    <rect x="50" y="100" width="380" height="10" rx="4" fill="rgba(255,255,255,0.25)" />
    {/* Shelf 2 */}
    <rect x="50" y="210" width="380" height="10" rx="4" fill="rgba(255,255,255,0.25)" />
    {/* Shelf 3 */}
    <rect x="50" y="320" width="380" height="10" rx="4" fill="rgba(255,255,255,0.25)" />
    {/* Left upright */}
    <rect x="50"  y="50" width="12" height="285" rx="4" fill="rgba(255,255,255,0.2)" />
    {/* Right upright */}
    <rect x="418" y="50" width="12" height="285" rx="4" fill="rgba(255,255,255,0.2)" />

    {/* ── Row 1 Boxes ── */}
    <rect x="70"  y="55" width="60" height="42" rx="6" fill="#f9c74f" />
    <rect x="94"  y="55" width="12" height="42" fill="rgba(0,0,0,0.08)" />
    <rect x="145" y="62" width="55" height="35" rx="6" fill="#90be6d" />
    <rect x="165" y="62" width="10" height="35" fill="rgba(0,0,0,0.08)" />
    <rect x="215" y="55" width="60" height="42" rx="6" fill="#f8961e" />
    <rect x="238" y="55" width="12" height="42" fill="rgba(0,0,0,0.08)" />
    <rect x="290" y="60" width="50" height="37" rx="6" fill="#4cc9f0" />
    <rect x="308" y="60" width="10" height="37" fill="rgba(0,0,0,0.08)" />
    <rect x="355" y="55" width="60" height="42" rx="6" fill="#f72585" />
    <rect x="378" y="55" width="12" height="42" fill="rgba(0,0,0,0.08)" />

    {/* ── Row 2 Boxes ── */}
    <rect x="70"  y="118" width="65" height="85" rx="6" fill="#7209b7" />
    <line x1="70"  y1="140" x2="135" y2="140" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
    <line x1="70"  y1="160" x2="135" y2="160" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
    <line x1="70"  y1="180" x2="135" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
    <line x1="102" y1="118" x2="102" y2="203" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>

    <rect x="150" y="125" width="70" height="75" rx="6" fill="#3a86ff" />
    <rect x="182" y="125" width="6"  height="75" fill="rgba(255,255,255,0.2)" />
    <rect x="150" y="155" width="70" height="6"  fill="rgba(255,255,255,0.2)" />
    {[155,160,165,170,175,180,185,192,197,202,207,212].map((x, i) => (
      <rect key={i} x={x} y="166" width={i % 3 === 2 ? 3 : 2} height="20" fill="rgba(255,255,255,0.6)" />
    ))}

    <ellipse cx="280" cy="125" rx="30" ry="10" fill="#f4a261" />
    <rect x="250" y="125" width="60" height="65" fill="#f4a261" />
    <ellipse cx="280" cy="190" rx="30" ry="10" fill="#e76f51" />
    <ellipse cx="280" cy="155" rx="26" ry="5"  fill="rgba(0,0,0,0.08)" />

    <rect x="330" y="115" width="55" height="85" rx="6" fill="#06d6a0" />
    <text x="357" y="165" textAnchor="middle" fontSize="22" fill="white" fontWeight="bold">📦</text>

    {/* ── Row 3 Boxes ── */}
    <rect x="70"  y="224" width="50" height="88" rx="6" fill="#480ca8" />
    <rect x="88"  y="224" width="8"  height="88" fill="rgba(255,255,255,0.15)" />

    <rect x="135" y="230" width="70" height="80" rx="6" fill="rgba(251,86,7,0.85)" />
    <text x="170" y="280" textAnchor="middle" fontSize="20" fill="white" fontWeight="bold">🗂️</text>

    <rect x="220" y="218" width="60" height="90" rx="6" fill="#8338ec" />
    <rect x="247" y="218" width="6"  height="90" fill="rgba(255,255,255,0.15)" />
    <rect x="220" y="260" width="60" height="8"  fill="rgba(255,255,255,0.12)" />

    <rect x="295" y="225" width="80" height="75" rx="6" fill="#3a0ca3" />
    {[302,308,314,320,326,332,338,344,350,356,362,368].map((x, i) => (
      <rect key={i} x={x} y="250" width={i % 3 === 2 ? 3 : 2} height="22" fill="rgba(255,255,255,0.45)" />
    ))}

    <rect x="390" y="224" width="38" height="88" rx="6" fill="#f9c74f" />

    {/* ── Forklift ── */}
    <rect x="80" y="330" width="80" height="48" rx="8" fill="#2d3748" />
    <rect x="130" y="316" width="30" height="22" rx="4" fill="#4a5568" />
    <rect x="133" y="319" width="24" height="14" rx="3" fill="rgba(147,210,255,0.6)" />
    <rect x="62"  y="310" width="22" height="70" rx="4" fill="#718096" />
    <rect x="48"  y="305" width="16" height="8" rx="2" fill="#a0aec0" />
    <rect x="48" y="370" width="36" height="5" rx="2" fill="#a0aec0" />
    <rect x="58" y="370" width="2"  height="30" rx="1" fill="#a0aec0" />
    <rect x="72" y="370" width="2"  height="30" rx="1" fill="#a0aec0" />
    <circle cx="96"  cy="378" r="12" fill="#1a202c" />
    <circle cx="96"  cy="378" r="6"  fill="#718096" />
    <circle cx="150" cy="378" r="12" fill="#1a202c" />
    <circle cx="150" cy="378" r="6"  fill="#718096" />

    {/* ── Clipboard / checklist ── */}
    <rect x="310" y="335" width="80" height="48" rx="6" fill="white" fillOpacity="0.15" />
    <rect x="343" y="328" width="14" height="8" rx="3" fill="white" fillOpacity="0.35" />
    <line x1="320" y1="348" x2="380" y2="348" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
    <line x1="320" y1="358" x2="380" y2="358" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
    <line x1="320" y1="368" x2="372" y2="368" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
    <polyline points="320,347 324,351 330,343" stroke="#90be6d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="320,357 324,361 330,353" stroke="#90be6d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

    {/* ── Floating sparkles ── */}
    {[
      { cx: 430, cy: 70 }, { cx: 52, cy: 375 }, { cx: 240, cy: 385 }
    ].map((s, i) => (
      <g key={i}>
        <circle cx={s.cx} cy={s.cy} r="4" fill="white" fillOpacity="0.5" />
        <circle cx={s.cx} cy={s.cy} r="2" fill="white" fillOpacity="0.9" />
      </g>
    ))}
  </svg>
);

/* ── Component ───────────────────────────────────────────────────────── */
const LoginPage = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [flag, setFlag] = useState(true);

  const validateLogin = (e) => {
    e.preventDefault();
    validateUser(loginData.username, loginData.password).then((response) => {
      let role = String(response.data);
      if (role === "Admin")        navigate("/admin-menu");
      else if (role === "Manager") navigate("/manager-menu");
      else if (role === "Vendor")  navigate("/vendor-menu");
      else                         setFlag(false);
    });
  };

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(true);
    const name  = event.target.name;
    const value = event.target.value;
    setLoginData(values => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid    = true;
    if (!loginData.username.trim()) { tempErrors.username = "User Name is required"; isValid = false; }
    if (!loginData.password.trim()) { tempErrors.password = "Password is required";  isValid = false; }
    setErrors(tempErrors);
    if (isValid) validateLogin(event);
  };

  const registerNewUser = () => navigate('/register');

  return (
    <div className="lp-root">

      {/* ── LEFT PANEL ── */}
      <div className="lp-left">
        <div className="lp-left-inner">
          <div className="lp-illustration">
            <InventoryIllustration />
          </div>
          <h1 className="lp-brand">InventoryPro</h1>
          <p className="lp-tagline">Smart stock. Seamless control.</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="lp-right">
        <div className="lp-card">

          {/* Logo badge */}
          <div className="lp-logo-badge">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#7c3aed" />
              <path d="M7 9h14M7 14h10M7 19h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 className="lp-title">Welcome back</h2>
          <p className="lp-subtitle">Sign in to your account</p>

          <form noValidate onSubmit={handleValidation}>

            {/* Username */}
            <div className="lp-field">
              <label htmlFor="username" className="lp-label">Username</label>
              <div className="lp-input-wrap">
                
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={loginData.username}
                  onChange={onChangeHandler}
                  className={`lp-input ${errors.username ? 'lp-input-error' : ''}`}
                  autoComplete="username"
                />
              </div>
              {errors.username && <p className="lp-error">{errors.username}</p>}
            </div>

            {/* Password */}
            <div className="lp-field">
              <label htmlFor="password" className="lp-label">Password</label>
              <div className="lp-input-wrap">
                
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={onChangeHandler}
                  className={`lp-input ${errors.password ? 'lp-input-error' : ''}`}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <p className="lp-error">{errors.password}</p>}
            </div>

            {!flag && (
              <div className="lp-alert">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                Invalid username or password
              </div>
            )}

            <button type="submit" className="lp-btn-primary">
              Sign In
            </button>
          </form>

          <div className="lp-divider"><span>or</span></div>

          <button className="lp-btn-secondary" onClick={registerNewUser}>
            Create a new account
          </button>

          <p className="lp-footer-note">
            Secured with end-to-end encryption
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;