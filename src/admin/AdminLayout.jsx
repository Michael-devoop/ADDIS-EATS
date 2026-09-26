import { useState, useMemo } from "react";
import { NavLink, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import "./admin.css";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const currentDateStr = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const headerMeta = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/admin/menu")) {
      return {
        title: "Menu Management",
        subtext: "View, add, edit and manage your restaurant menu items",
      };
    }
    if (path.includes("/admin/orders")) {
      return {
        title: "Order Management",
        subtext: "Track incoming customer orders, kitchen status, and delivery fulfilment",
      };
    }
    return {
      title: "Overview",
      subtext: "Manage your restaurant activities & live operations",
    };
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="admin-dashboard-container">
      {/* Mobile Backdrop */}
      <div
        className={`admin-sidebar-backdrop ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`} id="admin-sidebar">
        <Link to="/admin" className="admin-logo" onClick={() => setSidebarOpen(false)}>
          <i className="fa-solid fa-utensils"></i>
          <span>ADDIS EATS</span>
        </Link>

        <div className="admin-user-greeting">
          <h3>Good Morning, Admin!</h3>
          <p>{currentDateStr}</p>
        </div>

        <nav className="admin-nav-menu">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fa-solid fa-house"></i>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fa-solid fa-utensils"></i>
            <span>Menu Management</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fa-solid fa-clipboard-list"></i>
            <span>Order Management</span>
          </NavLink>

          <Link
            to="/"
            className="admin-nav-link"
            style={{ marginTop: "1rem", borderTop: "1px solid var(--admin-border-dark)", paddingTop: "1rem" }}
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Customer View</span>
          </Link>

          <button
            type="button"
            className="admin-nav-link logout-link"
            style={{ background: "transparent", border: "none", width: "100%", textAlign: "left", cursor: "pointer" }}
            onClick={handleLogout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Top Header */}
        <header className="admin-top-header">
          <div className="admin-header-title">
            <button
              type="button"
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Navigation"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div>
              <h1>{headerMeta.title}</h1>
              <p>{headerMeta.subtext}</p>
            </div>
          </div>

          <div className="admin-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search dishes or orders..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
            {globalSearch && (
              <i
                className="fa-solid fa-xmark"
                style={{ cursor: "pointer" }}
                onClick={() => setGlobalSearch("")}
              ></i>
            )}
          </div>

          <div className="admin-header-actions">
            <Link to="/" className="admin-store-btn" title="View customer storefront">
              <i className="fa-solid fa-store"></i>
              <span>Storefront</span>
            </Link>
            <div className="admin-user-avatar" title="Admin User">
              A
            </div>
          </div>
        </header>

        {/* Outlet for Dashboard, DishManager, OrderManager */}
        <Outlet context={{ globalSearch, setGlobalSearch }} />
      </main>
    </div>
  );
}
