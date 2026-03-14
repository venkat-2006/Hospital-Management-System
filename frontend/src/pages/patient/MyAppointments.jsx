import { useState, useEffect } from "react";
import { getMyAppointments } from "../../api/services/patientService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, StatusBadge } from "../../components/UI";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyAppointments()
      .then((res) => setAppointments(res.data))
      .catch(() => setError("Failed to load appointments"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title="My Appointments">
      <Card>
        <Table headers={["#", "Doctor", "Date & Time", "Status"]}>
          {appointments.map((a, i) => (
            <Tr key={a.id}>
              <Td className="text-slate-400">{i + 1}</Td>
              <Td><span className="font-semibold">{a.doctor_name || `Doctor #${a.doctor_id}`}</span></Td>
              <Td>{a.appointment_time ? new Date(a.appointment_time).toLocaleString() : "—"}</Td>
              <Td><StatusBadge status={a.status} /></Td>
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

export default PatientAppointments;