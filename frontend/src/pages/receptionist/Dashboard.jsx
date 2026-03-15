import { useState, useEffect } from "react";
import { getReceptionDashboard } from "../../api/services/receptionistService";
import { useAuth } from "../../context/AuthContext";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, StatCard } from "../../components/UI";

const ReceptionDashboard = () => {

  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  const { user } = useAuth();
useEffect(() => {

  getReceptionDashboard()
    .then(res => {
      console.log("Dashboard API Response:", res.data); // ADD THIS
      setData(res.data);
    })
    .catch(() => setError("Failed to load dashboard"))
    .finally(() => setLoading(false));

}, []);

  if(loading) return <PageWrapper><LoadingSpinner/></PageWrapper>;
  if(error) return <PageWrapper><ErrorMsg message={error}/></PageWrapper>;

  return(

    <PageWrapper title={`Reception Desk — ${user?.name}`}>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        <StatCard
  label="Pending Requests"
  value={data?.pendingRequests || 0}
  color="orange"
  icon="📋"
/>

<StatCard
  label="Today's Appointments"
  value={data?.appointmentsToday || 0}
  color="blue"
  icon="📅"
/>

<StatCard
  label="Patients Registered"
  value={data?.patientsRegistered || 0}
  color="green"
  icon="👤"
/>
      </div>

      <Card>

        <h3 className="font-semibold mb-2">
          Responsibilities
        </h3>

        <p className="text-sm text-slate-500">
          Review appointment requests, schedule appointments,
          and generate bills for patients.
        </p>

      </Card>

    </PageWrapper>

  );

};

export default ReceptionDashboard;