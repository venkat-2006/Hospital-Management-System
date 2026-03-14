import { useState, useEffect } from "react";
import { getAllBills } from "../../api/services/adminService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, StatusBadge } from "../../components/UI";

const AdminBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllBills()
      .then((res) => setBills(res.data))
      .catch(() => setError("Failed to load bills"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  const total = bills.reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);
  const paid = bills.filter((b) => b.status === "paid").reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);

  return (
    <PageWrapper title="All Bills">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Bills", value: bills.length, accent: "border-l-blue-500" },
          { label: "Total Revenue", value: `₹${total.toFixed(2)}`, accent: "border-l-emerald-500" },
          { label: "Amount Collected", value: `₹${paid.toFixed(2)}`, accent: "border-l-purple-500" },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl shadow-sm border-l-4 ${s.accent} p-5`}>
            <div className="text-2xl font-bold text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <Card>
        <Table headers={["Bill ID", "Patient ID", "Amount", "Status", "Date"]}>
          {bills.map((b) => (
            <Tr key={b.id}>
              <Td className="text-slate-400 text-xs">#{b.id}</Td>
              <Td>{b.patient_id}</Td>
              <Td><span className="font-semibold">₹{parseFloat(b.total_amount || 0).toFixed(2)}</span></Td>
              <Td><StatusBadge status={b.status} /></Td>
              <Td className="text-slate-500">
                {b.created_at ? new Date(b.created_at).toLocaleDateString() : "—"}
              </Td>
            </Tr>
          ))}
        </Table>
        {bills.length === 0 && (
          <p className="text-slate-500 text-center py-6">No bills found.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default AdminBills;