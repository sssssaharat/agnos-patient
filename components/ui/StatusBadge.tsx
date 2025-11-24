type Status = "typing" | "active" | "submitted" | "inactive";

const labelMap: Record<Status, string> = {
  typing: "Typing",
  active: "Active",
  submitted: "Submitted",
  inactive: "Inactive"
};

export function StatusBadge({ status }: { status: Status }) {
  const base = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";

  const color =
    status === "submitted"
      ? "bg-emerald-100 text-emerald-700"
      : status === "typing" || status === "active"
      ? "bg-blue-100 text-blue-700"
      : "bg-slate-200 text-slate-700";

  return <span className={`${base} ${color}`}>{labelMap[status]}</span>;
}
