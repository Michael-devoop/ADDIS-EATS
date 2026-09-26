import { memo } from "react";
import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="theme-toggle-icon">
        {isDark ? (
          // Sun icon for "switch to light"
          <i className="icon-sun"></i>
        ) : (
          // Moon icon for "switch to dark"
          <i className="icon-moon"></i>
        )}
      </span>
    </button>
  );
}

export default memo(ThemeToggle);
