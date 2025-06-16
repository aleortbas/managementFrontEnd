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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow relative">
            <Link
              to={`/products/${product.id}`}
              className="block hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault(); // stop <Link> navigation
                dispatch(addToCart({ product_id: product.id, quantity: 1 }));
              }}
              className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleRedirect("/CreateProductForm")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        form
      </button>
      <button
        onClick={() => handleRedirect("/Categories")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        category
      </button>
    </div>
  );
}
