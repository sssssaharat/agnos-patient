import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await pusherServer.trigger("patient-intake", "update", body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Pusher trigger error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
