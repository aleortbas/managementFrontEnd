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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">categories List</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((categories: any) => (
          <Link
            key={categories.id}
            to={`/categoriess/${categories.id}`}
            className="block border p-4 rounded shadow hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{categories.name}</h3>
            <p>{categories.description}</p>
            <p className="text-green-600 font-bold">${categories.price}</p>
          </Link>
        ))}
      </div>
      <button
        onClick={() => handleRedirect("/CreateCategoryForm")}
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
