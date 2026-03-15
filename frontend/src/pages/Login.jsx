import { useState } from "react";
import { loginUser } from "../api/services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

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

      const user = res.data.user;

      if (user.role === "ADMIN") navigate("/admin");
      if (user.role === "DOCTOR") navigate("/doctor");
      if (user.role === "PATIENT") navigate("/patient");
      if (user.role === "RECEPTIONIST") navigate("/receptionist");
      if (user.role === "LAB_TECH") navigate("/lab");

    } catch (err) {

      setError(err.response?.data?.message || "Login failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded w-96"
      >

        <h2 className="text-xl mb-6 font-bold text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Patient?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register here
          </Link>
        </p>

      </form>

    </div>

  );
}