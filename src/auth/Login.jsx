import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to go after login — defaults to home
  const from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Simulate a brief network delay
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 600);
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <h1 className="breadcrumb-title">Login</h1>
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-items">
                  <Link to="/">
                    <i className="icon-house me-2"></i>Home
                  </Link>
                </li>
                <li className="breadcrumb-items">
                  <span><i className="icon-chevron-right"></i></span>
                </li>
                <li className="breadcrumb-items active" aria-current="page">
                  Login
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card box-shadow">
                <div className="card-body p-4 p-lg-5">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <Link to="/">
                      <img
                        src="/images/addis-eats-logo.png"
                        alt="Addis Eats"
                        className="mb-3"
                        style={{ maxHeight: 42, width: "auto" }}
                      />
                    </Link>
                    <h3 className="mb-1">Welcome Back!</h3>
                    <p className="text-muted">Sign in to your account to continue</p>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center py-2 px-3" role="alert">
                      <i className="icon-alert-circle me-2"></i>
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="login-email" className="form-label fw-semibold">
                        Email Address
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="icon-mail text-muted"></i>
                        </span>
                        <input
                          id="login-email"
                          type="email"
                          className="form-control border-start-0 ps-0"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label htmlFor="login-password" className="form-label fw-semibold">
                        Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="icon-lock text-muted"></i>
                        </span>
                        <input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          className="form-control border-start-0 border-end-0 ps-0"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                        />
                        <button
                          type="button"
                          className="input-group-text bg-light border-start-0"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          <i className={showPassword ? "icon-eye-off text-muted" : "icon-eye text-muted"}></i>
                        </button>
                      </div>
                    </div>

                    {/* Remember + Forgot */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember-me"
                        />
                        <label className="form-check-label text-muted" htmlFor="remember-me">
                          Remember me
                        </label>
                      </div>
                      <a href="#" className="text-primary text-decoration-none fw-semibold" style={{ fontSize: 14 }}>
                        Forgot Password?
                      </a>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2 fw-semibold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="icon-log-in me-2"></i>Sign In
                        </>
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="d-flex align-items-center my-4">
                    <div style={{ flex: 1, borderTop: "1px solid #dee2e6" }}></div>
                    <span className="px-3 text-muted" style={{ fontSize: 13 }}>or continue with</span>
                    <div style={{ flex: 1, borderTop: "1px solid #dee2e6" }}></div>
                  </div>

                  {/* Social Login (visual only) */}
                  <div className="d-flex gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary py-2 d-inline-flex align-items-center justify-content-center"
                      style={{ flex: 1 }}
                    >
                      <i className="fa-brands fa-google me-2 text-danger"></i>Google
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary py-2 d-inline-flex align-items-center justify-content-center"
                      style={{ flex: 1 }}
                    >
                      <i className="fa-brands fa-facebook-f me-2 text-primary"></i>Facebook
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <p className="text-center text-muted mt-4 mb-0" style={{ fontSize: 14 }}>
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
