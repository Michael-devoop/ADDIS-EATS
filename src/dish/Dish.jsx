import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getDishes } from "../api/dishes";
import DishDetail from "./DishDetail";

export default function Dish() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch(getDishes);

  if (loading) {
    return (
      <>
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="breadcrumb-item">
              <h1 className="breadcrumb-title">Dish Details</h1>
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

  const dish = dishes?.find((d) => d.id === id);

  if (error || !dish) {
    return (
      <>
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="breadcrumb-item">
              <h1 className="breadcrumb-title">Dish Details</h1>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container text-center py-5">
            <h3>{error ? "Something went wrong" : "Dish not found"}</h3>
            <p className="text-muted">{error || "We couldn't find that dish."}</p>
            <Link to="/menu" className="btn primary-btn mt-3">
              Back to Menu
            </Link>
          </div>
        </div>
      </>
    );
  }

  return <DishDetail dish={dish} />;
}