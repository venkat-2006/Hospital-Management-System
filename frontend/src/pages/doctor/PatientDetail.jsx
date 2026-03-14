import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMyPatientData, getRecordsByPatient,
  getPrescriptionsByPatient, getLabReportsByPatient,
} from "../../api/services/doctorService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, Table, Tr, Td, Btn, StatusBadge } from "../../components/UI";

const Section = ({ title, children }) => (
  <Card>
    <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">{title}</h3>
    {children}
  </Card>
);

const PatientDetail = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getMyPatientData(patientId),
      getRecordsByPatient(patientId),
      getPrescriptionsByPatient(patientId),
      getLabReportsByPatient(patientId),
    ]).then(([p, r, rx, lab]) => {
      setPatient(p.data); setRecords(r.data);
      setPrescriptions(rx.data); setLabReports(lab.data);
    }).catch(() => setError("Failed to load patient data"))
      .finally(() => setLoading(false));
  }, [patientId]);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;
  if (error) return <PageWrapper><ErrorMsg message={error} /></PageWrapper>;

  return (
    <PageWrapper title={`Patient: ${patient?.name || "Unknown"}`}>
      <div className="mb-4">
        <Btn variant="ghost" onClick={() => navigate("/doctor/patients")}>← Back to Patients</Btn>
      </div>

      <Section title="Patient Information">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[["Email", patient?.email], ["Phone", patient?.phone], ["Gender", patient?.gender],
          ["Date of Birth", patient?.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : "—"],
          ["Address", patient?.address],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-0.5">{label}</div>
              <div className="text-sm text-slate-800">{value || "—"}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <Btn onClick={() => navigate(`/doctor/create-record?patientId=${patientId}`)}>+ Create Record</Btn>
          <Btn variant="ghost" onClick={() => navigate(`/doctor/request-lab?patientId=${patientId}`)}>🔬 Request Lab Test</Btn>
        </div>
      </Section>

      <Section title={`Medical Records (${records.length})`}>
        {records.length === 0 ? <p className="text-slate-500 text-sm">No records found.</p> : (
          <Table headers={["Date", "Diagnosis", "Notes"]}>
            {records.map((r) => (
              <Tr key={r.id}>
                <Td>{r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}</Td>
                <Td><span className="font-medium">{r.diagnosis}</span></Td>
                <Td className="text-slate-500">{r.notes || "—"}</Td>
              </Tr>
            ))}
          </Table>
        )}
      </Section>

      <Section title={`Prescriptions (${prescriptions.length})`}>
        {prescriptions.length === 0 ? <p className="text-slate-500 text-sm">No prescriptions found.</p> : (
          <Table headers={["Medicine", "Dosage", "Duration", "Date"]}>
            {prescriptions.map((rx) => (
              <Tr key={rx.id}>
                <Td><span className="font-medium">{rx.medicine_name}</span></Td>
                <Td>{rx.dosage}</Td>
                <Td>{rx.duration}</Td>
                <Td>{rx.created_at ? new Date(rx.created_at).toLocaleDateString() : "—"}</Td>
              </Tr>
            ))}
          </Table>
        )}
      </Section>

      <Section title={`Lab Reports (${labReports.length})`}>
        {labReports.length === 0 ? <p className="text-slate-500 text-sm">No lab reports found.</p> : (
          <Table headers={["Test Type", "Result", "Status", "Date"]}>
            {labReports.map((l) => (
              <Tr key={l.id}>
                <Td><span className="font-medium">{l.test_type}</span></Td>
                <Td>{l.result || <span className="text-slate-400 italic">Pending</span>}</Td>
                <Td><StatusBadge status={l.result ? "completed" : "pending"} /></Td>
                <Td>{l.created_at ? new Date(l.created_at).toLocaleDateString() : "—"}</Td>
              </Tr>
            ))}
          </Table>
        )}
      </Section>
    </PageWrapper>
  );
};

export default PatientDetail;