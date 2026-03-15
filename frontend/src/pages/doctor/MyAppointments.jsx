// // // // import { useState, useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { getMyAppointments } from "../../api/services/doctorService";
// // // // import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, Btn, StatusBadge, EmptyState, TableSkeleton } from "../../components/UI";

// // // // const MyAppointments = () => {
// // // //   const [appointments, setAppointments] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     getMyAppointments()
// // // //       .then(res => setAppointments(res.data))
// // // //       .catch(() => setError("Failed to load appointments"))
// // // //       .finally(() => setLoading(false));
// // // //   }, []);

// // // //   return (
// // // //     <PageWrapper>
// // // //       <div className="mb-8">
// // // //         <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
// // // //         <p className="text-slate-500 text-sm mt-1">{appointments.length} appointments</p>
// // // //       </div>
// // // //       <ErrorMsg message={error} />
// // // //       <Card>
// // // //         {loading ? <TableSkeleton /> : appointments.length === 0 ? <EmptyState message="No appointments yet" icon="📅" /> : (
// // // //           <Table>
// // // //             <thead>
// // // //               <Tr header>
// // // //                 <Td header>#</Td>
// // // //                 <Td header>Patient</Td>
// // // //                 <Td header>Date & Time</Td>
// // // //                 <Td header>Status</Td>
// // // //                 <Td header>Actions</Td>
// // // //               </Tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {appointments
// // // //                 .sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time))
// // // //                 .map((a, i) => (
// // // //                   <Tr key={a.id}>
// // // //                     <Td><span className="text-slate-400 text-xs">{i + 1}</span></Td>
// // // //                     <Td><span className="font-medium text-slate-800">{a.patient_name || `Patient #${a.patient_id}`}</span></Td>
// // // //                     <Td><span className="text-slate-600">{new Date(a.appointment_time).toLocaleString()}</span></Td>
// // // //                     <Td><StatusBadge status={a.status} /></Td>
// // // //                     <Td>
// // // //                       <div className="flex gap-2 flex-wrap">
// // // //                         <Btn size="sm" onClick={() => navigate(`/doctor/create-record?patientId=${a.patient_id}`)}>
// // // //                           + Record
// // // //                         </Btn>
// // // //                         <Btn size="sm" variant="outline" onClick={() => navigate(`/doctor/create-prescription?patientId=${a.patient_id}`)}>
// // // //                           + Prescribe
// // // //                         </Btn>
// // // //                         <Btn size="sm" variant="secondary" onClick={() => navigate(`/doctor/request-lab?patientId=${a.patient_id}`)}>
// // // //                           + Lab
// // // //                         </Btn>
// // // //                         <Btn size="sm" variant="ghost" onClick={() => navigate(`/doctor/patients/${a.patient_id}`)}>
// // // //                           View
// // // //                         </Btn>
// // // //                       </div>
// // // //                     </Td>
// // // //                   </Tr>
// // // //                 ))}
// // // //             </tbody>
// // // //           </Table>
// // // //         )}
// // // //       </Card>
// // // //     </PageWrapper>
// // // //   );
// // // // };

// // // // export default MyAppointments;
// // // import { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { getMyAppointments } from "../../api/services/doctorService";
// // // import { PageWrapper, Card, TableSkeleton, ErrorMsg, Btn, StatusBadge, EmptyState } from "../../components/UI";

// // // const formatDay = (dateStr) =>
// // //   new Date(dateStr).toLocaleDateString("en-IN", {
// // //     weekday: "long", day: "numeric", month: "long", year: "numeric"
// // //   });

// // // const formatTime = (dateStr) =>
// // //   new Date(dateStr).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

// // // const groupByDay = (list) =>
// // //   list.reduce((acc, a) => {
// // //     const day = new Date(a.appointment_time).toDateString();
// // //     if (!acc[day]) acc[day] = [];
// // //     acc[day].push(a);
// // //     return acc;
// // //   }, {});

// // // export default function MyAppointments() {
// // //   const [appointments, setAppointments] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     getMyAppointments()
// // //       .then(res => setAppointments(res.data))
// // //       .catch(() => setError("Failed to load appointments"))
// // //       .finally(() => setLoading(false));
// // //   }, []);

