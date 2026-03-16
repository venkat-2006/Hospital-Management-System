import API from "../axios";

export const getAllBills       = ()              => API.get("/bills");
export const getBillsByPatient = (patientId)     => API.get(`/bills/patient/${patientId}`);
export const createBill        = (data)          => API.post("/bills", data);
export const updateBillStatus  = (billId, status) => API.patch(`/bills/${billId}`, { status });