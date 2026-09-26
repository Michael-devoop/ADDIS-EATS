import { getDeliveryEstimate } from "../utils/deliveryEstimate";
import { formatCurrency } from "../utils/formatCurrency";

export default function DeliveryEstimate({ area }) {
  if (!area || !area.trim()) return null;

  const { fee, etaMinutes } = getDeliveryEstimate(area);

  return (
    <div className="alert alert-info py-2 px-3 d-flex align-items-center gap-2 mb-3">
      <i className="icon-clock fs-18"></i>
      <span className="fs-14">
        Estimated Delivery: <strong>~{etaMinutes} mins</strong> · Fee: <strong>{formatCurrency(fee)}</strong>
      </span>
    </div>
  );
}