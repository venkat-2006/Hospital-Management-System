import { useState, useEffect } from "react";
import { getDoctors } from "../../api/services/adminService";
import { Card, TableSkeleton, ErrorMsg, Table, Tr, Td, EmptyState } from "../../components/UI";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDoctors()
      .then(res => setDoctors(res.data))
      .catch(() => setError("Failed to load doctors"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Doctors</h1>
        <p className="text-slate-500 text-sm mt-1">{doctors.length} doctors registered</p>
      </div>
      <ErrorMsg message={error} />
      <Card>
        {loading ? <TableSkeleton /> : doctors.length === 0 ? <EmptyState message="No doctors found" /> : (
          <Table>
            <thead>
              <Tr header>
                <Td header>ID</Td>
                <Td header>Name</Td>
                <Td header>Email</Td>
                <Td header>Specialization</Td>
                <Td header>Experience</Td>
                <Td header>Phone</Td>
              </Tr>
            </thead>
            <tbody>
              {doctors.map(d => (
                <Tr key={d.id}>
                  <Td><span className="text-slate-400">#{d.id}</span></Td>
                  <Td><span className="font-medium text-slate-800">{d.name}</span></Td>
                  <Td>{d.email}</Td>
                  <Td>
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {d.specialization}
                    </span>
                  </Td>
                  <Td>{d.experience} yrs</Td>
                  <Td>{d.phone}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ManageDoctors;