import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";
import { formatCurrency } from "../utils/formatCurrency";

export default function CartTotal() {
  const items = useCartStore((s) => s.items);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const tax = Math.round((subtotal - discount) * 0.15);
  const total = subtotal - discount + deliveryFee + tax;

  function handleApplyPromo(e) {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "ADDIS10") {
      setDiscountPercent(10);
      setPromoMessage("Coupon ADDIS10 applied! 10% off.");
    } else if (code === "WELCOME") {
      setDiscountPercent(15);
      setPromoMessage("Welcome coupon applied! 15% off.");
    } else if (!code) {
      setPromoMessage("");
      setDiscountPercent(0);
    } else {
      setPromoMessage("Invalid coupon. Try ADDIS10 or WELCOME.");
      setDiscountPercent(0);
    }
  }

  return (
    <div className="card cart-item mb-0 box-shadow">
      <div className="card-body">
        <div className="card-header pb-3 mb-3 border-bottom">
          <h2 className="card-title mb-0 fs-24">Order Summary</h2>
        </div>

        <form onSubmit={handleApplyPromo} className="apply-coupon mb-3">
          <div className="coupon-input d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button type="submit" className="btn dark-btn">
              Apply
            </button>
          </div>
          {promoMessage && (
            <small
              className={`mt-1 d-block ${
                discountPercent > 0 ? "text-success" : "text-danger"
              }`}
            >
              {promoMessage}
            </small>
          )}
        </form>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0 fw-medium fs-16">Subtotal</p>
          <p className="mb-0 fw-medium fs-16">{formatCurrency(subtotal)}</p>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0 fs-16 text-muted">Delivery Fee</p>
          <p className="mb-0 fs-16">{formatCurrency(deliveryFee)}</p>
        </div>

        {discount > 0 && (
          <div className="d-flex justify-content-between align-items-center mb-3 text-success">
            <p className="mb-0 fs-16">Discount ({discountPercent}%)</p>
            <p className="mb-0 fs-16">-{formatCurrency(discount)}</p>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
          <p className="mb-0 fs-16 text-muted">Tax (15% VAT)</p>
          <p className="mb-0 fs-16">{formatCurrency(tax)}</p>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0 fs-20 fw-bold">Total</h3>
          <h3 className="mb-0 fs-20 fw-bold text-primary">{formatCurrency(total)}</h3>
        </div>

        <div>
          <Link
            to="/checkout"
            className="primary-btn w-100 justify-content-center btn"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}