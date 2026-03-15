// // import { Outlet, NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import { useState } from "react";

// // const roleNavLinks = {
// //   ADMIN: [
// //     { to: "/admin", label: "Dashboard", end: true },
// //     { to: "/admin/users", label: "Users" },
// //     { to: "/admin/doctors", label: "Doctors" },
// //     { to: "/admin/medicines", label: "Medicines" },
// //     { to: "/admin/bills", label: "Bills" },
// //   ],
// //   DOCTOR: [
// //     { to: "/doctor", label: "Dashboard", end: true },
// //     { to: "/doctor/appointments", label: "Appointments" },
// //     { to: "/doctor/patients", label: "My Patients" },
// //     { to: "/doctor/create-record", label: "Add Record" },
// //     { to: "/doctor/create-prescription", label: "Prescribe" },
// //     { to: "/doctor/request-lab", label: "Lab Test" },
// //   ],
// //   PATIENT: [
// //     { to: "/patient", label: "Dashboard", end: true },
// //     { to: "/patient/request", label: "Book" },
// //     { to: "/patient/appointments", label: "Appointments" },
// //     { to: "/patient/records", label: "Records" },
// //     { to: "/patient/prescriptions", label: "Prescriptions" },
// //     { to: "/patient/lab-reports", label: "Lab Reports" },
// //     { to: "/patient/bills", label: "Bills" },
// //   ],
// //   RECEPTIONIST: [
// //     { to: "/receptionist", label: "Dashboard", end: true },
// //     { to: "/receptionist/requests", label: "Requests" },
// //     { to: "/receptionist/schedule", label: "Schedule" },
// //     { to: "/receptionist/bills", label: "Bills" },
// //   ],
// //   LAB_TECH: [
// //     { to: "/lab", label: "Dashboard", end: true },
// //     { to: "/lab/pending", label: "Pending Tests" },
// //   ],
// // };

// // const roleColors = {
// //   ADMIN: "bg-rose-600",
// //   DOCTOR: "bg-blue-600",
// //   PATIENT: "bg-emerald-600",
// //   RECEPTIONIST: "bg-violet-600",
// //   LAB_TECH: "bg-amber-600",
// // };

// // const Layout = () => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const links = roleNavLinks[user?.role] || [];
// //   const navColor = roleColors[user?.role] || "bg-blue-600";

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50">
// //       {/* Top Navbar */}
// //       <nav className={`${navColor} text-white shadow-lg`}>
// //         <div className="max-w-7xl mx-auto px-4">
// //           <div className="flex items-center justify-between h-16">
// //             {/* Logo */}
// //             <div className="flex items-center gap-3">
// //               <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">
// //                 H
// //               </div>
// //               <span className="font-bold text-lg hidden sm:block">HMS</span>
// //             </div>

// //             {/* Desktop Nav Links */}
// //             <div className="hidden md:flex items-center gap-1">
// //               {links.map((link) => (
// //                 <NavLink
// //                   key={link.to}
// //                   to={link.to}
// //                   end={link.end}
// //                   className={({ isActive }) =>
// //                     `px-3 py-2 rounded-lg text-sm font-medium transition ${
// //                       isActive
// //                         ? "bg-white/20 text-white"
// //                         : "text-white/80 hover:bg-white/10 hover:text-white"
// //                     }`
// //                   }
// //                 >
// //                   {link.label}
// //                 </NavLink>
// //               ))}
// //             </div>

