import API from "../axios";

export const getLabDashboard = () => API.get("/dashboard/lab");
export const getPendingTests = () => API.get("/lab-reports/pending");
export const updateLabResult = (id, data) => API.patch(`/lab-reports/${id}`, data);