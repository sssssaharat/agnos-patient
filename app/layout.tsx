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
      <body className="relative min-h-screen bg-[#F3F6FB] overflow-x-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(
                    to right,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                            to right,
                            black 0px,
                            black 3px,
                            transparent 3px,
                            transparent 8px
                          ),
                          repeating-linear-gradient(
                            to bottom,
                            black 0px,
                            black 3px,
                            transparent 3px,
                            transparent 8px
                          ),
                          radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
                    `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Main Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          <header className="mb-6 flex items-center justify-between">

          </header>
          <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-5 py-2 shadow-md shadow-slate-200 backdrop-blur-sm">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>

                <span className="text-xs font-medium text-slate-700">
                  Real-time patient
                </span>
                <button className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                  View assignment
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* HERO TEXT */}
            <section className="mb-10 text-center">
              <h1 className="pb-2 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 
               bg-clip-text text-transparent">
                Agnos Candidate Assignment
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
                Responsive, real-time form experience for patients and a clear
                overview for staff — built as part of the Agnos candidate assignment.
              </p>
            </section>

          {children}
        </div>
      </body>
    </html>
  );
}
