const MENU_STORAGE_KEY = "addiseats_custom_menu";

export async function getDishes() {
  try {
    const cached = localStorage.getItem(MENU_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to parse cached dishes:", err);
  }

  const res = await fetch("/menu-data.json");
  if (!res.ok) {
    throw new Error("Failed to fetch dishes");
  }
  const data = await res.json();

  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }

  return data;
}

export function saveDishesLocally(dishes) {
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(dishes));
  } catch (e) {
    console.error("Failed to save dishes:", e);
  }
}

export async function resetDishesToDefault() {
  const res = await fetch("/menu-data.json");
  if (!res.ok) {
    throw new Error("Failed to reset dishes");
  }
  const data = await res.json();
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
  return data;
}