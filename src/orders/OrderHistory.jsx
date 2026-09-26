import { Link } from "react-router-dom";
import { useOrderHistoryStore } from "./orderHistoryStore";
import OrderHistoryItem from "./OrderHistoryItem";

export default function OrderHistory() {
  const orders = useOrderHistoryStore((s) => s.orders);

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <h1 className="breadcrumb-title">Orders &amp; Reordering</h1>
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
                  Orders &amp; Reordering
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="container">
          <div className="user-title d-flex align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
            <div>
              <h2 className="mb-0 fs-28 fw-bold">My Orders</h2>
              <span className="text-muted fs-14">
                {orders.length} {orders.length === 1 ? "order recorded" : "orders recorded"}
              </span>
            </div>
            <div>
              <Link to="/menu" className="btn primary-btn btn-sm">
                <i className="icon-plus me-1"></i>Order More Food
              </Link>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-5">
              <div
                className="card box-shadow p-5"
                style={{ maxWidth: 500, margin: "0 auto" }}
              >
                <div className="mb-3">
                  <i
                    className="icon-receipt-text text-muted"
                    style={{ fontSize: 60 }}
                  ></i>
                </div>
                <h3 className="mb-2">No Orders Yet</h3>
                <p className="text-muted mb-4">
                  You haven't placed any orders yet. Discover our delicious Ethiopian and international dishes!
                </p>
                <Link
                  to="/menu"
                  className="btn primary-btn justify-content-center"
                >
                  <i className="icon-arrow-left me-2"></i>Explore Menu
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {orders.map((order) => (
                <OrderHistoryItem key={order.orderId} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}