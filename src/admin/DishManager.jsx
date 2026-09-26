import { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { getDishes, saveDishesLocally, resetDishesToDefault } from "../api/dishes";
import DishForm from "./DishForm";

export default function DishManager() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const { globalSearch } = useOutletContext() || {};

  useEffect(() => {
    let mounted = true;
    getDishes()
      .then((data) => {
        if (mounted) {
          setDishes(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading dishes:", err);
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Compute category counts
  const stats = useMemo(() => {
    const total = dishes.length;
    const available = dishes.filter((d) => d.available !== false).length;
    const outOfStock = dishes.filter((d) => d.available === false).length;
    const categoriesCount = new Set(dishes.map((d) => d.category)).size;

    const ethCount = dishes.filter((d) => d.category === "ethiopian").length;
    const pizCount = dishes.filter((d) => d.category === "pizza").length;
    const burCount = dishes.filter((d) => d.category === "burgers").length;
    const driCount = dishes.filter((d) => d.category === "drinks").length;

    return {
      total,
      available,
      outOfStock,
      categoriesCount,
      ethCount,
      pizCount,
      burCount,
      driCount,
    };
  }, [dishes]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return dishes.filter((item) => {
      const matchCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = (globalSearch || "").trim().toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [dishes, selectedCategory, globalSearch]);

  // Toggle availability
  function handleToggleAvailability(dishId) {
    const updated = dishes.map((d) => {
      if (d.id === dishId) {
        return { ...d, available: d.available === false ? true : false };
      }
      return d;
    });
    setDishes(updated);
    saveDishesLocally(updated);
  }

  // Delete dish
  function handleDeleteDish(dishId, dishName) {
    if (window.confirm(`Are you sure you want to delete "${dishName}"?`)) {
      const updated = dishes.filter((d) => d.id !== dishId);
      setDishes(updated);
      saveDishesLocally(updated);
    }
  }

  // Save (add or edit) dish
  function handleSaveDish(dishData) {
    let updated;
    const exists = dishes.some((d) => d.id === dishData.id);
    if (exists) {
      updated = dishes.map((d) => (d.id === dishData.id ? dishData : d));
    } else {
      updated = [dishData, ...dishes];
    }
    setDishes(updated);
    saveDishesLocally(updated);
  }

  // Reset to default menu
  async function handleResetDefaults() {
    if (
      window.confirm(
        "Reset menu to default items? Any custom added dishes will be restored to template defaults."
      )
    ) {
      setLoading(true);
      try {
        const defaults = await resetDishesToDefault();
        setDishes(defaults);
      } catch (e) {
        console.error("Failed to reset dishes:", e);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="admin-menu-management-section">
      {/* Action Header */}
      <div className="admin-section-header-row">
        <div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "800", margin: 0 }}>
            Restaurant Menu Catalogue
          </h2>
          <small className="text-muted">
            Configure menu dishes, prices, availability, and categories
          </small>
        </div>
        <div className="admin-header-btn-group">
          <button
            type="button"
            className="admin-primary-btn"
            onClick={() => {
              setEditingDish(null);
              setFormOpen(true);
            }}
          >
            <i className="fa-solid fa-plus"></i> Add New Dish
          </button>
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={handleResetDefaults}
            title="Reset to default menu items"
          >
            <i className="fa-solid fa-rotate-left"></i> Reset Defaults
          </button>
        </div>
      </div>

      {/* Mini Stat Cards */}
      <div className="admin-stats-summary-row">
        <div className="admin-mini-stat-card">
          <div className="admin-mini-stat-icon orange">
            <i className="fa-solid fa-bowl-food"></i>
          </div>
          <div className="admin-mini-stat-info">
            <p>Total Dishes</p>
            <h3>{stats.total}</h3>
          </div>
        </div>

        <div className="admin-mini-stat-card">
          <div className="admin-mini-stat-icon green">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="admin-mini-stat-info">
            <p>Available / Active</p>
            <h3>{stats.available}</h3>
          </div>
        </div>

        <div className="admin-mini-stat-card">
          <div className="admin-mini-stat-icon red">
            <i className="fa-solid fa-circle-xmark"></i>
          </div>
          <div className="admin-mini-stat-info">
            <p>Out of Stock</p>
            <h3>{stats.outOfStock}</h3>
          </div>
        </div>

        <div className="admin-mini-stat-card">
          <div className="admin-mini-stat-icon blue">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <div className="admin-mini-stat-info">
            <p>Categories</p>
            <h3>{stats.categoriesCount}</h3>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="admin-category-chips">
        <button
          type="button"
          className={`admin-chip-btn ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          <i className="fa-solid fa-grip"></i> All Dishes
          <span className="badge-pill">{stats.total}</span>
        </button>
        <button
          type="button"
          className={`admin-chip-btn ${selectedCategory === "ethiopian" ? "active" : ""}`}
          onClick={() => setSelectedCategory("ethiopian")}
        >
          <i className="fa-solid fa-utensils"></i> Ethiopian
          <span className="badge-pill">{stats.ethCount}</span>
        </button>
        <button
          type="button"
          className={`admin-chip-btn ${selectedCategory === "pizza" ? "active" : ""}`}
          onClick={() => setSelectedCategory("pizza")}
        >
          <i className="fa-solid fa-pizza-slice"></i> Pizzas
          <span className="badge-pill">{stats.pizCount}</span>
        </button>
        <button
          type="button"
          className={`admin-chip-btn ${selectedCategory === "burgers" ? "active" : ""}`}
          onClick={() => setSelectedCategory("burgers")}
        >
          <i className="fa-solid fa-burger"></i> Burgers
          <span className="badge-pill">{stats.burCount}</span>
        </button>
        <button
          type="button"
          className={`admin-chip-btn ${selectedCategory === "drinks" ? "active" : ""}`}
          onClick={() => setSelectedCategory("drinks")}
        >
          <i className="fa-solid fa-wine-glass"></i> Drinks
          <span className="badge-pill">{stats.driCount}</span>
        </button>
      </div>

      {/* Dishes Table */}
      <div className="admin-table-container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading dishes...</span>
            </div>
            <p className="text-muted mt-2">Loading dishes...</p>
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="fa-solid fa-utensils text-muted mb-2"
              style={{ fontSize: "2.5rem" }}
            ></i>
            <h4>No Dishes Found</h4>
            <p className="text-muted">
              {globalSearch
                ? `No dishes matching "${globalSearch}"`
                : "No dishes found in this category."}
            </p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Dish Name &amp; Details</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDishes.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="admin-table-item-cell">
                      <img
                        src={item.image || "/images/doro_wote.png"}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "/images/doro_wote.png";
                        }}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <p>{item.description || "No description provided."}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark text-capitalize px-2 py-1">
                      {item.category || "General"}
                    </span>
                  </td>
                  <td>
                    <strong>{item.price} ETB</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`admin-status-toggle-btn ${
                        item.available !== false ? "available" : "out-of-stock"
                      }`}
                      onClick={() => handleToggleAvailability(item.id)}
                      title="Click to toggle availability"
                    >
                      {item.available !== false ? (
                        <>
                          <i className="fa-solid fa-check me-1"></i> Available
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-xmark me-1"></i> Out of Stock
                        </>
                      )}
                    </button>
                  </td>
                  <td>
                    <div className="admin-action-buttons">
                      <button
                        type="button"
                        className="admin-btn-icon edit"
                        title="Edit Dish"
                        onClick={() => {
                          setEditingDish(item);
                          setFormOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        type="button"
                        className="admin-btn-icon delete"
                        title="Delete Dish"
                        onClick={() => handleDeleteDish(item.id, item.name)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top text-muted fs-13">
          <span>Showing {filteredDishes.length} menu items</span>
          <span>Addis Eats Kitchen Catalog</span>
        </div>
      </div>

      {/* Add / Edit Dish Modal */}
      {formOpen && (
        <DishForm
          key={editingDish?.id || "new"}
          isOpen={formOpen}
          initialData={editingDish}
          onClose={() => {
            setFormOpen(false);
            setEditingDish(null);
          }}
          onSave={handleSaveDish}
        />
      )}
    </div>
  );
}
