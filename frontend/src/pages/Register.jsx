import { useState } from "react";
import { registerUser } from "../api/services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    date_of_birth: ""
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await registerUser(form);

      setMsg("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setMsg(err.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded w-96"
      >

        <h2 className="text-xl mb-6 font-bold text-center">
          Patient Register
        </h2>

        {msg && (
          <p className="mb-3 text-blue-600">{msg}</p>
        )}

        <input
          placeholder="Name"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Address"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, date_of_birth: e.target.value })
          }
        />

        <select
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
        >

          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>

        </select>

        <button
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>

  );
}