import { useState, useEffect } from "react";
import { getRequests } from "../../api/services/receptionistService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, Badge } from "../../components/UI";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRequests()
      .then((res) => setRequests(res.data))
      .catch(() => setError("Failed to load requests"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title="Appointment Requests">
      <Card>
        <Table headers={["Request #", "Patient", "Doctor", "Reason", "Submitted", "Status"]}>
          {requests.map((r) => (
            <Tr key={r.id}>
              <Td className="text-slate-400 text-xs">#{r.id}</Td>
              <Td><span className="font-semibold">{r.patient_name || `Patient #${r.patient_id}`}</span></Td>
              <Td>{r.doctor_name || `Doctor #${r.doctor_id}`}</Td>
              <Td className="text-slate-500 max-w-xs truncate">{r.reason || "—"}</Td>
              <Td className="whitespace-nowrap text-slate-500">
                {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
              </Td>
              <Td>
                <Badge
                  label={r.status || "pending"}
                  color={r.status === "scheduled" ? "#27ae60" : "#f59e0b"}
                />
              </Td>
            </Tr>
          ))}
        </Table>
        {requests.length === 0 && (
          <p className="text-slate-500 text-center py-6">No pending requests.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default Requests;