import { useState, useEffect } from "react";
import { createRequest } from "../../api/services/patientService";
import { getDoctors } from "../../api/services/adminService";
import { PageWrapper, Card, ErrorMsg, SuccessMsg, Btn, Select, Textarea } from "../../components/UI";

const RequestAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ doctor_id: "", reason: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data))
      .catch(() => setError("Failed to load doctors"));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      await createRequest(formData);
      setSuccess("Appointment request submitted! The receptionist will confirm a time shortly.");
      setFormData({ doctor_id: "", reason: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Book an Appointment">
      <Card className="max-w-xl">
        {error && <ErrorMsg message={error} />}
        {success && <SuccessMsg message={success} />}
        <p className="text-slate-500 text-sm mb-5">
          Select a doctor and provide a reason. Our receptionist will schedule a confirmed time for you.
        </p>
        <form onSubmit={handleSubmit}>
          <Select label="Select Doctor" name="doctor_id" value={formData.doctor_id} onChange={handleChange} required>
            <option value="">Choose a doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}{d.specialization ? ` — ${d.specialization}` : ""}
              </option>
            ))}
          </Select>
          <Textarea
            label="Reason for Visit"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Briefly describe your symptoms or reason..."
            rows={4}
            required
          />
          <Btn type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Btn>
        </form>
      </Card>
    </PageWrapper>
  );
};

export default RequestAppointment;