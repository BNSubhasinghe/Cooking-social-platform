import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="logo" onClick={() => (window.location.href = "/")}>
              <span>HealthTrack</span>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <a href="/" className="nav-link">
                Home
              </a>
              <a href="#features" className="nav-link">
                Features
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <a
                href="/login"
                className="nav-link"
                onClick={handleNavigateLogin}
              >
                Login
              </a>
              <button className="primary-button" onClick={handleNavigateLogin}>
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="mobile-menu-toggle">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="menu-button"
              >
                <svg
                  className="menu-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <a href="/" className="mobile-nav-link">
                Home
              </a>
              <a href="#features" className="mobile-nav-link">
                Features
              </a>
              <a href="#about" className="mobile-nav-link">
                About
              </a>
              <a
                href="/login"
                className="mobile-nav-link"
                onClick={handleNavigateLogin}
              >
                Login
              </a>
              <button
                className="mobile-primary-button"
                onClick={handleNavigateLogin}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span>Achieve Your Health Goals with</span>
              <span className="highlight">HealthTrack</span>
            </h1>
            <p className="hero-description">
              Track your meals, hydration, and fitness activities effortlessly.
              Set personalized goals, monitor your progress, and stay motivated
              with daily reminders and summaries.
            </p>
            <div className="hero-buttons">
              <a
                href="/login"
                className="primary-button hero-button"
                onClick={handleNavigateLogin}
              >
                Get Started
              </a>
              <a href="#about" className="secondary-button hero-button">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose HealthTrack?</h2>
            <p className="features-description">
              Discover features designed to help you stay on top of your health
              and fitness goals.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1: User Profile & Health Goals */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="feature-title">Personalized Profiles</h3>
              <p className="feature-description">
                Set your age, weight, height, health goals, and diet preferences
                to get tailored calorie and hydration targets.
              </p>
            </div>

            {/* Feature 2: Daily Food Logging */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-7 8h14v-2H5v2zm0 0h14v-2H5v2z"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="feature-title">Food Logging</h3>
              <p className="feature-description">
                Log your meals with estimated calories and get alerts if you
                exceed your daily limits.
              </p>
            </div>

            {/* Feature 3: Water Tracking */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v18m-6-6h12M6 9h12"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="feature-title">Water Tracking</h3>
              <p className="feature-description">
                Log your water intake and track your daily hydration goal with a
                visual progress bar.
              </p>
            </div>

            {/* Feature 4: Goal Tracking */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="feature-title">Goal Tracking</h3>
              <p className="feature-description">
                Monitor your daily calorie and water intake in real-time with
                personalized goals.
              </p>
            </div>

            {/* Feature 5: Progress Summary */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 13h2v6H3v-6zm5-3h2v9H8v-9zm5-5h2v14h-2V5zm5 5h2v9h-2v-9z"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="feature-title">Progress Summary</h3>
              <p className="feature-description">
                View daily and weekly summaries of your calorie and water intake
                with graphs and insights.
              </p>
            </div>

            {/* Feature 6: Reminders */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="feature-title">Smart Reminders</h3>
              <p className="feature-description">
                Get timely reminders to log meals, drink water, and stay
                consistent with your goals.
              </p>
            </div>

            {/* Feature 7: Fitness Logging */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="feature-title">Fitness Logging</h3>
              <p className="feature-description">
                Log activities like running or weightlifting to track calories
                burned and balance your intake.
              </p>
            </div>

            {/* Feature 8: Secure Authentication */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2c0 .738.402 1.378 1 1.723V15a1 1 0 001 1h1a1 1 0 001-1v-2.277c.598-.345 1-.985 1-1.723zm9-3v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5z"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="feature-title">Secure Login</h3>
              <p className="feature-description">
                Sign up or log in securely with email/password or Google OAuth
                2.0.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h2 className="about-title">About HealthTrack</h2>
            <p className="about-description">
              HealthTrack is your ultimate companion for achieving a healthier
              lifestyle.
            </p>
          </div>
          <div className="about-content">
            <p>
              Whether you’re aiming for weight loss, muscle gain, or simply
              better hydration, HealthTrack helps you log your meals, water
              intake, and fitness activities. Set personalized goals based on
              your profile, track your progress with daily and weekly summaries,
              and stay motivated with smart reminders. Join us today and take
              control of your health journey!
            </p>
            <div className="about-cta">
              <a
                href="/login"
                className="primary-button"
                onClick={handleNavigateLogin}
              >
                Start Tracking Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
