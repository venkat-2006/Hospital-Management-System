import { useState, useEffect } from "react";
import { getDoctorDashboard } from "../../api/services/doctorService";
import { useAuth } from "../../context/AuthContext";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, StatCard } from "../../components/UI";

const DoctorDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getDoctorDashboard()
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title={`Good day, Dr. ${user?.name} 👨‍⚕️`}>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="Today's Appointments" value={data?.todays_appointments} color="blue" icon="📅" />
        <StatCard label="Total Patients" value={data?.total_patients} color="green" icon="🧑‍🤝‍🧑" />
        <StatCard label="Pending Lab Tests" value={data?.pending_lab_tests} color="orange" icon="🔬" />
        <StatCard label="Prescriptions Written" value={data?.total_prescriptions} color="purple" icon="💊" />
      </div>
      <Card>
        <h3 className="font-semibold text-slate-800 mb-2">Quick Tips</h3>
        <p className="text-slate-500 text-sm">
          Use the sidebar to view appointments, manage patients, write prescriptions, and request lab tests.
        </p>
      </Card>
    </PageWrapper>
  );
};

export default DoctorDashboard;