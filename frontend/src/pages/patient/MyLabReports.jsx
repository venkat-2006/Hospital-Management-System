// import { useState, useEffect } from "react";
// import { getMyLabReports } from "../../api/services/patientService";
// import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, StatusBadge } from "../../components/UI";

// const MyLabReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getMyLabReports()
//       .then((res) => setReports(res.data))
//       .catch(() => setError("Failed to load lab reports"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
//   if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

//   return (
//     <PageWrapper title="My Lab Reports">
//       <Card>
//         <Table headers={["Date", "Test Type", "Result", "Status"]}>
//           {reports.map((r) => (
//             <Tr key={r.id}>
//               <Td className="text-slate-500 whitespace-nowrap">
//                 {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
//               </Td>
//               <Td><span className="font-semibold">{r.test_type}</span></Td>
//               <Td>
//                 {r.result
//                   ? r.result
//                   : <span className="text-slate-400 italic">Awaiting result</span>}
//               </Td>
//               <Td>
//                 <StatusBadge status={r.result ? "completed" : "pending"} />
//               </Td>
//             </Tr>
//           ))}
//         </Table>
//         {reports.length === 0 && (
//           <p className="text-slate-500 text-center py-6">No lab reports found.</p>
//         )}
//       </Card>
//     </PageWrapper>
//   );
// };

// export default MyLabReports;
import { useState, useEffect } from "react";
import { getMyLabReports } from "../../api/services/patientService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg } from "../../components/UI";

const MyLabReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    getMyLabReports()
      .then(res => setReports(res.data))
      .catch(() => setError("Failed to load lab reports"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error)   return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  const completed = reports.filter(r => r.status === "completed" || r.result);
  const pending   = reports.filter(r => r.status !== "completed" && !r.result);

  return (
    <PageWrapper title="My Lab Reports">

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Total</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{reports.length}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">Completed</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{completed.length}</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-amber-500 uppercase tracking-wide">Pending</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{pending.length}</p>
        </div>
      </div>

      <Card>
        <h2 className="font-semibold text-slate-800 mb-4">Lab Reports</h2>

        {reports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">🧪</p>
            <p className="text-slate-400 text-sm">No lab reports found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map(r => {
              const isDone = r.status === "completed" || !!r.result;
              return (
                <div key={r.id}
                  className={`border rounded-xl p-4 transition-colors
                    ${isDone ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"}`}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-slate-800">🔬 {r.test_type}</span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full
                          ${isDone
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"}`}>
                          {isDone ? "✓ Completed" : "⏳ Pending"}
                        </span>
                      </div>
                      {r.doctor_name && (
                        <p className="text-xs text-slate-500 mb-2">
                          👨‍⚕️ {r.doctor_name}
                        </p>
                      )}
                      {r.result ? (
                        <div className="bg-white border border-emerald-200 rounded-lg px-3 py-2 mt-2">
                          <p className="text-xs font-semibold text-emerald-600 mb-0.5">Result</p>
                          <p className="text-sm text-slate-700">{r.result}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-amber-600 italic mt-1">Awaiting result from lab</p>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                      {r.created_at
                        ? new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </PageWrapper>
  );
};

export default MyLabReports;