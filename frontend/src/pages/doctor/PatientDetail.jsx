// // // import { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import {
// // //   getMyPatientData, getRecordsByPatient,
// // //   getPrescriptionsByPatient, getLabReportsByPatient,
// // // } from "../../api/services/doctorService";
// // // import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, Btn, StatusBadge } from "../../components/UI";

// // // const Section = ({ title, children }) => (
// // //   <Card>
// // //     <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">{title}</h3>
// // //     {children}
// // //   </Card>
// // // );

// // // const PatientDetail = () => {
// // //   const { patientId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [patient, setPatient] = useState(null);
// // //   const [records, setRecords] = useState([]);
// // //   const [prescriptions, setPrescriptions] = useState([]);
// // //   const [labReports, setLabReports] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     Promise.all([
// // //       getMyPatientData(patientId),
// // //       getRecordsByPatient(patientId),
// // //       getPrescriptionsByPatient(patientId),
// // //       getLabReportsByPatient(patientId),
// // //     ]).then(([p, r, rx, lab]) => {
// // //       setPatient(p.data); setRecords(r.data);
// // //       setPrescriptions(rx.data); setLabReports(lab.data);
// // //     }).catch(() => setError("Failed to load patient data"))
// // //       .finally(() => setLoading(false));
// // //   }, [patientId]);

// // //   if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
// // //   if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

// // //   return (
// // //     <PageWrapper title={`Patient: ${patient?.name || "Unknown"}`}>
// // //       <div className="mb-4">
// // //         <Btn variant="ghost" onClick={() => navigate("/doctor/patients")}>← Back to Patients</Btn>
// // //       </div>

// // //       <Section title="Patient Information">
// // //         <div className="grid grid-cols-3 gap-4 mb-4">
// // //           {[["Email", patient?.email], ["Phone", patient?.phone], ["Gender", patient?.gender],
// // //           ["Date of Birth", patient?.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : "—"],
// // //           ["Address", patient?.address],
// // //           ].map(([label, value]) => (
// // //             <div key={label}>
// // //               <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-0.5">{label}</div>
// // //               <div className="text-sm text-slate-800">{value || "—"}</div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //         <div className="flex gap-2 pt-2 border-t border-slate-100">
// // //           <Btn onClick={() => navigate(`/doctor/create-record?patientId=${patientId}`)}>+ Create Record</Btn>
// // //           <Btn variant="ghost" onClick={() => navigate(`/doctor/request-lab?patientId=${patientId}`)}>🔬 Request Lab Test</Btn>
// // //         </div>
// // //       </Section>

// // //       <Section title={`Medical Records (${records.length})`}>
// // //         {records.length === 0 ? <p className="text-slate-500 text-sm">No records found.</p> : (
// // //           <Table headers={["Date", "Diagnosis", "Notes"]}>
// // //             {records.map((r) => (
// // //               <Tr key={r.id}>
// // //                 <Td>{r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}</Td>
// // //                 <Td><span className="font-medium">{r.diagnosis}</span></Td>
// // //                 <Td className="text-slate-500">{r.notes || "—"}</Td>
// // //               </Tr>
// // //             ))}
// // //           </Table>
// // //         )}
// // //       </Section>

// // //       <Section title={`Prescriptions (${prescriptions.length})`}>
// // //         {prescriptions.length === 0 ? <p className="text-slate-500 text-sm">No prescriptions found.</p> : (
// // //           <Table headers={["Medicine", "Dosage", "Duration", "Date"]}>
// // //             {prescriptions.map((rx) => (
// // //               <Tr key={rx.id}>
// // //                 <Td><span className="font-medium">{rx.medicine_name}</span></Td>
// // //                 <Td>{rx.dosage}</Td>
// // //                 <Td>{rx.duration}</Td>
// // //                 <Td>{rx.created_at ? new Date(rx.created_at).toLocaleDateString() : "—"}</Td>
// // //               </Tr>
// // //             ))}
// // //           </Table>
// // //         )}
// // //       </Section>

