// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./router/ProtectedRoute";
// import Layout from "./components/Layout";

// // Auth
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Unauthorized from "./pages/Unauthorized";

// // Admin
// import AdminDashboard from "./pages/admin/Dashboard";
// import ManageUsers from "./pages/admin/ManageUsers";
// import ManageDoctors from "./pages/admin/ManageDoctors";
// import Medicines from "./pages/admin/Medicines";
// import AdminBills from "./pages/admin/bills";

// // Doctor
// import DoctorDashboard from "./pages/doctor/Dashboard";
// import DoctorAppointments from "./pages/doctor/MyAppointments";
// import MyPatients from "./pages/doctor/MyPatients";
// import PatientDetail from "./pages/doctor/PatientDetail";
// import CreateRecord from "./pages/doctor/CreateRecord";
// import CreatePrescription from "./pages/doctor/CreatePrescription";
// import RequestLabTest from "./pages/doctor/RequestLabTest";

// // Patient
// import PatientDashboard from "./pages/patient/Dashboard";
// import PatientAppointments from "./pages/patient/MyAppointments";
// import RequestAppointment from "./pages/patient/RequestAppointment";
// import MyRecords from "./pages/patient/MyRecords";
// import MyPrescriptions from "./pages/patient/MyPrescriptions";
// import MyLabReports from "./pages/patient/MyLabReports";
// import MyBills from "./pages/patient/MyBills";

// // Receptionist
// import ReceptionDashboard from "./pages/receptionist/Dashboard";
// import Requests from "./pages/receptionist/Requests";
// import Schedule from "./pages/receptionist/Schedule";
// import ReceptionistBills from "./pages/receptionist/Bills";

// // Lab
// import LabDashboard from "./pages/lab/Dashboard";
// import PendingTests from "./pages/lab/PendingTests";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>

//           {/* Public routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="/" element={<Navigate to="/login" replace />} />

//           {/* Admin routes */}
//           <Route path="/admin" element={
//             <ProtectedRoute allowedRoles={["ADMIN"]}>
//               <Layout />
//             </ProtectedRoute>
//           }>
//             <Route index element={<AdminDashboard />} />
//             <Route path="users" element={<ManageUsers />} />
//             <Route path="doctors" element={<ManageDoctors />} />
//             <Route path="medicines" element={<Medicines />} />
//             <Route path="bills" element={<AdminBills />} />
//           </Route>

//           {/* Doctor routes */}
//           <Route path="/doctor" element={
//             <ProtectedRoute allowedRoles={["DOCTOR"]}>
//               <Layout />
//             </ProtectedRoute>
//           }>
//             <Route index element={<DoctorDashboard />} />
//             <Route path="appointments" element={<DoctorAppointments />} />
//             <Route path="patients" element={<MyPatients />} />
//             <Route path="patients/:patientId" element={<PatientDetail />} />
//             <Route path="create-record" element={<CreateRecord />} />
//             <Route path="create-prescription" element={<CreatePrescription />} />
//             <Route path="request-lab" element={<RequestLabTest />} />
//           </Route>

//           {/* Patient routes */}
//           <Route path="/patient" element={
//             <ProtectedRoute allowedRoles={["PATIENT"]}>
//               <Layout />
//             </ProtectedRoute>
//           }>
//             <Route index element={<PatientDashboard />} />
//             <Route path="appointments" element={<PatientAppointments />} />
//             <Route path="request" element={<RequestAppointment />} />
//             <Route path="records" element={<MyRecords />} />
//             <Route path="prescriptions" element={<MyPrescriptions />} />
//             <Route path="lab-reports" element={<MyLabReports />} />
//             <Route path="bills" element={<MyBills />} />
//           </Route>

//           {/* Receptionist routes */}
//           <Route path="/receptionist" element={
//             <ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
//               <Layout />
//             </ProtectedRoute>
//           }>
//             <Route index element={<ReceptionDashboard />} />
//             <Route path="requests" element={<Requests />} />
//             <Route path="schedule" element={<Schedule />} />
//             <Route path="bills" element={<ReceptionistBills />} />
//           </Route>

//           {/* Lab routes */}
//           <Route path="/lab" element={
//             <ProtectedRoute allowedRoles={["LAB_TECH"]}>
//               <Layout />
//             </ProtectedRoute>
//           }>
//             <Route index element={<LabDashboard />} />
//             <Route path="pending" element={<PendingTests />} />
//           </Route>

