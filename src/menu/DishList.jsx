import DishCard from "./DishCard";
import EmptyState from "../ui/EmptyState";

export default function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <EmptyState message="No dishes match your search." />;
  }

  return (
    <div className="row g-4" id="menu-list">
      {dishes.map((dish) => (
        <div key={dish.id} className="col-xl-3 col-lg-4 col-md-6">
          <DishCard dish={dish} />
        </div>
      ))}
    </div>
  );
}