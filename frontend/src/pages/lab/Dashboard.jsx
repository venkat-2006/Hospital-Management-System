import { useState, useEffect } from "react";
import { getLabDashboard } from "../../api/services/labService";
import { useAuth } from "../../context/AuthContext";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, StatCard } from "../../components/UI";

const LabDashboard = () => {

  const { user } = useAuth();

  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{

    getLabDashboard()
      .then(res => setData(res.data))
      .catch(()=>setError("Failed to load dashboard"))
      .finally(()=>setLoading(false));

  },[]);

  if(loading) return (
    <PageWrapper>
      <LoadingSpinner/>
    </PageWrapper>
  );

  if(error) return (
    <PageWrapper>
      <ErrorMsg message={error}/>
    </PageWrapper>
  );

  return(

    <PageWrapper title={`Lab Dashboard — ${user?.name}`}>

      <div className="grid grid-cols-3 gap-4 mb-8">

        <StatCard
          label="Pending Tests"
          value={data?.pending_tests || 0}
          color="orange"
          icon="⏳"
        />

        <StatCard
          label="Completed Today"
          value={data?.completed_today || 0}
          color="green"
          icon="✅"
        />

        <StatCard
          label="Total Reports"
          value={data?.total_reports || 0}
          color="blue"
          icon="🔬"
        />

      </div>

      <Card>

        <h3 className="font-semibold mb-2">
          Lab Queue
        </h3>

        <p className="text-sm text-slate-500">
          Go to <b>Pending Tests</b> to upload results for requested lab tests.
        </p>

      </Card>

    </PageWrapper>

  );

};

export default LabDashboard;