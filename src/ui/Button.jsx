import { forwardRef } from "react";

const VARIANT_MAP = {
  primary: "btn-primary",
  secondary: "btn-outline-secondary",
  danger: "btn-danger",
  outline: "btn-outline-primary",
  dark: "dark-btn",
};

const SIZE_MAP = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    icon,
    loading = false,
    block = false,
    children,
    className = "",
    disabled = false,
    type = "button",
    ...rest
  },
  ref
) {
  const classes = [
    "btn",
    VARIANT_MAP[variant] || VARIANT_MAP.primary,
    SIZE_MAP[size] || "",
    block ? "w-100" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          {children}
        </>
      ) : (
        <>
          {icon && <i className={`${icon} me-2`}></i>}
          {children}
        </>
      )}
    </button>
  );
});

export default Button;
