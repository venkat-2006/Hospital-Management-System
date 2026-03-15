import { useState } from "react";
import { registerUser } from "../api/services/authService";

export default function Register() {

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

      setMsg("Registration successful. Please login.");

    } catch (err) {

      setMsg(err.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-8 rounded w-96"
      >

        <h2 className="text-xl mb-6 font-bold">Patient Register</h2>

        {msg && (
          <p className="mb-3 text-blue-600">{msg}</p>
        )}

        <input
          placeholder="Name"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Address"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({ ...form, date_of_birth: e.target.value })
          }
        />

        <select
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
        >

          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>

        </select>

        <button
          className="bg-green-600 text-white w-full py-2"
        >
          Register
        </button>

      </form>

    </div>

  );
}