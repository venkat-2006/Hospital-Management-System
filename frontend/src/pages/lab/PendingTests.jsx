import { useState, useEffect } from "react";
import { getPendingTests, updateLabResult } from "../../api/services/labService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Btn } from "../../components/UI";

const PendingTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [results, setResults] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    getPendingTests()
      .then((res) => setTests(res.data))
      .catch(() => setError("Failed to load pending tests"))
      .finally(() => setLoading(false));
  }, []);

  const handleResultChange = (id, value) => setResults({ ...results, [id]: value });

  const handleUpload = async (id) => {
    if (!results[id]?.trim()) return;
    setUpdatingId(id); setError(""); setSuccess("");
    try {
      await updateLabResult(id, results[id]);
      setTests(tests.filter((t) => t.id !== id));
      setSuccess("Result uploaded successfully!");
      setResults((prev) => { const r = { ...prev }; delete r[id]; return r; });
    } catch {
      setError("Failed to upload result. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;

  return (
    <PageWrapper title={`Pending Tests (${tests.length})`}>
      {error && <ErrorMsg message={error} />}
      {success && <SuccessMsg message={success} />}

      {tests.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">All caught up!</h3>
            <p className="text-slate-500 text-sm">No pending lab tests at this time.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {tests.map((test) => (
            <Card key={test.id} className="mb-0">
              <div className="flex flex-wrap items-start justify-between gap-5">
                {/* Test info */}
                <div className="flex-1 min-w-48">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Test #{test.id}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-slate-800 mb-1.5">{test.test_type}</div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span>👤 Patient #{test.patient_id}</span>
                    {test.doctor_id && <span>👨‍⚕️ Doctor #{test.doctor_id}</span>}
                    {test.created_at && (
                      <span>📅 {new Date(test.created_at).toLocaleDateString()}</span>
                    )}
                  </div>
                  {test.notes && (
                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-700">
                      <span className="font-semibold">Clinical Notes:</span> {test.notes}
                    </div>
                  )}
                </div>

                {/* Result input */}
                <div className="flex items-end gap-3 min-w-72">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                      Enter Result
                    </label>
                    <textarea
                      placeholder="e.g. Hemoglobin: 13.5 g/dL, WBC: Normal..."
                      value={results[test.id] || ""}
                      onChange={(e) => handleResultChange(test.id, e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none font-sans transition-all"
                    />
                  </div>
                  <Btn
                    variant="primary"
                    onClick={() => handleUpload(test.id)}
                    disabled={updatingId === test.id || !results[test.id]?.trim()}
                    className="whitespace-nowrap mb-0.5"
                  >
                    {updatingId === test.id ? "Uploading..." : "Upload Result"}
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