import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getCartService } from "../../services/cartServices";
import { checkout } from "../../store/cartSlice";

interface CartItem {
  name: string;
  description: string;
  quantity: number;
  category: string;
  total?: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutResult, setCheckoutResult] = useState<CartItem[] | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getCartService()
      .then(res => setCartItems(res.data))
      .catch(err => console.error("Failed to fetch cart:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleCheckout = async () => {
    const resultAction = await dispatch(checkout());
    if (checkout.fulfilled.match(resultAction)) {
      setCheckoutResult(resultAction.payload);
    } else {
      alert("Checkout failed");
    }
  };

  if (loading) return <p className="p-4">Loading cart...</p>;

  if (cartItems.length === 0) return <p className="p-4">Your cart is empty.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cart Details</h2>
      <ul className="space-y-4 mb-6">
        {cartItems.map((item, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p>Quantity: <strong>{item.quantity}</strong></p>
            <p>Category: {item.category}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Checkout
      </button>

      {checkoutResult && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-bold mb-2">Checkout Summary</h3>
          {checkoutResult.map((item, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{item.name}</strong> x {item.quantity} → ${item.total}
              </p>
            </div>
          ))}
          <p className="mt-4 text-green-600 font-bold">
            Total: ${checkoutResult.reduce((sum, item) => sum + (item.total || 0), 0)}
          </p>
        </div>
      )}
    </div>
  );
}
