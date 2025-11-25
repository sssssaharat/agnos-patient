
type Status = "active" | "submitted" | "inactive";

const labelMap: Record<Status, string> = {
  active: "Active",
  submitted: "Submitted",
  inactive: "Inactive"
};

const colorMap: Record<Status, string> = {
  submitted: "bg-emerald-500",
  active: "bg-sky-500",
  inactive: "bg-slate-300"
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-100">
      <span className={`h-2 w-2 rounded-full ${colorMap[status]}`} />
      {labelMap[status]}
    </span>
  );
}