// // //       <Section title={`Lab Reports (${labReports.length})`}>
// // //         {labReports.length === 0 ? <p className="text-slate-500 text-sm">No lab reports found.</p> : (
// // //           <Table headers={["Test Type", "Result", "Status", "Date"]}>
// // //             {labReports.map((l) => (
// // //               <Tr key={l.id}>
// // //                 <Td><span className="font-medium">{l.test_type}</span></Td>
// // //                 <Td>{l.result || <span className="text-slate-400 italic">Pending</span>}</Td>
// // //                 <Td><StatusBadge status={l.result ? "completed" : "pending"} /></Td>
// // //                 <Td>{l.created_at ? new Date(l.created_at).toLocaleDateString() : "—"}</Td>
// // //               </Tr>
// // //             ))}
// // //           </Table>
// // //         )}
// // //       </Section>
// // //     </PageWrapper>
// // //   );
// // // };

// // // export default PatientDetail;

// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { getMyPatientData } from "../../api/services/doctorService";
// // import { getPatientProfile } from "../../api/services/adminService";
// // import { Card, TableSkeleton, ErrorMsg, Table, Tr, Td, Btn, StatusBadge, EmptyState } from "../../components/UI";

// // const Section = ({ title, icon, count, children }) => (
// //   <Card className="mb-5">
// //     <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
// //       <span>{icon}</span>
// //       <span>{title}</span>
// //       {count !== undefined && (
// //         <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-semibold">
// //           {count}
// //         </span>
// //       )}
// //     </h3>
// //     {children}
// //   </Card>
// // );

// // export default function PatientDetail() {
// //   const { patientId } = useParams();
// //   const navigate = useNavigate();
// //   const [data, setData] = useState(null);
// //   const [patient, setPatient] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     Promise.all([
// //       getMyPatientData(patientId),
// //       getPatientProfile(patientId)
// //     ])
// //       .then(([dataRes, profileRes]) => {
// //         setData(dataRes.data);
// //         setPatient(profileRes.data);
// //       })
// //       .catch(() => setError("Failed to load patient data"))
// //       .finally(() => setLoading(false));
// //   }, [patientId]);

// //   if (loading) return <div className="p-8"><TableSkeleton rows={8} /></div>;

// //   return (
// //     <div>
// //       {/* Header */}
// //       <div className="flex items-center gap-4 mb-6">
// //         <Btn variant="secondary" onClick={() => navigate(-1)}>← Back</Btn>
// //         <div>
// //           <h1 className="text-2xl font-bold text-slate-800">{patient?.name || "Patient"}</h1>
// //           <p className="text-slate-500 text-sm">Patient profile and medical history</p>
// //         </div>
// //       </div>

// //       <ErrorMsg message={error} />

// //       {/* Patient Info Card */}
// //       <Card className="mb-6">
// //         <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">Patient Information</h3>
// //         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
// //           {[
// //             { label: "Name",         value: patient?.name },
// //             { label: "Email",        value: patient?.email },
// //             { label: "Phone",        value: patient?.phone },
// //             { label: "Gender",       value: patient?.gender },
// //             { label: "Date of Birth",value: patient?.date_of_birth?.split("T")[0] },
// //             { label: "Address",      value: patient?.address },
// //           ].map(f => (
// //             <div key={f.label}>
// //               <p className="text-xs font-medium text-slate-400 mb-0.5">{f.label}</p>
// //               <p className="text-sm font-medium text-slate-800">{f.value || "—"}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Action buttons */}
// //         <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-slate-100">
// //           <Btn onClick={() => navigate(`/doctor/create-record?patientId=${patientId}`)}>
// //             + Medical Record
// //           </Btn>
// //           <Btn variant="outline" onClick={() => navigate(`/doctor/create-prescription?patientId=${patientId}`)}>
// //             + Prescription
// //           </Btn>
// //           <Btn variant="secondary" onClick={() => navigate(`/doctor/request-lab?patientId=${patientId}`)}>
// //             + Lab Test
// //           </Btn>
// //         </div>
// //       </Card>

