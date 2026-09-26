import { createContext, useState, useCallback, useMemo } from "react";

const MOCK_USER = {
  email: "admin@addiseats.com",
  password: "password123",
  name: "Michael",
};

const STORAGE_KEY = "addis_eats_user";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((email, password) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const userData = { email: MOCK_USER.email, name: MOCK_USER.name };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isSignedIn = !!user;

  const value = useMemo(
    () => ({ user, isSignedIn, login, logout }),
    [user, isSignedIn, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