// //             {/* User Info + Logout */}
// //             <div className="flex items-center gap-3">
// //               <div className="hidden sm:block text-right">
// //                 <p className="text-sm font-medium">{user?.name}</p>
// //                 <p className="text-xs text-white/70">{user?.role}</p>
// //               </div>
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1.5 rounded-lg transition"
// //               >
// //                 Logout
// //               </button>
// //               {/* Mobile menu toggle */}
// //               <button
// //                 className="md:hidden bg-white/20 p-2 rounded-lg"
// //                 onClick={() => setMenuOpen(!menuOpen)}
// //               >
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Mobile Menu */}
// //           {menuOpen && (
// //             <div className="md:hidden pb-3 flex flex-col gap-1">
// //               {links.map((link) => (
// //                 <NavLink
// //                   key={link.to}
// //                   to={link.to}
// //                   end={link.end}
// //                   onClick={() => setMenuOpen(false)}
// //                   className={({ isActive }) =>
// //                     `px-3 py-2 rounded-lg text-sm font-medium transition ${
// //                       isActive ? "bg-white/20" : "text-white/80 hover:bg-white/10"
// //                     }`
// //                   }
// //                 >
// //                   {link.label}
// //                 </NavLink>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </nav>

// //       {/* Page Content */}
// //       <main className="max-w-7xl mx-auto px-4 py-8">
// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // };

// // export default Layout;
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";

// const roleNavLinks = {

//   ADMIN: [
//     { to: "/admin", label: "Dashboard", end: true },
//     { to: "/admin/users", label: "Users" },
//     { to: "/admin/doctors", label: "Doctors" },
//     { to: "/admin/medicines", label: "Medicines" },
//     { to: "/admin/bills", label: "Bills" }
//   ],

//   DOCTOR: [
//     { to: "/doctor", label: "Dashboard", end: true },
//     { to: "/doctor/appointments", label: "Appointments" },
//     { to: "/doctor/patients", label: "Patients" },
//     { to: "/doctor/create-record", label: "Create Record" },
//     { to: "/doctor/create-prescription", label: "Prescription" },
//     { to: "/doctor/request-lab", label: "Request Lab" }
//   ],

//   PATIENT: [
//     { to: "/patient", label: "Dashboard", end: true },
//     { to: "/patient/request", label: "Book Appointment" },
//     { to: "/patient/appointments", label: "My Appointments" },
//     { to: "/patient/records", label: "Records" },
//     { to: "/patient/prescriptions", label: "Prescriptions" },
//     { to: "/patient/lab-reports", label: "Lab Reports" },
//     { to: "/patient/bills", label: "Bills" }
//   ],

//   RECEPTIONIST: [
//     { to: "/receptionist", label: "Dashboard", end: true },
//     { to: "/receptionist/requests", label: "Requests" },
//     { to: "/receptionist/schedule", label: "Schedule" },
//     { to: "/receptionist/bills", label: "Bills" }
//   ],

//   LAB_TECH: [
//     { to: "/lab", label: "Dashboard", end: true },
//     { to: "/lab/pending", label: "Pending Tests" }
//   ]
// };

// const Layout = () => {

//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);

//   const links = roleNavLinks[user?.role] || [];

//   const handleLogout = () => {

//     logout();
//     navigate("/login");

//   };

//   return (

//     <div className="min-h-screen bg-gray-100">

//       {/* NAVBAR */}

//       <nav className="bg-blue-600 text-white shadow">

//         <div className="max-w-7xl mx-auto px-4">

//           <div className="flex justify-between items-center h-16">

//             <h1 className="font-bold text-lg">Hospital System</h1>

//             <div className="hidden md:flex gap-4">

//               {links.map(link => (

//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   end={link.end}
//                   className={({isActive}) =>
//                     `px-3 py-2 rounded ${
//                       isActive
//                       ? "bg-blue-800"
//                       : "hover:bg-blue-700"
//                     }`
//                   }
//                 >

//                   {link.label}

//                 </NavLink>

//               ))}

//             </div>

//             <button
//               onClick={handleLogout}
//               className="bg-white text-blue-600 px-3 py-1 rounded"
//             >
//               Logout
//             </button>

//           </div>

//         </div>

//       </nav>

//       {/* PAGE CONTENT */}

//       <main className="max-w-7xl mx-auto p-6">

//         <Outlet/>

//       </main>

//     </div>

//   );

// };

// export default Layout;
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Page content */}
      <div className="flex-1 bg-gray-100">

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;