// //       {/* Medical Records */}
// //       <Section title="Medical Records" icon="📋" count={data?.medical_records?.length}>
// //         {!data?.medical_records?.length ? <EmptyState message="No records" /> : (
// //           <Table>
// //             <thead>
// //               <Tr header>
// //                 <Td header>Date</Td>
// //                 <Td header>Diagnosis</Td>
// //                 <Td header>Treatment</Td>
// //                 <Td header>Notes</Td>
// //               </Tr>
// //             </thead>
// //             <tbody>
// //               {data.medical_records.map(r => (
// //                 <Tr key={r.id}>
// //                   <Td><span className="text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString()}</span></Td>
// //                   <Td><span className="font-medium text-slate-800">{r.diagnosis}</span></Td>
// //                   <Td>{r.treatment}</Td>
// //                   <Td><span className="text-slate-400">{r.notes || "—"}</span></Td>
// //                 </Tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         )}
// //       </Section>

// //       {/* Prescriptions */}
// //       <Section title="Prescriptions" icon="💊" count={data?.prescriptions?.length}>
// //         {!data?.prescriptions?.length ? <EmptyState message="No prescriptions" /> : (
// //           <Table>
// //             <thead>
// //               <Tr header>
// //                 <Td header>Medicine</Td>
// //                 <Td header>Dosage</Td>
// //                 <Td header>Duration</Td>
// //               </Tr>
// //             </thead>
// //             <tbody>
// //               {data.prescriptions.map(p => (
// //                 <Tr key={p.id}>
// //                   <Td>
// //                     <span className="bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
// //                       {p.medicine_name}
// //                     </span>
// //                   </Td>
// //                   <Td>{p.dosage}</Td>
// //                   <Td>{p.duration}</Td>
// //                 </Tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         )}
// //       </Section>

// //       {/* Lab Reports */}
// //       <Section title="Lab Reports" icon="🧪" count={data?.lab_reports?.length}>
// //         {!data?.lab_reports?.length ? <EmptyState message="No lab reports" /> : (
// //           <Table>
// //             <thead>
// //               <Tr header>
// //                 <Td header>Test</Td>
// //                 <Td header>Result</Td>
// //                 <Td header>Status</Td>
// //                 <Td header>Date</Td>
// //               </Tr>
// //             </thead>
// //             <tbody>
// //               {data.lab_reports.map(l => (
// //                 <Tr key={l.id}>
// //                   <Td><span className="font-medium">{l.test_type}</span></Td>
// //                   <Td>{l.result ?? <span className="text-slate-400 italic text-xs">Awaiting</span>}</Td>
// //                   <Td><StatusBadge status={l.status} /></Td>
// //                   <Td><span className="text-xs text-slate-400">{new Date(l.created_at).toLocaleDateString()}</span></Td>
// //                 </Tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         )}
// //       </Section>
// //     </div>
// //   );
// // }
// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { getMyPatientData } from "../../api/services/doctorService";
// // import { Card, TableSkeleton, ErrorMsg, Table, Tr, Td, Btn, StatusBadge, EmptyState } from "../../components/UI";

// // const Section = ({ title, icon, count, children }) => (
// //   <Card className="mb-5">
// //     <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
// //       <span>{icon}</span>
// //       <span>{title}</span>
// //       {count !== undefined && (
// //         <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-semibold">
// //           {count}
// //         </span>
// //       )}
// //     </h3>
// //     {children}
// //   </Card>
// // );

// // export default function PatientDetail() {
// //   const { patientId } = useParams();
// //   const navigate      = useNavigate();
// //   const [data,    setData]    = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error,   setError]   = useState("");

// //   useEffect(() => {
// //     getMyPatientData(patientId)
// //       .then((res) => {
// //         // Backend returns: { patient: {...}, medical_records: [], prescriptions: [], lab_reports: [] }
// //         // OR it might return the patient fields at the top level — handle both shapes:
// //         const body = res.data;
// //         if (body.patient) {
// //           // nested shape: { patient: {...}, medical_records: [], ... }
// //           setData(body);
// //         } else {
// //           // flat shape: patient fields mixed with arrays — pull them out
// //           const { medical_records, prescriptions, lab_reports, ...patientFields } = body;
// //           setData({ patient: patientFields, medical_records, prescriptions, lab_reports });
// //         }
// //       })
// //       .catch((err) => {
// //         const msg = err.response?.data?.message || "Failed to load patient data";
// //         setError(msg);
// //       })
// //       .finally(() => setLoading(false));
// //   }, [patientId]);

