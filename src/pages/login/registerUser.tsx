import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../store/userSlice";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { status, error } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        registerUser({ email, username, password })
      );
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/ProductList");
      } else {
        console.error("Login failed:", (resultAction as any).payload);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile) return;

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Users uploaded successfully!");
      navigate("/ProductList");
    } catch (err) {
      console.error("CSV upload failed:", err);
      alert("CSV upload failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmitRegister}
      className="max-w-md mx-auto bg-white p-8 mt-12 rounded-xl shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        📝 Registrar Usuario
      </h2>

      <input
        type="text"
        placeholder="Correo electrónico"
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Nombre de usuario"
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          📂 Cargar archivo CSV para múltiples usuarios:
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            if (e.target.files?.[0]) setCsvFile(e.target.files[0]);
          }}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
        <button
          type="button"
          onClick={handleCsvUpload}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          📤 Cargar CSV
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-all"
      >
        {status === "cargando" ? "Registrando..." : "Registrar Usuario"}
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
}
