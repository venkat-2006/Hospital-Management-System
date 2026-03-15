import API from "../axios";

// dashboard
export const getLabDashboard = () =>
  API.get("/dashboard/lab");

// pending lab tests
export const getPendingTests = () =>
  API.get("/lab-reports/pending");

// upload result
export const updateLabResult = (id, result) =>
  API.patch(`/lab-reports/${id}`, { result });

// reports by patient
export const getReportsByPatient = (patientId) =>
  API.get(`/lab-reports/patient/${patientId}`);