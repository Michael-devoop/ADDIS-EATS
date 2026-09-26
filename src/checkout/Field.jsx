export default function Field({
  label,
  name,
  value,
  onChange,
  error,
  as = "input",
  placeholder,
  ...rest
}) {
  const Tag = as;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-medium text-dark">
        {label}
      </label>
      <Tag
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        placeholder={placeholder}
        className={`form-control ${error ? "is-invalid" : ""}`}
        rows={as === "textarea" ? 3 : undefined}
        {...rest}
      />
      {error && (
        <div id={`${name}-error`} className="invalid-feedback d-block mt-1" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}