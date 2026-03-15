import API from "../axios";

/* USERS */
export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

/* DOCTORS */
export const getDoctors = () => API.get("/doctor");

/* PATIENTS */
export const getPatients = () => API.get("/patients");

/* APPOINTMENTS */
export const getAppointments = () => API.get("/appointments");

/* BILLS */
export const getAllBills = () => API.get("/bills");
export const createBill = (data) => API.post("/bills", data);
export const getBillsByPatient = (patientId) =>
  API.get(`/bills/patient/${patientId}`);

/* PAYMENTS */
export const getPaymentsByBill = (billId) =>
  API.get(`/payments/bill/${billId}`);

/* MEDICINES */
export const getMedicines = () => API.get("/medicines");
export const createMedicine = (data) => API.post("/medicines", data);
export const updateMedicineStock = (id, stock) =>
  API.patch(`/medicines/${id}/stock`, { stock });

/* DASHBOARD */
export const getAdminDashboard = () =>
  API.get("/dashboard/admin");

/* LAB REPORTS */
export const getLabReportsByPatient = (patientId) =>
  API.get(`/lab-reports/patient/${patientId}`);

/* MEDICAL RECORDS */
export const getRecordsByPatient = (patientId) =>
  API.get(`/medical-records/${patientId}`);

/* PRESCRIPTIONS */
export const getPrescriptionsByPatient = (patientId) =>
  API.get(`/prescriptions/${patientId}`);