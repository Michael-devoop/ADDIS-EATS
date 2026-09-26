import { useCartStore } from "../cart/cartStore";
import { formatCurrency } from "../utils/formatCurrency";
import { getDeliveryEstimate } from "../utils/deliveryEstimate";

export default function OrderSummary({ area = "" }) {
  const items = useCartStore((s) => s.items);
  const itemsTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const { fee: deliveryFee } = getDeliveryEstimate(area);
  const tax = Math.round(itemsTotal * 0.15);
  const grandTotal = itemsTotal + deliveryFee + tax;

  return (
    <div className="card cart-item mb-0 box-shadow">
      <div className="card-body">
        <div className="card-header pb-3 mb-3 border-bottom">
          <h2 className="card-title mb-0 fs-24">Order Summary</h2>
        </div>

        {/* Item List */}
        <div className="checkout-items mb-3">
          {items.map((item) => (
            <div
              key={item.dishId}
              className="d-flex align-items-center justify-content-between py-2 border-bottom"
            >
              <div className="d-flex align-items-center gap-2">
                <div
                  className="avatar avatar-sm flex-shrink:0"
                  style={{ width: 40, height: 40, overflow: "hidden", borderRadius: "8px" }}
                >
                  <img
                    src={item.image || "/images/doro_wote.png"}
                    alt={item.name}
                    className="img-fluid"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "/images/doro_wote.png";
                    }}
                  />
                </div>
                <div>
                  <h6 className="mb-0 fs-14 text-dark fw-semibold">{item.name}</h6>
                  <small className="text-muted">Qty: {item.quantity}</small>
                </div>
              </div>
              <span className="fw-semibold text-primary fs-14">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Cost Breakdown */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted fs-15">Subtotal</span>
          <span className="fw-medium fs-15">{formatCurrency(itemsTotal)}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted fs-15">Delivery Fee ({area || "Standard"})</span>
          <span className="fw-medium fs-15">{formatCurrency(deliveryFee)}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <span className="text-muted fs-15">Tax (15% VAT)</span>
          <span className="fw-medium fs-15">{formatCurrency(tax)}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold fs-18">Total</h4>
          <h4 className="mb-0 fw-bold fs-20 text-primary">{formatCurrency(grandTotal)}</h4>
        </div>

        <button
          type="submit"
          form="checkout-form"
          className="primary-btn w-100 justify-content-center btn py-2"
        >
          <i className="icon-check me-2"></i>Place Order
        </button>
      </div>
    </div>
  );
}