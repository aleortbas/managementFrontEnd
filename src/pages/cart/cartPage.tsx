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
<div className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Detalles del Carrito</h2>

  <ul className="space-y-4 mb-8">
    {cartItems.map((item, index) => (
      <li key={index} className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow transition">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-sm text-gray-700 mt-1">
          <strong>Cantidad:</strong> {item.quantity}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Categoría:</strong> {item.category}
        </p>
      </li>
    ))}
  </ul>

  <div className="flex justify-between gap-4">
    <button
      onClick={() => handleRedirect("/")}
      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow"
    >
      ← Atrás
    </button>

    <button
      onClick={handleCheckout}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
    >
      ✅ Finalizar Compra
    </button>
  </div>

  {checkoutResult && (
    <>
      {/* Semi-transparent overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setCheckoutResult(null)}
      ></div>

      {/* Floating checkout summary */}
      <div className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">🧾 Resumen del Pedido</h3>
          <button
            onClick={() => setCheckoutResult(null)}
            className="text-red-500 font-bold hover:underline"
          >
            Cerrar
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-3 text-sm text-gray-700">
          {checkoutResult.map((item, index) => (
            <div key={index}>
              <p>
                <strong>{item.name}</strong> x {item.quantity} → ${item.total}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-right text-green-600 font-bold text-lg">
          Total: ${checkoutResult.reduce((sum, item) => sum + (item.total || 0), 0)}
        </p>
      </div>
    </>
  )}
</div>

  );
}
