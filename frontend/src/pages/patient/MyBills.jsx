// // import { useState, useEffect } from "react";
// // import { getMyBills, createPayment } from "../../api/services/patientService";
// // import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Table, Tr, Td, Btn, StatusBadge } from "../../components/UI";

// // const MyBills = () => {
// //   const [bills, setBills] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [payingId, setPayingId] = useState(null);

// //   const fetchBills = () => {
// //     setLoading(true);
// //     getMyBills()
// //       .then((res) => setBills(res.data))
// //       .catch(() => setError("Failed to load bills"))
// //       .finally(() => setLoading(false));
// //   };

// //   useEffect(() => { fetchBills(); }, []);

// //   const handlePay = async (billId, amount) => {
// //     setPayingId(billId); setError(""); setSuccess("");
// //     try {
// //       await createPayment({ bill_id: billId, amount });
// //       setSuccess("Payment successful!");
// //       fetchBills();
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Payment failed. Please try again.");
// //     } finally {
// //       setPayingId(null);
// //     }
// //   };

// //   const totalDue = bills
// //     .filter((b) => b.status === "pending")
// //     .reduce((sum, b) => sum + parseFloat(b.total_amount || 0), 0);

// //   if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;

// //   return (
// //     <PageWrapper title="My Bills">
// //       {error && <ErrorMsg message={error} />}
// //       {success && <SuccessMsg message={success} />}

// //       {totalDue > 0 && (
// //         <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-5 flex justify-between items-center">
// //           <div>
// //             <div className="font-bold text-orange-700 text-lg">
// //               Outstanding Balance: ₹{totalDue.toFixed(2)}
// //             </div>
// //             <div className="text-orange-600 text-sm mt-0.5">
// //               You have pending bills that require payment.
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <Card>
// //         <Table headers={["Bill ID", "Amount", "Description", "Status", "Date", "Action"]}>
// //           {bills.map((bill) => (
// //             <Tr key={bill.id}>
// //               <Td className="text-slate-400 text-xs">#{bill.id}</Td>
// //               <Td><span className="font-semibold">₹{parseFloat(bill.total_amount || 0).toFixed(2)}</span></Td>
// //               <Td className="text-slate-500">{bill.description || "Hospital charges"}</Td>
// //               <Td><StatusBadge status={bill.status} /></Td>
// //               <Td className="text-slate-500 whitespace-nowrap">
// //                 {bill.created_at ? new Date(bill.created_at).toLocaleDateString() : "—"}
// //               </Td>
// //               <Td>
// //                 {bill.status === "pending" ? (
// //                   <Btn
// //                     variant="success"
// //                     className="text-xs px-3 py-1.5"
// //                     disabled={payingId === bill.id}
// //                     onClick={() => handlePay(bill.id, bill.total_amount)}
// //                   >
// //                     {payingId === bill.id ? "Processing..." : "Pay Now"}
// //                   </Btn>
// //                 ) : (
// //                   <span className="text-emerald-600 text-xs font-semibold">✓ Paid</span>
// //                 )}
// //               </Td>
// //             </Tr>
// //           ))}
// //         </Table>
// //         {bills.length === 0 && (
// //           <p className="text-slate-500 text-center py-6">No bills found.</p>
// //         )}
// //       </Card>
// //     </PageWrapper>
// //   );
// // };

// // export default MyBills;
// import { useState, useEffect } from "react";
// import { getMyBills } from "../../api/services/patientService";
// import { getReceipt } from "../../api/services/paymentService";
// import { PageWrapper, Card, LoadingSpinner, ErrorMsg } from "../../components/UI";

// const fmt     = (n) => `₹${parseFloat(n || 0).toFixed(2)}`;
// const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
// const fmtDT   = (d) => new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

// // Print receipt in a new window
// const printReceipt = (r) => {
//   const medicines = (r.items || []).filter(i => i.item_type === "medicine");
//   const labTests  = (r.items || []).filter(i => i.item_type === "lab_test");

