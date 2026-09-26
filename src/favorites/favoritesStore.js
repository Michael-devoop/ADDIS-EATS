import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      ids: [],

      toggleFavorite: (dishId) => {
        const isFav = get().ids.includes(dishId);
        set({
          ids: isFav
            ? get().ids.filter((id) => id !== dishId)
            : [...get().ids, dishId],
        });
      },

      isFavorite: (dishId) => get().ids.includes(dishId),
      clearFavorites: () => set({ ids: [] }),
    }),
    {
      name: "addis-eats-favorites",
    }
  )
);