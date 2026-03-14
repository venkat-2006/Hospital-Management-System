import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "",
    gender: "", phone: "", address: "", date_of_birth: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await registerUser(formData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
  const labelCls = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
        <div className="text-center mb-7">
          <div className="text-4xl mb-2">🏥</div>
          <h1 className="text-2xl font-bold text-slate-800">Patient Registration</h1>
          <p className="text-slate-500 text-sm mt-1">Create your account to get started</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
            ✅ Registered successfully! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="mb-4 col-span-2">
              <label className={labelCls}>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange}
                placeholder="John Doe" required className={inputCls} />
            </div>
            <div className="mb-4 col-span-2">
              <label className={labelCls}>Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                placeholder="you@example.com" required className={inputCls} />
            </div>
            <div className="mb-4 col-span-2">
              <label className={labelCls}>Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange}
                placeholder="Minimum 6 characters" required className={inputCls} />
            </div>
            <div className="mb-4">
              <label className={labelCls}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}
                required className={inputCls + " bg-white"}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className={labelCls}>Phone Number</label>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                placeholder="+91 9999999999" required className={inputCls} />
            </div>
            <div className="mb-4">
              <label className={labelCls}>Date of Birth</label>
              <input name="date_of_birth" type="date" value={formData.date_of_birth}
                onChange={handleChange} required className={inputCls} />
            </div>
            <div className="mb-4">
              <label className={labelCls}>Address</label>
              <input name="address" value={formData.address} onChange={handleChange}
                placeholder="123 Main St, City" required className={inputCls} />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400
              text-white font-semibold rounded-xl transition-colors text-sm disabled:cursor-not-allowed">
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;