//   const rows = (list, color) => list.map(i => `
//     <tr style="background:${color}">
//       <td style="padding:6px 10px">${i.item_name}</td>
//       <td style="padding:6px 10px;text-align:center">${i.quantity}</td>
//       <td style="padding:6px 10px;text-align:right">${fmt(i.unit_price)}</td>
//       <td style="padding:6px 10px;text-align:right;font-weight:600">${fmt(i.total_price)}</td>
//     </tr>`).join("");

//   const html = `<!DOCTYPE html><html><head><title>Receipt ${r.receipt_number}</title>
//   <style>
//     *{margin:0;padding:0;box-sizing:border-box}
//     body{font-family:Arial,sans-serif;padding:40px;color:#1e293b;max-width:600px;margin:0 auto}
//     .header{text-align:center;border-bottom:2px solid #e2e8f0;padding-bottom:20px;margin-bottom:24px}
//     .hospital{font-size:22px;font-weight:700;color:#0f172a}
//     .subtitle{color:#64748b;font-size:13px;margin-top:4px}
//     .receipt-no{font-size:13px;color:#3b82f6;font-weight:600;margin-top:8px}
//     .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
//     .field label{font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em}
//     .field p{font-size:14px;font-weight:500;margin-top:2px}
//     .section-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;
//       margin:16px 0 8px;padding-bottom:4px;border-bottom:1px solid #e2e8f0}
//     table{width:100%;border-collapse:collapse;font-size:13px}
//     th{background:#f8fafc;padding:8px 10px;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase}
//     .total-row{border-top:2px solid #e2e8f0}
//     .total-row td{padding:12px 10px;font-size:16px;font-weight:700}
//     .paid-badge{display:inline-block;background:#dcfce7;color:#166534;padding:4px 16px;
//       border-radius:999px;font-size:12px;font-weight:700;margin-top:20px}
//     .footer{text-align:center;color:#94a3b8;font-size:12px;margin-top:24px;
//       padding-top:16px;border-top:1px solid #e2e8f0}
//     @media print{body{padding:20px}}
//   </style></head><body>
//   <div class="header">
//     <div class="hospital">HMS Hospital</div>
//     <div class="subtitle">Payment Receipt</div>
//     <div class="receipt-no">${r.receipt_number}</div>
//   </div>
//   <div class="grid">
//     <div class="field"><label>Patient</label><p>${r.patient_name}</p>${r.patient_phone ? `<p style="font-size:12px;color:#64748b">${r.patient_phone}</p>` : ""}</div>
//     <div class="field"><label>Payment Date</label><p>${fmtDT(r.paid_at)}</p></div>
//     <div class="field"><label>Doctor</label><p>${r.doctor_name || "—"}</p>${r.specialization ? `<p style="font-size:12px;color:#64748b">${r.specialization}</p>` : ""}</div>
//     <div class="field"><label>Appointment</label><p>${r.appointment_time ? fmtDT(r.appointment_time) : "—"}</p></div>
//     <div class="field"><label>Payment Method</label><p style="text-transform:capitalize">${r.payment_method}</p></div>
//     ${r.notes ? `<div class="field"><label>Notes</label><p>${r.notes}</p></div>` : ""}
//   </div>
//   ${medicines.length > 0 ? `<div class="section-title">💊 Medicines</div>
//   <table><thead><tr><th>Medicine</th><th>Qty</th><th>Unit Price</th><th style="text-align:right">Total</th></tr></thead>
//   <tbody>${rows(medicines, "#faf5ff")}</tbody></table>` : ""}
//   ${labTests.length > 0 ? `<div class="section-title">🔬 Lab Tests</div>
//   <table><thead><tr><th>Test</th><th>Qty</th><th>Unit Price</th><th style="text-align:right">Total</th></tr></thead>
//   <tbody>${rows(labTests, "#eff6ff")}</tbody></table>` : ""}
//   <table style="margin-top:16px"><tbody>
//     <tr class="total-row">
//       <td colspan="3" style="padding:12px 10px">Total Amount</td>
//       <td style="padding:12px 10px;text-align:right;font-size:18px;font-weight:700;color:#16a34a">${fmt(r.amount)}</td>
//     </tr>
//   </tbody></table>
//   <div style="text-align:center"><span class="paid-badge">✓ PAID</span></div>
//   <div class="footer">Thank you for choosing HMS Hospital</div>
// </body></html>`;

