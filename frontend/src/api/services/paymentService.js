import API from "../axios";

export const createPayment    = (data)       => API.post("/payments", data);
export const getPaymentsByBill = (billId)    => API.get(`/payments/bill/${billId}`);
export const getReceipt       = (paymentId)  => API.get(`/payments/${paymentId}/receipt`);