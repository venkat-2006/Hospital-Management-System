import API from "../axios";

// dashboard
export const getLabDashboard = () => API.get("/dashboard/lab");

// lab reports
export const getPendingTests = () => API.get("/lab-reports/pending");
export const updateLabResult = (id, result) => API.patch(`/lab-reports/${id}`, { result });
export const getReportsByPatient = (patientId) => API.get(`/lab-reports/patient/${patientId}`);