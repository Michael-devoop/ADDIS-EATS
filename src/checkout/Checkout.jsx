import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";
import { useOrderHistoryStore } from "../orders/orderHistoryStore";
import { getDeliveryEstimate } from "../utils/deliveryEstimate";
import { validateCheckoutForm } from "./validate";
import Field from "./Field";
import DeliveryEstimate from "./DeliveryEstimate";
import OrderSummary from "./OrderSummary";
import ConfirmationMessage from "./ConfirmationMessage";

const initialForm = {
  name: "",
  phone: "",
  area: "Bole",
  address: "",
  specialInstructions: "",
  paymentMethod: "cash",
};

const AREAS = [
  { value: "Bole", label: "Bole (Fee: ETB 60 · ~25 min)" },
  { value: "Kazanchis", label: "Kazanchis (Fee: ETB 50 · ~20 min)" },
  { value: "Piassa", label: "Piassa (Fee: ETB 55 · ~22 min)" },
  { value: "CMC", label: "CMC (Fee: ETB 80 · ~35 min)" },
  { value: "Mexico", label: "Mexico / Lideta (Fee: ETB 70 · ~30 min)" },
  { value: "Sarbet", label: "Sarbet / Bisrate Gabriel (Fee: ETB 70 · ~30 min)" },
];

export default function Checkout() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderHistoryStore((s) => s.addOrder);

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateCheckoutForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const { fee } = getDeliveryEstimate(form.area);
    const itemsTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const tax = Math.round(itemsTotal * 0.15);

    const order = addOrder({
      items: [...items],
      total: itemsTotal + fee + tax,
      deliveryArea: form.area,
      deliveryFee: fee,
      customer: { name: form.name, phone: form.phone },
      specialInstructions: form.specialInstructions,
      paymentMethod: form.paymentMethod,
    });

    clearCart();
    setPlacedOrder(order);
  }

  if (placedOrder) {
    return <ConfirmationMessage order={placedOrder} />;
  }

  if (items.length === 0) {
    return (
      <>
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="breadcrumb-item">
              <h1 className="breadcrumb-title">Checkout</h1>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container text-center py-5">
            <div className="card box-shadow p-5" style={{ maxWidth: 500, margin: "0 auto" }}>
              <i className="icon-shopping-cart text-muted mb-3" style={{ fontSize: 60 }}></i>
              <h3>Your cart is empty</h3>
              <p className="text-muted mb-4">Please add items to your cart before checking out.</p>
              <Link to="/menu" className="btn primary-btn justify-content-center">
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <h1 className="breadcrumb-title">Checkout</h1>
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
                <li className="breadcrumb-items">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="breadcrumb-items">
                  <span><i className="icon-chevron-right"></i></span>
                </li>
                <li className="breadcrumb-items active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="container">
          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="row row-gap-4">
              {/* Left Column: Form Fields */}
              <div className="col-xl-8 col-lg-7">
                {/* Basic Information */}
                <div className="card mb-4 cart-item box-shadow">
                  <div className="card-body">
                    <div className="card-header pb-3 mb-3 border-bottom">
                      <h2 className="card-title d-flex align-items-center gap-2 mb-0 fs-20">
                        <i className="icon-circle-user-round text-primary"></i> Contact Information
                      </h2>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <Field
                          label="Full Name *"
                          name="name"
                          value={form.name}
                          onChange={updateField}
                          error={errors.name}
                          placeholder="e.g. Abebe Bikila"
                        />
                      </div>
                      <div className="col-md-6">
                        <Field
                          label="Phone Number * (Ethiopian Mobile)"
                          name="phone"
                          value={form.phone}
                          onChange={updateField}
                          error={errors.phone}
                          placeholder="0911234567 or +251911234567"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="card mb-4 cart-item box-shadow">
                  <div className="card-body">
                    <div className="card-header pb-3 mb-3 border-bottom">
                      <h2 className="card-title d-flex align-items-center gap-2 mb-0 fs-20">
                        <i className="icon-map-pinned text-primary"></i> Delivery Location
                      </h2>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="area" className="form-label fw-medium text-dark">
                        Delivery Neighborhood / Area *
                      </label>
                      <select
                        id="area"
                        className={`form-select ${errors.area ? "is-invalid" : ""}`}
                        value={form.area}
                        onChange={(e) => updateField("area", e.target.value)}
                      >
                        {AREAS.map((a) => (
                          <option key={a.value} value={a.value}>
                            {a.label}
                          </option>
                        ))}
                      </select>
                      {errors.area && (
                        <div className="invalid-feedback d-block">{errors.area}</div>
                      )}
                    </div>

                    <DeliveryEstimate area={form.area} />

                    <div className="mb-3">
                      <Field
                        label="Specific Street Address / Landmark"
                        name="address"
                        value={form.address}
                        onChange={updateField}
                        placeholder="e.g. Behind Edna Mall, Building 4, 2nd Floor"
                      />
                    </div>

                    <div>
                      <Field
                        label="Special Delivery Instructions (Optional)"
                        name="specialInstructions"
                        value={form.specialInstructions}
                        onChange={updateField}
                        as="textarea"
                        placeholder="e.g. Call upon arrival at the gate, extra spicy sauce please"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card cart-item box-shadow">
                  <div className="card-body">
                    <div className="card-header pb-3 mb-3 border-bottom">
                      <h2 className="card-title d-flex align-items-center gap-2 mb-0 fs-20">
                        <i className="icon-credit-card text-primary"></i> Payment Method
                      </h2>
                    </div>

                    <div className="d-flex flex-column gap-3">
                      <div className="form-check p-3 border rounded d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          id="payment-cash"
                          name="paymentMethod"
                          className="form-check-input ms-0 mt-0"
                          value="cash"
                          checked={form.paymentMethod === "cash"}
                          onChange={(e) => updateField("paymentMethod", e.target.value)}
                        />
                        <label
                          htmlFor="payment-cash"
                          className="form-check-label ms-2 d-flex align-items-center gap-2 w-100"
                        >
                          <i className="icon-banknote text-success fs-20"></i>
                          <div>
                            <strong className="d-block">Cash on Delivery</strong>
                            <span className="text-muted fs-13">
                              Pay in cash or via Telebirr / CBE Birr upon food delivery.
                            </span>
                          </div>
                        </label>
                      </div>

                      <div className="form-check p-3 border rounded d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          id="payment-telebirr"
                          name="paymentMethod"
                          className="form-check-input ms-0 mt-0"
                          value="telebirr"
                          checked={form.paymentMethod === "telebirr"}
                          onChange={(e) => updateField("paymentMethod", e.target.value)}
                        />
                        <label
                          htmlFor="payment-telebirr"
                          className="form-check-label ms-2 d-flex align-items-center gap-2 w-100"
                        >
                          <i className="icon-smartphone text-primary fs-20"></i>
                          <div>
                            <strong className="d-block">Telebirr / Digital Payment</strong>
                            <span className="text-muted fs-13">
                              Direct mobile transfer on delivery confirmation.
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="col-xl-4 col-lg-5">
                <OrderSummary area={form.area} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}