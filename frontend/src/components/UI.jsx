export const PageWrapper = ({ title, children }) => (
  <div className="p-8">
    {title && (
      <h1 className="text-2xl font-bold text-slate-800 mb-6 pb-3 border-b-2 border-slate-200">
        {title}
      </h1>
    )}
    {children}
  </div>
);

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-5 ${className}`}>
    {children}
  </div>
);

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-48">
    <div className="w-9 h-9 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

export const ErrorMsg = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
    <span>⚠️</span> {message}
  </div>
);

export const SuccessMsg = ({ message }) => (
  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
    <span>✅</span> {message}
  </div>
);

export const Table = ({ headers, children }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-slate-50 border-b-2 border-slate-200">
          {headers.map((h) => (
            <th key={h} className="px-4 py-3 text-left text-slate-500 font-semibold whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

export const Tr = ({ children }) => (
  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
    {children}
  </tr>
);

export const Td = ({ children, className = "" }) => (
  <td className={`px-4 py-3 text-slate-700 align-middle ${className}`}>
    {children}
  </td>
);

export const Badge = ({ label, color = "#64748b" }) => {
  const colorMap = {
    "#2980b9": "bg-blue-100 text-blue-700",
    "#27ae60": "bg-green-100 text-green-700",
    "#e74c3c": "bg-red-100 text-red-700",
    "#f59e0b": "bg-amber-100 text-amber-700",
    "#8e44ad": "bg-purple-100 text-purple-700",
    "#e67e22": "bg-orange-100 text-orange-700",
    "#c0392b": "bg-red-100 text-red-800",
    "#10b981": "bg-emerald-100 text-emerald-700",
    "#3b82f6": "bg-blue-100 text-blue-700",
    "#ef4444": "bg-red-100 text-red-700",
    "#6b7280": "bg-slate-100 text-slate-600",
    "#64748b": "bg-slate-100 text-slate-600",
  };
  const cls = colorMap[color] || "bg-slate-100 text-slate-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
    paid: "bg-emerald-100 text-emerald-700",
    unpaid: "bg-red-100 text-red-700",
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-500",
  };
  const cls = map[status?.toLowerCase()] || "bg-slate-100 text-slate-500";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}>
      {status}
    </span>
  );
};

const variantMap = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  success: "bg-emerald-500 hover:bg-emerald-600 text-white",
  ghost: "bg-slate-100 hover:bg-slate-200 text-slate-700",
};

export const Btn = ({ children, onClick, disabled, variant = "primary", type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variantMap[variant]} ${className}`}
  >
    {children}
  </button>
);

export const Input = ({ label, className = "", ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    )}
    <input
      {...props}
      className={`w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${className}`}
    />
  </div>
);

export const Select = ({ label, children, className = "", ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    )}
    <select
      {...props}
      className={`w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white transition-all ${className}`}
    >
      {children}
    </select>
  </div>
);

export const Textarea = ({ label, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    )}
    <textarea
      {...props}
      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-vertical font-sans"
    />
  </div>
);

export const StatCard = ({ label, value, color, icon }) => {
  const borderMap = {
    blue: "border-l-blue-500",
    green: "border-l-emerald-500",
    orange: "border-l-orange-500",
    red: "border-l-red-500",
    purple: "border-l-purple-500",
    teal: "border-l-teal-500",
  };
  const bgMap = {
    blue: "bg-blue-50",
    green: "bg-emerald-50",
    orange: "bg-orange-50",
    red: "bg-red-50",
    purple: "bg-purple-50",
    teal: "bg-teal-50",
  };
  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${borderMap[color] || "border-l-slate-400"} p-6 flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-xl ${bgMap[color] || "bg-slate-50"} flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-800">{value ?? "—"}</div>
        <div className="text-sm text-slate-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
};