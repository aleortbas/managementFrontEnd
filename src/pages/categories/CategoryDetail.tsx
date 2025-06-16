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
    <div className="p-6 max-w-md mx-auto border rounded space-y-4">
      <h2 className="text-2xl font-bold mb-2">category Detail</h2>

      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={category.name}
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
            <strong>Name:</strong> {category.name}
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
