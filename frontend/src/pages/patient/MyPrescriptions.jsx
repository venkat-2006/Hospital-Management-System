// import { useState, useEffect } from "react";
// import { getMyRecords } from "../../api/services/patientService";
// import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td } from "../../components/UI";

// const MyRecords = () => {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getMyRecords()
//       .then((res) => setRecords(res.data))
//       .catch(() => setError("Failed to load records"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
//   if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

//   return (
//     <PageWrapper title="My Medical Records">
//       <Card>
//         <Table headers={["Date", "Doctor", "Diagnosis", "Notes"]}>
//           {records.map((r) => (
//             <Tr key={r.id}>
//               <Td className="text-slate-500 whitespace-nowrap">
//                 {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
//               </Td>
//               <Td>{r.doctor_name || `Doctor #${r.doctor_id}`}</Td>
//               <Td><span className="font-semibold">{r.diagnosis}</span></Td>
//               <Td className="text-slate-500">{r.notes || "—"}</Td>
//             </Tr>
//           ))}
//         </Table>
//         {records.length === 0 && (
//           <p className="text-slate-500 text-center py-6">No medical records found.</p>
//         )}
//       </Card>
//     </PageWrapper>
//   );
// };

// export default MyRecords;
import { useState, useEffect } from "react";
import { getMyPrescriptions } from "../../api/services/patientService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg } from "../../components/UI";

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState("");

 useEffect(() => {
  getMyPrescriptions()
    .then(res => {
      console.log("PRESCRIPTIONS:", res.data); // check fields
      setPrescriptions(res.data);
    })
    .catch(() => setError("Failed to load prescriptions"))
    .finally(() => setLoading(false));
}, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error)   return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  // Group by diagnosis (record)
  const grouped = prescriptions.reduce((acc, p) => {
    const key = p.diagnosis || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <PageWrapper title="My Prescriptions">

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-violet-500 uppercase tracking-wide">Total Medicines</p>
          <p className="text-2xl font-bold text-violet-700 mt-1">{prescriptions.length}</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Diagnoses</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{Object.keys(grouped).length}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">Doctors</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {new Set(prescriptions.map(p => p.doctor_id)).size}
          </p>
        </div>
      </div>

      {prescriptions.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-3xl mb-2">💊</p>
            <p className="text-slate-400 text-sm">No prescriptions found</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([diagnosis, meds]) => (
            <Card key={diagnosis}>
              {/* Group header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">{diagnosis}</p>
                  {meds[0]?.doctor_name && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      👨‍⚕️ {meds[0].doctor_name}
                      {meds[0].specialization && ` · ${meds[0].specialization}`}
                    </p>
                  )}
                </div>
                <span className="text-xs bg-violet-50 text-violet-600 border border-violet-100
                                 px-2.5 py-1 rounded-lg font-semibold">
                  {meds.length} medicine{meds.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Medicine cards */}
              <div className="space-y-2">
                {meds.map(p => (
                  <div key={p.id}
                    className="flex items-center justify-between gap-3 bg-violet-50
                               border border-violet-100 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💊</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">
                          {p.medicine_name || p.medicine_name_text || "Medicine"}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          {p.dosage && (
                            <span className="text-xs bg-white border border-violet-200
                                             text-violet-700 px-2 py-0.5 rounded-full">
                              {p.dosage}
                            </span>
                          )}
                          {p.duration && (
                            <span className="text-xs bg-white border border-blue-200
                                             text-blue-600 px-2 py-0.5 rounded-full">
                              ⏱ {p.duration}
                            </span>
                          )}
                          {p.quantity && (
                            <span className="text-xs text-slate-500">
                              Qty: {p.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {p.medicine_price && (
                      <span className="text-sm font-semibold text-slate-700 flex-shrink-0">
                        ₹{parseFloat(p.medicine_price).toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default MyPrescriptions;