//           {/* Catch-all */}
//           <Route path="*" element={<Navigate to="/login" replace />} />

//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

/* ADMIN */

import AdminDashboard from "./pages/admin/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageDoctors from "./pages/admin/ManageDoctors";
import Medicines from "./pages/admin/Medicines";
import AdminBills from "./pages/admin/bills";

/* DOCTOR */

import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/MyAppointments";
import MyPatients from "./pages/doctor/MyPatients";
import PatientDetail from "./pages/doctor/PatientDetail";
import CreateRecord from "./pages/doctor/CreateRecord";
import CreatePrescription from "./pages/doctor/CreatePrescription";
import RequestLabTest from "./pages/doctor/RequestLabTest";

/* PATIENT */

import PatientDashboard from "./pages/patient/Dashboard";
import PatientAppointments from "./pages/patient/MyAppointments";
import RequestAppointment from "./pages/patient/RequestAppointment";
import MyRecords from "./pages/patient/MyRecords";
import MyPrescriptions from "./pages/patient/MyPrescriptions";
import MyLabReports from "./pages/patient/MyLabReports";
import MyBills from "./pages/patient/MyBills";

/* RECEPTIONIST */

import ReceptionDashboard from "./pages/receptionist/Dashboard";
import Requests from "./pages/receptionist/Requests";
import Schedule from "./pages/receptionist/Schedule";
import ReceptionistBills from "./pages/receptionist/Bills";

/* LAB */

import LabDashboard from "./pages/lab/Dashboard";
import PendingTests from "./pages/lab/PendingTests";

function App(){

return(

<AuthProvider>

<BrowserRouter>

<Routes>

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/unauthorized" element={<Unauthorized/>}/>

<Route path="/" element={<Navigate to="/login"/>}/>

{/* ADMIN */}

<Route path="/admin" element={
<ProtectedRoute allowedRoles={["ADMIN"]}>
<Layout/>
</ProtectedRoute>
}>

<Route index element={<AdminDashboard/>}/>
<Route path="users" element={<ManageUsers/>}/>
<Route path="doctors" element={<ManageDoctors/>}/>
<Route path="medicines" element={<Medicines/>}/>
<Route path="bills" element={<AdminBills/>}/>

</Route>

{/* DOCTOR */}

<Route path="/doctor" element={
<ProtectedRoute allowedRoles={["DOCTOR"]}>
<Layout/>
</ProtectedRoute>
}>

<Route index element={<DoctorDashboard/>}/>
<Route path="appointments" element={<DoctorAppointments/>}/>
<Route path="patients" element={<MyPatients/>}/>
<Route path="patients/:patientId" element={<PatientDetail/>}/>
<Route path="create-record" element={<CreateRecord/>}/>
<Route path="create-prescription" element={<CreatePrescription/>}/>
<Route path="request-lab" element={<RequestLabTest/>}/>

</Route>

{/* PATIENT */}

<Route path="/patient" element={
<ProtectedRoute allowedRoles={["PATIENT"]}>
<Layout/>
</ProtectedRoute>
}>

<Route index element={<PatientDashboard/>}/>
<Route path="appointments" element={<PatientAppointments/>}/>
<Route path="request" element={<RequestAppointment/>}/>
<Route path="records" element={<MyRecords/>}/>
<Route path="prescriptions" element={<MyPrescriptions/>}/>
<Route path="lab-reports" element={<MyLabReports/>}/>
<Route path="bills" element={<MyBills/>}/>

</Route>

{/* RECEPTIONIST */}

<Route path="/receptionist" element={
<ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
<Layout/>
</ProtectedRoute>
}>

<Route index element={<ReceptionDashboard/>}/>
<Route path="requests" element={<Requests/>}/>
<Route path="schedule" element={<Schedule/>}/>
<Route path="bills" element={<ReceptionistBills/>}/>

</Route>

{/* LAB */}

<Route path="/lab" element={
<ProtectedRoute allowedRoles={["LAB_TECH"]}>
<Layout/>
</ProtectedRoute>
}>

<Route index element={<LabDashboard/>}/>
<Route path="pending" element={<PendingTests/>}/>

</Route>

<Route path="*" element={<Navigate to="/login"/>}/>

</Routes>

</BrowserRouter>

</AuthProvider>

);

}

export default App;