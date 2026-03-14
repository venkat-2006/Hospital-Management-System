import API from "../axios";

export const getReceptionDashboard = () => API.get("/dashboard/reception");
export const getRequests = () => API.get("/requests");
export const createAppointment = (data) => API.post("/appointments", data);
export const getAppointments = () => API.get("/appointments");
export const createBill = (data) => API.post("/bills", data);
export const getAllBills = () => API.get("/bills");
export const getBillsByPatient = (patientId) => API.get(`/bills/patient/${patientId}`);
export const getPaymentsByBill = (billId) => API.get(`/payments/bill/${billId}`);