"use client";

import { SelectField } from "./SelectField";

const RELATIONS = [
  { label: "Father", value: "father" },
  { label: "Mother", value: "mother" },
  { label: "Brother", value: "brother" },
  { label: "Sister", value: "sister" },
  { label: "Friend", value: "friend" },
  { label: "Spouse", value: "spouse" },
  { label: "Guardian", value: "guardian" },
];

export function RelationshipSelect({ value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <SelectField
      label="Relationship"
      value={value}
      onChange={onChange}
      options={RELATIONS}
    />
  );
}
