type SectionState = "pending" | "editing" | "complete";

function Dot({ state, label }: { state: SectionState; label: string }) {
  const base =
    "h-2.5 w-2.5 rounded-full border border-transparent transition";
  const color =
    state === "complete"
      ? "bg-emerald-400"
      : state === "editing"
      ? "bg-amber-400"
      : "bg-slate-300";

  return (
    <div className="flex items-center gap-1">
      <span className={`${base} ${color}`} />
      <span className="text-[11px] text-slate-500">{label}</span>
    </div>
  );
}

export function ProgressDots({ data }: { data: import("@/lib/validation").PatientData }) {
  const getState = (fields: (keyof typeof data)[]): SectionState => {
    const values = fields.map((f) => data[f]);
    const filled = values.filter((v) => !!v).length;

    if (filled === 0) return "pending";
    if (filled === fields.length) return "complete";
    return "editing";
  };

  const personal = getState(["firstName", "lastName", "dateOfBirth", "gender"]);
  const contact = getState(["phone", "email", "address", "preferredLanguage", "nationality"]);
  const emergency = getState(["emergencyContactName", "emergencyContactRelationship", "religion"]);

  return (
    <div className="flex flex-col gap-1">
      <Dot state={personal} label="Personal" />
      <Dot state={contact} label="Contact" />
      <Dot state={emergency} label="Emergency" />
    </div>
  );
}
