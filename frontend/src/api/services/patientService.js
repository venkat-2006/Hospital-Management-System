import API from "../axios";

// profile
export const getMyProfile = () => API.get("/patients/profile");

// appointments
export const getMyAppointments = () => API.get("/patients/appointments");

// requests
export const createRequest = (data) => API.post("/requests", data);

// medical records
export const getMyRecords = () => API.get("/patients/medical-records");

// prescriptions
export const getMyPrescriptions = () => API.get("/patients/prescriptions");

// lab reports
export const getMyLabReports = () => API.get("/patients/lab-reports");

// bills
export const getMyBills = () => API.get("/patients/bills");

// payments
export const createPayment = (data) => API.post("/payments", data);
export const getPaymentsByBill = (billId) => API.get(`/payments/bill/${billId}`);