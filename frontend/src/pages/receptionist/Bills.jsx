import { useState, useEffect } from "react";
import { getAllBills, createBill, getBillsByPatient } from "../../api/services/receptionistService";
import { getPatients } from "../../api/services/adminService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Table, Tr, Td, Btn, Input, Select, StatusBadge } from "../../components/UI";

const ReceptionistBills = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ patient_id: "", total_amount: "", description: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [filterPatientId, setFilterPatientId] = useState("");

  const fetchBills = () => {
    const req = filterPatientId ? getBillsByPatient(filterPatientId) : getAllBills();
    req.then((res) => setBills(res.data))
      .catch(() => setError("Failed to load bills"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBills();
    getPatients().then((res) => setPatients(res.data)).catch(() => { });
  }, []);

  useEffect(() => { fetchBills(); }, [filterPatientId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true); setError("");
    try {
      await createBill(formData);
      setSuccess("Bill created successfully!");
      setFormData({ patient_id: "", total_amount: "", description: "" });
      setShowForm(false);
      fetchBills();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create bill");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <PageWrapper title="Billing Management">
      {error && <ErrorMsg message={error} />}
      {success && <SuccessMsg message={success} />}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-end mb-4">
        <Btn onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Create Bill"}
        </Btn>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Filter by Patient
          </label>
          <select
            value={filterPatientId}
            onChange={(e) => setFilterPatientId(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none bg-white focus:border-blue-500"
          >
            <option value="">All Patients</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Create Bill Form */}
      {showForm && (
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-800 mb-4">Generate New Bill</h3>
          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-2 gap-x-4">
              <Select label="Patient" name="patient_id" value={formData.patient_id} onChange={handleChange} required>
                <option value="">Select patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
              <Input label="Total Amount (₹)" name="total_amount" type="number"
                value={formData.total_amount} onChange={handleChange} required />
            </div>
            <Input label="Description" name="description" value={formData.description}
              onChange={handleChange} placeholder="e.g. Consultation, Tests, Medicines" />
            <Btn type="submit" disabled={formLoading}>
              {formLoading ? "Creating..." : "Create Bill"}
            </Btn>
          </form>
        </Card>
      )}

      {/* Bills table */}
      <Card>
        {loading ? <LoadingSpinner /> : (
          <Table headers={["Bill ID", "Patient", "Amount", "Description", "Status", "Date"]}>
            {bills.map((b) => (
              <Tr key={b.id}>
                <Td className="text-slate-400 text-xs">#{b.id}</Td>
                <Td><span className="font-semibold">{b.patient_name || `Patient #${b.patient_id}`}</span></Td>
                <Td><span className="font-semibold">₹{parseFloat(b.total_amount || 0).toFixed(2)}</span></Td>
                <Td className="text-slate-500">{b.description || "—"}</Td>
                <Td><StatusBadge status={b.status} /></Td>
                <Td className="text-slate-500 whitespace-nowrap">
                  {b.created_at ? new Date(b.created_at).toLocaleDateString() : "—"}
                </Td>
              </Tr>
            ))}
          </Table>
        )}
        {!loading && bills.length === 0 && (
          <p className="text-slate-500 text-center py-6">No bills found.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default ReceptionistBills;