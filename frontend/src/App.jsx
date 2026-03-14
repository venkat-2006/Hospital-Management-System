import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";

// UI/UX designs here
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import DoctorDashboard from "./pages/doctor/Dashboard";
import PatientDashboard from "./pages/patient/Dashboard";
import ReceptionDashboard from "./pages/receptionist/Dashboard";
import LabDashboard from "./pages/lab/Dashboard";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/doctor/*" element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />

          <Route path="/patient/*" element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <PatientDashboard />
            </ProtectedRoute>
          } />

          <Route path="/receptionist/*" element={
            <ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
              <ReceptionDashboard />
            </ProtectedRoute>
          } />

          <Route path="/lab/*" element={
            <ProtectedRoute allowedRoles={["LAB_TECH"]}>
              <LabDashboard />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;