import { forwardRef, useState } from "react";

/**
 * Reusable form input with label, icon, error message, and password toggle.
 *
 * Props:
 *  - label, id, type, placeholder, value, onChange, error, icon, required, disabled, className
 *  - For type="password", a show/hide toggle is automatically rendered.
 */
const Input = forwardRef(function Input(
  {
    label,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    icon,
    required = false,
    disabled = false,
    className = "",
    ...rest
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-") || "field"}`;

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label fw-semibold">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <div className="input-group">
        {icon && (
          <span className="input-group-text bg-light border-end-0">
            <i className={`${icon} text-muted`}></i>
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={inputType}
          className={`form-control ${icon ? "border-start-0 ps-0" : ""} ${
            isPassword ? "border-end-0" : ""
          } ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            className="input-group-text bg-light border-start-0"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            <i className={`${showPassword ? "icon-eye-off" : "icon-eye"} text-muted`}></i>
          </button>
        )}
      </div>

      {error && (
        <div id={`${inputId}-error`} className="invalid-feedback d-block mt-1">
          <i className="icon-alert-circle me-1" style={{ fontSize: 12 }}></i>
          {error}
        </div>
      )}
    </div>
  );
});

export default Input;
