import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleRoutes = {
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  PATIENT: "/patient",
  RECEPTIONIST: "/receptionist",
  LAB_TECH: "/lab"
};

const Unauthorized = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <h2 className="text-2xl font-semibold text-slate-800 mt-4">Access Denied</h2>
        <p className="text-slate-500 mt-2">You don't have permission to view this page.</p>
        <button
          onClick={() => navigate(user ? roleRoutes[user.role] : "/login")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {user ? "Go to Dashboard" : "Go to Login"}
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;