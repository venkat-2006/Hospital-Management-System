import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyProfile } from "../../api/services/patientService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg } from "../../components/UI";

const quickLinks = [
  { label: "📅 Book Appointment", to: "/patient/request" },
  { label: "📋 My Records", to: "/patient/records" },
  { label: "💊 Prescriptions", to: "/patient/prescriptions" },
  { label: "🔬 Lab Reports", to: "/patient/lab-reports" },
  { label: "💳 My Bills", to: "/patient/bills" },
];

const PatientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyProfile()
      .then((res) => setProfile(res.data))
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title={`Welcome, ${profile?.name} 👋`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Profile card */}
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">My Profile</h3>
          <div className="space-y-3">
            {[
              ["Email", profile?.email],
              ["Phone", profile?.phone],
              ["Gender", profile?.gender],
              ["Date of Birth", profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "—"],
              ["Address", profile?.address],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className="font-semibold text-slate-500 w-28 shrink-0">{label}</span>
                <span className="text-slate-800 capitalize">{value || "—"}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-2.5">
            {quickLinks.map((item) => (
              <Link key={item.to} to={item.to}
                className="flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-blue-50
                  border border-slate-200 hover:border-blue-200 rounded-lg text-sm font-medium
                  text-slate-700 hover:text-blue-700 transition-all">
                {item.label}
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default PatientDashboard;