//   const win = window.open("", "_blank");
//   win.document.write(html);
//   win.document.close();
//   setTimeout(() => win.print(), 500);
// };

// // ─── Bill Card ────────────────────────────────────────────────────────────────
// const BillCard = ({ bill }) => {
//   const [expanded,    setExpanded]    = useState(false);
//   const [loadingRcpt, setLoadingRcpt] = useState(false);
//   const isPaid = bill.status === "paid";

//   const handlePrintReceipt = async () => {
//     if (!bill.payment_id) return;
//     setLoadingRcpt(true);
//     try {
//       const res = await getReceipt(bill.payment_id);
//       printReceipt(res.data);
//     } catch (e) {
//       console.error("Receipt error:", e);
//     } finally {
//       setLoadingRcpt(false);
//     }
//   };

//   return (
//     <div className={`border rounded-xl p-4 transition-colors
//       ${isPaid ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`}
//     >
//       <div className="flex items-start justify-between gap-3 flex-wrap">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap mb-1">
//             <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full
//               ${isPaid ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>
//               {isPaid ? "✓ Paid" : "⏳ Pending"}
//             </span>
//             {bill.appointment_time && (
//               <span className="text-xs text-slate-500">
//                 📅 {fmtDate(bill.appointment_time)}
//               </span>
//             )}
//             {bill.doctor_name && (
//               <span className="text-xs text-slate-500">
//                 👨‍⚕️ {bill.doctor_name}
//               </span>
//             )}
//           </div>

//           {isPaid && bill.receipt_number && (
//             <p className="text-xs text-blue-500 font-medium mt-0.5">
//               {bill.receipt_number} · {bill.payment_method?.toUpperCase()} · {fmtDT(bill.payment_date)}
//             </p>
//           )}

//           {!isPaid && (
//             <p className="text-xs text-rose-500 mt-0.5">Payment pending — please visit the reception</p>
//           )}
//         </div>

//         <div className="flex flex-col items-end gap-2 flex-shrink-0">
//           <p className="text-xl font-bold text-slate-800">{fmt(bill.total_amount)}</p>
//           {isPaid && bill.payment_id && (
//             <button
//               onClick={handlePrintReceipt}
//               disabled={loadingRcpt}
//               className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5
//                          rounded-xl font-semibold transition-colors disabled:opacity-50"
//             >
//               {loadingRcpt ? "Loading..." : "🖨 Receipt"}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Line items toggle */}
//       {bill.items?.length > 0 && (
//         <button
//           onClick={() => setExpanded(e => !e)}
//           className="mt-3 text-xs text-blue-600 hover:underline font-medium"
//         >
//           {expanded ? "▲ Hide breakdown" : `▼ View ${bill.items.length} item(s)`}
//         </button>
//       )}

//       {expanded && (
//         <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5">
//           {bill.items.filter(i => i.item_type === "medicine").length > 0 && (
//             <>
//               <p className="text-xs font-semibold text-violet-600">💊 Medicines</p>
//               {bill.items.filter(i => i.item_type === "medicine").map((item, i) => (
//                 <div key={i} className="flex justify-between text-xs text-slate-600 bg-violet-50 rounded-lg px-3 py-1.5">
//                   <span>{item.item_name} × {item.quantity}</span>
//                   <span className="font-medium">{fmt(item.total_price)}</span>
//                 </div>
//               ))}
//             </>
//           )}
//           {bill.items.filter(i => i.item_type === "lab_test").length > 0 && (
//             <>
//               <p className="text-xs font-semibold text-blue-600 mt-2">🔬 Lab Tests</p>
//               {bill.items.filter(i => i.item_type === "lab_test").map((item, i) => (
//                 <div key={i} className="flex justify-between text-xs text-slate-600 bg-blue-50 rounded-lg px-3 py-1.5">
//                   <span>{item.item_name}</span>
//                   <span className="font-medium">{fmt(item.total_price)}</span>
//                 </div>
//               ))}
//             </>
//           )}
//           <div className="flex justify-between text-xs font-bold text-slate-800 pt-2 border-t border-slate-200 mt-1">
//             <span>Total</span>
//             <span>{fmt(bill.total_amount)}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Main Page ────────────────────────────────────────────────────────────────
// const MyBills = () => {
//   const [bills,   setBills]   = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState("");

