import API from "../axios";

export const getMyProfile = () => API.get("/patients/profile");
export const getMyAppointments = () => API.get("/patients/appointments");
export const getMyRecords = () => API.get("/patients/medical-records");
export const getMyPrescriptions = () => API.get("/patients/prescriptions");
export const getMyLabReports = () => API.get("/patients/lab-reports");
export const getMyBills = () => API.get("/patients/bills");
export const createRequest = (data) => API.post("/requests", data);
export const createPayment = (data) => API.post("/payments", data);