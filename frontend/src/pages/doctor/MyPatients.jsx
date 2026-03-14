import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPatients } from "../../api/services/doctorService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, Btn } from "../../components/UI";

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getMyPatients()
      .then((res) => setPatients(res.data))
      .catch(() => setError("Failed to load patients"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title="My Patients">
      <Card>
        <Table headers={["Name", "Gender", "Phone", "Date of Birth", "Actions"]}>
          {patients.map((p) => (
            <Tr key={p.id}>
              <Td><span className="font-semibold">{p.name}</span></Td>
              <Td className="capitalize">{p.gender || "—"}</Td>
              <Td>{p.phone || "—"}</Td>
              <Td>{p.date_of_birth ? new Date(p.date_of_birth).toLocaleDateString() : "—"}</Td>
              <Td>
                <Btn variant="ghost" className="text-xs px-3 py-1.5"
                  onClick={() => navigate(`/doctor/patients/${p.id}`)}>
                  View Details
                </Btn>
              </Td>
            </Tr>
          ))}
        </Table>
        {patients.length === 0 && (
          <p className="text-slate-500 text-center py-6">No patients assigned yet.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default MyPatients;