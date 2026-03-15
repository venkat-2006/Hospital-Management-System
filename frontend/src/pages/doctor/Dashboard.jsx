// import { useState, useEffect } from "react";
// import { getDoctorDashboard } from "../../api/services/doctorService";
// import { useAuth } from "../../context/AuthContext";
// import { PageWrapper, Card, LoadingSpinner, ErrorMsg, StatCard } from "../../components/UI";

// const DoctorDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { user } = useAuth();

//   useEffect(() => {
//     getDoctorDashboard()
//       .then((res) => setData(res.data))
//       .catch(() => setError("Failed to load dashboard"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
//   if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

//   return (
//     <PageWrapper title={`Good day, Dr. ${user?.name} 👨‍⚕️`}>
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
//         <StatCard label="Today's Appointments" value={data?.todays_appointments} color="blue" icon="📅" />
//         <StatCard label="Total Patients" value={data?.total_patients} color="green" icon="🧑‍🤝‍🧑" />
//         <StatCard label="Pending Lab Tests" value={data?.pending_lab_tests} color="orange" icon="🔬" />
//         <StatCard label="Prescriptions Written" value={data?.total_prescriptions} color="purple" icon="💊" />
//       </div>
//       <Card>
//         <h3 className="font-semibold text-slate-800 mb-2">Quick Tips</h3>
//         <p className="text-slate-500 text-sm">
//           Use the sidebar to view appointments, manage patients, write prescriptions, and request lab tests.
//         </p>
//       </Card>
//     </PageWrapper>
//   );
// };

// export default DoctorDashboard;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorDashboard, getMyAppointments } from "../../api/services/doctorService";
import { useAuth } from "../../context/AuthContext";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, StatusBadge } from "../../components/UI";

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
const formatTime = (d) =>
  new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const greet = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const today = () =>
  new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

// ─── Stat card ────────────────────────────────────────────────────────────────
const STAT_THEMES = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-100",   val: "text-blue-700",   label: "text-blue-500",  bar: "bg-blue-400"   },
  green:  { bg: "bg-emerald-50",border: "border-emerald-100",val: "text-emerald-700",label: "text-emerald-500",bar: "bg-emerald-400"},
  orange: { bg: "bg-amber-50",  border: "border-amber-100",  val: "text-amber-700",  label: "text-amber-500", bar: "bg-amber-400"  },
  purple: { bg: "bg-violet-50", border: "border-violet-100", val: "text-violet-700", label: "text-violet-500",bar: "bg-violet-400" },
};

const StatCard = ({ label, value, color, icon, sublabel }) => {
  const t = STAT_THEMES[color] || STAT_THEMES.blue;
  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-3 ${t.bg} ${t.border}`}>
      <div className="flex items-center justify-between">
        <span className="text-xl">{icon}</span>
        <span className={`text-3xl font-bold tabular-nums ${t.val}`}>
          {value ?? "—"}
        </span>
      </div>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide ${t.label}`}>{label}</p>
        {sublabel && <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
};

// ─── Quick action button ──────────────────────────────────────────────────────
const QuickBtn = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200
               bg-white hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm
               transition-all duration-150 text-center group"
  >
    <span className="text-2xl group-hover:scale-110 transition-transform duration-150">{icon}</span>
    <span className="text-xs font-semibold text-slate-600">{label}</span>
  </button>
);

// ─── Main dashboard ───────────────────────────────────────────────────────────
const DoctorDashboard = () => {
  const [data,         setData]         = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      getDoctorDashboard(),
      getMyAppointments(),
    ])
      .then(([dashRes, apptRes]) => {
        setData(dashRes.data);
        // Only today's scheduled appointments
        const todayStr = new Date().toDateString();
        const todayAppts = apptRes.data.filter(
          (a) =>
            new Date(a.appointment_time).toDateString() === todayStr &&
            a.status === "scheduled"
        );
        setAppointments(todayAppts.sort(
          (a, b) => new Date(a.appointment_time) - new Date(b.appointment_time)
        ));
      })
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error)   return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  const nextAppt = appointments[0];

  return (
    <PageWrapper>

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="text-slate-400 text-sm font-medium">{today()}</p>
          <h1 className="text-2xl font-bold text-slate-800 mt-0.5">
            {greet()}, Dr. {user?.name} 👨‍⚕️
          </h1>
          {nextAppt ? (
            <p className="text-slate-500 text-sm mt-1">
              Next appointment at{" "}
              <span className="font-semibold text-blue-600">
                {formatTime(nextAppt.appointment_time)}
              </span>
              {" "}— {nextAppt.patient_name || `Patient #${nextAppt.patient_id}`}
            </p>
          ) : (
            <p className="text-slate-400 text-sm mt-1">No more appointments today</p>
          )}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Today's Appointments"
          value={data?.todays_appointments}
          color="blue"
          icon="📅"
          sublabel={`${appointments.length} remaining`}
        />
        <StatCard
          label="Total Patients"
          value={data?.total_patients}
          color="green"
          icon="🧑‍🤝‍🧑"
        />
        <StatCard
          label="Pending Lab Tests"
          value={data?.pending_lab_tests}
          color="orange"
          icon="🔬"
          sublabel={data?.pending_lab_tests > 0 ? "Needs review" : "All clear"}
        />
        <StatCard
          label="Prescriptions Written"
          value={data?.total_prescriptions}
          color="purple"
          icon="💊"
        />
      </div>

      {/* ── Bottom grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Today's schedule — takes 2 cols */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Today's Schedule</h3>
            <button
              onClick={() => navigate("/doctor/appointments")}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              View all →
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-3xl mb-2">✅</p>
              <p className="text-slate-400 text-sm">All done for today!</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {appointments.map((a, i) => (
                <div
                  key={a.id}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100
                             hover:bg-blue-50 hover:border-blue-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/doctor/patients/${a.patient_id}`)}
                >
                  {/* Time + index */}
                  <div className="text-center min-w-[48px]">
                    <p className="text-xs text-slate-400 font-medium">#{i + 1}</p>
                    <p className="text-sm font-bold text-slate-700">{formatTime(a.appointment_time)}</p>
                  </div>

                  <div className="w-px h-8 bg-slate-200 flex-shrink-0" />

                  {/* Patient info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">
                      {a.patient_name || `Patient #${a.patient_id}`}
                    </p>
                    {a.patient_phone && (
                      <p className="text-xs text-slate-400">{a.patient_phone}</p>
                    )}
                  </div>

                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick actions */}
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <QuickBtn
              icon="📋"
              label="New Record"
              onClick={() => navigate("/doctor/create-record")}
            />
            <QuickBtn
              icon="💊"
              label="Prescribe"
              onClick={() => navigate("/doctor/create-prescription")}
            />
            <QuickBtn
              icon="🔬"
              label="Request Lab"
              onClick={() => navigate("/doctor/request-lab")}
            />
            <QuickBtn
              icon="👥"
              label="My Patients"
              onClick={() => navigate("/doctor/patients")}
            />
          </div>

          {/* Pending labs alert */}
          {data?.pending_lab_tests > 0 && (
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs font-semibold text-amber-700">
                🔬 {data.pending_lab_tests} lab test{data.pending_lab_tests !== 1 ? "s" : ""} awaiting results
              </p>
              <button
                onClick={() => navigate("/doctor/lab-reports")}
                className="text-xs text-amber-600 hover:underline mt-1 font-medium"
              >
                Review now →
              </button>
            </div>
          )}
        </Card>

      </div>
    </PageWrapper>
  );
};

export default DoctorDashboard;