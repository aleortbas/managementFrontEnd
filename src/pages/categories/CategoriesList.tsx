import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchcategories } from "../../store/categoriesSlice";
import { RootState, AppDispatch } from "../../store";

export default function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.categories
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
    dispatch(fetchcategories());
  }, [dispatch]);

  if (status === "loading") return <p className="text-blue-500">Loading...</p>;
  if (status === "failed")
    return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📂 Lista de Categorías
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((category: any) => (
          <Link
            key={category.id}
            to={`/Categories/${category.id}`}
            className="block bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md hover:bg-gray-50 transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {category.name}
            </h3>
            <p className="text-gray-600">{category.description}</p>
            {category.price && (
              <p className="text-green-600 font-bold mt-2">${category.price}</p>
            )}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <button
          onClick={() => handleRedirect("/")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow"
        >
          ← Volver
        </button>
        <button
          onClick={() => handleRedirect("/CreateCategoryForm")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          ➕ Añadir Categoría
        </button>
      </div>
    </div>
  );
}
