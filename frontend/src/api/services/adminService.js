import API from "../axios";

// users
export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// doctors
export const getDoctors = () => API.get("/doctor");

// patients
export const getPatients = () => API.get("/patients");
export const createPatient = (data) => API.post("/patients", data);

// appointments
export const getAppointments = () => API.get("/appointments");
export const createAppointment = (data) => API.post("/appointments", data);

// bills
export const createBill = (data) => API.post("/bills", data);
export const getBillsByPatient = (patientId) => API.get(`/bills/patient/${patientId}`);
export const getAllBills = () => API.get("/bills");

// payments
export const getPaymentsByBill = (billId) => API.get(`/payments/bill/${billId}`);

// requests
export const getRequests = () => API.get("/requests");

// medicines
export const getMedicines = () => API.get("/medicines");
export const createMedicine = (data) => API.post("/medicines", data);
export const updateMedicineStock = (id, stock) => API.patch(`/medicines/${id}/stock`, { stock });

// medical records
export const getRecordsByPatient = (patientId) => API.get(`/medical-records/${patientId}`);

// lab reports
export const getLabReportsByPatient = (patientId) => API.get(`/lab-reports/patient/${patientId}`);

// dashboard
export const getAdminDashboard = () => API.get("/dashboard/admin");

// prescriptions
export const getPrescriptionsByPatient = (patientId) => API.get(`/prescriptions/${patientId}`);
//