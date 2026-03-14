import API from "../axios";

export const getMedicines = () => API.get("/medicines");
export const createMedicine = (data) => API.post("/medicines", data);
export const updateStock = (id, stock) => API.patch(`/medicines/${id}/stock`, { stock });