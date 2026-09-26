import { useCartStore } from "../cart/cartStore";

export default function AddToCartButton({ dish }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button type="button" onClick={() => addItem(dish)}>
      Add to cart
    </button>
  );
}