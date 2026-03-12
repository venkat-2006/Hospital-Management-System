import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import PharmacyPanel from "./pages/PharmacyPanel";
import LabPanel from "./pages/LabPanel";
import PatientFormPage from "./pages/PatientFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/reception" element={<ReceptionDashboard />} />
        <Route path="/pharmacy" element={<PharmacyPanel />} />
        <Route path="/lab" element={<LabPanel />} />
        <Route path="/patient-form" element={<PatientFormPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;