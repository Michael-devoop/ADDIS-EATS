import { useCartStore } from "./cartStore";

export default function QuantityControl({ dishId, quantity }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  return (
    <div className="quantity-control bg-light rounded d-inline-flex align-items-center border">
      <button
        type="button"
        className="minus-btn btn border-0 bg-transparent"
        onClick={() => updateQuantity(dishId, quantity - 1)}
        aria-label="Decrease quantity"
      >
        <i className="icon-minus"></i>
      </button>
      <input
        type="text"
        className="quantity-input border-0 bg-transparent text-center fw-bold"
        style={{ width: 40 }}
        value={quantity}
        readOnly
        aria-label="Quantity"
      />
      <button
        type="button"
        className="add-btn btn border-0 bg-transparent"
        onClick={() => updateQuantity(dishId, quantity + 1)}
        aria-label="Increase quantity"
      >
        <i className="icon-plus"></i>
      </button>
    </div>
  );
}