// //   if (loading) return <div className="p-8"><TableSkeleton rows={8} /></div>;

// //   const patient = data?.patient;

// //   return (
// //     <div>
// //       {/* Header */}
// //       <div className="flex items-center gap-4 mb-6">
// //         <Btn variant="secondary" onClick={() => navigate(-1)}>← Back</Btn>
// //         <div>
// //           <h1 className="text-2xl font-bold text-slate-800">{patient?.name || "Patient"}</h1>
// //           <p className="text-slate-500 text-sm">Patient profile and medical history</p>
// //         </div>
// //       </div>

// //       {error && <ErrorMsg message={error} />}

// //       {/* Patient Info */}
// //       <Card className="mb-6">
// //         <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">
// //           Patient Information
// //         </h3>
// //         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
// //           {[
// //             { label: "Name",          value: patient?.name },
// //             { label: "Phone",         value: patient?.phone },
// //             { label: "Gender",        value: patient?.gender },
// //             { label: "Date of Birth", value: patient?.date_of_birth?.split("T")[0] },
// //             { label: "Address",       value: patient?.address },
// //           ].map((f) => (
// //             <div key={f.label}>
// //               <p className="text-xs font-medium text-slate-400 mb-0.5">{f.label}</p>
// //               <p className="text-sm font-medium text-slate-800">{f.value || "—"}</p>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-slate-100">
// //           <Btn onClick={() => navigate(`/doctor/create-record?patientId=${patientId}`)}>
// //             + Medical Record
// //           </Btn>
// //           <Btn variant="outline" onClick={() => navigate(`/doctor/create-prescription?patientId=${patientId}`)}>
// //             + Prescription
// //           </Btn>
// //           <Btn variant="secondary" onClick={() => navigate(`/doctor/request-lab?patientId=${patientId}`)}>
// //             + Lab Test
// //           </Btn>
// //         </div>
// //       </Card>

// //       {/* Medical Records */}
// //       <Section title="Medical Records" icon="📋" count={data?.medical_records?.length}>
// //         {!data?.medical_records?.length ? (
// //           <EmptyState message="No records yet" />
// //         ) : (
// //           <Table>
// //             <thead>
// //               <Tr header>
// //                 <Td header>Date</Td>
// //                 <Td header>Diagnosis</Td>
// //                 <Td header>Treatment</Td>
// //                 <Td header>Notes</Td>
// //               </Tr>
// //             </thead>
// //             <tbody>
// //               {data.medical_records.map((r) => (
// //                 <Tr key={r.id}>
// //                   <Td><span className="text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString()}</span></Td>
// //                   <Td><span className="font-medium text-slate-800">{r.diagnosis}</span></Td>
// //                   <Td>{r.treatment}</Td>
// //                   <Td><span className="text-slate-400">{r.notes || "—"}</span></Td>
// //                 </Tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         )}
// //       </Section>

// //       {/* Prescriptions */}
// //       <Section title="Prescriptions" icon="💊" count={data?.prescriptions?.length}>
// //         {!data?.prescriptions?.length ? (
// //           <EmptyState message="No prescriptions yet" />
// //         ) : (
// //           <Table>
// //             <thead>
// //               <Tr header>
// //                 <Td header>Medicine</Td>
// //                 <Td header>Dosage</Td>
// //                 <Td header>Duration</Td>
// //               </Tr>
// //             </thead>
// //             <tbody>
// //               {data.prescriptions.map((p) => (
// //                 <Tr key={p.id}>
// //                   <Td>
// //                     <span className="bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
// //                       {p.medicine_name}
// //                     </span>
// //                   </Td>
// //                   <Td>{p.dosage}</Td>
// //                   <Td>{p.duration}</Td>
// //                 </Tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         )}
// //       </Section>

