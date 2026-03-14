import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navConfig = {
  ADMIN: [
    { to: "/admin", label: "Dashboard", icon: "📊" },
    { to: "/admin/users", label: "Manage Users", icon: "👥" },
    { to: "/admin/doctors", label: "Doctors", icon: "👨‍⚕️" },
    { to: "/admin/medicines", label: "Medicines", icon: "💊" },
    { to: "/admin/bills", label: "Bills", icon: "💳" },
  ],
  DOCTOR: [
    { to: "/doctor", label: "Dashboard", icon: "📊" },
    { to: "/doctor/appointments", label: "Appointments", icon: "📅" },
    { to: "/doctor/patients", label: "My Patients", icon: "🧑‍🤝‍🧑" },
    { to: "/doctor/create-record", label: "Create Record", icon: "📋" },
    { to: "/doctor/create-prescription", label: "Prescribe", icon: "💊" },
    { to: "/doctor/request-lab", label: "Request Lab", icon: "🔬" },
  ],
  PATIENT: [
    { to: "/patient", label: "Dashboard", icon: "📊" },
    { to: "/patient/appointments", label: "Appointments", icon: "📅" },
    { to: "/patient/request", label: "Book Appt.", icon: "➕" },
    { to: "/patient/records", label: "My Records", icon: "📋" },
    { to: "/patient/prescriptions", label: "Prescriptions", icon: "💊" },
    { to: "/patient/lab-reports", label: "Lab Reports", icon: "🔬" },
    { to: "/patient/bills", label: "My Bills", icon: "💳" },
  ],
  RECEPTIONIST: [
    { to: "/receptionist", label: "Dashboard", icon: "📊" },
    { to: "/receptionist/requests", label: "Requests", icon: "📋" },
    { to: "/receptionist/schedule", label: "Schedule", icon: "📅" },
    { to: "/receptionist/bills", label: "Bills", icon: "💳" },
  ],
  LAB_TECH: [
    { to: "/lab", label: "Dashboard", icon: "📊" },
    { to: "/lab/pending", label: "Pending Tests", icon: "🔬" },
  ],
};

const roleAccent = {
  ADMIN: "from-red-700 to-red-600",
  DOCTOR: "from-blue-700 to-blue-600",
  PATIENT: "from-emerald-700 to-emerald-600",
  RECEPTIONIST: "from-purple-700 to-purple-600",
  LAB_TECH: "from-orange-600 to-orange-500",
};

const roleActiveBg = {
  ADMIN: "bg-red-500/20 text-white border-l-red-400",
  DOCTOR: "bg-blue-500/20 text-white border-l-blue-400",
  PATIENT: "bg-emerald-500/20 text-white border-l-emerald-400",
  RECEPTIONIST: "bg-purple-500/20 text-white border-l-purple-400",
  LAB_TECH: "bg-orange-500/20 text-white border-l-orange-400",
};

const Layout = () => {
  const { user, logout } = useAuth();
  const links = navConfig[user?.role] || [];
  const headerGradient = roleAccent[user?.role] || "from-slate-700 to-slate-600";
  const activeCls = roleActiveBg[user?.role] || "bg-slate-500/20 text-white border-l-slate-400";

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-slate-300 flex flex-col fixed h-screen z-50">
        <div className={`bg-gradient-to-r ${headerGradient} px-5 py-5`}>
          <div className="text-lg font-bold text-white tracking-wide">🏥 MediCare</div>
          <div className="text-xs text-white/75 mt-0.5 uppercase tracking-widest">
            {user?.role?.replace("_", " ")}
          </div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to.split("/").length === 2}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-sm border-l-4 transition-all
                ${isActive
                  ? `${activeCls} font-semibold`
                  : "border-l-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-slate-700/50">
          <div className="text-xs text-slate-400 mb-2 truncate">{user?.name}</div>
          <button
            onClick={logout}
            className="w-full py-2 text-xs font-semibold bg-slate-700 hover:bg-slate-600
              text-slate-300 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;