//   useEffect(() => {
//     getMyBills()
//       .then(res => setBills(res.data))
//       .catch(() => setError("Failed to load bills"))
//       .finally(() => setLoading(false));
//   }, []);

//   const pending      = bills.filter(b => b.status === "pending");
//   const paid         = bills.filter(b => b.status === "paid");
//   const totalDue     = pending.reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);
//   const totalPaid    = paid.reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);

//   if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;

//   return (
//     <PageWrapper title="My Bills">

//       {/* Stats */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//         <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
//           <p className="text-xs font-semibold text-rose-500 uppercase tracking-wide">Pending</p>
//           <p className="text-2xl font-bold text-rose-700 mt-1">{pending.length}</p>
//           {totalDue > 0 && <p className="text-xs text-rose-400 mt-0.5">{fmt(totalDue)} due</p>}
//         </div>
//         <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
//           <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">Paid</p>
//           <p className="text-2xl font-bold text-emerald-700 mt-1">{paid.length}</p>
//           {totalPaid > 0 && <p className="text-xs text-emerald-400 mt-0.5">{fmt(totalPaid)}</p>}
//         </div>
//         <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
//           <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Total Bills</p>
//           <p className="text-2xl font-bold text-blue-700 mt-1">{bills.length}</p>
//         </div>
//         <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
//           <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Spent</p>
//           <p className="text-xl font-bold text-slate-700 mt-1">{fmt(totalPaid)}</p>
//         </div>
//       </div>

//       {error && <div className="mb-4 text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</div>}

//       {/* Pending alert */}
//       {totalDue > 0 && (
//         <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-5 flex items-center gap-3">
//           <span className="text-2xl">⚠️</span>
//           <div>
//             <p className="font-bold text-orange-700">Outstanding Balance: {fmt(totalDue)}</p>
//             <p className="text-orange-600 text-sm mt-0.5">Please visit the reception to clear your pending bills.</p>
//           </div>
//         </div>
//       )}

//       <Card>
//         <h2 className="font-semibold text-slate-800 mb-4">All Bills</h2>
//         {bills.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-3xl mb-2">🧾</p>
//             <p className="text-slate-400 text-sm">No bills found</p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {bills.map(bill => <BillCard key={bill.id} bill={bill} />)}
//           </div>
//         )}
//       </Card>
//     </PageWrapper>
//   );
// };

// export default MyBills;
import { useState, useEffect } from "react";
import { getMyBills } from "../../api/services/patientService";
import { getReceipt } from "../../api/services/paymentService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg } from "../../components/UI";

