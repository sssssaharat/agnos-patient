
"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "./pusher-client";
import { patientSchema, type PatientData } from "./validation";

type Role = "patient" | "staff";

export function useRealtimePatient(role: Role) {
  const [data, setData] = useState<PatientData | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const channel = pusherClient.subscribe("patient-intake");

    channel.bind("pusher:subscription_succeeded", () => {
      setConnected(true);
    });

    channel.bind("update", (payload: unknown) => {
      // ดู payload จริงก่อน
      // console.log("[PUSHER] update payload:", payload);

      const parsed = patientSchema.safeParse(payload);
      if (!parsed.success) {
        // console.warn("[PUSHER] invalid payload for patientSchema", parsed.error);
        // ถ้าอยากให้ staff เห็นอยู่ดี ให้ fallback มาใช้ payload ดิบ ๆ
        setData(payload as PatientData);
        return;
      }

      setData(parsed.data);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe("patient-intake");
      setConnected(false);
    };
  }, []);

  const sendUpdate = async (payload: PatientData) => {
    if (role !== "patient") return;
    await fetch("/api/patient-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  };

  return { data, sendUpdate, connected };
}
