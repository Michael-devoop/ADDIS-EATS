import { useFetch } from "../hooks/useFetch";
import { getDishes } from "../api/dishes";
import DishCard from "../menu/DishCard";

export default function SpecialsList() {
  const { data: dishes, loading, error } = useFetch(getDishes);

  if (loading) {
    return (
      <div className="row g-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-xl-3 col-lg-4 col-md-6">
            <div className="card placeholder-glow" style={{ height: 320 }}>
              <div className="card-body">
                <span className="placeholder col-12" style={{ height: 180 }}></span>
                <span className="placeholder col-8 mt-3"></span>
                <span className="placeholder col-6 mt-2"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return null;

  const specials = dishes.slice(0, 8);

  return (
    <div className="row g-4">
      {specials.map((dish) => (
        <div key={dish.id} className="col-xl-3 col-lg-4 col-md-6">
          <DishCard dish={dish} />
        </div>
      ))}
    </div>
  );
}