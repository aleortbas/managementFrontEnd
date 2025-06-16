import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updateProduct, deleteProduct } from "../../store/productSlice";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!id) return;
    dispatch(
      updateProduct({
        id,
        data: {
          name: product.name,
          description: product.description,
          price: Number(product.price),
          category_id: product.category_id,
        },
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!id) return;
    dispatch(deleteProduct(id));
    navigate("/");
  };

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">
        📦 Detalles del Producto
      </h2>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => handleRedirect("/")}
              className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 shadow"
            >
              ← Atrás
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 shadow"
            >
              💾 Guardar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-gray-800">
          <p>
            <span className="font-semibold">📛 Nombre:</span> {product.name}
          </p>
          <p>
            <span className="font-semibold">📝 Descripción:</span>{" "}
            {product.description}
          </p>
          <p>
            <span className="font-semibold">💲 Precio:</span> ${product.price}
          </p>

          <div className="flex justify-between pt-4 gap-4">
            <button
              type="button"
              onClick={() => handleRedirect("/")}
              className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 shadow"
            >
              ← Atrás
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 shadow"
            >
              ✏️ Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 shadow"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
