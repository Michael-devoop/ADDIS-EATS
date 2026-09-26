import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function ConfirmationMessage({ order }) {
  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <h1 className="breadcrumb-title">Order Confirmed</h1>
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
                  Order Confirmed
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card box-shadow text-center p-4 p-md-5">
                <div
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center bg-success text-white rounded-circle"
                  style={{ width: 80, height: 80, fontSize: 36 }}
                >
                  <i className="icon-check"></i>
                </div>

                <h2 className="fw-bold mb-2">Order Placed Successfully!</h2>
                <p className="text-muted mb-4 fs-16">
                  Thank you, <strong>{order.customer.name}</strong>! Your order is on its way to{" "}
                  <strong>{order.deliveryArea}</strong>.
                </p>

                <div className="bg-light p-3 rounded mb-4 text-start border">
                  <div className="row g-2">
                    <div className="col-sm-6">
                      <span className="text-muted fs-13 d-block">Order ID</span>
                      <strong className="fs-15 text-dark">#{order.orderId.slice(0, 8).toUpperCase()}</strong>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted fs-13 d-block">Estimated Delivery</span>
                      <strong className="fs-15 text-success">~30-40 Minutes</strong>
                    </div>
                    <div className="col-sm-6 mt-2">
                      <span className="text-muted fs-13 d-block">Payment Method</span>
                      <strong className="fs-15 text-dark">Cash on Delivery</strong>
                    </div>
                    <div className="col-sm-6 mt-2">
                      <span className="text-muted fs-13 d-block">Total Amount</span>
                      <strong className="fs-16 text-primary">{formatCurrency(order.total)}</strong>
                    </div>
                  </div>
                </div>

                {order.items?.length > 0 && (
                  <div className="text-start mb-4">
                    <h5 className="fw-bold mb-3 border-bottom pb-2">Order Items ({order.items.length})</h5>
                    <ul className="list-unstyled mb-0">
                      {order.items.map((item) => (
                        <li
                          key={item.dishId}
                          className="d-flex justify-content-between align-items-center py-2 border-bottom"
                        >
                          <div>
                            <span className="fw-semibold">{item.name}</span>
                            <span className="text-muted ms-2">× {item.quantity}</span>
                          </div>
                          <span className="text-dark fw-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/orders" className="primary-btn btn px-4">
                    <i className="icon-receipt-text me-2"></i>View Order History
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary px-4">
                    <i className="icon-house me-2"></i>Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}