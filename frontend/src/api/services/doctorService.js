import API from "../axios";

// dashboard
export const getDoctorDashboard = () => API.get("/dashboard/doctor");

// profile
export const getMyProfile = () => API.get("/doctor/my-profile");

// appointments
export const getMyAppointments = () => API.get("/doctor/my-appointments");
export const updateMyAppointment = (appointmentId, data) => API.patch(`/doctor/my-appointments/${appointmentId}`, data);

// patients
export const getMyPatients = () => API.get("/doctor/my-patients");
export const getMyPatientData = (patientId) => API.get(`/doctor/my-patients/${patientId}`);

// medical records
export const createMedicalRecord = (data) => API.post("/medical-records", data);
export const getRecordsByPatient = (patientId) => API.get(`/medical-records/${patientId}`);

// prescriptions
export const createPrescription = (data) => API.post("/prescriptions", data);
export const getPrescriptionsByPatient = (patientId) => API.get(`/prescriptions/${patientId}`);

// lab reports
export const createLabReport = (data) => API.post("/lab-reports", data);
export const getMyLabReports = () => API.get("/lab-reports");
export const getLabReportsByPatient = (patientId) => API.get(`/lab-reports/patient/${patientId}`);

// medicines
export const getMedicines = () => API.get("/medicines");