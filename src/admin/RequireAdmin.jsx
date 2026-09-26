import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const isAdmin = sessionStorage.getItem("adminLoggedIn") === "true";

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
