import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useCartStore } from "../cart/cartStore";
import FavoriteButton from "../favorites/FavoriteButton";

export default function DishDetail({ dish }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  
  

  function handleAddToCart() {
    addItem(dish, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleOrderNow() {
    addItem(dish, quantity);
    navigate("/cart");
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <h1 className="breadcrumb-title">Dish Details</h1>
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-items">
                  <Link to="/">
                    <i className="icon-house me-2"></i>Home
                  </Link>
                </li>
                <li className="breadcrumb-items">
                  <span>
                    <i className="icon-chevron-right"></i>
                  </span>
                </li>
                <li className="breadcrumb-items">
                  <Link to="/menu">Menu</Link>
                </li>
                <li className="breadcrumb-items">
                  <span>
                    <i className="icon-chevron-right"></i>
                  </span>
                </li>
                <li className="breadcrumb-items active" aria-current="page">
                  {dish.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="container">
          <div className="row mb-5 g-4">
            {/* Image Column */}
            <div className="col-lg-6">
              <div className="product-wrap">
                <div className="details-img position-relative text-center p-3 bg-white rounded-3 box-shadow">
                  <img
                    src={dish.image}
                    className="img-fluid rounded"
                    alt={dish.name}
                    style={{ maxHeight: 440, width: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "/assets/img/food/food-01.jpg";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="col-lg-6">
              <div className="shop-details">
                <span className="badge badge-soft-orange text-capitalize mb-2">
                  {dish.category || "Ethiopian"}
                </span>

                <div className="shop-details-title cart-item">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h2 className="title mb-0">{dish.name}</h2>
                    <FavoriteButton dishId={dish.id} />
                  </div>

                  <div className="review-star mb-3">
                    <div className="rating">
                      <i className="fas fa-star text-warning"></i>
                      <i className="fas fa-star text-warning"></i>
                      <i className="fas fa-star text-warning"></i>
                      <i className="fas fa-star text-warning"></i>
                      <i className="fas fa-star text-warning"></i>
                    </div>
                    <span>5.0 (Fresh &amp; Authentic)</span>
                  </div>

                  <div className="price-stock mb-3">
                    <h3 className="mb-0 text-primary fw-bold">{formatCurrency(dish.price)}</h3>
                    <span className="badge badge-soft-success">In Stock</span>
                  </div>

                  <p className="mb-4 text-muted" style={{ lineHeight: 1.7 }}>
                    {dish.description}
                  </p>

                  <div className="d-flex align-items-center gap-3 mb-4">
                    <p className="mb-0 fw-semibold">Quantity :</p>
                    <div className="quantity-control py-1 bg-light rounded d-inline-flex align-items-center border">
                      <button
                        type="button"
                        className="minus-btn btn border-0 bg-transparent"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label="decrement"
                      >
                        <i className="icon-minus"></i>
                      </button>
                      <input
                        type="text"
                        className="quantity-input border-0 bg-transparent text-center fw-bold"
                        style={{ width: 45 }}
                        value={quantity}
                        readOnly
                        aria-label="Quantity"
                      />
                      <button
                        type="button"
                        className="add-btn btn border-0 bg-transparent"
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label="increment"
                      >
                        <i className="icon-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="order-button d-flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleOrderNow}
                      className="primary-btn btn"
                    >
                      <i className="icon-shopping-bag me-2"></i>Order Now
                    </button>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="dark-btn btn"
                    >
                      <i className={`me-2 ${added ? "icon-check" : "icon-shopping-cart"}`}></i>
                      {added ? "Added to Cart!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Ingredients Tab */}
          <div className="card box-shadow">
            <div className="card-body">
              <div className="restaurant-tab custom-tab mb-4">
                <ul className="nav nav-tabs border-0" role="tablist">
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${activeTab === "desc" ? "active" : ""}`}
                      onClick={() => setActiveTab("desc")}
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${activeTab === "ing" ? "active" : ""}`}
                      onClick={() => setActiveTab("ing")}
                    >
                      Ingredients &amp; Info
                    </button>
                  </li>
                </ul>
              </div>

              <div className="tab-content">
                {activeTab === "desc" ? (
                  <div>
                    <p className="mb-3">{dish.description}</p>
                    <p className="text-muted mb-0">
                      Prepared with fresh, authentic ingredients sourced directly from Addis
                      Ababa markets. Crafted with care to ensure the finest culinary quality and
                      flavor in every bite.
                    </p>
                  </div>
                ) : (
                  <div>
                    {dish.ingredients && dish.ingredients.length > 0 ? (
                      <div>
                        <h6 className="fw-bold mb-3">Included Ingredients:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {dish.ingredients.map((ing) => (
                            <span key={ing} className="badge bg-light text-dark p-2 fs-14 border">
                              <i className="icon-check me-1 text-success"></i>
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted">Standard fresh restaurant ingredients used.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}