export default function Spinner({ size = 32, color = "text-danger", className = "" }) {
  return (
    <div
      className={`spinner-border ${color} ${className}`}
      role="status"
      style={{ width: size, height: size }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
