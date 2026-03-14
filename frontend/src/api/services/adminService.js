import API from "../axios";

export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const getDoctors = () => API.get("/doctor");
export const getAdminDashboard = () => API.get("/dashboard/admin");
export const getPatients = () => API.get("/patients");
export const getAppointments = () => API.get("/appointments");
export const createBill = (data) => API.post("/bills", data);