// //       {/* Lab Reports */}
// //       <Section title="Lab Reports" icon="🧪" count={data?.lab_reports?.length}>
// //         {!data?.lab_reports?.length ? (
// //           <EmptyState message="No lab reports yet" />
// //         ) : (
// //           <Table>
// //             <thead>
// //               <Tr header>
// //                 <Td header>Test</Td>
// //                 <Td header>Result</Td>
// //                 <Td header>Status</Td>
// //                 <Td header>Date</Td>
// //               </Tr>
// //             </thead>
// //             <tbody>
// //               {data.lab_reports.map((l) => (
// //                 <Tr key={l.id}>
// //                   <Td><span className="font-medium">{l.test_type}</span></Td>
// //                   <Td>{l.result ?? <span className="text-slate-400 italic text-xs">Awaiting result</span>}</Td>
// //                   <Td><StatusBadge status={l.status} /></Td>
// //                   <Td><span className="text-xs text-slate-400">{new Date(l.created_at).toLocaleDateString()}</span></Td>
// //                 </Tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         )}
// //       </Section>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getMyPatientData } from "../../api/services/doctorService";
// import { Card, TableSkeleton, ErrorMsg, Table, Tr, Td, Btn, StatusBadge, EmptyState } from "../../components/UI";

// const Section = ({ title, icon, count, children }) => (
//   <Card className="mb-5">
//     <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
//       <span>{icon}</span>
//       <span>{title}</span>
//       {count !== undefined && (
//         <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-semibold">
//           {count}
//         </span>
//       )}
//     </h3>
//     {children}
//   </Card>
// );

// export default function PatientDetail() {
//   const { patientId } = useParams();
//   const navigate      = useNavigate();
//   const [data,    setData]    = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState("");

//   useEffect(() => {
//     getMyPatientData(patientId)
//       .then((res) => {
//         const body = res.data;

//         // ── DEBUG: remove this once patient info is showing correctly ──
//         console.log("[PatientDetail] raw API response:", JSON.stringify(body, null, 2));

//         const medical_records = body.medical_records ?? [];
//         const prescriptions   = body.prescriptions   ?? [];
//         const lab_reports     = body.lab_reports     ?? [];

//         // Try every key the backend might use for the patient object
//         const patient =
//           body.patient      ??  // { patient: { name, phone, ... }, medical_records: [] }
//           body.patient_info ??  // { patient_info: { ... }, ... }
//           body.patientInfo  ??  // camelCase
//           body.profile      ??  // { profile: { ... }, ... }
//           // Flat shape — patient fields sit directly on the body alongside the arrays
//           (body.name != null
//             ? {
//                 name:          body.name,
//                 phone:         body.phone,
//                 gender:        body.gender,
//                 date_of_birth: body.date_of_birth,
//                 address:       body.address,
//               }
//             : null);

//         setData({ patient, medical_records, prescriptions, lab_reports });
//       })
//       .catch((err) => {
//         console.error("[PatientDetail] fetch error:", err.response ?? err);
//         setError(err.response?.data?.message || "Failed to load patient data");
//       })
//       .finally(() => setLoading(false));
//   }, [patientId]);

//   if (loading) return <div className="p-8"><TableSkeleton rows={8} /></div>;

//   const patient = data?.patient;

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-6">
//         <Btn variant="secondary" onClick={() => navigate(-1)}>← Back</Btn>
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">{patient?.name || "Patient"}</h1>
//           <p className="text-slate-500 text-sm">Patient profile and medical history</p>
//         </div>
//       </div>

//       {error && <ErrorMsg message={error} />}

//       {/* Patient Info */}
//       <Card className="mb-6">
//         <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">
//           Patient Information
//         </h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//           {[
//             { label: "Name",          value: patient?.name },
//             { label: "Phone",         value: patient?.phone },
//             { label: "Gender",        value: patient?.gender },
//             { label: "Date of Birth", value: patient?.date_of_birth?.split("T")[0] },
//             { label: "Address",       value: patient?.address },
//           ].map((f) => (
//             <div key={f.label}>
//               <p className="text-xs font-medium text-slate-400 mb-0.5">{f.label}</p>
//               <p className="text-sm font-medium text-slate-800">{f.value || "—"}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-slate-100">
//           <Btn onClick={() => navigate(`/doctor/create-record?patientId=${patientId}`)}>
//             + Medical Record
//           </Btn>
//           <Btn variant="outline" onClick={() => navigate(`/doctor/create-prescription?patientId=${patientId}`)}>
//             + Prescription
//           </Btn>
//           <Btn variant="secondary" onClick={() => navigate(`/doctor/request-lab?patientId=${patientId}`)}>
//             + Lab Test
//           </Btn>
//         </div>
//       </Card>

