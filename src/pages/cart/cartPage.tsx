import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getCartService } from "../../services/cartServices";
import { checkout } from "../../store/cartSlice";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    getCartService()
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Failed to fetch cart:", err))
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

   const handleRedirect = (path: string) => {
    navigate(path);
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
            <p>
              Quantity: <strong>{item.quantity}</strong>
            </p>
            <p>Category: {item.category}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleRedirect("/")}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Atras
      </button>

      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Checkout
      </button>

      {checkoutResult && (
        <>
          {/* Semi-transparent overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setCheckoutResult(null)}
          ></div>

          {/* Floating checkout summary */}
          <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg z-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Checkout Summary</h3>
              <button
                onClick={() => setCheckoutResult(null)}
                className="text-red-500 font-bold hover:underline"
              >
                Close
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {checkoutResult.map((item, index) => (
                <div key={index}>
                  <p>
                    <strong>{item.name}</strong> x {item.quantity} → $
                    {item.total}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-green-600 font-bold text-right">
              Total: $
              {checkoutResult.reduce((sum, item) => sum + (item.total || 0), 0)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
