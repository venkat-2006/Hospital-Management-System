import API from "../axios";

export const getReceptionDashboard = () => API.get("/dashboard/reception");
export const getRequests = () => API.get("/requests");
export const createAppointment = (data) => API.post("/appointments", data);
export const getAppointments = () => API.get("/appointments");
export const createBill = (data) => API.post("/bills", data);