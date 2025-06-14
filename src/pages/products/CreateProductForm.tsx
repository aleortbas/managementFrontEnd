import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createProduct } from '../../store/productSlice';

export default function CreateProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    category_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProduct(form));
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
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Category ID"
        value={form.category_id}
        onChange={e => setForm({ ...form, category_id: e.target.value })}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Product
      </button>
    </form>
  );
}
