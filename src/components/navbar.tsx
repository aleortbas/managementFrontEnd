import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../store";
import { fetchCart } from "../store/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (token) dispatch(fetchCart());
  }, [location.pathname, dispatch]);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
  <nav className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-4 shadow-md">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <h1
      className="text-2xl font-bold tracking-tight cursor-pointer hover:text-yellow-300 transition"
      onClick={() => navigate("/")}
    >
      🛍️ My Shop
    </h1>

    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <>
          <button
            onClick={handleCartClick}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all duration-200"
          >
            🛒 Cart ({cartItems.length})
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all duration-200"
          >
            🔓 Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLoginClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all duration-200"
        >
          🔐 Login
        </button>
      )}
    </div>
  </div>
</nav>

  );
}