const fmt     = (n) => `₹${parseFloat(n || 0).toFixed(2)}`;
const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const fmtDT   = (d) => new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

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

  const html = `<!DOCTYPE html><html><head><title>Receipt ${r.receipt_number}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial,sans-serif;padding:40px;color:#1e293b;max-width:600px;margin:0 auto}
    .header{text-align:center;border-bottom:2px solid #e2e8f0;padding-bottom:20px;margin-bottom:24px}
    .hospital{font-size:22px;font-weight:700;color:#0f172a}
    .subtitle{color:#64748b;font-size:13px;margin-top:4px}
    .receipt-no{font-size:13px;color:#3b82f6;font-weight:600;margin-top:8px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
    .field label{font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em}
    .field p{font-size:14px;font-weight:500;margin-top:2px}
    .section-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;
      margin:16px 0 8px;padding-bottom:4px;border-bottom:1px solid #e2e8f0}
    table{width:100%;border-collapse:collapse;font-size:13px}
    th{background:#f8fafc;padding:8px 10px;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase}
    .total-row{border-top:2px solid #e2e8f0}
    .total-row td{padding:12px 10px;font-size:16px;font-weight:700}
    .paid-badge{display:inline-block;background:#dcfce7;color:#166534;padding:4px 16px;
      border-radius:999px;font-size:12px;font-weight:700;margin-top:20px}
    .footer{text-align:center;color:#94a3b8;font-size:12px;margin-top:24px;
      padding-top:16px;border-top:1px solid #e2e8f0}
    @media print{body{padding:20px}}
  </style></head><body>
  <div class="header">
    <div class="hospital">HMS Hospital</div>
    <div class="subtitle">Payment Receipt</div>
    <div class="receipt-no">${r.receipt_number || "—"}</div>
  </div>
  <div class="grid">
    <div class="field"><label>Patient</label><p>${r.patient_name || "—"}</p>${r.patient_phone ? `<p style="font-size:12px;color:#64748b">${r.patient_phone}</p>` : ""}</div>
    <div class="field"><label>Payment Date</label><p>${r.paid_at ? fmtDT(r.paid_at) : "—"}</p></div>
    <div class="field"><label>Doctor</label><p>${r.doctor_name || "—"}</p></div>
    <div class="field"><label>Appointment</label><p>${r.appointment_time ? fmtDT(r.appointment_time) : "—"}</p></div>
    <div class="field"><label>Payment Method</label><p style="text-transform:capitalize">${r.payment_method || "—"}</p></div>
    ${r.notes ? `<div class="field"><label>Notes</label><p>${r.notes}</p></div>` : ""}
  </div>
  ${medicines.length > 0 ? `<div class="section-title">💊 Medicines</div>
  <table><thead><tr><th>Medicine</th><th>Qty</th><th>Unit Price</th><th style="text-align:right">Total</th></tr></thead>
  <tbody>${rows(medicines, "#faf5ff")}</tbody></table>` : ""}
  ${labTests.length > 0 ? `<div class="section-title">🔬 Lab Tests</div>
  <table><thead><tr><th>Test</th><th>Qty</th><th>Unit Price</th><th style="text-align:right">Total</th></tr></thead>
  <tbody>${rows(labTests, "#eff6ff")}</tbody></table>` : ""}
  <table style="margin-top:16px"><tbody>
    <tr class="total-row">
      <td colspan="3" style="padding:12px 10px">Total Amount</td>
      <td style="padding:12px 10px;text-align:right;font-size:18px;font-weight:700;color:#16a34a">${fmt(r.amount || r.total_amount)}</td>
    </tr>
  </tbody></table>
  <div style="text-align:center"><span class="paid-badge">✓ PAID</span></div>
  <div class="footer">Thank you for choosing HMS Hospital</div>
</body></html>`;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
};

