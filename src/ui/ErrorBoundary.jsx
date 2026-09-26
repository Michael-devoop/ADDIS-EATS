import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="card box-shadow text-center p-5 my-5">
                  <div className="mb-4">
                    <i
                      className="icon-alert-triangle"
                      style={{ fontSize: 64, color: "#E31B23" }}
                    ></i>
                  </div>
                  <h2 className="mb-2">Oops! Something went wrong</h2>
                  <p className="text-muted mb-4">
                    An unexpected error occurred. Please try again or go back to the home page.
                  </p>

                  {this.state.error && (
                    <div
                      className="alert alert-light border text-start mb-4"
                      style={{ fontSize: 13 }}
                    >
                      <strong>Error:</strong>{" "}
                      {this.state.error.message || "Unknown error"}
                    </div>
                  )}

                  <div className="d-flex justify-content-center gap-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleReset}
                    >
                      <i className="icon-refresh-cw me-2"></i>Try Again
                    </button>
                    <Link to="/" className="btn btn-outline-secondary">
                      <i className="icon-house me-2"></i>Go Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
