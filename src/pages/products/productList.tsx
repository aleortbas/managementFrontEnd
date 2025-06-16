import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchProducts } from "../../store/productSlice";
import { RootState, AppDispatch } from "../../store";
import { addToCart } from "../../store/cartSlice";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.products
  );
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category_id: "",
  });

  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p className="text-blue-500">Loading...</p>;
  if (status === "failed")
    return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🛍️ Lista de productos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product: any) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-200 p-4 relative"
          >
            <Link to={`/products/${product.id}`} className="block space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold text-md">
                ${product.price}
              </p>
            </Link>

            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCart({ product_id: product.id, quantity: 1 }));
              }}
              className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 shadow-sm"
            >
              ➕ Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-10">
        <button
          onClick={() => handleRedirect("/CreateProductForm")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow"
        >
          ➕ Añadir Producto
        </button>
        <button
          onClick={() => handleRedirect("/Categories")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow"
        >
          📁 Categorías
        </button>
      </div>
    </div>
  );
}
