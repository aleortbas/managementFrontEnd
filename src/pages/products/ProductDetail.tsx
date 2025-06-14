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

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto border rounded space-y-4">
      <h2 className="text-2xl font-bold mb-2">Product Detail</h2>

      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
