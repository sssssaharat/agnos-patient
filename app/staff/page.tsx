"use client";

import { useRealtimePatient } from "@/lib/useRealtimePatient";
import type { PatientData } from "@/lib/validation";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}

export default function StaffPage() {
  const { data, connected } = useRealtimePatient("staff");

  const d = <K extends keyof PatientData>(field: K): string =>
    data?.[field]?.toString() ?? "";


  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Staff View</h2>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span>
            Connection:{" "}
            <span className={connected ? "text-emerald-600" : "text-red-500"}>
              {connected ? "Online" : "Offline"}
            </span>
          </span>
          <span>
            Status:{" "}
            {data ? (
              <StatusBadge status={data.status} />
            ) : (
              <span className="text-slate-500">No patient yet</span>
            )}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Metric
          label="Patient Name"
          value={
            data
              ? `${data.firstName} ${data.lastName}`.trim()
              : "Waiting for patient"
          }
        />
        <Metric
          label="Last Updated"
          value={data ? new Date().toLocaleTimeString() : "—"}
        />
        <Metric
          label="Activity"
          value={data ? data.status.toUpperCase() : "—"}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <SectionCard title="Personal Information">
          <Row label="First Name" value={d("firstName")} />
          <Row label="Middle Name" value={d("middleName")} />
          <Row label="Last Name" value={d("lastName")} />
          <Row label="Date of Birth" value={d("dateOfBirth")} />
          <Row label="Gender" value={d("gender")} />
        </SectionCard>

        <SectionCard title="Contact Information">
          <Row label="Phone Number" value={d("phone")} />
          <Row label="Email" value={d("email")} />
          <Row label="Address" value={d("address")} />
          <Row label="Preferred Language" value={d("preferredLanguage")} />
          <Row label="Nationality" value={d("nationality")} />
        </SectionCard>

        <SectionCard title="Emergency Contact & Other">
          <Row
            label="Emergency Contact Name"
            value={d("emergencyContactName")}
          />
          <Row
            label="Relationship"
            value={d("emergencyContactRelationship")}
          />
          <Row label="Religion" value={d("religion")} />
        </SectionCard>
      </div>
    </main>
  );
}
