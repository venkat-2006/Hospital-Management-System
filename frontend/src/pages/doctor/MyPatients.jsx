// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getMyPatients } from "../../api/services/doctorService";
// import { PageWrapper, Card, TableSkeleton, ErrorMsg, Table, Tr, Td, Btn, EmptyState } from "../../components/UI";

// const MyPatients = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     getMyPatients()
//       .then(res => setPatients(res.data))
//       .catch(() => setError("Failed to load patients"))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <PageWrapper>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-slate-800">My Patients</h1>
//         <p className="text-slate-500 text-sm mt-1">{patients.length} patients under your care</p>
//       </div>
//       <ErrorMsg message={error} />
//       <Card>
//         {loading ? <TableSkeleton /> : patients.length === 0 ? <EmptyState message="No patients yet" icon="👥" /> : (
//           <Table>
//             <thead>
//               <Tr header>
//                 <Td header>Name</Td>
//                 <Td header>Gender</Td>
//                 <Td header>Phone</Td>
//                 <Td header>Date of Birth</Td>
//                 <Td header>Actions</Td>
//               </Tr>
//             </thead>
//             <tbody>
//               {patients.map(p => (
//                 <Tr key={p.patient_id}>
//                   <Td><span className="font-medium text-slate-800">{p.name}</span></Td>
//                   <Td><span className="capitalize text-slate-500">{p.gender || "—"}</span></Td>
//                   <Td><span className="text-slate-500">{p.phone || "—"}</span></Td>
//                   <Td><span className="text-slate-400 text-xs">{p.date_of_birth ? new Date(p.date_of_birth).toLocaleDateString() : "—"}</span></Td>
//                   <Td>
//                     <div className="flex gap-2">
//                       <Btn size="sm"
//                         onClick={() => navigate(`/doctor/patients/${p.patient_id}`)}>
//                         View
//                       </Btn>
//                       <Btn size="sm" variant="outline"
//                         onClick={() => navigate(`/doctor/create-record?patientId=${p.patient_id}`)}>
//                         + Record
//                       </Btn>
//                       <Btn size="sm" variant="secondary"
//                         onClick={() => navigate(`/doctor/create-prescription?patientId=${p.patient_id}`)}>
//                         + Prescribe
//                       </Btn>
//                       <Btn size="sm" variant="ghost"
//                         onClick={() => navigate(`/doctor/request-lab?patientId=${p.patient_id}`)}>
//                         + Lab
//                       </Btn>
//                     </div>
//                   </Td>
//                 </Tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Card>
//     </PageWrapper>
//   );
// };

// export default MyPatients;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPatients } from "../../api/services/doctorService";
import { PageWrapper, Card, TableSkeleton, ErrorMsg, Table, Tr, Td, Btn, EmptyState } from "../../components/UI";

export default function MyPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getMyPatients()
      .then(res => setPatients(res.data))
      .catch(() => setError("Failed to load patients"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">My Patients</h1>
        <p className="text-slate-500 text-sm mt-1">{patients.length} patients under your care</p>
      </div>
      <ErrorMsg message={error} />
      <Card>
        {loading ? <TableSkeleton /> : patients.length === 0 ? <EmptyState message="No patients yet" icon="👥" /> : (
          <Table>
            <thead>
              <Tr header>
                <Td header>Name</Td>
                <Td header>Gender</Td>
                <Td header>Phone</Td>
                <Td header>Date of Birth</Td>
                <Td header>Action</Td>
              </Tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <Tr key={p.patient_id}>
                  <Td><span className="font-medium text-slate-800">{p.name}</span></Td>
                  <Td><span className="capitalize text-slate-500">{p.gender || "—"}</span></Td>
                  <Td><span className="text-slate-500">{p.phone || "—"}</span></Td>
                  <Td><span className="text-slate-400 text-xs">{p.date_of_birth ? new Date(p.date_of_birth).toLocaleDateString() : "—"}</span></Td>
                  <Td>
                    <Btn size="sm" onClick={() => navigate(`/doctor/patients/${p.patient_id}`)}>
                      View Profile
                    </Btn>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </PageWrapper>
  );
}