import { useState, useEffect } from "react";
import { getRequests, createAppointment } from "../../api/services/receptionistService";
import { getDoctors } from "../../api/services/adminService";
import { PageWrapper, Card, Select, Btn, ErrorMsg, SuccessMsg } from "../../components/UI";

const Schedule = () => {

  const [requests,setRequests] = useState([]);
  const [doctors,setDoctors] = useState([]);

  const [form,setForm] = useState({
    request_id:"",
    patient_id:"",
    doctor_id:"",
    appointment_time:""
  });

  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect(()=>{

    getRequests()
      .then(res => setRequests(res.data.filter(r => r.status !== "scheduled")));

    getDoctors()
      .then(res => setDoctors(res.data));

  },[]);

  const selectRequest = (e)=>{

    const id = parseInt(e.target.value);
    const r = requests.find(x => x.id === id);

    if(r){

      setForm({
        ...form,
        request_id:r.id,
        patient_id:r.patient_id
      });

    }

  };

  const change = (e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };

  const submit = async(e)=>{

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try{

      await createAppointment(form);

      setSuccess("Appointment scheduled");

      setForm({
        request_id:"",
        patient_id:"",
        doctor_id:"",
        appointment_time:""
      });

    }catch(err){

      setError(err.response?.data?.message || "Failed");

    }

    setLoading(false);

  };

  return(

    <PageWrapper title="Schedule Appointment">

      <Card className="max-w-xl">

        {error && <ErrorMsg message={error}/>}
        {success && <SuccessMsg message={success}/>}

        <form onSubmit={submit}>

          <Select
            label="Select Request"
            value={form.request_id}
            onChange={selectRequest}
            required
          >

            <option value="">Choose Request</option>

            {requests.map(r=>(
              <option key={r.id} value={r.id}>
                #{r.id} — Patient {r.patient_id} ({r.department})
              </option>
            ))}

          </Select>

          <Select
            label="Assign Doctor"
            name="doctor_id"
            value={form.doctor_id}
            onChange={change}
            required
          >

            <option value="">Select Doctor</option>

            {doctors.map(d=>(
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}

          </Select>

          <div className="mb-4">

            <label className="block text-sm font-semibold mb-1">
              Appointment Time
            </label>

            <input
              type="datetime-local"
              name="appointment_time"
              value={form.appointment_time}
              onChange={change}
              required
              className="border p-2 w-full rounded"
            />

          </div>

          <Btn type="submit" disabled={loading}>
            {loading ? "Scheduling..." : "Confirm Appointment"}
          </Btn>

        </form>

      </Card>

    </PageWrapper>

  );

};

export default Schedule;