const BillCard = ({ bill }) => {
  const [expanded,    setExpanded]    = useState(false);
  const [loadingRcpt, setLoadingRcpt] = useState(false);
  const isPaid = bill.status === "paid";

  const handlePrintReceipt = async () => {
    if (!bill.payment_id) return;
    setLoadingRcpt(true);
    try {
      const res = await getReceipt(bill.payment_id);
      printReceipt(res.data);
    } catch (e) {
      console.error("Receipt error:", e);
    } finally {
      setLoadingRcpt(false);
    }
  };

  return (
    <div className={`border rounded-xl p-4 transition-colors
      ${isPaid ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          {/* Status + meta row */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full
              ${isPaid ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>
              {isPaid ? "✓ Paid" : "⏳ Pending"}
            </span>
            {bill.appointment_time && (
              <span className="text-xs text-slate-500">📅 {fmtDate(bill.appointment_time)}</span>
            )}
            {bill.doctor_name && (
              <span className="text-xs text-slate-500">👨‍⚕️ {bill.doctor_name}</span>
            )}
          </div>

          {/* Created date fallback */}
          <p className="text-xs text-slate-400">
            {bill.appointment_time
              ? `Appointment: ${fmtDate(bill.appointment_time)}`
              : `Bill created: ${fmtDate(bill.created_at)}`}
          </p>

          {/* Receipt info */}
          {isPaid && bill.receipt_number && (
            <p className="text-xs text-blue-500 font-medium mt-1">
              {bill.receipt_number} · {bill.payment_method?.toUpperCase()} · {bill.payment_date ? fmtDT(bill.payment_date) : ""}
            </p>
          )}

          {!isPaid && (
            <p className="text-xs text-rose-500 mt-1">Please visit reception to pay</p>
          )}
        </div>

        {/* Amount + receipt button */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <p className="text-xl font-bold text-slate-800">{fmt(bill.total_amount)}</p>
          {isPaid && (
            <button
              onClick={handlePrintReceipt}
              disabled={loadingRcpt || !bill.payment_id}
              className="text-xs bg-white hover:bg-slate-50 border border-slate-200 text-slate-600
                         px-3 py-1.5 rounded-xl font-semibold transition-colors disabled:opacity-40"
            >
              {loadingRcpt ? "Loading..." : "🖨 Receipt"}
            </button>
          )}
        </div>
      </div>

      {/* Line items toggle */}
      {bill.items?.length > 0 && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-3 text-xs text-blue-600 hover:underline font-medium"
        >
          {expanded ? "▲ Hide breakdown" : `▼ View ${bill.items.length} item(s)`}
        </button>
      )}

      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5">
          {bill.items.filter(i => i.item_type === "medicine").length > 0 && (
            <>
              <p className="text-xs font-semibold text-violet-600">💊 Medicines</p>
              {bill.items.filter(i => i.item_type === "medicine").map((item, i) => (
                <div key={i} className="flex justify-between text-xs text-slate-600 bg-violet-50 rounded-lg px-3 py-1.5">
                  <span>{item.item_name} × {item.quantity}</span>
                  <span className="font-medium">{fmt(item.total_price)}</span>
                </div>
              ))}
            </>
          )}
          {bill.items.filter(i => i.item_type === "lab_test").length > 0 && (
            <>
              <p className="text-xs font-semibold text-blue-600 mt-2">🔬 Lab Tests</p>
              {bill.items.filter(i => i.item_type === "lab_test").map((item, i) => (
                <div key={i} className="flex justify-between text-xs text-slate-600 bg-blue-50 rounded-lg px-3 py-1.5">
                  <span>{item.item_name}</span>
                  <span className="font-medium">{fmt(item.total_price)}</span>
                </div>
              ))}
            </>
          )}
          <div className="flex justify-between text-xs font-bold text-slate-800 pt-2 border-t border-slate-200 mt-1">
            <span>Total</span>
            <span>{fmt(bill.total_amount)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const MyBills = () => {
  const [bills,   setBills]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    getMyBills()
      .then(res => {
        console.log("Bills data:", res.data); // debug — remove later
        setBills(res.data);
      })
      .catch(() => setError("Failed to load bills"))
      .finally(() => setLoading(false));
  }, []);

  const pending   = bills.filter(b => b.status === "pending");
  const paid      = bills.filter(b => b.status === "paid");
  const totalDue  = pending.reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);
  const totalPaid = paid.reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);

  if (loading) return <PageWrapper><LoadingSpinner /></PageWrapper>;

  return (
    <PageWrapper title="My Bills">

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-rose-500 uppercase tracking-wide">Pending</p>
          <p className="text-2xl font-bold text-rose-700 mt-1">{pending.length}</p>
          {totalDue > 0 && <p className="text-xs text-rose-400 mt-0.5">{fmt(totalDue)} due</p>}
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">Paid</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{paid.length}</p>
          {totalPaid > 0 && <p className="text-xs text-emerald-400 mt-0.5">{fmt(totalPaid)}</p>}
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Total Bills</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{bills.length}</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Spent</p>
          <p className="text-xl font-bold text-slate-700 mt-1">{fmt(totalPaid)}</p>
        </div>
      </div>

      {error && <div className="mb-4 text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</div>}

      {totalDue > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-5 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bold text-orange-700">Outstanding Balance: {fmt(totalDue)}</p>
            <p className="text-orange-600 text-sm mt-0.5">Please visit reception to clear your pending bills.</p>
          </div>
        </div>
      )}

      <Card>
        <h2 className="font-semibold text-slate-800 mb-4">All Bills</h2>
        {bills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">🧾</p>
            <p className="text-slate-400 text-sm">No bills found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bills.map(bill => <BillCard key={bill.id} bill={bill} />)}
          </div>
        )}
      </Card>
    </PageWrapper>
  );
};

export default MyBills;