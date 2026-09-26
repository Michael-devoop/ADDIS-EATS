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

  return (
    <header className={`header sticky-top ${scrolled ? "header-scrolled" : ""}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg header-nav" aria-label="Main navigation">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand logo d-flex align-items-center">
              <img src="/images/addis-eats-logo.png" className="img-fluid brand-logo-img" alt="Addis Eats" />
            </Link>
            <div id="mobile_btn" onClick={() => setMobileOpen(!mobileOpen)}>
              <i className="icon-menu"></i>
            </div>
          </div>

          <div className={`menu-wrapper ${mobileOpen ? "menu-opened" : ""}`}>
            <div className="menu-overlay" onClick={() => setMobileOpen(false)}></div>
            <div className="main-menu-wrapper">
              <div>
                <div className="menu-header">
                  <Link to="/" className="menu-logo">
                    <img
                      src="/images/addis-eats-logo.png"
                      className="img-fluid logo"
                      alt="Addis Eats"
                      style={{ maxHeight: "42px", width: "auto", filter: "brightness(0) invert(1)" }}
                    />
                  </Link>
                  <div className="d-inline-flex align-items-center gap-2">
                    <Link to="/cart" className="topbar-link topbar-cart d-lg-flex">
                      <i className="icon-shopping-bag"></i>
                      {itemCount > 0 && <span className="badge-icon bg-primary">{itemCount}</span>}
                    </Link>
                    <Link to="/favorites" className="btn topbar-link" aria-label="wishlist">
                      <i className="icon-heart"></i>
                    </Link>
                    <div id="menu_close" className="menu-close topbar-link" onClick={() => setMobileOpen(false)}>
                      <i className="icon-x"></i>
                    </div>
                  </div>
                </div>

                <ul className="main-nav">
                  <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/menu" className={({ isActive }) => isActive ? "active" : ""}>
                      Menu
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="nav header-items">
            <Link to="/favorites" className="topbar-link topbar-cart">
              <i className="icon-heart"></i>
            </Link>
            <Link to="/cart" className="topbar-link topbar-cart">
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
