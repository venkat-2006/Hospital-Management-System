import { useState, useEffect } from "react";
import { getPendingTests, updateLabResult } from "../../api/services/labService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Btn } from "../../components/UI";

const PendingTests = () => {

  const [tests,setTests] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const [results,setResults] = useState({});
  const [updatingId,setUpdatingId] = useState(null);

  useEffect(()=>{

    getPendingTests()
      .then(res => setTests(res.data))
      .catch(()=>setError("Failed to load pending tests"))
      .finally(()=>setLoading(false));

  },[]);

  const handleResultChange = (id,value)=>{

    setResults({
      ...results,
      [id]:value
    });

  };

  const handleUpload = async(id)=>{

    if(!results[id]?.trim()) return;

    setUpdatingId(id);
    setError("");
    setSuccess("");

    try{

      await updateLabResult(id,results[id]);

      setTests(tests.filter(t => t.id !== id));

      setSuccess("Result uploaded successfully!");

      setResults(prev=>{
        const copy={...prev};
        delete copy[id];
        return copy;
      });

    }catch(err){

      setError(err.response?.data?.message || "Upload failed");

    }

    setUpdatingId(null);

  };

  if(loading) return (
    <PageWrapper>
      <LoadingSpinner/>
    </PageWrapper>
  );

  return(

    <PageWrapper title={`Pending Tests (${tests.length})`}>

      {error && <ErrorMsg message={error}/>}
      {success && <SuccessMsg message={success}/>}

      {tests.length === 0 ? (

        <Card>

          <div className="text-center py-12">

            <div className="text-5xl mb-4">✅</div>

            <h3 className="text-lg font-semibold mb-2">
              No Pending Tests
            </h3>

            <p className="text-slate-500 text-sm">
              All lab tests have been completed.
            </p>

          </div>

        </Card>

      ) : (

        <div className="space-y-3">

          {tests.map(test => (

            <Card key={test.id}>

              <div className="flex justify-between gap-4 flex-wrap">

                <div>

                  <div className="text-xs text-orange-600 font-semibold">
                    Test #{test.id}
                  </div>

                  <div className="text-lg font-bold">
                    {test.test_type}
                  </div>

                  <div className="text-sm text-slate-500">

                    Patient #{test.patient_id}

                  </div>

                </div>

                <div className="flex items-end gap-2 min-w-72">

                  <textarea
                    rows={2}
                    placeholder="Enter result..."
                    value={results[test.id] || ""}
                    onChange={(e)=>handleResultChange(test.id,e.target.value)}
                    className="border rounded p-2 w-full text-sm"
                  />

                  <Btn
                    onClick={()=>handleUpload(test.id)}
                    disabled={updatingId===test.id || !results[test.id]?.trim()}
                  >
                    {updatingId===test.id ? "Uploading..." : "Upload"}
                  </Btn>

                </div>

              </div>

            </Card>

          ))}

        </div>

      )}

    </PageWrapper>

  );

};

export default PendingTests;