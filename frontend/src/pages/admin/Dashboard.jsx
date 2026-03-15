import { useState, useEffect } from "react";
import { getAdminDashboard } from "../../api/services/adminService";
import { useAuth } from "../../context/AuthContext";
import { PageWrapper, LoadingSpinner, ErrorMsg, StatCard } from "../../components/UI";

const AdminDashboard = () => {

  const { user } = useAuth();

  const [stats,setStats] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{

    getAdminDashboard()
      .then(res => setStats(res.data))
      .catch(()=>setError("Failed to load dashboard"))
      .finally(()=>setLoading(false));

  },[]);

  if(loading) return <LoadingSpinner/>;

  return(

    <PageWrapper>

      <h2 className="text-xl font-bold mb-6">
        Welcome, {user?.name}
      </h2>

      <ErrorMsg message={error}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard label="Total Patients" value={stats?.total_patients ?? 0} icon="👥"/>
        <StatCard label="Total Doctors" value={stats?.total_doctors ?? 0} icon="👨‍⚕️"/>
        <StatCard label="Appointments" value={stats?.total_appointments ?? 0} icon="📅"/>
        <StatCard label="Pending Bills" value={stats?.pending_bills ?? 0} icon="🧾"/>

      </div>

    </PageWrapper>

  );

};

export default AdminDashboard;