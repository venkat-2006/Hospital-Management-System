import { useState, useEffect } from "react";
import { getMyRecords } from "../../api/services/patientService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td } from "../../components/UI";

const MyRecords = () => {

  const [records,setRecords] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{

    getMyRecords()
      .then(res => setRecords(res.data))
      .catch(()=>setError("Failed to load records"))
      .finally(()=>setLoading(false));

  },[]);

  if(loading) return <PageWrapper><LoadingSpinner/></PageWrapper>;
  if(error) return <PageWrapper><ErrorMsg message={error}/></PageWrapper>;

  return(

    <PageWrapper title="My Medical Records">

      <Card>

        <Table headers={["Date","Diagnosis","Treatment","Notes"]}>

          {records.map(r => (

            <Tr key={r.id}>

              <Td>
                {r.created_at
                  ? new Date(r.created_at).toLocaleDateString()
                  : "—"}
              </Td>

              <Td>{r.diagnosis}</Td>

              <Td>{r.treatment}</Td>

              <Td>{r.notes || "—"}</Td>

            </Tr>

          ))}

        </Table>

        {records.length === 0 && (
          <p className="text-center text-slate-500 py-6">
            No records found
          </p>
        )}

      </Card>

    </PageWrapper>

  );

};

export default MyRecords;