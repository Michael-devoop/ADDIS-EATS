import { useState, useCallback } from "react";

const ADMIN_STORAGE_KEY = "adminLoggedIn";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const login = useCallback((email, password) => {
    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedPass = (password || "").trim();

    if (
      trimmedEmail === "admin@addiseats.com" &&
      (trimmedPass === "1234" || trimmedPass === "password123")
    ) {
      try {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      } catch (err) {
        console.error("Session storage error:", err);
      }
      setIsAuthenticated(true);
      return { success: true };
    }

    return {
      success: false,
      error: "Invalid email or password. Use admin@addiseats.com / 1234",
    };
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (err) {
      console.error("Session storage error:", err);
    }
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
  };
}
