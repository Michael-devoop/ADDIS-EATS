import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";
import { formatCurrency } from "../utils/formatCurrency";
import QuantityControl from "./QuantityControl";

export default function CartLineItem({ item }) {
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center gap-3">
          <div
            className="avatar avatar-md flex-shrink:0"
            style={{ width: 52, height: 52, overflow: "hidden", borderRadius: "50%" }}
          >
            <img
              src={item.image || "/images/doro_wote.png"}
              alt={item.name}
              className="rounded-circle img-fluid"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "/images/doro_wote.png";
              }}
            />
          </div>
          <Link
            className="fw-semibold text-dark text-decoration-none"
            to={`/menu/${item.dishId}`}
          >
            {item.name}
          </Link>
        </div>
      </td>
      <td>
        <span className="mb-0 fs-16 fw-normal text-muted">{formatCurrency(item.price)}</span>
      </td>
      <td>
        <QuantityControl dishId={item.dishId} quantity={item.quantity} />
      </td>
      <td>
        <span className="mb-0 fw-semibold fs-16 text-primary">
          {formatCurrency(item.price * item.quantity)}
        </span>
      </td>
      <td className="text-end">
        <button
          type="button"
          onClick={() => removeItem(item.dishId)}
          className="btn-icon-md bg-soft-danger btn border-0 text-danger"
          aria-label="Delete item"
          title="Remove item"
        >
          <i className="icon-trash-2"></i>
        </button>
      </td>
    </tr>
  );
}