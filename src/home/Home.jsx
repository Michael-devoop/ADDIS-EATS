import { Link } from "react-router-dom";
import SpecialsList from "./SpecialsList";

const categories = [
  { name: "Ethiopian", image: "/images/doro_wote.png", slug: "ethiopian" },
  { name: "Pizza", image: "/images/cat-p.png", slug: "pizza" },
  { name: "Burgers", image: "/images/cat-bur.png", slug: "burgers" },
  { name: "Drinks", image: "/images/catd.png", slug: "drinks" },
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
      <section className="section choose-us-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Top Categories</h2>
            <p>
              Explore our carefully curated categories featuring fresh ingredients and signature
              flavors.
            </p>
          </div>
          <div className="row g-4">
            {categories.map((cat) => (
              <div key={cat.slug} className="col-lg-3 col-md-6 col-sm-6">
                <Link to={`/menu?category=${cat.slug}`} className="text-decoration-none">
                  <div className="choose-item text-center">
                    <div className="choose-img mb-3">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="img-fluid rounded-circle"
                        style={{ width: 120, height: 120, objectFit: "cover" }}
                      />
                    </div>
                    <h3>{cat.name}</h3>
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