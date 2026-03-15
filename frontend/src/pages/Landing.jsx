import { Link } from "react-router-dom";

export default function Landing() {

  return (

    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">

        <h1 className="text-2xl font-bold text-blue-600">
          Hospital Management System
        </h1>

        <div className="space-x-4">

          <Link
            to="/login"
            className="px-4 py-2 text-blue-600 font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Register
          </Link>

        </div>

      </nav>



      {/* HERO SECTION */}

      <section className="flex flex-col items-center text-center py-24 px-6">

        <h2 className="text-4xl font-bold mb-6">
          Smart Hospital Management System
        </h2>

        <p className="max-w-xl text-gray-600 mb-8">
          A complete digital solution for managing hospital operations including
          appointments, medical records, prescriptions, lab reports, billing,
          and medicine inventory. Designed for administrators, doctors,
          patients, receptionists, and lab technicians.
        </p>

        <div className="space-x-4">

          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white rounded"
          >
            Create Patient Account
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded"
          >
            Login to Dashboard
          </Link>

        </div>

      </section>



      {/* FEATURES */}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-20">

        <div className="bg-white p-6 shadow rounded">

          <h3 className="text-lg font-semibold mb-2">
            Appointment Management
          </h3>

          <p className="text-gray-600">
            Patients can request appointments and receptionists schedule them
            efficiently with doctors.
          </p>

        </div>


        <div className="bg-white p-6 shadow rounded">

          <h3 className="text-lg font-semibold mb-2">
            Medical Records
          </h3>

          <p className="text-gray-600">
            Doctors create medical records and prescriptions that patients can
            access anytime.
          </p>

        </div>


        <div className="bg-white p-6 shadow rounded">

          <h3 className="text-lg font-semibold mb-2">
            Lab & Billing
          </h3>

          <p className="text-gray-600">
            Lab technicians upload test reports while the system automatically
            manages billing and payments.
          </p>

        </div>

      </section>



      {/* FOOTER */}

      <footer className="text-center py-6 bg-white border-t">

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Hospital Management System
        </p>

      </footer>

    </div>

  );

}