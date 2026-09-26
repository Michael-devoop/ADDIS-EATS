import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], 

      addItem: (dish, qty = 1) => {
        const quantityToAdd = typeof qty === "number" && qty > 0 ? qty : 1;
        const existing = get().items.find((i) => i.dishId === dish.id);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.dishId === dish.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                dishId: dish.id,
                name: dish.name,
                price: dish.price,
                image: dish.image,
                quantity: quantityToAdd,
              },
            ],
          });
        }
      },

      updateQuantity: (dishId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(dishId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.dishId === dishId ? { ...i, quantity } : i
          ),
        });
      },

      removeItem: (dishId) => {
        set({ items: get().items.filter((i) => i.dishId !== dishId) });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: "addis-eats-cart", 
    }
  )
);