"use client";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  required?: boolean;
  error?: string;
};

export function SelectField({
  label,
  value,
  onChange,
  options,
  required,
  error,
}: SelectFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <select
        className="w-full h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
