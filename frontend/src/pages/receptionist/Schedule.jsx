import { useState, useEffect } from "react";
import { getRequests, createAppointment } from "../../api/services/receptionistService";
import { PageWrapper, Card, ErrorMsg, SuccessMsg, Btn, Select } from "../../components/UI";

const Schedule = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    request_id: "", patient_id: "", doctor_id: "", appointment_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getRequests()
      .then((res) => setRequests(res.data.filter((r) => r.status !== "scheduled")))
      .catch(() => setError("Failed to load requests"));
  }, []);

  const handleRequestSelect = (e) => {
    const id = parseInt(e.target.value);
    const selected = requests.find((r) => r.id === id);
    if (selected) {
      setFormData({
        ...formData,
        request_id: selected.id,
        patient_id: selected.patient_id,
        doctor_id: selected.doctor_id,
      });
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      await createAppointment(formData);
      setSuccess("Appointment scheduled successfully! Patient and doctor have been notified.");
      setFormData({ request_id: "", patient_id: "", doctor_id: "", appointment_time: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule appointment");
    } finally {
      setLoading(false);
    }
  };

  const selectedRequest = requests.find((r) => r.id === parseInt(formData.request_id));

  return (
    <PageWrapper title="Schedule Appointment">
      <Card className="max-w-xl">
        {error && <ErrorMsg message={error} />}
        {success && <SuccessMsg message={success} />}

        <form onSubmit={handleSubmit}>
          <Select label="Select Request" onChange={handleRequestSelect} value={formData.request_id} required>
            <option value="">Choose a pending request</option>
            {requests.map((r) => (
              <option key={r.id} value={r.id}>
                #{r.id} — {r.patient_name || `Patient #${r.patient_id}`} → {r.doctor_name || `Dr. #${r.doctor_id}`}
              </option>
            ))}
          </Select>

          {selectedRequest && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4 text-sm text-blue-700">
              <span className="font-semibold">Reason:</span> {selectedRequest.reason || "Not specified"}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Appointment Date & Time
            </label>
            <input
              name="appointment_time"
              type="datetime-local"
              value={formData.appointment_time}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <Btn type="submit" disabled={loading || !formData.request_id}>
            {loading ? "Scheduling..." : "Confirm Appointment"}
          </Btn>
        </form>
      </Card>
    </PageWrapper>
  );
};

export default Schedule;