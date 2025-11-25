import type { ReactNode } from "react";

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 space-y-3">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

