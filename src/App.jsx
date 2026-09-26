import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ThemeProvider } from "./theme/ThemeContext";
import Layout from "./layout/Layout";
import RequireAuth from "./auth/RequireAuth";
import ErrorBoundary from "./ui/ErrorBoundary";

import Home from "./home/Home";
import Menu from "./menu/Menu";
import Dish from "./dish/Dish";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import Favorites from "./favorites/Favorites";
import OrderHistory from "./orders/OrderHistory";
import Login from "./auth/Login";

// Admin Imports
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import DishManager from "./admin/DishManager";
import OrderManager from "./admin/OrderManager";
import RequireAdmin from "./admin/RequireAdmin";

function NotFound() {
  return (
    <div className="content">
      <div className="container text-center py-5">
        <i className="icon-alert-circle" style={{ fontSize: 64, color: "#ccc" }}></i>
        <h2 className="mt-3">404 — Page Not Found</h2>
        <p className="text-muted">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            {/* Admin Portal */}
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="admin-dashboard" element={<Navigate to="/admin" replace />} />

            <Route
              path="admin"
              element={
                <RequireAdmin>
                  <ErrorBoundary>
                    <AdminLayout />
                  </ErrorBoundary>
                </RequireAdmin>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="menu" element={<DishManager />} />
              <Route path="orders" element={<OrderManager />} />
            </Route>

            {/* Customer Storefront */}
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                }
              />
              <Route
                path="menu"
                element={
                  <ErrorBoundary>
                    <Menu />
                  </ErrorBoundary>
                }
              />
              <Route
                path="menu/:id"
                element={
                  <ErrorBoundary>
                    <Dish />
                  </ErrorBoundary>
                }
              />
              <Route
                path="cart"
                element={
                  <ErrorBoundary>
                    <Cart />
                  </ErrorBoundary>
                }
              />
              <Route path="login" element={<Login />} />

              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <ErrorBoundary>
                      <Checkout />
                    </ErrorBoundary>
                  </RequireAuth>
                }
              />

              <Route
                path="favorites"
                element={
                  <ErrorBoundary>
                    <Favorites />
                  </ErrorBoundary>
                }
              />

              <Route
                path="orders"
                element={
                  <RequireAuth>
                    <ErrorBoundary>
                      <OrderHistory />
                    </ErrorBoundary>
                  </RequireAuth>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}