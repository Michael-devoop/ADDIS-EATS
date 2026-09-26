import { useEffect, useRef } from "react";

/**
 * Reusable Modal using Bootstrap's modal styling.
 *
 * Props:
 *  - isOpen: boolean — controls visibility
 *  - onClose: function — called when modal should close
 *  - title: string — modal header title
 *  - size: "sm" | "md" | "lg" | "xl" (default "md")
 *  - children: modal body content
 *  - footer: optional footer content (buttons, etc.)
 */
const SIZE_MAP = {
  sm: "modal-sm",
  md: "",
  lg: "modal-lg",
  xl: "modal-xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  footer,
}) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>

      {/* Modal */}
      <div
        ref={overlayRef}
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={handleOverlayClick}
        style={{ zIndex: 1055 }}
      >
        <div className={`modal-dialog modal-dialog-centered ${SIZE_MAP[size] || ""}`}>
          <div className="modal-content">
            {/* Header */}
            {title && (
              <div className="modal-header">
                <h5 className="modal-title" id="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>
            )}

            {/* Body */}
            <div className="modal-body">{children}</div>

            {/* Footer */}
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
