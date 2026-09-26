import { useNavigate } from "react-router-dom";
import { useOrderHistoryStore } from "./orderHistoryStore";

export default function ReorderButton({ orderId }) {
  const reorder = useOrderHistoryStore((s) => s.reorder);
  const navigate = useNavigate();

  function handleReorder() {
    reorder(orderId);
    navigate("/cart");
  }

  return (
    <button
      type="button"
      onClick={handleReorder}
      className="btn primary-btn btn-sm d-inline-flex align-items-center"
    >
      <i className="icon-rotate-cw me-1"></i>Reorder
    </button>
  );
}