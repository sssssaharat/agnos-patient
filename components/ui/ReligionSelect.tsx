"use client";

import { SelectField } from "./SelectField";

const RELIGIONS = [
  { label: "Buddhism", value: "buddhism" },
  { label: "Christianity", value: "christianity" },
  { label: "Islam", value: "islam" },
  { label: "Hinduism", value: "hinduism" },
  { label: "Judaism", value: "judaism" },
  { label: "Other", value: "other" },
];

export function ReligionSelect({ value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <SelectField
      label="Religion"
      value={value}
      onChange={onChange}
      options={RELIGIONS}
    />
  );
}
