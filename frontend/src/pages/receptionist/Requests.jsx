import { useState, useEffect } from "react";
import { getRequests } from "../../api/services/receptionistService";
import {
  PageWrapper,
  Card,
  TableSkeleton,
  ErrorMsg,
  Table,
  Tr,
  Td,
  Badge,
  EmptyState,
  SectionHead
} from "../../components/UI";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRequests()
      .then(res => setRequests(res.data))
      .catch(() => setError("Failed to load requests"))
      .finally(() => setLoading(false));
  }, []);

  const pending = requests.filter(r => r.status === "pending").length;
  const scheduled = requests.filter(r => r.status === "scheduled").length;

  return (
    <PageWrapper title="Appointment Requests">

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1">Total</p>
          <p className="text-2xl font-bold text-slate-800">{requests.length}</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <p className="text-xs font-medium text-amber-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-700">{pending}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
          <p className="text-xs font-medium text-emerald-600 mb-1">Scheduled</p>
          <p className="text-2xl font-bold text-emerald-700">{scheduled}</p>
        </div>
      </div>

      <ErrorMsg message={error} />

      <Card>
        <SectionHead title={`All Requests (${requests.length})`} />
        {loading ? <TableSkeleton /> : requests.length === 0 ? <EmptyState message="No requests found" icon="📋" /> : (
          <Table>
            <thead>
              <Tr header>
                <Td header>ID</Td>
                <Td header>Patient</Td>
                <Td header>Department</Td>
                <Td header>Preferred Date</Td>
                <Td header>Reason</Td>
                <Td header>Status</Td>
              </Tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <Tr key={r.id}>
                  <Td><span className="text-slate-400 text-xs">#{r.id}</span></Td>
                  <Td><span className="font-medium text-slate-800">Patient #{r.patient_id}</span></Td>
                  <Td>
                    {r.department ? (
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
                        {r.department}
                      </span>
                    ) : <span className="text-slate-400">—</span>}
                  </Td>
                  <Td>
                    <span className="text-slate-600 text-sm">
                      {r.preferred_date
                        ? new Date(r.preferred_date).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                          })
                        : "—"}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-slate-500 text-sm max-w-xs truncate block">
                      {r.reason || "—"}
                    </span>
                  </Td>
                  <Td>
                    <Badge value={r.status || "pending"} />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

    </PageWrapper>
  );
};

export default Requests;