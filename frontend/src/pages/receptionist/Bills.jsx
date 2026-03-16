// import { useState, useEffect } from "react";
// import { getAllBills, createBill, getBillsByPatient } from "../../api/services/receptionistService";
// import { getPatients } from "../../api/services/adminService";
// import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Table, Tr, Td, Btn, Input, Select, StatusBadge } from "../../components/UI";

// const ReceptionistBills = () => {
//   const [bills, setBills] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ patient_id: "", total_amount: "", description: "" });
//   const [formLoading, setFormLoading] = useState(false);
//   const [filterPatientId, setFilterPatientId] = useState("");

//   const fetchBills = () => {
//     const req = filterPatientId ? getBillsByPatient(filterPatientId) : getAllBills();
//     req.then((res) => setBills(res.data))
//       .catch(() => setError("Failed to load bills"))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchBills();
//     getPatients().then((res) => setPatients(res.data)).catch(() => { });
//   }, []);

//   useEffect(() => { fetchBills(); }, [filterPatientId]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setFormLoading(true); setError("");
//     try {
//       await createBill(formData);
//       setSuccess("Bill created successfully!");
//       setFormData({ patient_id: "", total_amount: "", description: "" });
//       setShowForm(false);
//       fetchBills();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create bill");
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   return (
//     <PageWrapper title="Billing Management">
//       {error && <ErrorMsg message={error} />}
//       {success && <SuccessMsg message={success} />}

//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-3 items-end mb-4">
//         <Btn onClick={() => setShowForm(!showForm)}>
//           {showForm ? "Cancel" : "+ Create Bill"}
//         </Btn>
//         <div>
//           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
//             Filter by Patient
//           </label>
//           <select
//             value={filterPatientId}
//             onChange={(e) => setFilterPatientId(e.target.value)}
//             className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none bg-white focus:border-blue-500"
//           >
//             <option value="">All Patients</option>
//             {patients.map((p) => (
//               <option key={p.id} value={p.id}>{p.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Create Bill Form */}
//       {showForm && (
//         <Card className="mb-4">
//           <h3 className="font-semibold text-slate-800 mb-4">Generate New Bill</h3>
//           <form onSubmit={handleCreate}>
//             <div className="grid grid-cols-2 gap-x-4">
//               <Select label="Patient" name="patient_id" value={formData.patient_id} onChange={handleChange} required>
//                 <option value="">Select patient</option>
//                 {patients.map((p) => (
//                   <option key={p.id} value={p.id}>{p.name}</option>
//                 ))}
//               </Select>
//               <Input label="Total Amount (₹)" name="total_amount" type="number"
//                 value={formData.total_amount} onChange={handleChange} required />
//             </div>
//             <Input label="Description" name="description" value={formData.description}
//               onChange={handleChange} placeholder="e.g. Consultation, Tests, Medicines" />
//             <Btn type="submit" disabled={formLoading}>
//               {formLoading ? "Creating..." : "Create Bill"}
//             </Btn>
//           </form>
//         </Card>
//       )}

//       {/* Bills table */}
//       <Card>
//         {loading ? <LoadingSpinner /> : (
//           <Table headers={["Bill ID", "Patient", "Amount", "Description", "Status", "Date"]}>
//             {bills.map((b) => (
//               <Tr key={b.id}>
//                 <Td className="text-slate-400 text-xs">#{b.id}</Td>
//                 <Td><span className="font-semibold">{b.patient_name || `Patient #${b.patient_id}`}</span></Td>
//                 <Td><span className="font-semibold">₹{parseFloat(b.total_amount || 0).toFixed(2)}</span></Td>
//                 <Td className="text-slate-500">{b.description || "—"}</Td>
//                 <Td><StatusBadge status={b.status} /></Td>
//                 <Td className="text-slate-500 whitespace-nowrap">
//                   {b.created_at ? new Date(b.created_at).toLocaleDateString() : "—"}
//                 </Td>
//               </Tr>
//             ))}
//           </Table>
//         )}
//         {!loading && bills.length === 0 && (
//           <p className="text-slate-500 text-center py-6">No bills found.</p>
//         )}
//       </Card>
//     </PageWrapper>
//   );
// };

// export default ReceptionistBills;
import { useState, useEffect } from "react";
import { getAllBills } from "../../api/services/billService";
import { createPayment, getReceipt } from "../../api/services/paymentService";
import { PageWrapper, Card, ErrorMsg, EmptyState, TableSkeleton } from "../../components/UI";

const fmt     = (n) => `₹${parseFloat(n || 0).toFixed(2)}`;
const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const fmtDT   = (d) => new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

// ─── Print receipt in new window ──────────────────────────────────────────────
const printReceipt = (r) => {
  const medicines = (r.items || []).filter(i => i.item_type === "medicine");
  const labTests  = (r.items || []).filter(i => i.item_type === "lab_test");

  const rows = (list, color) => list.map(i => `
    <tr style="background:${color}">
      <td style="padding:6px 10px">${i.item_name}</td>
      <td style="padding:6px 10px;text-align:center">${i.quantity}</td>
      <td style="padding:6px 10px;text-align:right">${fmt(i.unit_price)}</td>
      <td style="padding:6px 10px;text-align:right;font-weight:600">${fmt(i.total_price)}</td>
    </tr>`).join("");

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Receipt ${r.receipt_number}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 600px; margin: 0 auto; }
    .header { text-align:center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; }
    .hospital { font-size: 22px; font-weight: 700; color: #0f172a; }
    .subtitle { color: #64748b; font-size: 13px; margin-top: 4px; }
    .receipt-no { font-size: 13px; color: #3b82f6; font-weight: 600; margin-top: 8px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .field label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
    .field p { font-size: 14px; font-weight: 500; margin-top: 2px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase;
                     letter-spacing: 0.08em; margin: 16px 0 8px; padding-bottom: 4px;
                     border-bottom: 1px solid #e2e8f0; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { background: #f8fafc; padding: 8px 10px; text-align: left; font-size: 11px;
         color: #64748b; text-transform: uppercase; }
    th:last-child, th:nth-child(2), th:nth-child(3) { text-align: right; }
    .total-row { border-top: 2px solid #e2e8f0; }
    .total-row td { padding: 12px 10px; font-size: 16px; font-weight: 700; }
    .paid-badge { display:inline-block; background:#dcfce7; color:#166534;
                  padding: 4px 16px; border-radius: 999px; font-size: 12px;
                  font-weight: 700; margin-top: 20px; }
    .footer { text-align:center; color:#94a3b8; font-size:12px; margin-top:24px;
              padding-top:16px; border-top:1px solid #e2e8f0; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="hospital">HMS Hospital</div>
    <div class="subtitle">Payment Receipt</div>
    <div class="receipt-no">${r.receipt_number}</div>
  </div>

  <div class="grid">
    <div class="field"><label>Patient</label><p>${r.patient_name}</p>${r.patient_phone ? `<p style="font-size:12px;color:#64748b">${r.patient_phone}</p>` : ""}</div>
    <div class="field"><label>Payment Date</label><p>${fmtDT(r.paid_at)}</p></div>
    <div class="field"><label>Doctor</label><p>${r.doctor_name || "—"}</p>${r.specialization ? `<p style="font-size:12px;color:#64748b">${r.specialization}</p>` : ""}</div>
    <div class="field"><label>Appointment</label><p>${r.appointment_time ? fmtDT(r.appointment_time) : "—"}</p></div>
    <div class="field"><label>Payment Method</label><p style="text-transform:capitalize">${r.payment_method}</p></div>
    ${r.notes ? `<div class="field"><label>Notes</label><p>${r.notes}</p></div>` : ""}
  </div>

  ${medicines.length > 0 ? `
  <div class="section-title">💊 Medicines</div>
  <table>
    <thead><tr><th>Medicine</th><th>Qty</th><th>Unit Price</th><th style="text-align:right">Total</th></tr></thead>
    <tbody>${rows(medicines, "#faf5ff")}</tbody>
  </table>` : ""}

  ${labTests.length > 0 ? `
  <div class="section-title">🔬 Lab Tests</div>
  <table>
    <thead><tr><th>Test</th><th>Qty</th><th>Unit Price</th><th style="text-align:right">Total</th></tr></thead>
    <tbody>${rows(labTests, "#eff6ff")}</tbody>
  </table>` : ""}

  <table style="margin-top:16px">
    <tbody>
      <tr class="total-row">
        <td colspan="3" style="padding:12px 10px">Total Amount</td>
        <td style="padding:12px 10px;text-align:right;font-size:18px;font-weight:700;color:#16a34a">${fmt(r.amount)}</td>
      </tr>
    </tbody>
  </table>

  <div style="text-align:center">
    <span class="paid-badge">✓ PAID</span>
  </div>

  <div class="footer">Thank you for choosing HMS Hospital</div>
</body>
</html>`;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
};

// ─── Payment Modal ────────────────────────────────────────────────────────────
const PaymentModal = ({ bill, onClose, onSuccess }) => {
  const [method,  setMethod]  = useState("cash");
  const [notes,   setNotes]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handlePay = async () => {
    setLoading(true); setError("");
    try {
      const res = await createPayment({
        bill_id:        bill.id,
        amount:         bill.total_amount,
        payment_method: method,
        notes,
      });
      onSuccess(res.data.payment);
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-slate-800 text-lg">Process Payment</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>

        {/* Bill summary */}
        <div className="bg-slate-50 rounded-xl p-4 mb-5">
          <p className="font-semibold text-slate-800">{bill.patient_name}</p>
          <p className="text-sm text-slate-500 mt-0.5">
            {bill.appointment_time ? `Appointment: ${fmtDate(bill.appointment_time)}` : `Bill #${bill.id}`}
          </p>
          <p className="text-2xl font-bold text-slate-800 mt-2">{fmt(bill.total_amount)}</p>

          {bill.items?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-200 space-y-1">
              {bill.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs text-slate-600">
                  <span>{item.item_type === "medicine" ? "💊" : "🔬"} {item.item_name} × {item.quantity}</span>
                  <span>{fmt(item.total_price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment method selector */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700 block mb-2">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: "cash", label: "💵 Cash" },
              { key: "card", label: "💳 Card" },
              { key: "upi",  label: "📱 UPI"  },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setMethod(m.key)}
                className={`py-2.5 rounded-xl border text-sm font-semibold transition-colors
                  ${method === m.key
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-5">
          <label className="text-sm font-medium text-slate-700 block mb-1.5">Notes (optional)</label>
          <input
            type="text"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g. UPI ref: 123456789"
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {error && <p className="text-sm text-rose-600 mb-3">⚠ {error}</p>}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold
                       text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePay}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600
                       disabled:opacity-50 text-white text-sm font-semibold transition-colors"
          >
            {loading ? "Processing..." : `Confirm ${fmt(bill.total_amount)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Bill Card ────────────────────────────────────────────────────────────────
const BillCard = ({ bill, onPaymentDone }) => {
  const [expanded,     setExpanded]     = useState(false);
  const [showModal,    setShowModal]    = useState(false);
  const [loadingRcpt,  setLoadingRcpt]  = useState(false);
  const isPaid = bill.status === "paid";

  const handlePaymentSuccess = async (payment) => {
    setShowModal(false);
    onPaymentDone(bill.id);
    // Auto-fetch receipt and print
    setLoadingRcpt(true);
    try {
      const res = await getReceipt(payment.id);
      printReceipt(res.data);
    } catch (e) {
      console.error("Receipt fetch failed:", e);
    } finally {
      setLoadingRcpt(false);
    }
  };

  const handleViewReceipt = async () => {
    if (!bill.payment_id) return;
    setLoadingRcpt(true);
    try {
      const res = await getReceipt(bill.payment_id);
      printReceipt(res.data);
    } catch (e) {
      console.error("Receipt fetch failed:", e);
    } finally {
      setLoadingRcpt(false);
    }
  };

  return (
    <>
      <div className={`rounded-xl border p-4 transition-colors
        ${isPaid ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-200"}`}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          {/* Left info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-slate-800">{bill.patient_name}</p>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full
                ${isPaid ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>
                {isPaid ? "✓ Paid" : "⏳ Pending"}
              </span>
            </div>
            {bill.patient_phone && <p className="text-xs text-slate-400 mt-0.5">{bill.patient_phone}</p>}
            <p className="text-xs text-slate-400 mt-0.5">
              {bill.appointment_time
                ? `Appointment: ${fmtDate(bill.appointment_time)}`
                : `Created: ${fmtDate(bill.created_at)}`}
            </p>
            {isPaid && bill.receipt_number && (
              <p className="text-xs text-blue-500 mt-0.5 font-medium">
                {bill.receipt_number} · {bill.payment_method?.toUpperCase()} · {fmtDT(bill.payment_date)}
              </p>
            )}
          </div>

          {/* Right actions */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <p className="text-xl font-bold text-slate-800">{fmt(bill.total_amount)}</p>
            {!isPaid ? (
              <button
                onClick={() => setShowModal(true)}
                className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-4 py-2
                           rounded-xl font-semibold transition-colors"
              >
                💳 Process Payment
              </button>
            ) : (
              <button
                onClick={handleViewReceipt}
                disabled={loadingRcpt}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2
                           rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                {loadingRcpt ? "Loading..." : "🖨 Print Receipt"}
              </button>
            )}
          </div>
        </div>

        {/* Expand line items */}
        {bill.items?.length > 0 && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="mt-3 text-xs text-blue-600 hover:underline font-medium"
          >
            {expanded ? "▲ Hide items" : `▼ Show ${bill.items.length} item(s)`}
          </button>
        )}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
            {bill.items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs text-slate-600">
                <span>{item.item_type === "medicine" ? "💊" : "🔬"} {item.item_name} × {item.quantity}</span>
                <span className="font-medium">{fmt(item.total_price)}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs font-bold text-slate-800 pt-2 border-t border-slate-100 mt-1">
              <span>Total</span>
              <span>{fmt(bill.total_amount)}</span>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <PaymentModal
          bill={bill}
          onClose={() => setShowModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Bills() {
  const [bills,   setBills]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("all");

  useEffect(() => {
    getAllBills()
      .then(res => setBills(res.data))
      .catch(() => setError("Failed to load bills"))
      .finally(() => setLoading(false));
  }, []);

  const handlePaymentDone = (billId) => {
    setBills(prev => prev.map(b => b.id === billId ? { ...b, status: "paid" } : b));
  };

  const pending = bills.filter(b => b.status === "pending");
  const paid    = bills.filter(b => b.status === "paid");

  const filtered = bills
    .filter(b => filter === "all" || b.status === filter)
    .filter(b => !search || b.patient_name?.toLowerCase().includes(search.toLowerCase()));

  const totalPending = pending.reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);
  const totalPaid    = paid.reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);

  if (loading) return <PageWrapper title="Bills & Payments"><TableSkeleton /></PageWrapper>;

  return (
    <PageWrapper title="Bills & Payments">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pending",       value: pending.length, sub: `${fmt(totalPending)} due`,        bg: "bg-rose-50    border-rose-100",    txt: "text-rose-700",    sub_c: "text-rose-400"    },
          { label: "Paid",          value: paid.length,    sub: `${fmt(totalPaid)} collected`,     bg: "bg-emerald-50 border-emerald-100", txt: "text-emerald-700", sub_c: "text-emerald-400" },
          { label: "Total Bills",   value: bills.length,   sub: "",                               bg: "bg-blue-50    border-blue-100",    txt: "text-blue-700",    sub_c: ""                 },
          { label: "Total Revenue", value: fmt(totalPaid), sub: "from paid bills",                bg: "bg-slate-50   border-slate-200",   txt: "text-slate-700",   sub_c: "text-slate-400"   },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-4 ${s.bg}`}>
            <p className={`text-xs font-semibold uppercase tracking-wide ${s.sub_c || "text-slate-500"}`}>{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.txt}`}>{s.value}</p>
            {s.sub && <p className={`text-xs mt-0.5 ${s.sub_c}`}>{s.sub}</p>}
          </div>
        ))}
      </div>

      {error && <div className="mb-4 text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</div>}

      <Card>
        {/* Search + filter */}
        <div className="flex flex-wrap gap-3 mb-5 items-center">
          <input
            type="text"
            placeholder="Search patient name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-slate-200 rounded-xl px-3.5 py-2 text-sm outline-none
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-100 flex-1 min-w-48"
          />
          {[
            { key: "all",     label: `All (${bills.length})`     },
            { key: "pending", label: `Pending (${pending.length})` },
            { key: "paid",    label: `Paid (${paid.length})`      },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors
                ${filter === f.key
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-2">🧾</p>
            <p className="text-sm">No bills found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(bill => (
              <BillCard key={bill.id} bill={bill} onPaymentDone={handlePaymentDone} />
            ))}
          </div>
        )}
      </Card>
    </PageWrapper>
  );
}