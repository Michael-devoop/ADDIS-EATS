import { useMemo, useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useOrderHistoryStore } from "../orders/orderHistoryStore";
import { getDishes } from "../api/dishes";

export default function Dashboard() {
  const orders = useOrderHistoryStore((s) => s.orders);
  const [dishes, setDishes] = useState([]);
  const [trendPeriod, setTrendPeriod] = useState("Weekly");
  const { globalSearch } = useOutletContext() || {};

  useEffect(() => {
    let mounted = true;
    getDishes()
      .then((data) => {
        if (mounted) setDishes(data);
      })
      .catch((err) => console.error("Error fetching dishes:", err));
    return () => {
      mounted = false;
    };
  }, []);

  // Stats Calculations
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const inKitchen = orders.filter((o) => o.status === "in_kitchen").length;
    const pending = orders.filter((o) => o.status === "pending").length;

    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return {
      totalOrders,
      delivered,
      cancelled,
      inKitchen,
      pending,
      totalRevenue,
      avgOrderValue,
    };
  }, [orders]);

  // Top Selling Dishes derived from orders or dishes
  const topSelling = useMemo(() => {
    const counts = {};
    orders.forEach((order) => {
      (order.items || []).forEach((item) => {
        const key = item.name;
        counts[key] = (counts[key] || 0) + (Number(item.quantity) || 1);
      });
    });

    // If there are recorded item sales
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (sorted.length > 0) {
      return sorted.slice(0, 3).map(([name, qty]) => {
        const dishMatch = dishes.find(
          (d) => d.name.toLowerCase() === name.toLowerCase()
        );
        return {
          name,
          quantity: qty,
          image: dishMatch?.image || "/images/doro_wote.png",
          category: dishMatch?.category || "Ethiopian",
        };
      });
    }

    // Default top favorites fallback
    return [
      {
        name: "Special Doro Wat",
        quantity: 34,
        image: "/images/doro_wote.png",
        category: "Ethiopian",
      },
      {
        name: "Sizzling Beef Tibs",
        quantity: 28,
        image: "/images/tebs2.png",
        category: "Ethiopian",
      },
      {
        name: "Special Gursha Kitfo",
        quantity: 21,
        image: "/images/ktfo.png",
        category: "Ethiopian",
      },
    ];
  }, [orders, dishes]);

  // Recent Live Orders
  const recentOrders = useMemo(() => {
    let list = [...orders];
    if (globalSearch && globalSearch.trim()) {
      const q = globalSearch.toLowerCase().trim();
      list = list.filter(
        (o) =>
          String(o.orderId || o.id).toLowerCase().includes(q) ||
          (o.customer?.name && o.customer.name.toLowerCase().includes(q)) ||
          (o.customer?.phone && o.customer.phone.includes(q)) ||
          (o.deliveryArea && o.deliveryArea.toLowerCase().includes(q)) ||
          (o.items && o.items.some((i) => i.name.toLowerCase().includes(q)))
      );
    }
    return list.slice(0, 6);
  }, [orders, globalSearch]);

  function formatStatusBadge(status) {
    switch (status) {
      case "delivered":
        return <span className="admin-status admin-badge-completed">Delivered</span>;
      case "in_kitchen":
        return <span className="admin-status admin-badge-kitchen">In Kitchen</span>;
      case "delivering":
        return <span className="admin-status admin-badge-process">Delivering</span>;
      case "cancelled":
        return <span className="admin-status admin-badge-cancelled">Cancelled</span>;
      default:
        return <span className="admin-status admin-badge-process">Pending</span>;
    }
  }

  return (
    <div className="admin-overview-section">
      <div className="admin-dashboard-layout">
        {/* Left Panel */}
        <div className="admin-left-panel">
          {/* Stat Cards */}
          <div className="admin-stat-cards">
            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span>
                  <i className="fa-solid fa-clipboard-list"></i> Total Orders
                </span>
              </div>
              <h2>{stats.totalOrders}</h2>
              <p className="admin-positive">+12% from last week</p>
            </div>

            <div className="admin-stat-card active-orange">
              <div className="admin-stat-header">
                <span>
                  <i className="fa-solid fa-box-open"></i> Total Delivered
                </span>
              </div>
              <h2>{stats.delivered}</h2>
              <p>↑ Completed on time</p>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span>
                  <i className="fa-solid fa-coins"></i> Total Revenue
                </span>
              </div>
              <h2>{stats.totalRevenue.toLocaleString()} ETB</h2>
              <p className="admin-positive">+15% vs yesterday</p>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span>
                  <i className="fa-solid fa-chart-line"></i> Avg Order Value
                </span>
              </div>
              <h2>{stats.avgOrderValue.toLocaleString()} ETB</h2>
              <p className="admin-positive">Per customer order</p>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span>
                  <i className="fa-regular fa-circle-xmark"></i> Cancelled
                </span>
              </div>
              <h2>{stats.cancelled}</h2>
              <p className="admin-negative">Low cancel rate</p>
            </div>
          </div>

          {/* Chart Card */}
          <div className="admin-chart-card">
            <div className="admin-chart-header">
              <h3>Revenue &amp; Orders Trend</h3>
              <div className="admin-chart-actions">
                <span className="admin-legend">
                  <span className="admin-dot orange"></span> Delivered Orders
                </span>
                <span className="admin-legend">
                  <span className="admin-dot light"></span> Operational Cost
                </span>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  style={{ padding: "0.35rem 0.8rem", fontSize: "0.82rem" }}
                  onClick={() =>
                    setTrendPeriod(trendPeriod === "Weekly" ? "Monthly" : "Weekly")
                  }
                >
                  <i className="fa-regular fa-calendar"></i> {trendPeriod}{" "}
                  <i className="fa-solid fa-repeat ms-1"></i>
                </button>
              </div>
            </div>

            <div className="admin-chart-amount">
              <h2>
                {stats.totalRevenue.toLocaleString()} ETB{" "}
                <span>Total Live Tracked</span>
              </h2>
            </div>

            <div className="admin-chart-placeholder">
              <svg viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradDelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,150 Q100,100 200,160 T400,110 T600,70 T800,45"
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth="4"
                />
                <path
                  d="M0,150 Q100,100 200,160 T400,110 T600,70 T800,45 L800,200 L0,200 Z"
                  fill="url(#gradDelivered)"
                />
                <path
                  d="M0,180 Q100,140 200,180 T400,150 T600,120 T800,100"
                  fill="none"
                  stroke="#fca17d"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>

            <div className="admin-chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Recent Live Orders */}
          <div className="admin-recent-orders-card">
            <div className="admin-card-title-row">
              <div>
                <h3>Recent Live Orders</h3>
                <small className="text-muted">
                  {orders.length} orders currently tracked in system
                </small>
              </div>
              <Link
                to="/admin/orders"
                className="admin-secondary-btn"
                style={{ padding: "0.4rem 0.9rem", fontSize: "0.82rem" }}
              >
                View All Orders <i className="fa-solid fa-arrow-right ms-1"></i>
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-muted py-3">No orders found.</p>
            ) : (
              <div className="admin-orders-grid">
                {recentOrders.map((order) => (
                  <div key={order.orderId || order.id} className="admin-order-mini-card">
                    <h4>
                      <span>#{order.orderId || order.id}</span>
                      {formatStatusBadge(order.status)}
                    </h4>
                    <p>
                      <strong>{order.customer?.name || "Customer"}</strong>
                    </p>
                    <p>
                      <i className="fa-solid fa-location-dot me-1 text-danger"></i>
                      {order.deliveryArea || order.customer?.area || "Addis Ababa"}
                    </p>
                    <p>
                      <small className="text-muted">
                        {(order.items || []).map((i) => `${i.name} × ${i.quantity}`).join(", ")}
                      </small>
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                      <strong>{order.total} ETB</strong>
                      <span className="badge bg-light text-dark text-capitalize">
                        {order.paymentMethod || "Cash"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="admin-right-panel">
          <div className="admin-top-selling-card">
            <div className="admin-card-title-row">
              <div>
                <h3>Top Selling Dishes</h3>
                <small className="text-muted">High-demand menu favorites</small>
              </div>
              <Link
                to="/admin/menu"
                className="admin-secondary-btn"
                style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem" }}
              >
                All Dishes
              </Link>
            </div>

            <div>
              {topSelling.map((item, idx) => (
                <div
                  key={idx}
                  className="admin-top-selling-item"
                  style={{ backgroundImage: `url('${item.image}')` }}
                >
                  <div className="admin-overlay">
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.category}</p>
                    </div>
                    <div className="admin-percentage-circle" title="Orders Count">
                      {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Operations Widget */}
          <div className="admin-chart-card">
            <h3 style={{ marginBottom: "1rem", fontSize: "1.05rem" }}>
              Quick Action Center
            </h3>
            <div className="d-flex flex-column gap-2">
              <Link
                to="/admin/menu"
                className="admin-primary-btn justify-content-center"
                style={{ width: "100%" }}
              >
                <i className="fa-solid fa-plus"></i> Add New Menu Dish
              </Link>
              <Link
                to="/admin/orders"
                className="admin-secondary-btn justify-content-center"
                style={{ width: "100%" }}
              >
                <i className="fa-solid fa-list-check"></i> Manage Kitchen Orders
              </Link>
              <Link
                to="/menu"
                className="admin-secondary-btn justify-content-center"
                style={{ width: "100%" }}
              >
                <i className="fa-solid fa-eye"></i> View Live Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
