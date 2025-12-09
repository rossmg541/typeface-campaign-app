import React, { useState } from 'react';
import './App.css';
import logo from './assets/Logo.png';
import arrow from './assets/Arrow_branch.png';
import mockup from './assets/3d-documents.png';
import ribbonBackground from './assets/red-white-ribbons.png';

function App() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(42);

  const validateUrl = (value) => {
    if (!value) {
      setError('');
      setIsValid(false);
      return false;
    }

    // URL validation regex pattern
    // Matches: domain.com, www.domain.com, https://domain.com, http://domain.com
    const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

    const isValidUrl = urlPattern.test(value);

    if (!isValidUrl) {
      setError('Please enter a valid URL (e.g., yourwebsite.com)');
      setIsValid(false);
      return false;
    }

    setError('');
    setIsValid(true);
    return true;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    validateUrl(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      return;
    }

    console.log('URL submitted:', url);
    // Show the sign-in modal
    setShowSignInModal(true);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Close modal and show loading page
    setShowSignInModal(false);
    setIsLoading(true);

    // Show overlay after a brief delay
    setTimeout(() => {
      setShowLoadingOverlay(true);

      // Start countdown timer
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 500);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <img src={logo} alt="Typeface" className="logo" />
            <span className="brand-name"></span>
          </div>
          <div className="nav-center">
            <a href="#product" className="nav-link">Product</a>
            <a href="#use-cases" className="nav-link">Use Cases</a>
            <a href="#partners" className="nav-link">Partners</a>
            <a href="#resources" className="nav-link">Resources</a>
            <a href="#company" className="nav-link">Company</a>
          </div>
          <div className="nav-right">
            <a href="#signin" className="signin-link">Sign in</a>
            <a href="#demo" className="demo-button">
              Get a demo
              <span className="arrow">›</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="hero-section">
          <h1 className="main-heading">
            On-brand campaign,<br />
            made <span className="instant-text">instantly</span>.
          </h1>
          <p className="subheading">
            Just drop your URL and generate an on-brand campaign instantly.
          </p>

          <form onSubmit={handleSubmit} className="input-form">
            <div className={`input-wrapper ${error ? 'has-error' : ''} ${isValid ? 'is-valid' : ''}`}>
              <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder="yourwebsite.com"
                className="url-input"
              />
              <button type="submit" className="submit-button" disabled={!isValid && url !== ''}>
                <img src={arrow} alt="Submit" className="arrow-icon" />
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>

          <div className="mockup-container">
            <img src={mockup} alt="Campaign Mockup" className="mockup-image" />
          </div>
        </div>
      </main>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <img src={logo} alt="Typeface" className="modal-logo" />
              <span className="modal-brand">Typeface</span>
            </div>

            <h2 className="modal-title">Sign up to continue</h2>

            <form className="signin-form" onSubmit={handleSignInSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder=""
                />
              </div>

              <button type="submit" className="continue-button">
                Continue
              </button>
            </form>

            <p className="signup-prompt">
              Don't have an account? <a href="#signup" className="signup-link">Sign up</a>
            </p>

            <div className="divider">
              <span className="divider-text">OR</span>
            </div>

            <div className="social-buttons">
              <button className="social-button google-button">
                <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button className="social-button microsoft-button">
                <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#f25022" d="M1 1h10v10H1z"/>
                  <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                  <path fill="#7fba00" d="M1 13h10v10H1z"/>
                  <path fill="#ffb900" d="M13 13h10v10H13z"/>
                </svg>
                Continue with Microsoft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Page */}
      {isLoading && (
        <div className="loading-page">
          <nav className="navbar">
            <div className="nav-container">
              <div className="nav-left">
                <img src={logo} alt="Typeface" className="logo" />
                <span className="brand-name">Typeface</span>
              </div>
              <div className="nav-center">
                <a href="#product" className="nav-link">Product</a>
                <a href="#use-cases" className="nav-link">Use Cases</a>
                <a href="#partners" className="nav-link">Partners</a>
                <a href="#resources" className="nav-link">Resources</a>
                <a href="#company" className="nav-link">Company</a>
              </div>
              <div className="nav-right">
                <a href="#signin" className="signin-link">Sign in</a>
                <a href="#demo" className="demo-button">
                  Get a demo
                  <span className="arrow">›</span>
                </a>
              </div>
            </div>
          </nav>

          <div className="loading-content">
            <h1 className="loading-heading">
              <span className="gradient-text">Instant</span> brand kit.<br />
              <span className="gradient-text">Instant</span> assets.
            </h1>
            <p className="loading-subheading">
              Just drop your URL and generate brand assets in less than 1 minute.
            </p>

            <form className="input-form">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="url-input"
                />
                <button type="button" className="submit-button" disabled>
                  <img src={arrow} alt="Submit" className="arrow-icon" />
                </button>
              </div>
            </form>
          </div>

          <div className="ribbon-background">
            <img src={ribbonBackground} alt="" className="ribbon-image" />
          </div>

          {/* Loading Overlay */}
          {showLoadingOverlay && (
            <div className="loading-overlay">
              <div className="loading-card">
                <div className="loading-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FD243E"/>
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="#FD243E" opacity="0.3"/>
                  </svg>
                </div>
                <h3 className="loading-title">Importing your brand</h3>
                <p className="loading-description">
                  Brand Agent is reviewing your URL and creating a<br />
                  personalized brand kit for you.
                </p>

                <div className="progress-container">
                  <svg className="progress-svg" viewBox="0 0 500 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FD243E" />
                        <stop offset="25%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#FD243E" />
                        <stop offset="75%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#FD243E" />
                      </linearGradient>
                      <clipPath id="progressClip">
                        <rect x="0" y="0" width={((42 - timeRemaining) / 42) * 500} height="40" />
                      </clipPath>
                      <mask id="progressMask">
                        {/* Mask rectangles */}
                        <rect x="0" y="0" width="8" height="40" fill="white" />
                        <rect x="12" y="0" width="8" height="40" fill="white" />
                        <rect x="24" y="0" width="8" height="40" fill="white" />
                        <rect x="36" y="0" width="8" height="40" fill="white" />
                        <rect x="48" y="0" width="8" height="40" fill="white" />
                        <rect x="60" y="0" width="8" height="40" fill="white" />
                        <rect x="72" y="0" width="4" height="40" fill="white" />
                        <rect x="80" y="0" width="4" height="40" fill="white" />
                        <rect x="88" y="0" width="4" height="40" fill="white" />
                        <rect x="96" y="0" width="4" height="40" fill="white" />
                        <rect x="104" y="0" width="8" height="40" fill="white" />
                        <rect x="116" y="0" width="8" height="40" fill="white" />
                        <rect x="128" y="0" width="8" height="40" fill="white" />
                        <rect x="140" y="0" width="2" height="40" fill="white" />
                        <rect x="146" y="0" width="2" height="40" fill="white" />
                        <rect x="152" y="0" width="2" height="40" fill="white" />
                        <rect x="158" y="0" width="2" height="40" fill="white" />
                        <rect x="164" y="0" width="8" height="40" fill="white" />
                        <rect x="176" y="0" width="8" height="40" fill="white" />
                        <rect x="188" y="0" width="8" height="40" fill="white" />
                        <rect x="200" y="0" width="8" height="40" fill="white" />
                        <rect x="212" y="0" width="8" height="40" fill="white" />
                        <rect x="224" y="0" width="2" height="40" fill="white" />
                        <rect x="230" y="0" width="2" height="40" fill="white" />
                        <rect x="236" y="0" width="2" height="40" fill="white" />
                        <rect x="242" y="0" width="8" height="40" fill="white" />
                        <rect x="254" y="0" width="8" height="40" fill="white" />
                        <rect x="266" y="0" width="8" height="40" fill="white" />
                        <rect x="278" y="0" width="2" height="40" fill="white" />
                        <rect x="284" y="0" width="2" height="40" fill="white" />
                        <rect x="290" y="0" width="2" height="40" fill="white" />
                        <rect x="296" y="0" width="8" height="40" fill="white" />
                        <rect x="308" y="0" width="8" height="40" fill="white" />
                        <rect x="320" y="0" width="8" height="40" fill="white" />
                        <rect x="332" y="0" width="8" height="40" fill="white" />
                        <rect x="344" y="0" width="8" height="40" fill="white" />
                        <rect x="356" y="0" width="2" height="40" fill="white" />
                        <rect x="362" y="0" width="2" height="40" fill="white" />
                        <rect x="368" y="0" width="2" height="40" fill="white" />
                        <rect x="374" y="0" width="2" height="40" fill="white" />
                        <rect x="380" y="0" width="2" height="40" fill="white" />
                        <rect x="386" y="0" width="2" height="40" fill="white" />
                        <rect x="392" y="0" width="2" height="40" fill="white" />
                        <rect x="398" y="0" width="8" height="40" fill="white" />
                        <rect x="410" y="0" width="8" height="40" fill="white" />
                        <rect x="422" y="0" width="8" height="40" fill="white" />
                        <rect x="434" y="0" width="8" height="40" fill="white" />
                        <rect x="446" y="0" width="2" height="40" fill="white" />
                        <rect x="452" y="0" width="2" height="40" fill="white" />
                        <rect x="458" y="0" width="2" height="40" fill="white" />
                        <rect x="464" y="0" width="2" height="40" fill="white" />
                        <rect x="470" y="0" width="2" height="40" fill="white" />
                        <rect x="476" y="0" width="2" height="40" fill="white" />
                        <rect x="482" y="0" width="2" height="40" fill="white" />
                        <rect x="488" y="0" width="2" height="40" fill="white" />
                        <rect x="494" y="0" width="2" height="40" fill="white" />
                      </mask>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="500"
                      height="40"
                      fill="url(#progressGradient)"
                      mask="url(#progressMask)"
                      clipPath="url(#progressClip)"
                    />
                  </svg>
                </div>

                <div className="timer-section">
                  <span className="timer">{timeRemaining} sec</span>
                </div>

                <div className="notification-text">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="bell-icon">
                    <path d="M8 2C6.34315 2 5 3.34315 5 5V7.5C5 8.163 4.663 8.763 4.118 9.118L3.382 9.618C2.764 10.014 3.033 11 3.764 11H12.236C12.967 11 13.236 10.014 12.618 9.618L11.882 9.118C11.337 8.763 11 8.163 11 7.5V5C11 3.34315 9.65685 2 8 2Z" stroke="#9CA3AF" strokeWidth="1.5"/>
                    <path d="M6.5 11C6.5 12.3807 7.11929 13 8 13C8.88071 13 9.5 12.3807 9.5 11" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Feel free to leave, we'll notify you once your brand has been imported
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
