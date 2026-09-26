import { Link } from "react-router-dom";
import SpecialsList from "./SpecialsList";

const categories = [
  {
    name: "Ethiopian",
    image: "/images/doro_wote.png",
    slug: "ethiopian",
    subtitle: "Doro Wat, Kitfo & Spicy Tibs",
    tag: "Authentic",
    color: "#EB1400",
    glowColor: "rgba(235, 20, 0, 0.22)",
    iconBadge: "🇪🇹",
  },
  {
    name: "Pizza",
    image: "/images/cat-p.png",
    slug: "pizza",
    subtitle: "Wood-Fired & Cheesy",
    tag: "Popular",
    color: "#FF8400",
    glowColor: "rgba(255, 132, 0, 0.22)",
    iconBadge: "🍕",
  },
  {
    name: "Burgers",
    image: "/images/cat-bur.png",
    slug: "burgers",
    subtitle: "Juicy Gourmet Patties",
    tag: "Craving",
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.22)",
    iconBadge: "🍔",
  },
  {
    name: "Drinks",
    image: "/images/catd.png",
    slug: "drinks",
    subtitle: "Fresh Juices & Spiced Tea",
    tag: "Chilled",
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.22)",
    iconBadge: "🍹",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero / Banner */}
      <section className="banner-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner-content" data-wow-delay="0.3s">
                <h1>
                  From Quick Bites to <br />Adiss Eats
                </h1>
                <p className="mb-4">
                  Experience authentic Ethiopian cuisine made from hand-picked ingredients,
                  delivered fresh across Addis Ababa. Doro Wat, Kitfo, Tibs and more!
                </p>
                <div className="banner-btn d-flex align-items-center gap-3">
                  <Link to="/menu" className="btn primary-btn">
                    <i className="icon-utensils me-2"></i>View Menu
                  </Link>
                  <Link to="/orders" className="btn dark-btn">
                    <i className="icon-truck me-2"></i>Track Order
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <div className="hero-platter-wrapper">
                {/* Floating Rating Badge */}
                <div className="hero-badge-floating hero-badge-top">
                  <span style={{ fontSize: "20px" }}>⭐</span>
                  <div className="text-start">
                    <div className="fw-bold" style={{ fontSize: "13px", lineHeight: "1.2" }}>
                      4.9 Rating
                    </div>
                    <small className="text-muted" style={{ fontSize: "11px" }}>
                      1,200+ Foodies
                    </small>
                  </div>
                </div>

                {/* Hero Platter Image */}
                <img
                  src="/images/hero-platter.png"
                  alt="Authentic Ethiopian Platter - Addis Eats"
                  className="hero-platter-img"
                  onError={(e) => {
                    e.target.src = "/images/main-hero.png";
                  }}
                />

                {/* Floating Fast Delivery Badge */}
                <div className="hero-badge-floating hero-badge-bottom">
                  <span style={{ fontSize: "20px" }}>⚡</span>
                  <div className="text-start">
                    <div className="fw-bold" style={{ fontSize: "13px", lineHeight: "1.2" }}>
                      Fast Delivery
                    </div>
                    <small className="text-muted" style={{ fontSize: "11px" }}>
                      Hot to Your Door
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section modern-categories-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="modern-section-pill">
              <span className="pill-dot"></span>
              Fresh &amp; Handcrafted Daily
            </span>
            <h2 className="modern-section-title">Top Categories</h2>
            <p className="modern-section-subtitle">
              Explore our hand-crafted menu featuring traditional Ethiopian specialties, artisan
              pizzas, gourmet burgers, and refreshing drinks.
            </p>
          </div>

          <div className="modern-categories-grid">
            {categories.map((cat) => (
              <div key={cat.slug} className="modern-cat-col">
                <Link
                  to={`/menu?category=${cat.slug}`}
                  className="modern-category-card"
                  style={{
                    "--cat-color": cat.color,
                    "--cat-glow": cat.glowColor,
                  }}
                >
                  <div className="modern-cat-badge">
                    <span className="modern-cat-icon">{cat.iconBadge}</span>
                    <span className="modern-cat-tag">{cat.tag}</span>
                  </div>

                  <div className="modern-cat-dish-stage">
                    <div className="modern-cat-glow-ring"></div>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="modern-cat-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/images/doro_wote.png";
                      }}
                    />
                  </div>

                  <div className="modern-cat-body">
                    <h3 className="modern-cat-name">{cat.name}</h3>
                    <p className="modern-cat-sub">{cat.subtitle}</p>
                  </div>

                  <div className="modern-cat-footer">
                    <span className="modern-cat-link-text">Explore</span>
                    <span className="modern-cat-arrow-btn" aria-hidden="true">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="section signature-section">
        <div className="container">
          <div className="section-header d-flex align-items-end justify-content-between">
            <div>
              <h2>Our Signature Dishes</h2>
              <p>Handcrafted specialties made with authentic Ethiopian recipes.</p>
            </div>
            <Link to="/menu" className="btn primary-btn d-none d-sm-inline-flex">
              View All <i className="icon-arrow-right ms-2"></i>
            </Link>
          </div>
          <SpecialsList />
        </div>
      </section>
    </>
  );
}