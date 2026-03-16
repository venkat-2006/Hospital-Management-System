// import { useState, useEffect } from "react";
// import { getMyRecords } from "../../api/services/patientService";
// import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td } from "../../components/UI";

// const MyRecords = () => {

//   const [records,setRecords] = useState([]);
//   const [loading,setLoading] = useState(true);
//   const [error,setError] = useState("");

//   useEffect(()=>{

//     getMyRecords()
//       .then(res => setRecords(res.data))
//       .catch(()=>setError("Failed to load records"))
//       .finally(()=>setLoading(false));

//   },[]);

//   if(loading) return <PageWrapper><LoadingSpinner/></PageWrapper>;
//   if(error) return <PageWrapper><ErrorMsg message={error}/></PageWrapper>;

//   return(

//     <PageWrapper title="My Medical Records">

//       <Card>

//         <Table headers={["Date","Diagnosis","Treatment","Notes"]}>

//           {records.map(r => (

//             <Tr key={r.id}>

//               <Td>
//                 {r.created_at
//                   ? new Date(r.created_at).toLocaleDateString()
//                   : "—"}
//               </Td>

//               <Td>{r.diagnosis}</Td>

//               <Td>{r.treatment}</Td>

//               <Td>{r.notes || "—"}</Td>

//             </Tr>

//           ))}

//         </Table>

//         {records.length === 0 && (
//           <p className="text-center text-slate-500 py-6">
//             No records found
//           </p>
//         )}

//       </Card>

//     </PageWrapper>

//   );

// };

// export default MyRecords;
import { useState, useEffect } from "react";
import { getMyRecords } from "../../api/services/patientService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg } from "../../components/UI";

const MyRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    getMyRecords()
      .then(res => setRecords(res.data))
      .catch(() => setError("Failed to load records"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error)   return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title="My Medical Records">

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Total Records</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{records.length}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">Latest</p>
          <p className="text-sm font-bold text-emerald-700 mt-1">
            {records[0]
              ? new Date(records[0].created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
              : "—"}
          </p>
        </div>
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-violet-500 uppercase tracking-wide">Doctors</p>
          <p className="text-2xl font-bold text-violet-700 mt-1">
            {new Set(records.map(r => r.doctor_id)).size}
          </p>
        </div>
      </div>

      <Card>
        <h2 className="font-semibold text-slate-800 mb-4">Records</h2>

        {records.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">📋</p>
            <p className="text-slate-400 text-sm">No medical records found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map(r => (
              <div key={r.id} className="border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-slate-800">{r.diagnosis}</span>
                      {r.treatment && (
                        <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                          {r.treatment}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      👨‍⚕️ {r.doctor_name || `Doctor #${r.doctor_id}`}
                      {r.specialization && ` · ${r.specialization}`}
                    </p>
                    {r.notes && (
                      <p className="text-sm text-slate-500 mt-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                        📝 {r.notes}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                    {r.created_at
                      ? new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                      : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </PageWrapper>
  );
};

export default MyRecords;