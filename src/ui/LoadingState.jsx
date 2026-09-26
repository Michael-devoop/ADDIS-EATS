export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="content">
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border text-danger mb-3" role="status" style={{ width: 48, height: 48 }}>
            <span className="visually-hidden">{label}</span>
          </div>
          <p className="text-muted fw-medium mb-0">{label}</p>
        </div>
      </div>
    </div>
  );
}