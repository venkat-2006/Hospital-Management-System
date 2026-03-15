import { useState, useEffect } from "react";
import { getRequests } from "../../api/services/receptionistService";
import {
  PageWrapper,
  Card,
  LoadingSpinner,
  ErrorMsg,
  Table,
  Tr,
  Td,
  Badge
} from "../../components/UI";

const Requests = () => {

  const [requests,setRequests] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{

    getRequests()
      .then(res => setRequests(res.data))
      .catch(()=>setError("Failed to load requests"))
      .finally(()=>setLoading(false));

  },[]);

  if(loading) return <PageWrapper><LoadingSpinner/></PageWrapper>;
  if(error) return <PageWrapper><ErrorMsg message={error}/></PageWrapper>;

  return(

    <PageWrapper title="Appointment Requests">

      <Card>

        <Table headers={[
          "Request ID",
          "Patient",
          "Department",
          "Preferred Date",
          "Reason",
          "Status"
        ]}>

          {requests.map(r => (

            <Tr key={r.id}>

              <Td className="text-xs text-slate-400">
                #{r.id}
              </Td>

              <Td>
                Patient #{r.patient_id}
              </Td>

              <Td>
                {r.department}
              </Td>

              <Td>
                {r.preferred_date
                  ? new Date(r.preferred_date).toLocaleDateString()
                  : "—"}
              </Td>

              <Td className="text-slate-500">
                {r.reason}
              </Td>

              <Td>
                <Badge
                  label={r.status || "pending"}
                  color={r.status === "scheduled"
                    ? "#27ae60"
                    : "#f59e0b"}
                />
              </Td>

            </Tr>

          ))}

        </Table>

        {requests.length === 0 && (
          <p className="text-center text-slate-500 py-6">
            No requests found
          </p>
        )}

      </Card>

    </PageWrapper>

  );

};

export default Requests;