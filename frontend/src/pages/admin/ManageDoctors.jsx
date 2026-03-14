import { useState, useEffect } from "react";
import { getDoctors } from "../../api/services/adminService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, Badge } from "../../components/UI";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data))
      .catch(() => setError("Failed to load doctors"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title="Doctors">
      <Card>
        <Table headers={["Name", "Email", "Specialization", "Phone", "Status"]}>
          {doctors.map((d) => (
            <Tr key={d.id}>
              <Td><span className="font-semibold">{d.name}</span></Td>
              <Td>{d.email}</Td>
              <Td>{d.specialization || "General"}</Td>
              <Td>{d.phone || "—"}</Td>
              <Td><Badge label="Active" color="#27ae60" /></Td>
            </Tr>
          ))}
        </Table>
        {doctors.length === 0 && (
          <p className="text-slate-500 text-center py-6">No doctors found.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default ManageDoctors;