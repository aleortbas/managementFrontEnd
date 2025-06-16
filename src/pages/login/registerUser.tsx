import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/userSlice";
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      console.log(res.data);
    } catch (err) {
      console.error("CSV upload failed:", err);
      alert("CSV upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Email"
        className="w-full p-2 mb-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-2 border"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Upload Users via CSV:
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            if (e.target.files?.[0]) setCsvFile(e.target.files[0]);
          }}
          className="w-full border p-2"
        />
        <button
          type="button"
          onClick={handleCsvUpload}
          className="mt-2 bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Upload CSV
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
      >
        {status === "loading" ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
