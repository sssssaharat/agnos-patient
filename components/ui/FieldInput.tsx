"use client";

type FieldInputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  type?: string;
};

export function FieldInput({
  label,
  value,
  onChange,
  required,
  error,
  type = "text"
}: FieldInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
