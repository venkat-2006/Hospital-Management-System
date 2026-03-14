import { useState, useEffect } from "react";
import { getAdminDashboard } from "../../api/services/adminService";
import { useAuth } from "../../context/AuthContext";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, StatCard } from "../../components/UI";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getAdminDashboard()
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title={`Welcome back, ${user?.name} 👋`}>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Doctors" value={data?.total_doctors} color="blue" icon="👨‍⚕️" />
        <StatCard label="Total Patients" value={data?.total_patients} color="green" icon="🧑‍🤝‍🧑" />
        <StatCard label="Appointments Today" value={data?.appointments_today} color="orange" icon="📅" />
        <StatCard label="Pending Bills" value={data?.pending_bills} color="red" icon="💳" />
        <StatCard label="Medicines" value={data?.total_medicines} color="purple" icon="💊" />
        <StatCard label="Lab Tests Pending" value={data?.pending_lab_tests} color="teal" icon="🔬" />
      </div>

      <Card>
        <h3 className="font-semibold text-slate-800 mb-2">System Overview</h3>
        <p className="text-slate-500 text-sm">
          All systems operational. Use the sidebar to manage users, doctors, medicines and view reports.
        </p>
      </Card>
    </PageWrapper>
  );
};

export default AdminDashboard;