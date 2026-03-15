import { useState, useEffect } from "react";
import { getRequests, createAppointment, getDoctors, getDoctorSchedule } from "../../api/services/receptionistService";
import { PageWrapper, Card, Select, Btn, ErrorMsg, SuccessMsg } from "../../components/UI";

// ─── Constants ────────────────────────────────────────────────────────────────
const DAY_START = 8;   // 08:00
const DAY_END   = 18;  // last slot is 17:30

const ALL_SLOTS = (() => {
  const slots = [];
  for (let h = DAY_START; h < DAY_END; h++) {
    slots.push({ hour: h, minute: 0 });
    slots.push({ hour: h, minute: 30 });
  }
  return slots;
})();

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const pad = (n) => String(n).padStart(2, "0");

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getMondayOfWeek(offset = 0) {
  const d   = new Date();
  const dow = d.getDay(); // 0 = Sun
  d.setDate(d.getDate() + (dow === 0 ? -6 : 1 - dow) + offset * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDates(offset) {
  const monday = getMondayOfWeek(offset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function buildSlotDate(dayDate, hour, minute) {
  const d = new Date(dayDate);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function isSameSlot(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()     &&
    a.getHours()    === b.getHours()    &&
    a.getMinutes()  === b.getMinutes()
  );
}

function toInputValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatSlotLabel(date) {
  return date.toLocaleString("en-IN", {
    weekday: "short", day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

// ─── Slot styles ──────────────────────────────────────────────────────────────
const SLOT_STYLES = {
  past:
    "bg-slate-50 text-slate-300 cursor-default",
  booked:
    "bg-rose-50 text-rose-400 cursor-not-allowed",
  free:
    "bg-emerald-50 text-emerald-700 cursor-pointer " +
    "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 " +
    "active:scale-95",
  selected:
    "bg-blue-500 text-white cursor-pointer " +
    "hover:bg-blue-600 active:scale-95",
};

const SLOT_ICON = { past: "", booked: "✕", free: "", selected: "✓" };

// ─── SlotCalendar component ───────────────────────────────────────────────────
function SlotCalendar({ appointments, selectedTime, onSlotSelect }) {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDates   = getWeekDates(weekOffset);
  const now         = new Date();
  const todayStr    = new Date().toDateString();
  const bookedDates = appointments.map((a) => new Date(a.appointment_time));

  const getStatus = (dayDate, hour, minute) => {
    const slot = buildSlotDate(dayDate, hour, minute);
    if (slot <= now)                                         return "past";
    if (selectedTime && isSameSlot(slot, new Date(selectedTime))) return "selected";
    if (bookedDates.some((b) => isSameSlot(b, slot)))       return "booked";
    return "free";
  };

  const handleClick = (dayDate, hour, minute) => {
    const status = getStatus(dayDate, hour, minute);
    if (status === "past" || status === "booked") return;
    const slot = buildSlotDate(dayDate, hour, minute);
    // toggle off if already selected
    onSlotSelect(status === "selected" ? null : slot);
  };

  const weekLabel =
    weekDates[0].toLocaleDateString("en-IN", { day: "numeric", month: "short" }) +
    " – " +
    weekDates[6].toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="flex flex-col gap-3">

      {/* ── Week navigator ── */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setWeekOffset((w) => w - 1)}
          className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50
                     text-slate-500 text-lg flex items-center justify-center transition-colors"
        >
          ‹
        </button>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          {weekLabel}
        </span>
        <button
          type="button"
          onClick={() => setWeekOffset((w) => w + 1)}
          className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50
                     text-slate-500 text-lg flex items-center justify-center transition-colors"
        >
          ›
        </button>
      </div>

      {/* ── Grid ── */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">

          {/* Fixed header + scrollable body side by side */}
          <div style={{ minWidth: 460 }}>

            {/* Day header row */}
            <div
              className="grid bg-slate-50 border-b border-slate-200"
              style={{ gridTemplateColumns: "48px repeat(7, 1fr)" }}
            >
              <div className="h-10" /> {/* time column spacer */}
              {weekDates.map((d, i) => {
                const isToday = d.toDateString() === todayStr;
                return (
                  <div
                    key={i}
                    className={`h-10 flex flex-col items-center justify-center border-l border-slate-200
                      text-[11px] font-semibold
                      ${isToday ? "bg-blue-500 text-white" : "text-slate-500"}`}
                  >
                    <span>{DAY_LABELS[i]}</span>
                    <span className="text-sm font-bold leading-none mt-0.5">{d.getDate()}</span>
                  </div>
                );
              })}
            </div>

            {/* Scrollable slot rows */}
            <div className="overflow-y-auto" style={{ maxHeight: 320 }}>
              {ALL_SLOTS.map(({ hour, minute }) => (
                <div
                  key={`${hour}-${minute}`}
                  className="grid border-b border-slate-100 last:border-b-0"
                  style={{ gridTemplateColumns: "48px repeat(7, 1fr)" }}
                >
                  {/* Time label — only on :00 rows */}
                  <div className="h-8 bg-slate-50 border-r border-slate-100 flex items-center justify-end pr-2 flex-shrink-0">
                    {minute === 0 && (
                      <span className="text-[10px] text-slate-400 font-medium select-none">
                        {pad(hour)}:00
                      </span>
                    )}
                  </div>

                  {/* One cell per day */}
                  {weekDates.map((dayDate, di) => {
                    const status = getStatus(dayDate, hour, minute);
                    return (
                      <button
                        key={di}
                        type="button"
                        disabled={status === "past" || status === "booked"}
                        onClick={() => handleClick(dayDate, hour, minute)}
                        title={
                          status === "booked"
                            ? `Booked — ${pad(hour)}:${pad(minute)}`
                            : status === "free"
                            ? `Select ${pad(hour)}:${pad(minute)}`
                            : status === "selected"
                            ? "Selected — click to deselect"
                            : ""
                        }
                        className={`h-8 border-l border-slate-100 flex items-center justify-center
                          text-[11px] font-medium transition-all duration-100 select-none
                          ${SLOT_STYLES[status]}`}
                      >
                        {SLOT_ICON[status]}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {[
          { cls: "bg-emerald-100 border border-emerald-300", label: "Available" },
          { cls: "bg-blue-500",                               label: "Selected" },
          { cls: "bg-rose-100 border border-rose-200",        label: "Booked" },
          { cls: "bg-slate-100 border border-slate-200",      label: "Past" },
        ].map(({ cls, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className={`w-3 h-3 rounded-sm flex-shrink-0 ${cls}`} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const Schedule = () => {
  const [requests,           setRequests]           = useState([]);
  const [doctors,            setDoctors]            = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [loadingSchedule,    setLoadingSchedule]    = useState(false);

  const [form, setForm] = useState({
    request_id: "", patient_id: "", doctor_id: "", appointment_time: "",
  });

  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRequests().then((res) =>
      setRequests(res.data.filter((r) => r.status !== "scheduled"))
    );
    getDoctors().then((res) => setDoctors(res.data));
  }, []);

  const selectRequest = (e) => {
    const id = parseInt(e.target.value);
    const r  = requests.find((x) => x.id === id);
    if (r) setForm((f) => ({ ...f, request_id: r.id, patient_id: r.patient_id }));
  };

  const selectDoctor = async (e) => {
    const doctorId = e.target.value;
    setForm((f) => ({ ...f, doctor_id: doctorId, appointment_time: "" }));
    if (!doctorId) { setDoctorAppointments([]); return; }

    setLoadingSchedule(true);
    try {
      const res   = await getDoctorSchedule(doctorId);
      // handle both array and { appointments: [] } shapes
      const appts = Array.isArray(res.data)
        ? res.data
        : (res.data?.appointments ?? []);
      setDoctorAppointments(appts);
    } catch {
      setDoctorAppointments([]);
    } finally {
      setLoadingSchedule(false);
    }
  };

  // Calendar click → fill form (null = clear)
  const handleSlotSelect = (date) => {
    setForm((f) => ({ ...f, appointment_time: date ? toInputValue(date) : "" }));
  };

  // Manual datetime-local typing
  const changeTime = (e) => setForm((f) => ({ ...f, appointment_time: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    try {
      await createAppointment(form);
      setSuccess("Appointment scheduled successfully!");
      setForm({ request_id: "", patient_id: "", doctor_id: "", appointment_time: "" });
      setDoctorAppointments([]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed — possible scheduling conflict");
    } finally {
      setLoading(false);
    }
  };

  const selectedDoctor = doctors.find((d) => d.id === parseInt(form.doctor_id));

  const isConflict =
    !!form.appointment_time &&
    doctorAppointments.some((a) =>
      isSameSlot(new Date(a.appointment_time), new Date(form.appointment_time))
    );

  const selectedSlotLabel = form.appointment_time
    ? formatSlotLabel(new Date(form.appointment_time))
    : null;

  return (
    <PageWrapper title="Schedule Appointment">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">

        {/* ── Left: form ── */}
        <Card>
          <h2 className="font-semibold text-slate-800 mb-5">Appointment Details</h2>
          {error   && <ErrorMsg message={error} />}
          {success && <SuccessMsg message={success} />}

          <form onSubmit={submit} className="space-y-4">

            <Select label="Select Request" value={form.request_id} onChange={selectRequest} required>
              <option value="">Choose Request</option>
              {requests.map((r) => (
                <option key={r.id} value={r.id}>
                  #{r.id} — Patient {r.patient_id} ({r.department || "General"})
                </option>
              ))}
            </Select>

            <Select label="Assign Doctor" name="doctor_id" value={form.doctor_id} onChange={selectDoctor} required>
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.specialization}
                </option>
              ))}
            </Select>

            {/* Doctor info */}
            {selectedDoctor && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm">
                <p className="font-semibold text-blue-800">{selectedDoctor.name}</p>
                <p className="text-blue-600">
                  {selectedDoctor.specialization} · {selectedDoctor.experience} yrs · {selectedDoctor.phone}
                </p>
                <p className="text-blue-500 text-xs mt-1">
                  {doctorAppointments.length} booked appointment{doctorAppointments.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            {/* Selected slot chip */}
            {selectedSlotLabel && (
              <div
                className={`rounded-xl px-4 py-3 text-sm flex items-center justify-between
                  ${isConflict
                    ? "bg-rose-50 border border-rose-200 text-rose-700"
                    : "bg-emerald-50 border border-emerald-200 text-emerald-700"}`}
              >
                <span>
                  {isConflict ? "⚠ Conflict — " : "✓ "}
                  <span className="font-semibold">{selectedSlotLabel}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleSlotSelect(null)}
                  className="text-xs underline opacity-60 hover:opacity-100 ml-3 whitespace-nowrap"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Manual input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                Date & Time
                {form.doctor_id && !selectedSlotLabel && (
                  <span className="ml-2 text-xs text-blue-400 font-normal">
                    ← pick from calendar or type here
                  </span>
                )}
              </label>
              <input
                type="datetime-local"
                name="appointment_time"
                value={form.appointment_time}
                onChange={changeTime}
                required
                step={30 * 60}
                className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none
                  focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
              />
            </div>

            <Btn type="submit" disabled={loading || isConflict} className="w-full">
              {loading ? "Scheduling..." : "Confirm Appointment"}
            </Btn>

          </form>
        </Card>

        {/* ── Right: calendar ── */}
        <Card>
          <h2 className="font-semibold text-slate-800 mb-4">
            {selectedDoctor ? `${selectedDoctor.name}'s Schedule` : "Doctor Schedule"}
          </h2>

          {!form.doctor_id ? (
            <div className="text-center py-14">
              <p className="text-4xl mb-3">👨‍⚕️</p>
              <p className="text-slate-400 text-sm">
                Select a doctor to see their weekly slot calendar
              </p>
            </div>
          ) : loadingSchedule ? (
            <div className="animate-pulse space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-slate-100 rounded-lg" />
              ))}
            </div>
          ) : (
            <SlotCalendar
              appointments={doctorAppointments}
              selectedTime={form.appointment_time}
              onSlotSelect={handleSlotSelect}
            />
          )}
        </Card>

      </div>
    </PageWrapper>
  );
};

export default Schedule;