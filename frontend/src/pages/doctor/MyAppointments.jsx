import { useState, useEffect } from "react";
import { getMyAppointments, updateMyAppointment } from "../../api/services/doctorService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Table, Tr, Td, Btn, StatusBadge } from "../../components/UI";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    getMyAppointments()
      .then((res) => setAppointments(res.data))
      .catch(() => setError("Failed to load appointments"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id); setError("");
    try {
      await updateMyAppointment(id, { status });
      setAppointments(appointments.map((a) => a.id === id ? { ...a, status } : a));
      setSuccess(`Appointment marked as ${status}`);
    } catch {
      setError("Failed to update appointment");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;

  return (
    <PageWrapper title="My Appointments">
      {error && <ErrorMsg message={error} />}
      {success && <SuccessMsg message={success} />}
      <Card>
        <Table headers={["#", "Patient", "Date & Time", "Status", "Actions"]}>
          {appointments.map((a, i) => (
            <Tr key={a.id}>
              <Td className="text-slate-400">{i + 1}</Td>
              <Td><span className="font-semibold">{a.patient_name || `Patient #${a.patient_id}`}</span></Td>
              <Td>{a.appointment_time ? new Date(a.appointment_time).toLocaleString() : "—"}</Td>
              <Td><StatusBadge status={a.status} /></Td>
              <Td>
                {a.status === "confirmed" ? (
                  <div className="flex gap-2">
                    <Btn variant="success" className="text-xs px-3 py-1.5"
                      disabled={updatingId === a.id} onClick={() => handleStatusChange(a.id, "completed")}>
                      Complete
                    </Btn>
                    <Btn variant="danger" className="text-xs px-3 py-1.5"
                      disabled={updatingId === a.id} onClick={() => handleStatusChange(a.id, "cancelled")}>
                      Cancel
                    </Btn>
                  </div>
                ) : (
                  <span className="text-slate-400 text-xs">No actions</span>
                )}
              </Td>
            </Tr>
          ))}
        </Table>
        {appointments.length === 0 && (
          <p className="text-slate-500 text-center py-6">No appointments found.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default MyAppointments;