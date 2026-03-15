import API from "../axios";

/*
PATIENT REGISTRATION
*/
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

/*
LOGIN FOR ALL USERS
*/
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};