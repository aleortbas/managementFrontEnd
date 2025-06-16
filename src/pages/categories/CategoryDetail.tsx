import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updatecategory, deletecategory } from "../../store/categoriesSlice";
import axios from "axios";

export default function CategoryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [category, setcategory] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/categories/${id}`)
      .then((res) => setcategory(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setcategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!id) return;
    dispatch(
      updatecategory({
        id,
        data: {
          name: category.name
        },
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!id) return;
    dispatch(deletecategory(id));
    navigate("/");
  };

  if (!category) return <p>Loading...</p>;  

  return (
    <div className="max-w-xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg space-y-6">
  <h2 className="text-2xl font-bold text-gray-800">📁 Detalle de Categoría</h2>

  {isEditing ? (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Categoría</label>
        <input
          type="text"
          name="name"
          value={category.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleUpdate}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow"
        >
          💾 Guardar
        </button>
      </div>
    </div>
  ) : (
    <div className="space-y-3 text-gray-800">
      <p>
        <span className="font-semibold">📛 Nombre:</span> {category.name}
      </p>

      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
        >
          ✏️ Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md shadow"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  )}
</div>

  );
}
