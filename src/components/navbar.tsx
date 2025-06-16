import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../store';
import { fetchCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="bg-red-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Shop</h1>
      <button
        onClick={handleCartClick}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Cart ({cartItems.length})
      </button>
    </nav>
  );
}
