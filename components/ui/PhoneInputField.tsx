"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function PhoneInputField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">Phone Number</label>

      <PhoneInput
        country={"th"}
        value={value}
        onChange={(val) => onChange(val)}
        inputClass="!w-full !rounded-md !border !border-slate-300 !bg-white !px-12 !py-2 text-sm"
      />
    </div>
  );
}
