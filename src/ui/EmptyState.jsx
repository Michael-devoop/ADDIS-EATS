import { Link } from "react-router-dom";

export default function EmptyState({
  message = "Nothing here yet.",
  title = "It's empty here",
  icon = "icon-inbox",
  action,
  actionLabel = "Browse Menu",
  actionTo = "/menu",
}) {
  return (
    <div className="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card box-shadow text-center p-4 p-lg-5 my-4">
              <div className="mb-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mx-auto"
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "#FFF5F5",
                  }}
                >
                  <i
                    className={icon}
                    style={{ fontSize: 36, color: "#E31B23" }}
                  ></i>
                </div>
              </div>
              <h3 className="mb-2">{title}</h3>
              <p className="text-muted mb-4">{message}</p>

              {action || (
                <div className="d-flex justify-content-center">
                  <Link to={actionTo} className="btn btn-primary">
                    <i className="icon-utensils me-2"></i>{actionLabel}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}