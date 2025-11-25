import { SelectField } from "./SelectField";

const relations = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Friend",
  "Spouse",
  "Relative",
  "Guardian",
];

export function RelationshipSelect({ value, onChange }: any) {
  return (
    <SelectField
      label="Relationship"
      value={value}
      onChange={onChange}
      options={relations.map((r) => ({ label: r, value: r.toLowerCase() }))}
    />
  );
}
