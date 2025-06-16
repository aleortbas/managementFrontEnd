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
    <nav className="bg-red-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Shop</h1>

      <div className="flex items-center gap-4 ml-auto">
        {isAuthenticated && (
          <>
            <button
              onClick={handleCartClick}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Cart ({cartItems.length})
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {!isAuthenticated && (
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
