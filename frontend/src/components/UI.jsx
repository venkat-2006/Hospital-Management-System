import { useEffect } from "react";

export const PageWrapper = ({ children, title }) => (
  <div>
    {title && (
      <h1 className="text-2xl font-bold text-slate-800 mb-6">{title}</h1>
    )}
    {children}
  </div>
);

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);

export const StatCard = ({ label, value, icon, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${colors[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-800">{value ?? 0}</p>
    </div>
  );
};

// Skeleton loader
export const Skeleton = ({ rows = 5 }) => (
  <div className="animate-pulse">
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-28 bg-slate-100 rounded-2xl" />
      ))}
    </div>
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-b border-slate-50 last:border-0">
          <div className="h-4 bg-slate-100 rounded w-1/4" />
          <div className="h-4 bg-slate-100 rounded w-1/3" />
          <div className="h-4 bg-slate-100 rounded w-1/5" />
          <div className="h-4 bg-slate-100 rounded w-1/6" />
        </div>
      ))}
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="animate-pulse">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4 py-3 border-b border-slate-50">
        <div className="h-4 bg-slate-100 rounded w-1/4" />
        <div className="h-4 bg-slate-100 rounded w-1/3" />
        <div className="h-4 bg-slate-100 rounded w-1/5" />
        <div className="h-4 bg-slate-100 rounded w-1/6" />
      </div>
    ))}
  </div>
);

// Toast notification
export const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-700",
    error: "bg-rose-50 border-rose-200 text-rose-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  const icons = { success: "✓", error: "✕", info: "ℹ" };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${styles[type]} animate-pulse`}>
      <span className="font-bold">{icons[type]}</span>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">✕</button>
    </div>
  );
};

export const ErrorMsg = ({ message }) =>
  message ? (
    <div className="bg-rose-50 text-rose-600 border border-rose-200 rounded-xl px-4 py-3 text-sm mb-4 flex items-center gap-2">
      <span>⚠</span> {message}
    </div>
  ) : null;

export const SuccessMsg = ({ message }) =>
  message ? (
    <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl px-4 py-3 text-sm mb-4 flex items-center gap-2">
      <span>✓</span> {message}
    </div>
  ) : null;

export const Btn = ({ children, onClick, type = "button", disabled, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-rose-500 hover:bg-rose-600 text-white",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    success: "bg-emerald-500 hover:bg-emerald-600 text-white",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, name, value, onChange, type = "text", placeholder, required, error }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required}
      className={`border rounded-xl px-3 py-2.5 text-sm outline-none transition
        ${error ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100" : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}`}
    />
    {error && <p className="text-xs text-rose-500">{error}</p>}
  </div>
);

export const Select = ({ label, name, value, onChange, children, required, error }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`border rounded-xl px-3 py-2.5 text-sm outline-none transition bg-white
        ${error ? "border-rose-300 focus:border-rose-400" : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}`}
    >
      {children}
    </select>
    {error && <p className="text-xs text-rose-500">{error}</p>}
  </div>
);

export const Textarea = ({ label, name, value, onChange, placeholder, rows = 3, required }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
    />
  </div>
);

export const Table = ({ children }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-100">
    <table className="w-full text-sm text-left">{children}</table>
  </div>
);

export const Tr = ({ children, header }) => (
  <tr className={header
    ? "bg-slate-50 border-b border-slate-100"
    : "border-b border-slate-50 hover:bg-slate-50/50 transition"
  }>
    {children}
  </tr>
);

export const Td = ({ children, header }) => {
  const Tag = header ? "th" : "td";
  return (
    <Tag className={`px-4 py-3 ${header ? "text-xs font-semibold text-slate-500 uppercase tracking-wide" : "text-slate-700"}`}>
      {children}
    </Tag>
  );
};
export const SectionHead = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
    {subtitle && (
      <p className="text-sm text-slate-500">{subtitle}</p>
    )}
  </div>
);
const badgeStyles = {
  pending:      "bg-amber-50 text-amber-700 border border-amber-200",
  scheduled:    "bg-blue-50 text-blue-700 border border-blue-200",
  completed:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled:    "bg-rose-50 text-rose-700 border border-rose-200",
  paid:         "bg-emerald-50 text-emerald-700 border border-emerald-200",
  ADMIN:        "bg-rose-50 text-rose-700 border border-rose-200",
  DOCTOR:       "bg-blue-50 text-blue-700 border border-blue-200",
  PATIENT:      "bg-emerald-50 text-emerald-700 border border-emerald-200",
  RECEPTIONIST: "bg-violet-50 text-violet-700 border border-violet-200",
  LAB_TECH:     "bg-amber-50 text-amber-700 border border-amber-200",
};

export const Badge = ({ value }) => (
  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${badgeStyles[value] || "bg-slate-100 text-slate-600"}`}>
    {value}
  </span>
);

export const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${badgeStyles[status] || "bg-slate-100 text-slate-600"}`}>
    {status}
  </span>
);

export const EmptyState = ({ message = "No data found" }) => (
  <div className="text-center py-12">
    <p className="text-4xl mb-3">📭</p>
    <p className="text-slate-500 text-sm">{message}</p>
  </div>
);
export function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>

      <p className="text-sm text-gray-500 font-medium">{text}</p>

    </div>
  );
}