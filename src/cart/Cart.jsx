import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";
import CartLineItem from "./CartLineItem";
import CartTotal from "./CartTotal";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const totalItemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <h1 className="breadcrumb-title">Cart</h1>
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
                  Cart
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="container">
          {items.length === 0 ? (
            <div className="text-center py-5">
              <div
                className="card box-shadow p-5"
                style={{ maxWidth: 500, margin: "0 auto" }}
              >
                <div className="mb-3">
                  <i className="icon-shopping-bag text-muted" style={{ fontSize: 64 }}></i>
                </div>
                <h3 className="mb-2">Your Cart is Empty</h3>
                <p className="text-muted mb-4">
                  Looks like you haven't added any delicious dishes yet.
                </p>
                <Link
                  to="/menu"
                  className="btn primary-btn justify-content-center"
                >
                  <i className="icon-arrow-left me-2"></i>Explore Our Menu
                </Link>
              </div>
            </div>
          ) : (
            <div className="row row-gap-3">
              {/* Cart Table Column */}
              <div className="col-lg-8">
                <div className="card cart-item mb-0 box-shadow">
                  <div className="card-body">
                    <div className="card-header d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                      <h2 className="card-title mb-0 fs-24">
                        {totalItemCount} {totalItemCount === 1 ? "Item" : "Items"} in Cart
                      </h2>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="btn btn-light d-flex align-items-center"
                      >
                        <i className="icon-trash-2 me-2"></i> Clear Cart
                      </button>
                    </div>

                    <div id="cart-wrap">
                      <div className="table-responsive">
                        <table className="table align-middle mb-0">
                          <thead className="cart-table-head">
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Subtotal</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => (
                              <CartLineItem key={item.dishId} item={item} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="col-lg-4">
                <CartTotal />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}