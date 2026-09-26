import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-md-4 col-12">
              <div className="footer-widget">
                <Link to="/" className="footer-logo">
                  <img
                    src="/images/addis-eats-logo.png"
                    alt="Addis Eats"
                    className="footer-logo-img"
                    style={{
                      maxHeight: "44px",
                      width: "auto",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </Link>
                <p className="mt-3 mb-4">
                  Ethiopian kitchens and neighborhood favorites, delivered across Addis Ababa.
                  From Doro Wat to fresh juices — taste the best of Ethiopia.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="footer-widget">
                <h3 className="footer-title">Quick Links</h3>
                <div className="footer-links">
                  <ul>
                    <li>
                      <Link to="/"><i className="icon-arrow-up-right"></i>Home</Link>
                    </li>
                    <li>
                      <Link to="/menu"><i className="icon-arrow-up-right"></i>Menu</Link>
                    </li>
                    <li>
                      <Link to="/cart"><i className="icon-arrow-up-right"></i>Cart</Link>
                    </li>
                    <li>
                      <Link to="/checkout"><i className="icon-arrow-up-right"></i>Checkout</Link>
                    </li>
                    <li>
                      <Link to="/favorites"><i className="icon-arrow-up-right"></i>Wishlist</Link>
                    </li>
                    <li>
                      <Link to="/orders"><i className="icon-arrow-up-right"></i>Orders</Link>
                    </li>
                    <li>
                      <Link to="/admin"><i className="icon-arrow-up-right"></i>Admin Dashboard</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-4 col-12">
              <div className="footer-widget">
                <h3 className="footer-title">Working Hours</h3>
                <div className="working-hours">
                  <p>MON - FRI <span>8:00 AM - 10:00 PM</span></p>
                  <p className="mb-0">SAT - SUN <span>9:00 AM – 11:00 PM</span></p>
                </div>
                <h3 className="footer-title">Follow Us</h3>
                <div className="social-icon">
                  <a href="#" aria-label="fb"><i className="icon-facebook"></i></a>
                  <a href="#" aria-label="twitter"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="#" aria-label="linkedin"><i className="icon-linkedin"></i></a>
                  <a href="#" aria-label="youtube"><i className="icon-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-contact">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-3 col-sm-6">
              <div className="contact-title">
                <h4>Get In Touch With Us</h4>
                <p>We're here to help you</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="icon-headset"></i>
                </div>
                <div className="contact-detail">
                  <p>Customer Support</p>
                  <h5><a href="tel:+251911234567">+251 911 234 567</a></h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="icon-mail"></i>
                </div>
                <div className="contact-detail">
                  <p>Email Address</p>
                  <h5><a href="mailto:info@addiseats.com">info@addiseats.com</a></h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="icon-map-pin"></i>
                </div>
                <div className="contact-detail">
                  <p>Location</p>
                  <h5>Bole Road, Addis Ababa, Ethiopia</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">Copyright &copy; 2026 <Link to="/">Addis Eats</Link>. All rights reserved.</p>
      </div>
    </footer>
  );
}
