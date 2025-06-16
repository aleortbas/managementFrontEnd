import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createProduct } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";

export default function CreateProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category_id: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProduct(form));
  };

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
   <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Crear Producto</h2>

  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="block text-gray-700 font-medium mb-1">Nombre</label>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Descripción</label>
      <textarea
        placeholder="Descripción del producto"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Precio</label>
      <input
        type="number"
        placeholder="Precio"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">ID de Categoría</label>
      <input
        type="text"
        placeholder="ID de categoría"
        value={form.category_id}
        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={() => handleRedirect("/")}
        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md shadow"
      >
        ← Atrás
      </button>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
      >
        Crear Producto
      </button>
    </div>
  </form>
</div>
  );
}
