import { useState, useEffect } from "react";
import { getMyBills, createPayment } from "../../api/services/patientService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Table, Tr, Td, Btn, StatusBadge } from "../../components/UI";

const MyBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [payingId, setPayingId] = useState(null);

  const fetchBills = () => {
    setLoading(true);
    getMyBills()
      .then((res) => setBills(res.data))
      .catch(() => setError("Failed to load bills"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBills(); }, []);

  const handlePay = async (billId, amount) => {
    setPayingId(billId); setError(""); setSuccess("");
    try {
      await createPayment({ bill_id: billId, amount });
      setSuccess("Payment successful!");
      fetchBills();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  const totalDue = bills
    .filter((b) => b.status === "pending")
    .reduce((sum, b) => sum + parseFloat(b.total_amount || 0), 0);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;

  return (
    <PageWrapper title="My Bills">
      {error && <ErrorMsg message={error} />}
      {success && <SuccessMsg message={success} />}

      {totalDue > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-5 flex justify-between items-center">
          <div>
            <div className="font-bold text-orange-700 text-lg">
              Outstanding Balance: ₹{totalDue.toFixed(2)}
            </div>
            <div className="text-orange-600 text-sm mt-0.5">
              You have pending bills that require payment.
            </div>
          </div>
        </div>
      )}

      <Card>
        <Table headers={["Bill ID", "Amount", "Description", "Status", "Date", "Action"]}>
          {bills.map((bill) => (
            <Tr key={bill.id}>
              <Td className="text-slate-400 text-xs">#{bill.id}</Td>
              <Td><span className="font-semibold">₹{parseFloat(bill.total_amount || 0).toFixed(2)}</span></Td>
              <Td className="text-slate-500">{bill.description || "Hospital charges"}</Td>
              <Td><StatusBadge status={bill.status} /></Td>
              <Td className="text-slate-500 whitespace-nowrap">
                {bill.created_at ? new Date(bill.created_at).toLocaleDateString() : "—"}
              </Td>
              <Td>
                {bill.status === "pending" ? (
                  <Btn
                    variant="success"
                    className="text-xs px-3 py-1.5"
                    disabled={payingId === bill.id}
                    onClick={() => handlePay(bill.id, bill.total_amount)}
                  >
                    {payingId === bill.id ? "Processing..." : "Pay Now"}
                  </Btn>
                ) : (
                  <span className="text-emerald-600 text-xs font-semibold">✓ Paid</span>
                )}
              </Td>
            </Tr>
          ))}
        </Table>
        {bills.length === 0 && (
          <p className="text-slate-500 text-center py-6">No bills found.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default MyBills;