import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage({ onNavigateToLogin }) {
  const navigate = useNavigate();

  onNavigateToLogin = onNavigateToLogin || (() => navigate("/login"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.text();

      alert(result);

      if (response.ok && result === "User registered successfully") {
        navigate("/login");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="form-container">
          <h1 className="form-title">Join HealthTrack</h1>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-footer">
              <button type="submit" className="submit-button">
                Register
              </button>
            </div>
          </form>

          <div className="form-links">
            <p>
              Already have an account?{" "}
              <button onClick={onNavigateToLogin} className="link-button">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --primary: #34D399;
          --primary-dark: #2EA77F;
          --primary-light: #D1FAE5;
          --background: #F7FAFC;
          --text-primary: #1F2937;
          --text-secondary: #6B7280;
          --accent: #FBBF24;
          --border: #E2E8F0;
          --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 8px 20px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .register-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--background) 100%);
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .register-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 30%, rgba(52, 211, 153, 0.1) 0%, transparent 70%);
          z-index: 0;
        }

        .register-container {
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .form-container {
          background-color: white;
          padding: 48px;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-title {
          color: var(--text-primary);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 32px;
          text-align: center;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .register-form {
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 1rem;
          color: var(--text-primary);
          background-color: #F9FAFB;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus {
          border-color: var(--primary);
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.1);
        }

        .form-footer {
          margin-top: 32px;
        }

        .submit-button {
          width: 100%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 14px 24px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(52, 211, 153, 0.3);
        }

        .form-links {
          margin-top: 24px;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .link-button {
          background: none;
          border: none;
          color: var(--primary);
          padding: 0;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .link-button:hover {
          color: var(--primary-dark);
        }

        @media (max-width: 480px) {
          .form-container {
            padding: 32px;
          }

          .form-title {
            font-size: 1.75rem;
          }

          .submit-button {
            padding: 12px 20px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
