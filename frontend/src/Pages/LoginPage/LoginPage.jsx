import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onNavigateToRegister }) {
  const navigate = useNavigate();

  onNavigateToRegister = onNavigateToRegister || (() => navigate("/register"));

  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
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

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const { password, ...userWithoutPassword } = result;
        localStorage.setItem("loggedUser", JSON.stringify(userWithoutPassword));
        navigate("/dashboard");
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-container">
          <h1 className="form-title">Login to HealthTrack</h1>

          <form onSubmit={handleSubmit} className="login-form">
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

            <div className="form-footer">
              <button type="submit" className="submit-button">
                Login
              </button>
            </div>
          </form>

          <div className="form-links">
            <p>
              Don't have an account?{" "}
              <button onClick={onNavigateToRegister} className="link-button">
                Register
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

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--background) 100%);
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 30%, rgba(52, 211, 153, 0.1) 0%, transparent 70%);
          z-index: 0;
        }

        .login-container {
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

        .login-form {
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
