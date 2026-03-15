import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex w-20 h-20 bg-blue-500 rounded-3xl items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-500/30 mb-6">H</div>
        <h1 className="text-4xl font-bold text-white mb-3">Hospital Management System</h1>
        <p className="text-slate-400 text-lg mb-10">Streamlined healthcare management for all roles</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/30"
          >Sign In</button>
          <button onClick={() => navigate("/register")}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition border border-white/10"
          >Register as Patient</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-14 max-w-2xl mx-auto">
          {[
            { role: "Admin", icon: "🏥", color: "bg-rose-500/10 border-rose-500/20 text-rose-300" },
            { role: "Doctor", icon: "👨‍⚕️", color: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
            { role: "Patient", icon: "🧑", color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
            { role: "Receptionist", icon: "📋", color: "bg-violet-500/10 border-violet-500/20 text-violet-300" },
            { role: "Lab Tech", icon: "🧪", color: "bg-amber-500/10 border-amber-500/20 text-amber-300" },
          ].map(r => (
            <div key={r.role} className={`${r.color} border rounded-2xl p-4 text-center`}>
              <div className="text-2xl mb-1">{r.icon}</div>
              <p className="text-xs font-semibold">{r.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}