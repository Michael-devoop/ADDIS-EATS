import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getDishes } from "../api/dishes";
import { useFavoritesStore } from "./favoritesStore";
import DishCard from "../menu/DishCard";

export default function Favorites() {
  const { data: dishes, loading, error } = useFetch(getDishes);
  const favoriteIds = useFavoritesStore((s) => s.ids);
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);

  if (loading) {
    return (
      <>
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="breadcrumb-item">
              <h1 className="breadcrumb-title">Wishlist</h1>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="breadcrumb-item">
              <h1 className="breadcrumb-title">Wishlist</h1>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container text-center py-5">
            <h3>Something went wrong</h3>
            <p className="text-muted">{error}</p>
            <Link to="/menu" className="btn primary-btn mt-2">
              Back to Menu
            </Link>
          </div>
        </div>
      </>
    );
  }

  const favoriteDishes = dishes ? dishes.filter((d) => favoriteIds.includes(d.id)) : [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <h1 className="breadcrumb-title">Wishlist</h1>
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-items">
                  <Link to="/">
                    <i className="icon-house me-2"></i>Home
                  </Link>
                </li>
                <li className="breadcrumb-items">
                  <span><i className="icon-chevron-right"></i></span>
                </li>
                <li className="breadcrumb-items active" aria-current="page">
                  Wishlist
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="container">
          {favoriteDishes.length === 0 ? (
            <div className="text-center py-5">
              <div
                className="card box-shadow p-5"
                style={{ maxWidth: 500, margin: "0 auto" }}
              >
                <div className="mb-3">
                  <i
                    className="fa-regular fa-heart text-muted"
                    style={{ fontSize: 60 }}
                  ></i>
                </div>
                <h3 className="mb-2">Your Wishlist is Empty</h3>
                <p className="text-muted mb-4">
                  Tap the heart icon on any dish to save your favorite meals here for easy ordering.
                </p>
                <Link
                  to="/menu"
                  className="btn primary-btn justify-content-center"
                >
                  <i className="icon-arrow-left me-2"></i>Explore Menu
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="user-title d-flex align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
                <div>
                  <h2 className="mb-0 fs-28 fw-bold">My Wishlist</h2>
                  <span className="text-muted fs-14">
                    {favoriteDishes.length} {favoriteDishes.length === 1 ? "saved item" : "saved items"}
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <Link to="/menu" className="btn btn-outline-secondary">
                    <i className="icon-plus me-1"></i>Add More
                  </Link>
                  <button
                    type="button"
                    onClick={clearFavorites}
                    className="btn btn-light"
                  >
                    <i className="icon-trash-2 me-1"></i>Clear All
                  </button>
                </div>
              </div>

              <div className="row g-4" id="wishlist-list">
                {favoriteDishes.map((dish) => (
                  <div key={dish.id} className="col-xl-3 col-lg-4 col-md-6">
                    <DishCard dish={dish} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}