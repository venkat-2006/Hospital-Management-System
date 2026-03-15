import { useState } from "react";
import { createRequest } from "../../api/services/patientService";
import { PageWrapper, Card, Btn, ErrorMsg, SuccessMsg, Input, Textarea } from "../../components/UI";

const RequestAppointment = () => {

  const [form,setForm] = useState({
    department:"",
    preferred_date:"",
    reason:""
  });

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = async(e)=>{

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try{

      await createRequest(form);

      setSuccess("Appointment request sent successfully");

      setForm({
        department:"",
        preferred_date:"",
        reason:""
      });

    }catch(err){

      setError(err.response?.data?.message || "Failed");

    }

    setLoading(false);

  };

  return(

    <PageWrapper title="Book Appointment">

      <Card className="max-w-xl">

        {error && <ErrorMsg message={error}/>}
        {success && <SuccessMsg message={success}/>}

        <form onSubmit={submit} className="space-y-4">

          <Input
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Cardiology / Orthopedics / General"
            required
          />

          <Input
            type="date"
            label="Preferred Date"
            name="preferred_date"
            value={form.preferred_date}
            onChange={handleChange}
            required
          />

          <Textarea
            label="Reason"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows={4}
            placeholder="Describe symptoms"
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