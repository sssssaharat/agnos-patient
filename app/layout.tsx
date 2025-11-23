import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Agnos Candidate Assignment – Patient Intake",
  description: "Responsive real-time patient form & staff view"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                Agnos Patient Intake System
              </h1>
              <p className="text-xs text-slate-500">
                Candidate Assignment – Front-end Developer
              </p>
            </div>
            <span className="text-xs uppercase tracking-wide text-red-500">
              Confidential
            </span>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
