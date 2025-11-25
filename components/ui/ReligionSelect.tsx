import { SelectField } from "./SelectField";

const religionList = [
  "Buddhism",
  "Christianity",
  "Islam",
  "Hinduism",
  "Judaism",
  "Sikhism",
  "Other",
];

export function ReligionSelect({ value, onChange }: any) {
  return (
    <SelectField
      label="Religion"
      value={value}
      onChange={onChange}
      options={religionList.map((r) => ({ label: r, value: r.toLowerCase() }))}
    />
  );
}