// // //   const now = new Date();
// // //   const upcoming = appointments.filter(a => new Date(a.appointment_time) >= now || a.status === "scheduled");
// // //   const completed = appointments.filter(a => a.status === "completed" || (new Date(a.appointment_time) < now && a.status !== "scheduled"));

// // //   const upcomingByDay = groupByDay(upcoming);
// // //   const completedByDay = groupByDay(completed);

// // //   const AppointmentCard = ({ a, showActions }) => (
// // //     <div className="flex items-start justify-between gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
// // //       <div className="flex-1">
// // //         <div className="flex items-center gap-2 mb-1">
// // //           <span className="font-semibold text-slate-800">{formatTime(a.appointment_time)}</span>
// // //           <StatusBadge status={a.status} />
// // //         </div>
// // //         <p className="text-slate-600 text-sm">{a.patient_name || `Patient #${a.patient_id}`}</p>
// // //         {a.patient_phone && <p className="text-slate-400 text-xs mt-0.5">{a.patient_phone}</p>}
// // //       </div>
// // //       {showActions && (
// // //         <div className="flex gap-1.5 flex-wrap justify-end">
// // //           <Btn size="sm" onClick={() => navigate(`/doctor/create-record?patientId=${a.patient_id}`)}>
// // //             + Record
// // //           </Btn>
// // //           <Btn size="sm" variant="outline" onClick={() => navigate(`/doctor/create-prescription?patientId=${a.patient_id}`)}>
// // //             + Rx
// // //           </Btn>
// // //           <Btn size="sm" variant="secondary" onClick={() => navigate(`/doctor/request-lab?patientId=${a.patient_id}`)}>
// // //             + Lab
// // //           </Btn>
// // //           <Btn size="sm" variant="ghost" onClick={() => navigate(`/doctor/patients/${a.patient_id}`)}>
// // //             View
// // //           </Btn>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );

// // //   const DayGroup = ({ dayKey, list, showActions }) => (
// // //     <div className="mb-6">
// // //       <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
// // //         {formatDay(list[0].appointment_time)}
// // //       </p>
// // //       <div className="space-y-2">
// // //         {list
// // //           .sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time))
// // //           .map(a => <AppointmentCard key={a.id} a={a} showActions={showActions} />)
// // //         }
// // //       </div>
// // //     </div>
// // //   );

// // //   if (loading) return <PageWrapper><TableSkeleton /></PageWrapper>;

// // //   return (
// // //     <PageWrapper>
// // //       <div className="mb-8">
// // //         <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
// // //         <p className="text-slate-500 text-sm mt-1">
// // //           {upcoming.length} upcoming · {completed.length} completed
// // //         </p>
// // //       </div>
// // //       <ErrorMsg message={error} />

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         {/* Upcoming */}
// // //         <Card>
// // //           <div className="flex items-center gap-2 mb-5">
// // //             <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
// // //             <h2 className="font-semibold text-slate-800">Upcoming</h2>
// // //             <span className="ml-auto bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-lg font-semibold">
// // //               {upcoming.length}
// // //             </span>
// // //           </div>
// // //           {Object.keys(upcomingByDay).length === 0
// // //             ? <EmptyState message="No upcoming appointments" icon="📅" />
// // //             : Object.entries(upcomingByDay).map(([day, list]) => (
// // //                 <DayGroup key={day} dayKey={day} list={list} showActions={true} />
// // //               ))
// // //           }
// // //         </Card>

// // //         {/* Completed */}
// // //         <Card>
// // //           <div className="flex items-center gap-2 mb-5">
// // //             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
// // //             <h2 className="font-semibold text-slate-800">Completed</h2>
// // //             <span className="ml-auto bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-lg font-semibold">
// // //               {completed.length}
// // //             </span>
// // //           </div>
// // //           {Object.keys(completedByDay).length === 0
// // //             ? <EmptyState message="No completed appointments" icon="✅" />
// // //             : Object.entries(completedByDay).map(([day, list]) => (
// // //                 <DayGroup key={day} dayKey={day} list={list} showActions={false} />
// // //               ))
// // //           }
// // //         </Card>
// // //       </div>
// // //     </PageWrapper>
// // //   );
// // // }
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { getMyAppointments, updateMyAppointment } from "../../api/services/doctorService";
// // import { PageWrapper, Card, TableSkeleton, ErrorMsg, Btn, StatusBadge, EmptyState } from "../../components/UI";

