import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const { user } = useAuth();

  const role = user?.role;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">

      <h2 className="text-xl font-bold mb-8">
        HMS
      </h2>

      <nav className="space-y-2">

        {role === "ADMIN" && (
          <>
            <NavLink to="/admin" className="block hover:bg-slate-700 p-2 rounded">
              Dashboard
            </NavLink>

            <NavLink to="/admin/users" className="block hover:bg-slate-700 p-2 rounded">
              Users
            </NavLink>

            <NavLink to="/admin/doctors" className="block hover:bg-slate-700 p-2 rounded">
              Doctors
            </NavLink>

            <NavLink to="/admin/medicines" className="block hover:bg-slate-700 p-2 rounded">
              Medicines
            </NavLink>

            <NavLink to="/admin/bills" className="block hover:bg-slate-700 p-2 rounded">
              Bills
            </NavLink>
          </>
        )}

        {role === "DOCTOR" && (
          <>
            <NavLink to="/doctor" className="block hover:bg-slate-700 p-2 rounded">
              Dashboard
            </NavLink>

            <NavLink to="/doctor/appointments" className="block hover:bg-slate-700 p-2 rounded">
              Appointments
            </NavLink>

            <NavLink to="/doctor/patients" className="block hover:bg-slate-700 p-2 rounded">
              Patients
            </NavLink>
          </>
        )}

        {role === "PATIENT" && (
          <>
            <NavLink to="/patient" className="block hover:bg-slate-700 p-2 rounded">
              Dashboard
            </NavLink>

            <NavLink to="/patient/request" className="block hover:bg-slate-700 p-2 rounded">
              Book Appointment
            </NavLink>

            <NavLink to="/patient/records" className="block hover:bg-slate-700 p-2 rounded">
              Records
            </NavLink>

            <NavLink to="/patient/prescriptions" className="block hover:bg-slate-700 p-2 rounded">
              Prescriptions
            </NavLink>

            <NavLink to="/patient/lab-reports" className="block hover:bg-slate-700 p-2 rounded">
              Lab Reports
            </NavLink>

            <NavLink to="/patient/bills" className="block hover:bg-slate-700 p-2 rounded">
              Bills
            </NavLink>
          </>
        )}

        {role === "RECEPTIONIST" && (
          <>
            <NavLink to="/receptionist" className="block hover:bg-slate-700 p-2 rounded">
              Dashboard
            </NavLink>

            <NavLink to="/receptionist/requests" className="block hover:bg-slate-700 p-2 rounded">
              Requests
            </NavLink>

            <NavLink to="/receptionist/schedule" className="block hover:bg-slate-700 p-2 rounded">
              Schedule
            </NavLink>

            <NavLink to="/receptionist/bills" className="block hover:bg-slate-700 p-2 rounded">
              Bills
            </NavLink>
          </>
        )}

        {role === "LAB_TECH" && (
          <>
            <NavLink to="/lab" className="block hover:bg-slate-700 p-2 rounded">
              Dashboard
            </NavLink>

            <NavLink to="/lab/pending" className="block hover:bg-slate-700 p-2 rounded">
              Pending Tests
            </NavLink>
          </>
        )}

      </nav>

    </aside>
  );
};

export default Sidebar;