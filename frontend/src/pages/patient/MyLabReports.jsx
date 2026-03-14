import { useState, useEffect } from "react";
import { getMyLabReports } from "../../api/services/patientService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, StatusBadge } from "../../components/UI";

const MyLabReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyLabReports()
      .then((res) => setReports(res.data))
      .catch(() => setError("Failed to load lab reports"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title="My Lab Reports">
      <Card>
        <Table headers={["Date", "Test Type", "Result", "Status"]}>
          {reports.map((r) => (
            <Tr key={r.id}>
              <Td className="text-slate-500 whitespace-nowrap">
                {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
              </Td>
              <Td><span className="font-semibold">{r.test_type}</span></Td>
              <Td>
                {r.result
                  ? r.result
                  : <span className="text-slate-400 italic">Awaiting result</span>}
              </Td>
              <Td>
                <StatusBadge status={r.result ? "completed" : "pending"} />
              </Td>
            </Tr>
          ))}
        </Table>
        {reports.length === 0 && (
          <p className="text-slate-500 text-center py-6">No lab reports found.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default MyLabReports;