// // const formatDay = (dateStr) =>
// //   new Date(dateStr).toLocaleDateString("en-IN", {
// //     weekday: "long", day: "numeric", month: "long", year: "numeric",
// //   });

// // const formatTime = (dateStr) =>
// //   new Date(dateStr).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

// // const groupByDay = (list) =>
// //   list.reduce((acc, a) => {
// //     const day = new Date(a.appointment_time).toDateString();
// //     if (!acc[day]) acc[day] = [];
// //     acc[day].push(a);
// //     return acc;
// //   }, {});

// // export default function MyAppointments() {
// //   const [appointments, setAppointments] = useState([]);
// //   const [loading,      setLoading]      = useState(true);
// //   const [error,        setError]        = useState("");
// //   const [completing,   setCompleting]   = useState(null); // appointmentId being completed
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     getMyAppointments()
// //       .then((res) => setAppointments(res.data))
// //       .catch(() => setError("Failed to load appointments"))
// //       .finally(() => setLoading(false));
// //   }, []);

// //   // Mark appointment as completed — updates local state immediately (optimistic)
// //   const handleComplete = async (appointmentId) => {
// //     if (!window.confirm("Mark this appointment as completed? This cannot be undone.")) return;

// //     setCompleting(appointmentId);
// //     try {
// //       await updateMyAppointment(appointmentId, { status: "completed" });
// //       // Update in place so UI reflects immediately without a full refetch
// //       setAppointments((prev) =>
// //         prev.map((a) => a.id === appointmentId ? { ...a, status: "completed" } : a)
// //       );
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to complete appointment");
// //     } finally {
// //       setCompleting(null);
// //     }
// //   };

// //   const now = new Date();
// //   const upcoming  = appointments.filter((a) => a.status === "scheduled");
// //   const completed = appointments.filter((a) => a.status === "completed" || a.status === "cancelled");

// //   const upcomingByDay  = groupByDay(upcoming);
// //   const completedByDay = groupByDay(completed);

// //   // ── Appointment card ────────────────────────────────────────────────────────
// //   const AppointmentCard = ({ a, showActions }) => {
// //     const isCompleting = completing === a.id;
// //     const isCompleted  = a.status === "completed";
// //     const isCancelled  = a.status === "cancelled";
// //     const isLocked     = isCompleted || isCancelled; // no actions allowed

// //     return (
// //       <div className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-colors
// //         ${isCompleted ? "bg-emerald-50 border-emerald-100" :
// //           isCancelled ? "bg-slate-50 border-slate-100 opacity-60" :
// //           "bg-slate-50 border-slate-100"}`}
// //       >
// //         <div className="flex-1 min-w-0">
// //           <div className="flex items-center gap-2 mb-1">
// //             <span className="font-semibold text-slate-800">{formatTime(a.appointment_time)}</span>
// //             <StatusBadge status={a.status} />
// //           </div>
// //           <p className="text-slate-600 text-sm">{a.patient_name || `Patient #${a.patient_id}`}</p>
// //           {a.patient_phone && <p className="text-slate-400 text-xs mt-0.5">{a.patient_phone}</p>}
// //         </div>

// //         {/* Actions — hidden once completed/cancelled */}
// //         {showActions && !isLocked && (
// //           <div className="flex gap-1.5 flex-wrap justify-end flex-shrink-0">
// //             <Btn
// //               size="sm"
// //               onClick={() => navigate(`/doctor/create-record?patientId=${a.patient_id}`)}
// //             >
// //               + Record
// //             </Btn>
// //             <Btn
// //               size="sm"
// //               variant="outline"
// //               onClick={() => navigate(`/doctor/create-prescription?patientId=${a.patient_id}`)}
// //             >
// //               + Rx
// //             </Btn>
// //             <Btn
// //               size="sm"
// //               variant="secondary"
// //               onClick={() => navigate(`/doctor/request-lab?patientId=${a.patient_id}`)}
// //             >
// //               + Lab
// //             </Btn>
// //             <Btn
// //               size="sm"
// //               variant="ghost"
// //               onClick={() => navigate(`/doctor/patients/${a.patient_id}`)}
// //             >
// //               View
// //             </Btn>

