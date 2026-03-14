import API from "../axios";

export const getDoctorDashboard = () => API.get("/dashboard/doctor");
export const getMyProfile = () => API.get("/doctor/my-profile");
export const getMyAppointments = () => API.get("/doctor/my-appointments");
export const getMyPatients = () => API.get("/doctor/my-patients");
export const getMyPatientData = (patientId) => API.get(`/doctor/my-patients/${patientId}`);
export const createMedicalRecord = (data) => API.post("/medical-records", data);
export const createPrescription = (data) => API.post("/prescriptions", data);
export const createLabReport = (data) => API.post("/lab-reports", data);
export const getMyLabReports = () => API.get("/lab-reports");