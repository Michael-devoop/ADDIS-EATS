import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import FavoriteButton from "../favorites/FavoriteButton";
import { useCartStore } from "../cart/cartStore";

function DishCard({ dish }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/menu/${dish.id}`);
  }

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem(dish, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      className="menu-item-two w-100 mb-0 d-flex flex-column h-100"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        className="position-absolute"
        style={{ top: "12px", right: "12px", zIndex: 10 }}
        onClick={(e) => e.stopPropagation()}
      >
        <FavoriteButton dishId={dish.id} />
      </div>

      <div
        className="menu-img"
        onClick={(e) => e.stopPropagation()}
        style={{
          cursor: "default",
          aspectRatio: "4 / 3",
          overflow: "hidden",
        }}
      >
        <img
          src={dish.image}
          className="img-fluid"
          alt={dish.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = "/images/doro_wote.png";
          }}
        />
      </div>

      <div className="menu-content d-flex flex-column grow">
        <div className="menu-info mb-0 d-flex flex-column grow">
          <h3 className="custom-title">
            <Link to={`/menu/${dish.id}`} onClick={(e) => e.stopPropagation()}>
              {dish.name}
            </Link>
          </h3>
          <p className="grow">{dish.description}</p>
          <div className="d-flex align-items-center justify-content-between pt-2 mt-auto">
            <h4 className="custom-title fw-bold mb-0 text-primary">
              {formatCurrency(dish.price)}
            </h4>
            <button
              type="button"
              onClick={handleAddToCart}
              className={`btn ${added ? "btn-success" : "primary-btn"} btn-sm d-inline-flex align-items-center gap-1`}
              aria-label={`Add ${dish.name} to cart`}
              style={{
                borderRadius: "50px",
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <i className={added ? "icon-check" : "icon-shopping-bag"}></i>
              <span>{added ? "Added!" : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(DishCard);