import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { useOrderHistoryStore } from "../orders/orderHistoryStore";

export default function OrderManager() {
  const orders = useOrderHistoryStore((s) => s.orders);
  const updateOrderStatus = useOrderHistoryStore((s) => s.updateOrderStatus);
  const deleteOrder = useOrderHistoryStore((s) => s.deleteOrder);
  const resetOrders = useOrderHistoryStore((s) => s.resetOrders);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { globalSearch } = useOutletContext() || {};

  // Compute stat counts
  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const inKitchen = orders.filter((o) => o.status === "in_kitchen").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const revenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    return {
      total,
      pending,
      inKitchen,
      delivered,
      cancelled,
      revenue,
    };
  }, [orders]);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchTab = activeTab === "all" || order.status === activeTab;
      const q = (globalSearch || "").trim().toLowerCase();
      const matchSearch =
        !q ||
        String(order.orderId || order.id).toLowerCase().includes(q) ||
        (order.customer?.name && order.customer.name.toLowerCase().includes(q)) ||
        (order.customer?.phone && order.customer.phone.includes(q)) ||
        (order.deliveryArea && order.deliveryArea.toLowerCase().includes(q)) ||
        (order.items &&
          order.items.some((i) => i.name.toLowerCase().includes(q)));
      return matchTab && matchSearch;
    });
  }, [orders, activeTab, globalSearch]);

  function handleStatusChange(order, newStatus) {
    if (newStatus === "cancelled") {
      const confirmed = window.confirm(
        `Are you sure you want to cancel Order #${order.orderId || order.id}?`
      );
      if (!confirmed) return;
    }
    updateOrderStatus(order.orderId || order.id, newStatus);
  }

  function handleDelete(order) {
    const id = order.orderId || order.id;
    if (window.confirm(`Delete Order #${id}?`)) {
      deleteOrder(id);
      if (selectedOrder && (selectedOrder.orderId === id || selectedOrder.id === id)) {
        setSelectedOrder(null);
      }
    }
  }

  function handleReset() {
    if (
      window.confirm(
        "Reset sample test orders? This will load the standard demo order queue."
      )
    ) {
      resetOrders();
    }
  }

  function formatPaymentBadge(method) {
    const m = (method || "cash").toLowerCase();
    if (m.includes("telebirr")) {
      return <span className="admin-badge-payment telebirr">Telebirr</span>;
    }
    return <span className="admin-badge-payment cash">{m.toUpperCase()}</span>;
  }

  return (
    <div className="admin-order-management-section">
      {/* Action Header */}
      <div className="admin-section-header-row">
        <div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "800", margin: 0 }}>
            Live Orders Fulfillment
          </h2>
          <small className="text-muted">
            Track customer requests, kitchen queue, and dispatch fulfillment
          </small>
        </div>
        <div className="admin-header-btn-group">
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={handleReset}
            title="Reset sample test orders"
          >
            <i className="fa-solid fa-rotate-left"></i> Reset Demo Orders
          </button>
        </div>
      </div>

      {/* Mini Stats Summary */}
      <div className="admin-stats-summary-row">
        <div className="admin-mini-stat-card">
          <div className="admin-mini-stat-icon orange">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div className="admin-mini-stat-info">
            <p>Pending Orders</p>
            <h3>{stats.pending}</h3>
          </div>
        </div>

        <div className="admin-mini-stat-card">
          <div className="admin-mini-stat-icon blue">
            <i className="fa-solid fa-fire-burner"></i>
          </div>
          <div className="admin-mini-stat-info">
            <p>In Kitchen</p>
            <h3>{stats.inKitchen}</h3>
          </div>
        </div>

        <div className="admin-mini-stat-card">
          <div className="admin-mini-stat-icon green">
            <i className="fa-solid fa-truck-fast"></i>
          </div>
          <div className="admin-mini-stat-info">
            <p>Delivered</p>
            <h3>{stats.delivered}</h3>
          </div>
        </div>

        <div className="admin-mini-stat-card">
          <div className="admin-mini-stat-icon red">
            <i className="fa-solid fa-coins"></i>
          </div>
          <div className="admin-mini-stat-info">
            <p>Total Revenue</p>
            <h3>{stats.revenue.toLocaleString()} ETB</h3>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="admin-section-header-row" style={{ marginBottom: "1rem" }}>
        <div className="admin-filter-tabs">
          <button
            type="button"
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Orders ({stats.total})
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending ({stats.pending})
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "in_kitchen" ? "active" : ""}`}
            onClick={() => setActiveTab("in_kitchen")}
          >
            In Kitchen ({stats.inKitchen})
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "delivered" ? "active" : ""}`}
            onClick={() => setActiveTab("delivered")}
          >
            Delivered ({stats.delivered})
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "cancelled" ? "active" : ""}`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled ({stats.cancelled})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-table-container">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="fa-solid fa-clipboard-check text-muted mb-2"
              style={{ fontSize: "2.5rem" }}
            ></i>
            <h4>No Orders Found</h4>
            <p className="text-muted">
              {globalSearch
                ? `No orders matching "${globalSearch}"`
                : "There are no orders matching this filter."}
            </p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer &amp; Contact</th>
                <th>Delivery Area</th>
                <th>Items Summary</th>
                <th>Total &amp; Payment</th>
                <th>Order Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId || order.id}>
                  <td>
                    <strong>#{order.orderId || order.id}</strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--admin-text-muted)" }}>
                      {order.placedAt
                        ? new Date(order.placedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Today"}
                    </div>
                  </td>
                  <td>
                    <strong>{order.customer?.name || "Customer"}</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--admin-text-muted)" }}>
                      {order.customer?.phone || "No phone"}
                    </div>
                  </td>
                  <td>
                    <span>
                      {order.deliveryArea || order.customer?.area || "Addis Ababa"}
                    </span>
                  </td>
                  <td>
                    <div
                      style={{
                        maxWidth: "240px",
                        fontSize: "0.85rem",
                        color: "var(--admin-text-dark)",
                      }}
                    >
                      {(order.items || [])
                        .map((item) => `${item.name} × ${item.quantity}`)
                        .join(", ")}
                    </div>
                  </td>
                  <td>
                    <strong>{order.total} ETB</strong>
                    <div>{formatPaymentBadge(order.paymentMethod)}</div>
                  </td>
                  <td>
                    <select
                      className="admin-order-status-select"
                      value={order.status || "pending"}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_kitchen">In Kitchen</option>
                      <option value="delivering">Delivering</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="admin-action-buttons">
                      <button
                        type="button"
                        className="admin-btn-icon view"
                        title="View Details"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button
                        type="button"
                        className="admin-btn-icon delete"
                        title="Delete Order"
                        onClick={() => handleDelete(order)}
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
          <span>Showing {filteredOrders.length} live orders</span>
          <span>Addis Eats Kitchen Dispatch</span>
        </div>
      </div>

      {/* Order Details Receipt Modal */}
      {selectedOrder && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "600px" }}
          >
            <div className="admin-modal-header">
              <h3>Order Receipt #{selectedOrder.orderId || selectedOrder.id}</h3>
              <button
                type="button"
                className="admin-close-modal"
                onClick={() => setSelectedOrder(null)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-order-detail-card">
                <div className="admin-order-detail-row">
                  <span>Customer Name:</span>
                  <strong>{selectedOrder.customer?.name || "Guest"}</strong>
                </div>
                <div className="admin-order-detail-row">
                  <span>Phone:</span>
                  <strong>{selectedOrder.customer?.phone || "N/A"}</strong>
                </div>
                <div className="admin-order-detail-row">
                  <span>Delivery Neighborhood:</span>
                  <strong>
                    {selectedOrder.deliveryArea ||
                      selectedOrder.customer?.area ||
                      "Addis Ababa"}
                  </strong>
                </div>
                {selectedOrder.customer?.address && (
                  <div className="admin-order-detail-row">
                    <span>Street / Landmark:</span>
                    <strong>{selectedOrder.customer.address}</strong>
                  </div>
                )}
                <div className="admin-order-detail-row">
                  <span>Status:</span>
                  <strong className="text-capitalize">{selectedOrder.status}</strong>
                </div>
                <div className="admin-order-detail-row">
                  <span>Payment Method:</span>
                  <strong className="text-uppercase">
                    {selectedOrder.paymentMethod || "Cash"}
                  </strong>
                </div>
                {selectedOrder.specialInstructions && (
                  <div className="admin-order-detail-row">
                    <span>Instructions:</span>
                    <em style={{ color: "var(--admin-text-dark)" }}>
                      {selectedOrder.specialInstructions}
                    </em>
                  </div>
                )}
              </div>

              <h4 style={{ fontSize: "1rem", fontWeight: "700", marginTop: "0.5rem" }}>
                Order Items Breakdown
              </h4>

              <table className="table table-sm border mb-0">
                <thead>
                  <tr className="table-light">
                    <th>Item</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedOrder.items || []).map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">{item.price} ETB</td>
                      <td className="text-end">
                        {item.price * item.quantity} ETB
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.8rem 1rem",
                  background: "var(--admin-brand-orange-light)",
                  borderRadius: "10px",
                  color: "var(--admin-brand-orange)",
                  fontSize: "1.1rem",
                  fontWeight: "800",
                }}
              >
                <span>Total Amount:</span>
                <span>{selectedOrder.total} ETB</span>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="admin-primary-btn"
                onClick={() => {
                  window.print();
                }}
              >
                <i className="fa-solid fa-print"></i> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
