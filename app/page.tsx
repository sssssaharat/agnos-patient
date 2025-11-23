import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-4">
      <p className="text-slate-700">
        Select a view to simulate the patient and staff experience.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/patient"
          className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-lg font-medium mb-2">Patient Form</h2>
          <p className="text-sm text-slate-600">
            Fill in your personal details as a patient.
          </p>
        </Link>

        <Link
          href="/staff"
          className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-lg font-medium mb-2">Staff View</h2>
          <p className="text-sm text-slate-600">
            Monitor the patient&apos;s input in real-time.
          </p>
        </Link>
      </div>
    </main>
  );
}
