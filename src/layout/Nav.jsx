import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";
import { useAuth } from "../auth/useAuth";
import { useEffect, useState, useRef, memo } from "react";
import ThemeToggle from "../theme/ThemeToggle";

const selectItemCount = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore(selectItemCount);
  const { isSignedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);


  useEffect(() => {
    if (!profileOpen) return;
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);


  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Lock body scroll and sync menu-opened class when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-opened");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-opened");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-opened");
    };
  }, [mobileOpen]);

  return (
    <header className={`header sticky-top ${scrolled ? "header-scrolled" : ""}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg header-nav" aria-label="Main navigation">
          <div className="navbar-header d-flex align-items-center justify-content-between w-100">
            <Link to="/" className="navbar-brand logo d-flex align-items-center">
              <img src="/images/addis-eats-logo.png" className="img-fluid brand-logo-img" alt="Addis Eats" />
            </Link>

            {/* Mobile Header Quick Actions */}
            <div className="mobile-header-actions">
              <Link to="/cart" className="topbar-link topbar-cart" aria-label="Cart">
                <i className="icon-shopping-bag"></i>
                {itemCount > 0 && <span className="badge-icon bg-primary">{itemCount}</span>}
              </Link>
              <ThemeToggle />
              <button
                type="button"
                id="mobile_btn"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
              >
                <i className={mobileOpen ? "icon-x" : "icon-menu"}></i>
              </button>
            </div>
          </div>

          {/* Mobile Drawer Wrapper & Overlay */}
          <div className={`menu-wrapper ${mobileOpen ? "menu-opened" : ""}`}>
            <div className="menu-overlay" onClick={() => setMobileOpen(false)}></div>
            <div className="main-menu-wrapper">
              <div className="drawer-inner d-flex flex-column h-100">
                <div className="menu-header">
                  <Link to="/" className="menu-logo" onClick={() => setMobileOpen(false)}>
                    <img
                      src="/images/addis-eats-logo.png"
                      className="img-fluid brand-logo-img"
                      alt="Addis Eats"
                    />
                  </Link>
                  <button
                    type="button"
                    id="menu_close"
                    className="menu-close"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <i className="icon-x"></i>
                  </button>
                </div>

                <ul className="main-nav">
                  <li>
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => setMobileOpen(false)}
                    >
                      <i className="icon-house me-2 d-lg-none"></i>
                      <span>Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/menu"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => setMobileOpen(false)}
                    >
                      <i className="icon-utensils me-2 d-lg-none"></i>
                      <span>Menu</span>
                    </NavLink>
                  </li>
                  <li className="d-lg-none">
                    <NavLink
                      to="/favorites"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => setMobileOpen(false)}
                    >
                      <i className="icon-heart me-2"></i>
                      <span>Favorites</span>
                    </NavLink>
                  </li>
                  <li className="d-lg-none">
                    <NavLink
                      to="/cart"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => setMobileOpen(false)}
                    >
                      <i className="icon-shopping-bag me-2"></i>
                      <span>Cart</span>
                      {itemCount > 0 && (
                        <span className="badge-icon bg-primary ms-auto">{itemCount}</span>
                      )}
                    </NavLink>
                  </li>
                  {isSignedIn && (
                    <>
                      <li className="d-lg-none">
                        <NavLink
                          to="/orders"
                          className={({ isActive }) => (isActive ? "active" : "")}
                          onClick={() => setMobileOpen(false)}
                        >
                          <i className="icon-clock me-2"></i>
                          <span>Order History</span>
                        </NavLink>
                      </li>
                      <li className="d-lg-none">
                        <NavLink
                          to="/admin"
                          className={({ isActive }) => (isActive ? "active" : "")}
                          onClick={() => setMobileOpen(false)}
                        >
                          <i className="icon-shield me-2"></i>
                          <span>Admin Dashboard</span>
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>

                {/* Mobile Drawer Auth Footer */}
                <div className="drawer-footer d-lg-none mt-auto">
                  {isSignedIn ? (
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white fw-bold flex-shrink-0"
                          style={{ width: 38, height: 38, fontSize: 16 }}
                        >
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="overflow-hidden">
                          <strong className="d-block text-truncate fs-14">{user?.name}</strong>
                          <small className="text-muted d-block text-truncate fs-12">{user?.email}</small>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 mt-2"
                        onClick={() => {
                          setMobileOpen(false);
                          logout();
                          navigate("/");
                        }}
                      >
                        <i className="icon-log-out"></i>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn-primary primary-btn w-100 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <i className="icon-log-in"></i>
                      <span>Sign In</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Right Nav Items */}
          <div className="nav header-items">
            <Link to="/favorites" className="topbar-link topbar-cart" aria-label="Favorites">
              <i className="icon-heart"></i>
            </Link>
            <Link to="/cart" className="topbar-link topbar-cart" aria-label="Cart">
              <i className="icon-shopping-bag"></i>
              {itemCount > 0 && <span className="badge-icon bg-primary">{itemCount}</span>}
            </Link>
            <ThemeToggle />

            {isSignedIn ? (
              <div className="dropdown" ref={profileRef}>
                <button
                  type="button"
                  className="topbar-link topbar-cart border-0 bg-transparent"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="Profile menu"
                  aria-expanded={profileOpen}
                >
                  <i className="icon-user"></i>
                </button>
                {profileOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show"
                    style={{ position: "absolute", right: 0, top: "100%", minWidth: 200 }}
                  >
                    <li className="px-3 py-2 border-bottom">
                      <strong className="d-block">{user?.name}</strong>
                      <small className="text-muted">{user?.email}</small>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        <i className="icon-user me-2"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        <i className="icon-clock me-2"></i>Order History
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        <i className="icon-shield me-2"></i>Admin Dashboard
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item text-danger"
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                          navigate("/");
                        }}
                      >
                        <i className="icon-log-out me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary reserve-btn">
                <i className="icon-log-in me-2"></i><span>Sign In</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default memo(Nav);