// //             {/* ── Complete button ── */}
// //             <Btn
// //               size="sm"
// //               disabled={isCompleting}
// //               onClick={() => handleComplete(a.id)}
// //               className="bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
// //             >
// //               {isCompleting ? "..." : "✓ Done"}
// //             </Btn>
// //           </div>
// //         )}

// //         {/* Locked state label */}
// //         {isLocked && (
// //           <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0
// //             ${isCompleted
// //               ? "bg-emerald-100 text-emerald-700"
// //               : "bg-slate-100 text-slate-500"}`}
// //           >
// //             {isCompleted ? "Completed" : "Cancelled"}
// //           </span>
// //         )}
// //       </div>
// //     );
// //   };

// //   // ── Day group ────────────────────────────────────────────────────────────────
// //   const DayGroup = ({ list, showActions }) => (
// //     <div className="mb-6">
// //       <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
// //         {formatDay(list[0].appointment_time)}
// //       </p>
// //       <div className="space-y-2">
// //         {list
// //           .sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time))
// //           .map((a) => <AppointmentCard key={a.id} a={a} showActions={showActions} />)
// //         }
// //       </div>
// //     </div>
// //   );

// //   if (loading) return <PageWrapper><TableSkeleton /></PageWrapper>;

// //   return (
// //     <PageWrapper>
// //       <div className="mb-8">
// //         <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
// //         <p className="text-slate-500 text-sm mt-1">
// //           {upcoming.length} upcoming · {completed.length} completed
// //         </p>
// //       </div>

// //       <ErrorMsg message={error} />

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// //         {/* ── Upcoming ── */}
// //         <Card>
// //           <div className="flex items-center gap-2 mb-5">
// //             <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
// //             <h2 className="font-semibold text-slate-800">Upcoming</h2>
// //             <span className="ml-auto bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-lg font-semibold">
// //               {upcoming.length}
// //             </span>
// //           </div>
// //           {Object.keys(upcomingByDay).length === 0 ? (
// //             <EmptyState message="No upcoming appointments" icon="📅" />
// //           ) : (
// //             Object.entries(upcomingByDay).map(([day, list]) => (
// //               <DayGroup key={day} list={list} showActions={true} />
// //             ))
// //           )}
// //         </Card>

// //         {/* ── Completed / Cancelled ── */}
// //         <Card>
// //           <div className="flex items-center gap-2 mb-5">
// //             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
// //             <h2 className="font-semibold text-slate-800">Completed</h2>
// //             <span className="ml-auto bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-lg font-semibold">
// //               {completed.length}
// //             </span>
// //           </div>
// //           {Object.keys(completedByDay).length === 0 ? (
// //             <EmptyState message="No completed appointments" icon="✅" />
// //           ) : (
// //             Object.entries(completedByDay).map(([day, list]) => (
// //               <DayGroup key={day} list={list} showActions={false} />
// //             ))
// //           )}
// //         </Card>

// //       </div>
// //     </PageWrapper>
// //   );
// // }
// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { getMyAppointments, updateMyAppointment } from "../../api/services/doctorService";
// import { PageWrapper, Card, TableSkeleton, ErrorMsg, Btn, StatusBadge, EmptyState } from "../../components/UI";

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const formatDay = (dateStr) =>
//   new Date(dateStr).toLocaleDateString("en-IN", {
//     weekday: "long", day: "numeric", month: "long", year: "numeric",
//   });

// const formatTime = (dateStr) =>
//   new Date(dateStr).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

// const groupByDay = (list) =>
//   list.reduce((acc, a) => {
//     const day = new Date(a.appointment_time).toDateString();
//     if (!acc[day]) acc[day] = [];
//     acc[day].push(a);
//     return acc;
//   }, {});

