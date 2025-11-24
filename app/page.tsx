
import { redirect } from "next/navigation";

export default function Home() {
  // เมื่อเข้าหน้า root ให้ redirect ไปหน้า patient
  redirect("/patient");
}
