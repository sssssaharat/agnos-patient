"use client";

import Select from "react-select";

type Option = {
  label: string;
  value: string;
  icon?: JSX.Element;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  isMulti?: boolean;
};

export function SelectField({
  label,
  value,
  options,
  onChange,
  required,
  error,
  isMulti,
}: SelectFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Select
        value={options.find((o) => o.value === value)}
        options={options}
        onChange={(opt) => onChange((opt as Option).value)}
        isMulti={isMulti}
        className="text-sm"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
