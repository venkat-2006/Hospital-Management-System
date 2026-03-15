import { useState } from "react";
import { loginUser } from "../api/services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await loginUser(form);

      login(res.data);

    } catch (err) {

      setError(err.response?.data?.message || "Login failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-8 rounded w-96"
      >

        <h2 className="text-xl mb-6 font-bold">Login</h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          className="bg-blue-600 text-white w-full py-2"
        >
          Login
        </button>

        <p className="mt-4 text-sm">
          Patient? <a href="/register" className="text-blue-600">Register here</a>
        </p>

      </form>

    </div>

  );
}