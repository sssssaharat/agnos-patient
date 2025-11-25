"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { patientSchema, type PatientData } from "@/lib/validation";
import { useRealtimePatient } from "@/lib/useRealtimePatient";
import { FieldInput } from "@/components/ui/FieldInput";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

const initial: PatientData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  religion: "",
  status: "inactive",
};

export default function PatientPage() {
  const [form, setForm] = useState<PatientData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const { sendUpdate, connected } = useRealtimePatient("patient");

  const updateField = (key: keyof PatientData, value: string) => {
    const next: PatientData = {
      ...form,
      [key]: value,
      status: "typing",
    };
    setForm(next);
    // ส่ง realtime ระหว่างกรอก
    sendUpdate(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = patientSchema.safeParse({
      ...form,
      status: "submitted",
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const finalData = parsed.data;

    // ส่ง snapshot ที่สมบูรณ์ไปให้ staff
    await sendUpdate(finalData);

    // แสดง sweetalert
    await Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      timer: 1800,
      showConfirmButton: false,
    });

    // เคลียร์ฟอร์มฝั่ง patient (แต่ไม่ส่งค่าเคลียร์กลับไป staff)
    setForm(initial);
    setErrors({});
    setSubmitting(false);
  };

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="text-6xl">✏️</p>
        <h2 className="text-2xl font-semibold ">Patient Form</h2>
      </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span>
            Connection:{" "}
            <span className={connected ? "text-emerald-600" : "text-red-500"}>
              {connected ? "Online" : "Offline"}
            </span>
          </span>
          <span>
            Status: <StatusBadge status={form.status} />
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] px-6 py-6 sm:px-8 sm:py-7"
      >
        <SectionCard title="Personal Information">
          <div className="grid sm:grid-cols-3 gap-4">
            <FieldInput
              label="First Name"
              required
              value={form.firstName}
              error={errors.firstName}
              onChange={(v) => updateField("firstName", v)}
            />
            <FieldInput
              label="Middle Name (optional)"
              value={form.middleName ?? ""}
              onChange={(v) => updateField("middleName", v)}
            />
            <FieldInput
              label="Last Name"
              required
              value={form.lastName}
              error={errors.lastName}
              onChange={(v) => updateField("lastName", v)}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <FieldInput
              label="Date of Birth"
              type="date"
              required
              value={form.dateOfBirth}
              error={errors.dateOfBirth}
              onChange={(v) => updateField("dateOfBirth", v)}
            />
            <FieldInput
              label="Gender"
              required
              value={form.gender}
              error={errors.gender}
              onChange={(v) => updateField("gender", v)}
            />
          </div>
        </SectionCard>

        <SectionCard title="Contact Information">
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="Phone Number"
              required
              value={form.phone}
              error={errors.phone}
              onChange={(v) => updateField("phone", v)}
            />
            <FieldInput
              label="Email"
              type="email"
              required
              value={form.email}
              error={errors.email}
              onChange={(v) => updateField("email", v)}
            />
          </div>

          <FieldInput
            label="Address"
            required
            value={form.address}
            error={errors.address}
            onChange={(v) => updateField("address", v)}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="Preferred Language"
              required
              value={form.preferredLanguage}
              error={errors.preferredLanguage}
              onChange={(v) => updateField("preferredLanguage", v)}
            />
            <FieldInput
              label="Nationality"
              required
              value={form.nationality}
              error={errors.nationality}
              onChange={(v) => updateField("nationality", v)}
            />
          </div>
        </SectionCard>

        <SectionCard title="Emergency Contact & Other (optional)">
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="Emergency Contact Name"
              value={form.emergencyContactName ?? ""}
              onChange={(v) => updateField("emergencyContactName", v)}
            />
            <FieldInput
              label="Relationship"
              value={form.emergencyContactRelationship ?? ""}
              onChange={(v) => updateField("emergencyContactRelationship", v)}
            />
          </div>
          <FieldInput
            label="Religion"
            value={form.religion ?? ""}
            onChange={(v) => updateField("religion", v)}
          />
        </SectionCard>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-xs text-slate-500">
            Required fields are marked with *.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit form"}
          </button>
        </div>
      </form>
    </main>
  );
}
