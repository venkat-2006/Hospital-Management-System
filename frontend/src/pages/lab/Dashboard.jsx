import { useState, useEffect } from "react";
import { getLabDashboard } from "../../api/services/labService";
import { useAuth } from "../../context/AuthContext";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, StatCard } from "../../components/UI";

const LabDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getLabDashboard()
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title={`Lab Dashboard — ${user?.name}`}>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Pending Tests" value={data?.pending_tests} color="orange" icon="⏳" />
        <StatCard label="Completed Today" value={data?.completed_today} color="green" icon="✅" />
        <StatCard label="Total Reports" value={data?.total_reports} color="blue" icon="🔬" />
      </div>
      <Card>
        <h3 className="font-semibold text-slate-800 mb-2">Your Queue</h3>
        <p className="text-slate-500 text-sm">
          Navigate to <span className="font-semibold text-slate-700">Pending Tests</span> to upload lab results for patients.
        </p>
      </Card>
    </PageWrapper>
  );
};

export default LabDashboard;