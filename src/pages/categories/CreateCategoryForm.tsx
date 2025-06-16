import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createcategory } from '../../store/categoriesSlice';
import { useNavigate} from "react-router-dom";

export default function CreatecategoryForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: '',
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full"
      />
      <button
        type='button'
        onClick={() => handleRedirect("/Categories")}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Volver 
      </button>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Crear Categoria
      </button>
    </form>
  );
}
