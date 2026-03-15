import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

 const login = (data) => {

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  setUser(data.user);

  const role = data.user.role;

  if (role === "ADMIN") window.location.href = "/admin";
  if (role === "DOCTOR") window.location.href = "/doctor";
  if (role === "PATIENT") window.location.href = "/patient";
  if (role === "RECEPTIONIST") window.location.href = "/receptionist";
  if (role === "LAB_TECH") window.location.href = "/lab";

};
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/login";

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);