import { useEffect, useState } from "react";
import { getCartService } from "../../services/cartServices";

interface CartItem {
  name: string;
  description: string;
  quantity: number;
  category: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCartService()
      .then(res => {
        setCartItems(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch cart:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading cart...</p>;

  if (cartItems.length === 0) return <p className="p-4">Your cart is empty.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cart Details</h2>
      <ul className="space-y-4">
        {cartItems.map((item, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p>Quantity: <strong>{item.quantity}</strong></p>
            <p>Category: {item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
