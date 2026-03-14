import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPrescription, getMedicines, getMyPatients } from "../../api/services/doctorService";
import { PageWrapper, Card, ErrorMsg, SuccessMsg, Btn, Input, Select } from "../../components/UI";

const CreatePrescription = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ patient_id: "", medicine_name: "", dosage: "", duration: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    Promise.all([getMedicines(), getMyPatients()])
      .then(([med, pat]) => { setMedicines(med.data); setPatients(pat.data); })
      .catch(() => setError("Failed to load required data"));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      await createPrescription(formData);
      setSuccess("Prescription created successfully!");
      setFormData({ patient_id: "", medicine_name: "", dosage: "", duration: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Write Prescription">
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
          <Select label="Medicine" name="medicine_name" value={formData.medicine_name} onChange={handleChange} required>
            <option value="">Select medicine</option>
            {medicines.map((m) => (
              <option key={m.id} value={m.name}>{m.name} — Stock: {m.stock}</option>
            ))}
          </Select>
          <Input label="Dosage" name="dosage" value={formData.dosage} onChange={handleChange}
            placeholder="e.g. 500mg twice daily" required />
          <Input label="Duration" name="duration" value={formData.duration} onChange={handleChange}
            placeholder="e.g. 7 days" required />
          <Btn type="submit" disabled={loading}>{loading ? "Saving..." : "Prescribe Medicine"}</Btn>
        </form>
      </Card>
    </PageWrapper>
  );
};

export default CreatePrescription;