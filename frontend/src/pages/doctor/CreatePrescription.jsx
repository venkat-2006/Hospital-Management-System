import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPrescription, getMedicines, getMyPatients, getRecordsByPatient } from "../../api/services/doctorService";
import { Card, Toast, Input, Select, Btn } from "../../components/UI";

export default function CreatePrescription() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const [form, setForm] = useState({
    patient_id: sp.get("patientId") || "",
    record_id: "",
    medicine_name: "",
    dosage: "",
    duration: ""
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    Promise.all([getMedicines(), getMyPatients()])
      .then(([medRes, patRes]) => {
        setMedicines(medRes.data);
        setPatients(patRes.data);
      }).catch(() => {});
  }, []);

  // when patient selected load their records
  useEffect(() => {
    if (!form.patient_id) { setRecords([]); return; }
    setLoadingRecords(true);
    getRecordsByPatient(form.patient_id)
      .then(res => setRecords(res.data))
      .catch(() => setRecords([]))
      .finally(() => setLoadingRecords(false));
  }, [form.patient_id]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPrescription({
        record_id: form.record_id,
        medicine_name: form.medicine_name,
        dosage: form.dosage,
        duration: form.duration
      });
      setToast({ message: "Prescription created! Stock auto-deducted.", type: "success" });
      setForm({ ...form, record_id: "", medicine_name: "", dosage: "", duration: "" });
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Failed", type: "error" });
    } finally { setLoading(false); }
  };

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="flex items-center gap-4 mb-8">
        <Btn variant="secondary" onClick={() => navigate(-1)}>← Back</Btn>
        <h1 className="text-2xl font-bold text-slate-800">Create Prescription</h1>
      </div>
      <div className="max-w-2xl">
        <Card>
          <form onSubmit={onSubmit} className="space-y-4">

            {/* Step 1 - select patient */}
            <Select label="Step 1 — Select Patient" name="patient_id" value={form.patient_id} onChange={onChange} required>
              <option value="">Select patient</option>
              {patients.map(p => <option key={p.patient_id} value={p.patient_id}>{p.name}</option>)}
            </Select>

            {/* Step 2 - select record */}
            {form.patient_id && (
              <Select label="Step 2 — Select Medical Record" name="record_id" value={form.record_id} onChange={onChange} required>
                <option value="">
                  {loadingRecords ? "Loading records..." : records.length === 0 ? "No records found — create one first" : "Select record"}
                </option>
                {records.map(r => (
                  <option key={r.id} value={r.id}>
                    #{r.id} — {r.diagnosis} ({new Date(r.created_at).toLocaleDateString()})
                  </option>
                ))}
              </Select>
            )}

            {/* show warning if no records */}
            {form.patient_id && !loadingRecords && records.length === 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 flex items-center justify-between">
                <span>⚠ No medical records for this patient yet</span>
                <Btn size="sm" variant="outline" onClick={() => navigate(`/doctor/create-record?patientId=${form.patient_id}`)}>
                  Create Record
                </Btn>
              </div>
            )}

            {/* Step 3 - medicine */}
            <Select label="Step 3 — Select Medicine" name="medicine_name" value={form.medicine_name} onChange={onChange} required>
              <option value="">Select medicine</option>
              {medicines.map(m => (
                <option key={m.id} value={m.name}>
                  {m.name} — Stock: {m.stock} — ₹{m.price}
                </option>
              ))}
            </Select>

            {medicines.length === 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-700">
                ⚠ No medicines in inventory — ask admin to add medicines first
              </div>
            )}

            <Input label="Dosage" name="dosage" value={form.dosage} onChange={onChange} placeholder="e.g. 500mg twice daily" required />
            <Input label="Duration" name="duration" value={form.duration} onChange={onChange} placeholder="e.g. 5 days" required />

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 flex items-center gap-2">
              <span>⚠</span> Medicine stock will be automatically deducted on prescription
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Btn variant="secondary" onClick={() => navigate(-1)}>Cancel</Btn>
              <Btn type="submit" disabled={loading || !form.record_id || !form.medicine_name}>
                {loading ? "Prescribing..." : "Prescribe"}
              </Btn>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}