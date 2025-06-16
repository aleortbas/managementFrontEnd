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
            localStorage.setItem('token', (resultAction.payload as any).token); 
        } else {
            console.error("Login failed:", (resultAction as any).payload);
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <label htmlFor="">Email or Username</label>
      <input
        type="text"
        className="w-full p-2 mb-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        className="w-full p-2 mb-4 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
      >
        {status === "loading" ? "Logging in..." : "Login"}
      </button>
      <button type="button" onClick={() => navigate("/RegisterUser")} className="mt-2 bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">
        Regitrar usuario
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
