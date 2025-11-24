"use client";

import Pusher from "pusher-js";

if (
  !process.env.NEXT_PUBLIC_PUSHER_KEY ||
  !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
) {
  throw new Error("Missing NEXT_PUBLIC_PUSHER_* env vars");
}

export const pusherClient = new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  }
);
