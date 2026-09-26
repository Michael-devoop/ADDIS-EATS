export default function SearchBar({ value, onChange }) {
  return (
    <div className="input-group" style={{ maxWidth: 360 }}>
      <span className="input-group-text bg-white border-end-0">
        <i className="icon-search text-muted"></i>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search dishes..."
        className="form-control border-start-0 ps-0 shadow-none"
      />
      {value && (
        <button
          type="button"
          className="btn btn-outline-secondary border-start-0"
          onClick={() => onChange("")}
        >
          <i className="icon-x"></i>
        </button>
      )}
    </div>
  );
}