//       {/* Medical Records */}
//       <Section title="Medical Records" icon="📋" count={data?.medical_records?.length}>
//         {!data?.medical_records?.length ? (
//           <EmptyState message="No records yet" />
//         ) : (
//           <Table>
//             <thead>
//               <Tr header>
//                 <Td header>Date</Td>
//                 <Td header>Diagnosis</Td>
//                 <Td header>Treatment</Td>
//                 <Td header>Notes</Td>
//               </Tr>
//             </thead>
//             <tbody>
//               {data.medical_records.map((r) => (
//                 <Tr key={r.id}>
//                   <Td><span className="text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString()}</span></Td>
//                   <Td><span className="font-medium text-slate-800">{r.diagnosis}</span></Td>
//                   <Td>{r.treatment}</Td>
//                   <Td><span className="text-slate-400">{r.notes || "—"}</span></Td>
//                 </Tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Section>

//       {/* Prescriptions */}
//       <Section title="Prescriptions" icon="💊" count={data?.prescriptions?.length}>
//         {!data?.prescriptions?.length ? (
//           <EmptyState message="No prescriptions yet" />
//         ) : (
//           <Table>
//             <thead>
//               <Tr header>
//                 <Td header>Medicine</Td>
//                 <Td header>Dosage</Td>
//                 <Td header>Duration</Td>
//               </Tr>
//             </thead>
//             <tbody>
//               {data.prescriptions.map((p) => (
//                 <Tr key={p.id}>
//                   <Td>
//                     <span className="bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
//                       {p.medicine_name}
//                     </span>
//                   </Td>
//                   <Td>{p.dosage}</Td>
//                   <Td>{p.duration}</Td>
//                 </Tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Section>

//       {/* Lab Reports */}
//       <Section title="Lab Reports" icon="🧪" count={data?.lab_reports?.length}>
//         {!data?.lab_reports?.length ? (
//           <EmptyState message="No lab reports yet" />
//         ) : (
//           <Table>
//             <thead>
//               <Tr header>
//                 <Td header>Test</Td>
//                 <Td header>Result</Td>
//                 <Td header>Status</Td>
//                 <Td header>Date</Td>
//               </Tr>
//             </thead>
//             <tbody>
//               {data.lab_reports.map((l) => (
//                 <Tr key={l.id}>
//                   <Td><span className="font-medium">{l.test_type}</span></Td>
//                   <Td>{l.result ?? <span className="text-slate-400 italic text-xs">Awaiting result</span>}</Td>
//                   <Td><StatusBadge status={l.status} /></Td>
//                   <Td><span className="text-xs text-slate-400">{new Date(l.created_at).toLocaleDateString()}</span></Td>
//                 </Tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Section>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyPatientData } from "../../api/services/doctorService";
import { getPatientById } from "../../api/services/patientService"; // ← uses GET /patients/:patientId/profile
import { Card, TableSkeleton, ErrorMsg, Table, Tr, Td, Btn, StatusBadge, EmptyState } from "../../components/UI";

const Section = ({ title, icon, count, children }) => (
  <Card className="mb-5">
    <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
      <span>{icon}</span>
      <span>{title}</span>
      {count !== undefined && (
        <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-semibold">
          {count}
        </span>
      )}
    </h3>
    {children}
  </Card>
);

