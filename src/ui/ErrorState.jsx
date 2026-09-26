import { Link } from "react-router-dom";

export default function ErrorState({
  message = "Something went wrong.",
  title = "Error",
  icon = "icon-alert-circle",
  onRetry,
  retryLabel = "Try Again",
  showHome = true,
}) {
  return (
    <div className="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card box-shadow text-center p-4 p-lg-5 my-4">
              <div className="mb-3">
                <i
                  className={icon}
                  style={{ fontSize: 56, color: "#E31B23" }}
                ></i>
              </div>
              <h3 className="mb-2">{title}</h3>
              <p className="text-muted mb-4">{message}</p>

              <div className="d-flex justify-content-center gap-3">
                {onRetry && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onRetry}
                  >
                    <i className="icon-refresh-cw me-2"></i>{retryLabel}
                  </button>
                )}
                {showHome && (
                  <Link to="/" className="btn btn-outline-secondary">
                    <i className="icon-house me-2"></i>Go Home
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}