// // ─── AppointmentCard — defined OUTSIDE main component to avoid remount bug ────
// const AppointmentCard = ({ a, completing, onComplete, onNavigate }) => {
//   const isCompleting = completing === a.id;
//   const isCompleted  = a.status === "completed";
//   const isCancelled  = a.status === "cancelled";
//   const isLocked     = isCompleted || isCancelled;

//   return (
//     <div className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-colors
//       ${isCompleted ? "bg-emerald-50 border-emerald-100" :
//         isCancelled ? "bg-slate-50 border-slate-100 opacity-60" :
//         "bg-slate-50 border-slate-100"}`}
//     >
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-1">
//           <span className="font-semibold text-slate-800">{formatTime(a.appointment_time)}</span>
//           <StatusBadge status={a.status} />
//         </div>
//         <p className="text-slate-600 text-sm">{a.patient_name || `Patient #${a.patient_id}`}</p>
//         {a.patient_phone && <p className="text-slate-400 text-xs mt-0.5">{a.patient_phone}</p>}
//       </div>

//       {/* Actions — only on upcoming, unlocked */}
//       {!isLocked && (
//         <div className="flex gap-1.5 flex-wrap justify-end flex-shrink-0">
//           <Btn size="sm" onClick={() => onNavigate(`/doctor/create-record?patientId=${a.patient_id}`)}>
//             + Record
//           </Btn>
//           <Btn size="sm" variant="outline" onClick={() => onNavigate(`/doctor/create-prescription?patientId=${a.patient_id}`)}>
//             + Rx
//           </Btn>
//           <Btn size="sm" variant="secondary" onClick={() => onNavigate(`/doctor/request-lab?patientId=${a.patient_id}`)}>
//             + Lab
//           </Btn>
//           <Btn size="sm" variant="ghost" onClick={() => onNavigate(`/doctor/patients/${a.patient_id}`)}>
//             View
//           </Btn>
//           <Btn
//             size="sm"
//             disabled={isCompleting}
//             onClick={() => onComplete(a.id)}
//             className="bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
//           >
//             {isCompleting ? "..." : "✓ Done"}
//           </Btn>
//         </div>
//       )}

//       {/* Locked pill */}
//       {isLocked && (
//         <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0
//           ${isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
//         >
//           {isCompleted ? "Completed" : "Cancelled"}
//         </span>
//       )}
//     </div>
//   );
// };

// // ─── DayGroup — also outside ──────────────────────────────────────────────────
// const DayGroup = ({ list, completing, onComplete, onNavigate, showActions }) => (
//   <div className="mb-6 last:mb-0">
//     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
//       {formatDay(list[0].appointment_time)}
//     </p>
//     <div className="space-y-2">
//       {[...list]
//         .sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time))
//         .map((a) => (
//           <AppointmentCard
//             key={a.id}
//             a={a}
//             completing={completing}
//             onComplete={onComplete}
//             onNavigate={onNavigate}
//           />
//         ))}
//     </div>
//   </div>
// );

// // ─── Main ─────────────────────────────────────────────────────────────────────
// export default function MyAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading,      setLoading]      = useState(true);
//   const [error,        setError]        = useState("");
//   const [completing,   setCompleting]   = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getMyAppointments()
//       .then((res) => setAppointments(res.data))
//       .catch(() => setError("Failed to load appointments"))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleComplete = useCallback(async (appointmentId) => {
//     if (!window.confirm("Mark this appointment as completed? This cannot be undone.")) return;
//     setCompleting(appointmentId);
//     try {
//       await updateMyAppointment(appointmentId, { status: "completed" });
//       setAppointments((prev) =>
//         prev.map((a) => a.id === appointmentId ? { ...a, status: "completed" } : a)
//       );
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to complete appointment");
//     } finally {
//       setCompleting(null);
//     }
//   }, []);

//   // ── Split: upcoming = scheduled only, completed = everything else ─────────
//   // No date filtering — show ALL appointments regardless of date so completed
//   // ones from any day are always visible in the completed column
//   const upcoming  = appointments.filter((a) => a.status === "scheduled");
//   const completed = appointments.filter((a) => a.status !== "scheduled");

//   const upcomingByDay  = groupByDay(upcoming);
//   const completedByDay = groupByDay(completed);

