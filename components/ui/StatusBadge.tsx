// type Status = "typing" | "active" | "submitted" | "inactive";

// const labelMap: Record<Status, string> = {
//   typing: "Typing",
//   active: "Active",
//   submitted: "Submitted",
//   inactive: "Inactive"
// };

// export function StatusBadge({ status }: { status: Status }) {
//   const base =
//     "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium";

//   const style =
//     status === "submitted"
//       ? "bg-emerald-50 text-emerald-600 border-emerald-200" // เหมือน Available chip สีเขียว
//       : status === "typing" || status === "active"
//       ? "bg-sky-50 text-sky-600 border-sky-200"             // เหมือน On Holiday สีฟ้า
//       : "bg-amber-50 text-amber-600 border-amber-200";      // เหมือน Absent / On Leave สีส้ม

//   return <span className={`${base} ${style}`}>{labelMap[status]}</span>;
// }

// components/ui/StatusBadge.tsx
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
