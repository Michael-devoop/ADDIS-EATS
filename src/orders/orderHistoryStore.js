import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "../cart/cartStore";

export const DEFAULT_SAMPLE_ORDERS = [
  {
    orderId: "ord-801",
    id: 801,
    placedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    status: "in_kitchen",
    total: 860,
    deliveryArea: "Bole",
    deliveryFee: 60,
    paymentMethod: "telebirr",
    customer: {
      name: "Abebe Bikila",
      phone: "0911234567",
      area: "Bole Medhanialem",
    },
    items: [
      { id: "eth-001", name: "Doro Wat", price: 320, quantity: 2 },
      { id: "eth-004", name: "Shiro Wat", price: 220, quantity: 1 },
    ],
  },
  {
    orderId: "ord-802",
    id: 802,
    placedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    status: "delivered",
    total: 640,
    deliveryArea: "Kazanchis",
    deliveryFee: 50,
    paymentMethod: "cash",
    customer: {
      name: "Selamawit Tesfaye",
      phone: "0922345678",
      area: "Kazanchis, ECA",
    },
    items: [
      { id: "eth-002", name: "Tibs", price: 300, quantity: 1 },
      { id: "eth-003", name: "Kitfo", price: 340, quantity: 1 },
    ],
  },
  {
    orderId: "ord-803",
    id: 803,
    placedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: "pending",
    total: 735,
    deliveryArea: "Piassa",
    deliveryFee: 55,
    paymentMethod: "telebirr",
    customer: {
      name: "Dawit Haile",
      phone: "0933456789",
      area: "Piassa, Churchill Ave",
    },
    items: [
      { id: "eth-003", name: "Kitfo", price: 340, quantity: 2 },
    ],
  },
  {
    orderId: "ord-804",
    id: 804,
    placedAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    status: "delivered",
    total: 1060,
    deliveryArea: "CMC",
    deliveryFee: 80,
    paymentMethod: "telebirr",
    customer: {
      name: "Hanan Mohammed",
      phone: "0944567890",
      area: "CMC Michael",
    },
    items: [
      { id: "eth-001", name: "Doro Wat", price: 320, quantity: 2 },
      { id: "eth-005", name: "Beyaynetu", price: 280, quantity: 1 },
      { id: "drk-001", name: "Fresh Mango Juice", price: 90, quantity: 2 },
    ],
  },
  {
    orderId: "ord-805",
    id: 805,
    placedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: "cancelled",
    total: 300,
    deliveryArea: "Mexico",
    deliveryFee: 70,
    paymentMethod: "cash",
    customer: {
      name: "Yohannes Bekele",
      phone: "0955678901",
      area: "Mexico Square",
    },
    items: [
      { id: "eth-002", name: "Tibs", price: 300, quantity: 1 },
    ],
  },
];

export const useOrderHistoryStore = create(
  persist(
    (set, get) => ({
      orders: DEFAULT_SAMPLE_ORDERS,

      addOrder: (order) => {
        const uniqueId = `ord-${Math.floor(100 + Math.random() * 900)}`;
        const newOrder = {
          orderId: uniqueId,
          id: uniqueId,
          placedAt: new Date().toISOString(),
          status: "pending",
          ...order,
        };
        const updated = [newOrder, ...get().orders];
        set({ orders: updated });

        try {
          localStorage.setItem("addiseats_orders", JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }

        return newOrder;
      },

      updateOrderStatus: (orderId, newStatus) => {
        const updated = get().orders.map((o) => {
          if (o.orderId === orderId || o.id === orderId) {
            return { ...o, status: newStatus };
          }
          return o;
        });
        set({ orders: updated });

        try {
          localStorage.setItem("addiseats_orders", JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      },

      deleteOrder: (orderId) => {
        const updated = get().orders.filter(
          (o) => o.orderId !== orderId && o.id !== orderId
        );
        set({ orders: updated });

        try {
          localStorage.setItem("addiseats_orders", JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      },

      resetOrders: () => {
        set({ orders: DEFAULT_SAMPLE_ORDERS });
        try {
          localStorage.setItem("addiseats_orders", JSON.stringify(DEFAULT_SAMPLE_ORDERS));
        } catch (e) {
          console.error(e);
        }
      },

      getOrders: () => get().orders,

      reorder: (orderId) => {
        const order = get().orders.find((o) => o.orderId === orderId || o.id === orderId);
        if (!order) return;

        const cart = useCartStore.getState();
        order.items.forEach((item) => {
          cart.addItem({ id: item.dishId || item.id, name: item.name, price: item.price });
          for (let i = 1; i < item.quantity; i++) {
            cart.addItem({ id: item.dishId || item.id, name: item.name, price: item.price });
          }
        });
      },
    }),
    {
      name: "addis-eats-orders",
    }
  )
);