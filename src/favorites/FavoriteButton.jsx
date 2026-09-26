import { useFavoritesStore } from "./favoritesStore";

export default function FavoriteButton({ dishId }) {
  const isFav = useFavoritesStore((s) => s.ids.includes(dishId));
  const toggle = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(dishId);
      }}
      className={`favourite btn-icon ${isFav ? "active" : ""}`}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
        border: "1px solid #eee",
        cursor: "pointer",
      }}
    >
      <i className={`fa-heart ${isFav ? "fa-solid text-danger" : "fa-regular"}`}></i>
    </button>
  );
}