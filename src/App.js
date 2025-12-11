import React, { useState } from 'react';
import './App.css';
import logo from './assets/typeface-logo.svg';
import arrow from './assets/Arrow_branch.png';
import mockup from './assets/3d-documents.png';
import ribbonBackground from './assets/red-white-ribbons.png';
import orbVideo from './assets/orb-fast.mp4';
import bgVideo from './assets/bg-video-3.mp4';

function App() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(16); // Total: 2s + 3s + 3s + 5s + 3s
  const [loadingTitle, setLoadingTitle] = useState('Analysing your URL');
  const [loadingDescription, setLoadingDescription] = useState('Brand agent is reviewing your URL');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const validateUrl = (value) => {
    if (!value) {
      setError('Please enter a valid URL (e.g., yourwebsite.com)');
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
    // Clear error when user types
    setError('');
    // Check if valid but don't show error while typing
    const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    setIsValid(urlPattern.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Only validate and show error on submit
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

    // Show overlay and start timer immediately
    setShowLoadingOverlay(true);

    // Start progress bar animation immediately
    setTimeout(() => {
      setProgressPercentage(10);
    }, 50);

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          clearInterval(timer);
          setIsCompleted(true);
          setProgressPercentage(100);
          // Redirect to Typeface canvas
          window.location.href = 'https://app.typeface.ai/canvas/669693?accountId=c1f3ca05-78ce-4bc8-8e29-d8b9a01a89ce&chatId=new';
          return 0;
        }

        // Update progress and titles based on time remaining
        // 16-15s: Analysing your URL - first second
        if (newTime === 15) {
          setProgressPercentage(12);
        }
        // 15-14s: Analysing your URL - second second
        else if (newTime === 14) {
          setProgressPercentage(15);
        }
        // 14-13s: Analysing your URL - third second
        else if (newTime === 13) {
          setProgressPercentage(20);
          setLoadingTitle('Importing your brand');
          setLoadingDescription('Extracting color palette, image styles, fonts, text styles, etc.');
        }
        // 13-11s: Importing your brand (20% to 40%) - 2 seconds
        else if (newTime > 11 && newTime <= 12) {
          const elapsed = 13 - newTime;
          const newProgress = 20 + (elapsed / 2) * 20;
          setProgressPercentage(newProgress);
        }
        // At 11s: Show "Creating your brand kit"
        else if (newTime === 11) {
          setLoadingTitle('Creating your brand kit');
          setProgressPercentage(45);
        }
        // 11-8s: Creating your brand kit (45% to 60%) - 3 seconds
        else if (newTime > 8) {
          const elapsed = 11 - newTime;
          const newProgress = 45 + (elapsed / 3) * 15;
          setProgressPercentage(newProgress);
        }
        // At 8s: Generating new content
        else if (newTime === 8) {
          setLoadingTitle('Generating new content');
          setLoadingDescription('Using your brand kit to create on-brand assets');
          setProgressPercentage(65);
        }
        // 8-4s: Generating new content (65% to 100%) - 4 seconds
        else if (newTime > 3) {
          const elapsed = 8 - newTime;
          const newProgress = 65 + (elapsed / 4) * 35;
          setProgressPercentage(newProgress);
        }
        // At 3s: Directing user to new project - already completed
        else if (newTime === 3) {
          setLoadingTitle('New assets & brand kit ready');
          setLoadingDescription('Directing you to your new project');
          setProgressPercentage(100);
          setIsCompleted(true);
        }
        // 3-0s: Stay completed with green check and green progress bar
        else if (newTime > 0) {
          // Keep completed state
        }

        return newTime;
      });
    }, 1000);
  };

  return (
    <div className="App">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-mask"></div>
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
            On-brand assets,<br />
            made <span className="instant-text">effortless.</span>
          </h1>
          <p className="subheading">
            Just drop your URL and turn it into your brand engine​.
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
              <button type="submit" className="submit-button">
                <span className="button-text">Go</span>
                <svg className="button-arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M-8.10623e-05 5.83333L10.1458 5.83333L5.47909 1.16667L6.66659 0L13.3333 6.66667L6.66659 13.3333L5.47909 12.1667L10.1458 7.5L-8.10623e-05 7.5V5.83333Z" fill="white"/>
                </svg>
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
                <span className="button-text">Continue</span>
                <svg className="button-arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M-8.10623e-05 5.83333L10.1458 5.83333L5.47909 1.16667L6.66659 0L13.3333 6.66667L6.66659 13.3333L5.47909 12.1667L10.1458 7.5L-8.10623e-05 7.5V5.83333Z" fill="white"/>
                </svg>
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

      {/* Loading Modal */}
      {isLoading && (
        <div className="modal-overlay">
              <div className="loading-card">
                <div className="loading-icon">
                  <video autoPlay loop muted playsInline className={`orb-video ${isCompleted ? 'completed' : ''}`} src={orbVideo} />
                </div>
                <h3 key={loadingTitle} className="loading-title">{loadingTitle}</h3>
                <p key={loadingDescription} className="loading-description">
                  {loadingDescription}
                </p>

                <div className="progress-container">
                  <div className="progress-bar-wrapper">
                    <div className={`progress-bar ${isCompleted ? 'completed' : ''}`} style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>

                <div className="timer-section">
                  {!isCompleted ? (
                    <span className="timer">{timeRemaining} sec</span>
                  ) : (
                    <svg className="check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#2AE88C"/>
                      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                <div className="notification-text">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="bell-icon">
                    <path d="M8 2C6.34315 2 5 3.34315 5 5V7.5C5 8.163 4.663 8.763 4.118 9.118L3.382 9.618C2.764 10.014 3.033 11 3.764 11H12.236C12.967 11 13.236 10.014 12.618 9.618L11.882 9.118C11.337 8.763 11 8.163 11 7.5V5C11 3.34315 9.65685 2 8 2Z" stroke="#9CA3AF" strokeWidth="1.5"/>
                    <path d="M6.5 11C6.5 12.3807 7.11929 13 8 13C8.88071 13 9.5 12.3807 9.5 11" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Feel free to leave, we'll notify you once your brand kit & new assets are ready.
                </div>
              </div>
        </div>
      )}
    </div>
  );
}

export default App;
