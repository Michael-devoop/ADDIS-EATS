import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import "./admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

 
  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email and password.");
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.error || "Invalid admin credentials. Please try again.");
    }
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-form-section">
        <div className="admin-form-container">
          <Link to="/" className="admin-brand-logo">
            <i className="fa-solid fa-utensils"></i>
            <span>ADDIS EATS</span>
          </Link>

          <div className="admin-form-header">
            <h1>Welcome Back!</h1>
            <p>Glad to have you here again. Let's get started!</p>
          </div>

          {error && (
            <div className="admin-login-error-msg" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <label htmlFor="admin-email">Email</label>
              <input
                type="email"
                id="admin-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="admin-input-group">
              <label htmlFor="admin-password">Password</label>
              <div className="admin-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="admin-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your password"
                  required
                />
                <i
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                ></i>
              </div>
            </div>

            <div className="admin-form-options">
              <label className="admin-remember-me">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <Link to="/login" style={{ color: "var(--admin-brand-orange)", textDecoration: "none", fontSize: "0.88rem" }}>
                Customer Login
              </Link>
            </div>

            <button type="submit" className="admin-sign-in-btn">
              Sign In to Dashboard
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link
              to="/"
              style={{
                color: "var(--admin-text-muted)",
                fontSize: "0.88rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Return to Addis Eats Storefront
            </Link>
          </div>
        </div>
      </div>

      <div className="admin-login-image-section">
        <div className="admin-image-overlay">
          <h2>Admin Dashboard<br />Real Time, Always</h2>
          <p>
            Monitor incoming live orders, adjust kitchen workflows, and update restaurant menus seamlessly in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
