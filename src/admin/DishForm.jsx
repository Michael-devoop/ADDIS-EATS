import { useState } from "react";

const CATEGORIES = [
  { value: "ethiopian", label: "Ethiopian Cuisine" },
  { value: "pizza", label: "Pizzas" },
  { value: "burgers", label: "Burgers" },
  { value: "drinks", label: "Drinks & Smoothies" },
];

export default function DishForm({ isOpen, initialData, onClose, onSave }) {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "ethiopian");
  const [price, setPrice] = useState(
    initialData?.price !== undefined ? String(initialData.price) : ""
  );
  const [image, setImage] = useState(initialData?.image || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [available, setAvailable] = useState(initialData?.available !== false);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !price) return;

    onSave({
      id: initialData?.id || `dish-${Date.now()}`,
      name: name.trim(),
      category,
      price: Number(price),
      image: image.trim() || "/images/doro_wote.png",
      description: description.trim(),
      available,
      ingredients: initialData?.ingredients || [],
    });
    onClose();
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <h3>{initialData ? "Edit Menu Item" : "Add New Menu Item"}</h3>
          <button
            type="button"
            className="admin-close-modal"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            <div className="admin-form-group">
              <label>Dish Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Special Doro Wat"
                required
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label>Price (ETB) *</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 320"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Image Path / URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="e.g. /images/doro_wote.png or https://..."
              />
            </div>

            <div className="admin-form-group">
              <label>Description &amp; Ingredients</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the dish, sauces and ingredients..."
              ></textarea>
            </div>

            <div className="admin-form-group">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  style={{ width: "auto" }}
                />
                <span>Mark dish as currently available for ordering</span>
              </label>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              className="admin-secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="admin-primary-btn">
              <i className="fa-solid fa-check"></i> Save Dish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
