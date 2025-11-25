
"use client";

import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  patientSchema,
  type PatientData
} from "@/lib/validation";
import { useRealtimePatient } from "@/lib/useRealtimePatient";
import { FieldInput } from "@/components/ui/FieldInput";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { NationalitySelect } from "@/components/ui/NationalitySelect";
import { ReligionSelect } from "@/components/ui/ReligionSelect";
import { RelationshipSelect } from "@/components/ui/RelationshipSelect";


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
  status: "inactive"
};

export default function PatientPage() {
  const [form, setForm] = useState<PatientData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const { sendUpdate, connected } = useRealtimePatient("patient");

  // ใช้สำหรับจับ timeout 10 วิ → inactive
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleInactive = (nextState: PatientData) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setForm((prev) => {
        const updated: PatientData = { ...prev, status: "inactive" };
        sendUpdate(updated);
        return updated;
      });
    }, 10_000); // 10 วินาที
  };

  const updateField = (key: keyof PatientData, value: string) => {
    const next: PatientData = {
      ...form,
      [key]: value,
      status: "active" // 🌟 กำลังพิมพ์ = Active
    };
    setForm(next);
    sendUpdate(next); // 🌟 real-time ทุก keypress
    scheduleInactive(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    // ใช้ schema ตรวจเฉพาะ Phone / Email ตามที่กำหนด
    const parsed = patientSchema.safeParse({
      ...form,
      status: "submitted"
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }

    const finalData = parsed.data;

    // ส่ง snapshot ตอน Submitted ไปให้ staff
    await sendUpdate(finalData);

    await Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      timer: 1800,
      showConfirmButton: false
    });

    // เคลียร์ฟอร์มฝั่ง patient แต่ไม่ต้องลบข้อมูลฝั่ง staff
    setForm(initial);
    setSubmitting(false);
  };

  // เคลียร์ timer ถ้า component unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);


  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
          <p className="text-6xl">✏️</p>
        <h2 className="text-2xl font-semibold">Patient Form</h2>
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
        {/* Personal */}
        <SectionCard title="Personal Information">
          <div className="grid sm:grid-cols-3 gap-4">
            <FieldInput
              label="First Name"
              value={form.firstName ?? ""}
              onChange={(v) => updateField("firstName", v)}
            />
            <FieldInput
              label="Middle Name (optional)"
              value={form.middleName ?? ""}
              onChange={(v) => updateField("middleName", v)}
            />
            <FieldInput
              label="Last Name"
              value={form.lastName ?? ""}
              onChange={(v) => updateField("lastName", v)}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
          
            {/* DatePicker */}
            <FieldInput
              label="Date of Birth"
              type="date"
              value={form.dateOfBirth ?? ""}
              max={new Date().toISOString().split("T")[0]}   // จำกัดวันไม่ให้เกินวันนี้
              onChange={(v) => updateField("dateOfBirth", v)}
            />

            {/* Gender dropdown */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Gender
              </label>
              <select
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                value={form.gender ?? ""}
                onChange={(e) => updateField("gender", e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </SectionCard>

        {/* Contact */}
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

          {/* Address textarea */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Address
            </label>
            <textarea
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              rows={3}
              value={form.address ?? ""}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="Preferred Language"
              value={form.preferredLanguage ?? ""}
              onChange={(v) => updateField("preferredLanguage", v)}
            />

           <NationalitySelect
            value={form.nationality ?? ""}
            onChange={(v) => updateField("nationality", v)}
          />

          </div>
        </SectionCard>

        {/* Emergency */}
        <SectionCard title="Emergency Contact & Other (optional)">
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="Emergency Contact Name"
              value={form.emergencyContactName ?? ""}
              onChange={(v) => updateField("emergencyContactName", v)}
            />
            <RelationshipSelect
              value={form.emergencyContactRelationship ?? ""}
              onChange={(v) => updateField("emergencyContactRelationship", v)}
            />
          </div>

            <ReligionSelect
              value={form.religion ?? ""}
              onChange={(v) => updateField("religion", v)}
            />

          {/* </div> */}
        </SectionCard>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-xs text-slate-500">
            Only phone number and email are required to submit.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit form"}
          </button>
        </div>
      </form>
    </main>
  );
}
