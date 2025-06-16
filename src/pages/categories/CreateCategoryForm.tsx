import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createcategory } from "../../store/categoriesSlice";
import { useNavigate } from "react-router-dom";

export default function CreatecategoryForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createcategory(form));
  };

  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        📂 Crear Categoría
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la Categoría
        </label>
        <input
          type="text"
          placeholder="Ej. Electrónica, Ropa, Libros..."
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => handleRedirect("/Categories")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md shadow"
        >
          ← Volver
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
        >
          ➕ Crear Categoría
        </button>
      </div>
    </form>
  );
}
