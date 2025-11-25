
"use client";

import { useState } from "react";
import { useRealtimePatient } from "@/lib/useRealtimePatient";
import type { PatientData } from "@/lib/validation";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressDots } from "@/components/ui/ProgressDots";

function initialsFromName(firstName?: string, lastName?: string) {
  const f = firstName?.[0] ?? "";
  const l = lastName?.[0] ?? "";
  return (f + l).toUpperCase() || "?";
}

export default function StaffPage() {
  const { data, connected } = useRealtimePatient("staff");
  const [showModal, setShowModal] = useState(false);

  const rows: PatientData[] = data ? [data] : [];

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <p className="text-6xl">🔎</p>
        <h2 className="text-2xl font-semibold ">Staff View</h2>
      </div>
        <span className="text-xs text-slate-600">
          Connection:{" "}
          <span className={connected ? "text-emerald-600" : "text-red-500"}>
            {connected ? "Online" : "Offline"}
          </span>
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] px-6 py-5 sm:px-8 sm:py-7">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-slate-900">
            Top Patients
          </h3>
          <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400">
            ⋮
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs text-slate-500">
              <tr className="border-b border-slate-100">
                <th className="py-3 pr-4 text-left font-medium">Profile</th>
                <th className="py-3 px-4 text-left font-medium">Gender</th>
                <th className="py-3 px-4 text-left font-medium">Email</th>
                <th className="py-3 px-4 text-left font-medium">Progress</th>
                <th className="py-3 pl-4 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-xs text-slate-500"
                  >
                    Waiting for patient to start filling the form…
                  </td>
                </tr>
              )}

              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => setShowModal(true)}
                >
                  {/* Profile */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center text-xs font-semibold text-white">
                        {initialsFromName(row.firstName, row.lastName)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">
                          {row.firstName} {row.lastName}
                        </span>
                        <span className="text-xs text-slate-500">
                          {row.dateOfBirth || "No middleName"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Gender */}
                  <td className="py-4 px-4 text-slate-700">
                    {row.gender || "—"}
                  </td>

                  {/* Email */}
                  <td className="py-4 px-4 text-slate-700">
                    {row.email || "—"}
                  </td>

                  {/* Progress */}
                  <td className="py-4 px-4">
                    <ProgressDots data={row} />
                  </td>

                  {/* Status */}
                  <td className="py-4 pl-4">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal แสดง card view แบบหน้า patient */}
      {showModal && data && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
          <div className="max-w-3xl w-full mx-4 bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">
                Patient Details – {data.firstName} {data.lastName}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <SectionCard title="Personal Information">
                <Row label="First Name" value={data.firstName} />
                <Row label="Middle Name" value={data.middleName} />
                <Row label="Last Name" value={data.lastName} />
                <Row label="Date of Birth" value={data.dateOfBirth} />
                <Row label="Gender" value={data.gender} />
              </SectionCard>

              <SectionCard title="Contact Information">
                <Row label="Phone Number" value={data.phone} />
                <Row label="Email" value={data.email} />
                <Row label="Address" value={data.address} />
                <Row
                  label="Preferred Language"
                  value={data.preferredLanguage}
                />
                <Row label="Nationality" value={data.nationality} />
              </SectionCard>

              <SectionCard title="Emergency Contact & Other">
                <Row
                  label="Emergency Contact Name"
                  value={data.emergencyContactName}
                />
                <Row
                  label="Relationship"
                  value={data.emergencyContactRelationship}
                />
                <Row label="Religion" value={data.religion} />
                <Row label="Status" value={data.status} />
              </SectionCard>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}