//   if (loading) return <PageWrapper><TableSkeleton /></PageWrapper>;

//   return (
//     <PageWrapper>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
//         <p className="text-slate-500 text-sm mt-1">
//           {upcoming.length} upcoming · {completed.length} completed
//         </p>
//       </div>

//       <ErrorMsg message={error} />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Upcoming */}
//         <Card>
//           <div className="flex items-center gap-2 mb-5">
//             <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
//             <h2 className="font-semibold text-slate-800">Upcoming</h2>
//             <span className="ml-auto bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-lg font-semibold">
//               {upcoming.length}
//             </span>
//           </div>
//           {Object.keys(upcomingByDay).length === 0 ? (
//             <EmptyState message="No upcoming appointments" icon="📅" />
//           ) : (
//             Object.entries(upcomingByDay)
//               .sort(([a], [b]) => new Date(a) - new Date(b))
//               .map(([day, list]) => (
//                 <DayGroup
//                   key={day}
//                   list={list}
//                   completing={completing}
//                   onComplete={handleComplete}
//                   onNavigate={navigate}
//                   showActions={true}
//                 />
//               ))
//           )}
//         </Card>

//         {/* Completed */}
//         <Card>
//           <div className="flex items-center gap-2 mb-5">
//             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
//             <h2 className="font-semibold text-slate-800">Completed</h2>
//             <span className="ml-auto bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-lg font-semibold">
//               {completed.length}
//             </span>
//           </div>
//           {Object.keys(completedByDay).length === 0 ? (
//             <EmptyState message="No completed appointments" icon="✅" />
//           ) : (
//             <div className="max-h-[600px] overflow-y-auto pr-1">
//               {Object.entries(completedByDay)
//                 .sort(([a], [b]) => new Date(b) - new Date(a)) // newest day first
//                 .map(([day, list]) => (
//                   <DayGroup
//                     key={day}
//                     list={list}
//                     completing={completing}
//                     onComplete={handleComplete}
//                     onNavigate={navigate}
//                     showActions={false}
//                   />
//                 ))}
//             </div>
//           )}
//         </Card>

//       </div>
//     </PageWrapper>
//   );
// }
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAppointments, updateMyAppointment } from "../../api/services/doctorService";
import { PageWrapper, Card, TableSkeleton, ErrorMsg, Btn, StatusBadge, EmptyState } from "../../components/UI";

const formatDay = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const groupByDay = (list) =>
  list.reduce((acc, a) => {
    const day = new Date(a.appointment_time).toDateString();
    if (!acc[day]) acc[day] = [];
    acc[day].push(a);
    return acc;
  }, {});

