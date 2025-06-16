import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status, error } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
        localStorage.setItem("token", (resultAction.payload as any).token);
      } else {
        console.error("Login failed:", (resultAction as any).payload);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 mt-12 rounded-xl shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        🔐 Iniciar Sesión
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email o Usuario
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-all"
      >
        {status === "loading" ? "Iniciando sesión..." : "Iniciar Sesión"}
      </button>

      <button
        type="button"
        onClick={() => navigate("/RegisterUser")}
        className="w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600 transition-all"
      >
        Registrar Usuario
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
}
