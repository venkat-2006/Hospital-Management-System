import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createMedicalRecord, getMyPatients } from "../../api/services/doctorService";
import { PageWrapper, Card, ErrorMsg, SuccessMsg, Btn, Input, Select, Textarea } from "../../components/UI";

const CreateRecord = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: searchParams.get("patientId") || "",
    diagnosis: "", notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getMyPatients().then((res) => setPatients(res.data)).catch(() => { });
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      await createMedicalRecord(formData);
      setSuccess("Medical record created successfully!");
      setFormData({ patient_id: "", diagnosis: "", notes: "" });
      setTimeout(() => navigate("/doctor/patients"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Create Medical Record">
      <div className="mb-4">
        <Btn variant="ghost" onClick={() => navigate(-1)}>← Back</Btn>
      </div>
      <Card className="max-w-xl">
        {error && <ErrorMsg message={error} />}
        {success && <SuccessMsg message={success} />}
        <form onSubmit={handleSubmit}>
          <Select label="Patient" name="patient_id" value={formData.patient_id} onChange={handleChange} required>
            <option value="">Select a patient</option>
            {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </Select>
          <Input label="Diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange}
            placeholder="e.g. Hypertension, Type 2 Diabetes" required />
          <Textarea label="Notes / Observations" name="notes" value={formData.notes}
            onChange={handleChange} placeholder="Additional clinical notes..." rows={4} />
          <Btn type="submit" disabled={loading}>{loading ? "Saving..." : "Create Record"}</Btn>
        </form>
      </Card>
    </PageWrapper>
  );
};

export default CreateRecord;