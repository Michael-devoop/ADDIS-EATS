import { formatCurrency } from "../utils/formatCurrency";
import ReorderButton from "./ReorderButton";

export default function OrderHistoryItem({ order }) {
  const firstItem = order.items?.[0];
  const itemsText = order.items
    ? order.items.map((i) => `${i.name} (×${i.quantity})`).join(", ")
    : "Dishes";

  const formattedDate = order.placedAt
    ? new Date(order.placedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recent";

  return (
    <div className="card shadow-sm mb-4 box-shadow">
      <div className="card-body">
        <div className="row align-items-center g-3">
          {/* Media & Item summary */}
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="d-flex align-items-center">
              <div className="me-3 flex-shrink:0" style={{ width: 64, height: 64 }}>
                <img
                  src={firstItem?.image || "/assets/img/food/food-01.jpg"}
                  alt={firstItem?.name || "Dish"}
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "/assets/img/food/food-01.jpg";
                  }}
                />
              </div>
              <div>
                <h5 className="mb-1 fs-16 text-dark fw-bold text-truncate" style={{ maxWidth: 220 }}>
                  {firstItem?.name || "Order"}
                  {order.items?.length > 1 && (
                    <span className="badge bg-light text-muted ms-1 fs-12">
                      +{order.items.length - 1} more
                    </span>
                  )}
                </h5>
                <p className="fs-13 text-primary mb-0 fw-semibold">
                  #{order.orderId ? order.orderId.slice(0, 8).toUpperCase() : "ORD-1"}
                </p>
                <small className="text-muted text-truncate d-block fs-12" style={{ maxWidth: 220 }}>
                  {itemsText}
                </small>
              </div>
            </div>
          </div>

          {/* Area */}
          <div className="col-xl-2 col-lg-2 col-md-3 col-6">
            <p className="fs-13 text-muted mb-1">Delivery Area</p>
            <p className="text-dark fw-medium mb-0 fs-14">{order.deliveryArea || "Addis Ababa"}</p>
          </div>

          {/* Date */}
          <div className="col-xl-2 col-lg-2 col-md-3 col-6">
            <p className="fs-13 text-muted mb-1">Date</p>
            <p className="text-dark fw-medium mb-0 fs-14">{formattedDate}</p>
          </div>

          {/* Total */}
          <div className="col-xl-2 col-lg-2 col-md-4 col-6">
            <p className="fs-13 text-muted mb-1">Total</p>
            <p className="text-primary fw-bold mb-0 fs-16">{formatCurrency(order.total)}</p>
          </div>

          {/* Status & Reorder */}
          <div className="col-xl-2 col-lg-2 col-md-8 col-6 d-flex align-items-center justify-content-between justify-content-lg-end gap-3">
            <span className="badge badge-sm badge-soft-success fw-medium text-capitalize fs-12">
              {order.status || "Pending"}
            </span>
            <ReorderButton orderId={order.orderId} />
          </div>
        </div>
      </div>
    </div>
  );
}