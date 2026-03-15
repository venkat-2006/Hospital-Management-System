import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createLabReport, getMyPatients } from "../../api/services/doctorService";
import { PageWrapper, Card, ErrorMsg, SuccessMsg, Btn, Select, Textarea } from "../../components/UI";

const LAB_TESTS = [
  "Complete Blood Count (CBC)", "Blood Sugar (Fasting)", "Blood Sugar (PP)",
  "HbA1c", "Lipid Profile", "Liver Function Test (LFT)", "Kidney Function Test (KFT)",
  "Thyroid Profile (TSH)", "Urine Routine", "X-Ray Chest",
  "ECG", "Ultrasound Abdomen", "MRI Brain", "CT Scan",
];

const RequestLabTest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: searchParams.get("patientId") || "",
    test_type: "", notes: "",
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
      await createLabReport(formData);
      setSuccess("Lab test requested successfully!");
      setFormData({ patient_id: "", test_type: "", notes: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request lab test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Request Lab Test">
      <div className="mb-4">
        <Btn variant="ghost" onClick={() => navigate(-1)}>← Back</Btn>
      </div>
      <Card className="max-w-xl">
        {error && <ErrorMsg message={error} />}
        {success && <SuccessMsg message={success} />}
        <form onSubmit={handleSubmit}>
          <Select label="Patient" name="patient_id" value={formData.patient_id} onChange={handleChange} required>
            <option value="">Select a patient</option>
            {patients.map(p => (
  <option key={p.patient_id} value={p.patient_id}>  {/* ← patient_id not id */}
    {p.name}
  </option>
))}
          </Select>
          <Select label="Test Type" name="test_type" value={formData.test_type} onChange={handleChange} required>
            <option value="">Select test type</option>
            {LAB_TESTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
          <Textarea label="Clinical Notes (optional)" name="notes" value={formData.notes}
            onChange={handleChange} placeholder="Reason for test, clinical context..." rows={3} />
          <Btn type="submit" disabled={loading}>{loading ? "Requesting..." : "Request Lab Test"}</Btn>
        </form>
      </Card>
    </PageWrapper>
  );
};

export default RequestLabTest;