const AppointmentCard = ({ a, completing, onComplete, onNavigate }) => {
  const isCompleting = completing === a.id;
  const isCompleted  = a.status === "completed";
  const isCancelled  = a.status === "cancelled";
  const isLocked     = isCompleted || isCancelled;

  return (
    <div className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-colors
      ${isCompleted ? "bg-emerald-50 border-emerald-100" :
        isCancelled ? "bg-slate-50 border-slate-100 opacity-60" :
        "bg-slate-50 border-slate-100"}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-slate-800">{formatTime(a.appointment_time)}</span>
          <StatusBadge status={a.status} />
        </div>
        <p className="text-slate-600 text-sm">{a.patient_name || `Patient #${a.patient_id}`}</p>
        {a.patient_phone && <p className="text-slate-400 text-xs mt-0.5">{a.patient_phone}</p>}
      </div>

      {!isLocked && (
        <div className="flex gap-1.5 flex-wrap justify-end flex-shrink-0">
          <Btn size="sm" onClick={() => onNavigate(`/doctor/create-record?patientId=${a.patient_id}`)}>+ Record</Btn>
          <Btn size="sm" variant="outline" onClick={() => onNavigate(`/doctor/create-prescription?patientId=${a.patient_id}`)}>+ Rx</Btn>
          <Btn size="sm" variant="secondary" onClick={() => onNavigate(`/doctor/request-lab?patientId=${a.patient_id}`)}>+ Lab</Btn>
          <Btn size="sm" variant="ghost" onClick={() => onNavigate(`/doctor/patients/${a.patient_id}`)}>View</Btn>
          <Btn
            size="sm"
            disabled={isCompleting}
            onClick={() => onComplete(a.id)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
          >
            {isCompleting ? "..." : "✓ Done"}
          </Btn>
        </div>
      )}

      {isLocked && (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0
          ${isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
          {isCompleted ? "Completed" : "Cancelled"}
        </span>
      )}
    </div>
  );
};

const DayGroup = ({ list, completing, onComplete, onNavigate }) => (
  <div className="mb-6 last:mb-0">
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
      {formatDay(list[0].appointment_time)}
    </p>
    <div className="space-y-2">
      {[...list]
        .sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time))
        .map((a) => (
          <AppointmentCard
            key={a.id}
            a={a}
            completing={completing}
            onComplete={onComplete}
            onNavigate={onNavigate}
          />
        ))}
    </div>
  </div>
);

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [completing,   setCompleting]   = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMyAppointments()
      .then((res) => {
        const data = res.data;

        // ── F12 → Console to read this ──────────────────────────────────────
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📋 API returned", data.length, "appointments");
        console.log("Status breakdown:", data.reduce((acc, a) => {
          acc[a.status] = (acc[a.status] || 0) + 1; return acc;
        }, {}));
        data.forEach(a =>
          console.log(`  #${a.id} | status: "${a.status}" | patient: ${a.patient_name} | time: ${a.appointment_time}`)
        );
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        // ────────────────────────────────────────────────────────────────────

        setAppointments(data);
      })
      .catch((err) => {
        console.error("❌ getMyAppointments error:", err.response?.data ?? err.message);
        setError("Failed to load appointments");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleComplete = useCallback(async (appointmentId) => {
    if (!window.confirm("Mark this appointment as completed? This cannot be undone.")) return;
    setCompleting(appointmentId);
    try {
      const res = await updateMyAppointment(appointmentId, { status: "completed" });
      // ── F12 → Console ──
      console.log("✅ PATCH response for #" + appointmentId + ":", res.data);
      // ───────────────────
      setAppointments((prev) =>
        prev.map((a) => a.id === appointmentId ? { ...a, status: "completed" } : a)
      );
    } catch (err) {
      console.error("❌ PATCH failed:", err.response?.data ?? err.message);
      setError(err.response?.data?.message || "Failed to complete appointment");
    } finally {
      setCompleting(null);
    }
  }, []);

  const upcoming  = appointments.filter((a) => a.status === "scheduled");
  const completed = appointments.filter((a) => a.status !== "scheduled");

  const upcomingByDay  = groupByDay(upcoming);
  const completedByDay = groupByDay(completed);

  if (loading) return <PageWrapper><TableSkeleton /></PageWrapper>;

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
        <p className="text-slate-500 text-sm mt-1">
          {upcoming.length} upcoming · {completed.length} completed
        </p>
      </div>

      <ErrorMsg message={error} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
            <h2 className="font-semibold text-slate-800">Upcoming</h2>
            <span className="ml-auto bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-lg font-semibold">
              {upcoming.length}
            </span>
          </div>
          {Object.keys(upcomingByDay).length === 0 ? (
            <EmptyState message="No upcoming appointments" icon="📅" />
          ) : (
            Object.entries(upcomingByDay)
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .map(([day, list]) => (
                <DayGroup key={day} list={list} completing={completing} onComplete={handleComplete} onNavigate={navigate} />
              ))
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            <h2 className="font-semibold text-slate-800">Completed</h2>
            <span className="ml-auto bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-lg font-semibold">
              {completed.length}
            </span>
          </div>
          {Object.keys(completedByDay).length === 0 ? (
            <EmptyState message="No completed appointments" icon="✅" />
          ) : (
            <div className="max-h-[600px] overflow-y-auto pr-1">
              {Object.entries(completedByDay)
                .sort(([a], [b]) => new Date(b) - new Date(a))
                .map(([day, list]) => (
                  <DayGroup key={day} list={list} completing={completing} onComplete={handleComplete} onNavigate={navigate} />
                ))}
            </div>
          )}
        </Card>

      </div>
    </PageWrapper>
  );
}