export default function PatientDetail() {
  const { patientId } = useParams();
  const navigate      = useNavigate();
  const [data,    setData]    = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    Promise.all([
      getMyPatientData(patientId),   // GET /doctor/my-patients/:patientId  → { medical_records, prescriptions, lab_reports }
      getPatientById(patientId),     // GET /patients/:patientId/profile     → { id, name, phone, gender, date_of_birth, address, ... }
    ])
      .then(([dataRes, patientRes]) => {
        setData(dataRes.data);
        setPatient(patientRes.data);
      })
      .catch((err) => {
        console.error("[PatientDetail] error:", err.response ?? err);
        setError(err.response?.data?.message || "Failed to load patient data");
      })
      .finally(() => setLoading(false));
  }, [patientId]);

  if (loading) return <div className="p-8"><TableSkeleton rows={8} /></div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Btn variant="secondary" onClick={() => navigate(-1)}>← Back</Btn>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{patient?.name || "Patient"}</h1>
          <p className="text-slate-500 text-sm">Patient profile and medical history</p>
        </div>
      </div>

      {error && <ErrorMsg message={error} />}

      {/* Patient Info */}
      <Card className="mb-6">
        <h3 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">
          Patient Information
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Name",          value: patient?.name },
            { label: "Phone",         value: patient?.phone },
            { label: "Gender",        value: patient?.gender },
            { label: "Date of Birth", value: patient?.date_of_birth?.split("T")[0] },
            { label: "Address",       value: patient?.address },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-xs font-medium text-slate-400 mb-0.5">{f.label}</p>
              <p className="text-sm font-medium text-slate-800">{f.value || "—"}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-slate-100">
          <Btn onClick={() => navigate(`/doctor/create-record?patientId=${patientId}`)}>
            + Medical Record
          </Btn>
          <Btn variant="outline" onClick={() => navigate(`/doctor/create-prescription?patientId=${patientId}`)}>
            + Prescription
          </Btn>
          <Btn variant="secondary" onClick={() => navigate(`/doctor/request-lab?patientId=${patientId}`)}>
            + Lab Test
          </Btn>
        </div>
      </Card>

      {/* Medical Records */}
      <Section title="Medical Records" icon="📋" count={data?.medical_records?.length}>
        {!data?.medical_records?.length ? (
          <EmptyState message="No records yet" />
        ) : (
          <Table>
            <thead>
              <Tr header>
                <Td header>Date</Td>
                <Td header>Diagnosis</Td>
                <Td header>Treatment</Td>
                <Td header>Notes</Td>
              </Tr>
            </thead>
            <tbody>
              {data.medical_records.map((r) => (
                <Tr key={r.id}>
                  <Td><span className="text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString()}</span></Td>
                  <Td><span className="font-medium text-slate-800">{r.diagnosis}</span></Td>
                  <Td>{r.treatment}</Td>
                  <Td><span className="text-slate-400">{r.notes || "—"}</span></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Section>

      {/* Prescriptions */}
      <Section title="Prescriptions" icon="💊" count={data?.prescriptions?.length}>
        {!data?.prescriptions?.length ? (
          <EmptyState message="No prescriptions yet" />
        ) : (
          <Table>
            <thead>
              <Tr header>
                <Td header>Medicine</Td>
                <Td header>Dosage</Td>
                <Td header>Duration</Td>
              </Tr>
            </thead>
            <tbody>
              {data.prescriptions.map((p) => (
                <Tr key={p.id}>
                  <Td>
                    <span className="bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {p.medicine_name}
                    </span>
                  </Td>
                  <Td>{p.dosage}</Td>
                  <Td>{p.duration}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Section>

      {/* Lab Reports */}
      <Section title="Lab Reports" icon="🧪" count={data?.lab_reports?.length}>
        {!data?.lab_reports?.length ? (
          <EmptyState message="No lab reports yet" />
        ) : (
          <Table>
            <thead>
              <Tr header>
                <Td header>Test</Td>
                <Td header>Result</Td>
                <Td header>Status</Td>
                <Td header>Date</Td>
              </Tr>
            </thead>
            <tbody>
              {data.lab_reports.map((l) => (
                <Tr key={l.id}>
                  <Td><span className="font-medium">{l.test_type}</span></Td>
                  <Td>{l.result ?? <span className="text-slate-400 italic text-xs">Awaiting result</span>}</Td>
                  <Td><StatusBadge status={l.status} /></Td>
                  <Td><span className="text-xs text-slate-400">{new Date(l.created_at).toLocaleDateString()}</span></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Section>
    </div>
  );
}