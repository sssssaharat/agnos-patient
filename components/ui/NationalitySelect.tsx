"use client";

import { SelectField } from "./SelectField";

const NATIONALITY_OPTIONS = [
  { label: "Thailand", value: "Thailand" },
  { label: "United States", value: "United States" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Japan", value: "Japan" },
  { label: "China", value: "China" },
  { label: "Australia", value: "Australia" },
  { label: "Germany", value: "Germany" },
  { label: "France", value: "France" },
];

export function NationalitySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <SelectField
      label="Nationality"
      value={value}
      onChange={onChange}
      options={NATIONALITY_OPTIONS}
    />
  );
}

