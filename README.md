# 📄 README – Agnos Realtime Patient Intake System
A real-time patient intake platform that allows healthcare staff to monitor form progress instantly without requiring the patient to submit. Built using Next.js, Pusher WebSockets, and TailwindCSS, optimized for modern clinical workflow and responsive UI/UX.

# 🎯 Project Objectives
* ให้ผู้ป่วยสามารถกรอกข้อมูลและอัปเดตข้อมูลไปยังฝั่ง Staff แบบ realtime
* Staff สามารถเห็นสถานะการพิมพ์จริง ความคืบหน้าของฟอร์ม และดูรายละเอียดได้ทันที
* ไม่ต้องกด Submit เพื่อ sync ข้อมูล realtime
* รองรับสถานะ Active / Inactive / Submitted ตามการใช้งานจริง
* รองรับการ deploy บน Vercel 100%

# 🛠 Tech Stack
| Layer                  | Technology                                     |
| ---------------------- | ---------------------------------------------- |
| Frontend               | Next.js 14 App Router, TypeScript, TailwindCSS |
| Realtime               | Pusher Channels WebSocket                      |
| Deployment             | Vercel                                         |
| State & Real-time Sync | React Hooks (`useRealtimePatient`)             |
| Validation             | Zod                                            |
| UI Components          | Custom + Tailwind                              |


┌────────────────────┐         
# 🧠 System Behavior
| Action                                    | Result                            |
| ----------------------------------------- | --------------------------------- |
| พิมพ์ข้อมูลในช่องใดก็ตาม                        | ส่ง realtime event ไป Staff ทันที |
| หยุดพิมพ์ > 10 วินาที                          | Status เปลี่ยนเป็น **Inactive**   |
| Submit (หลัง validation Phone/Email ผ่าน)   | Status เปลี่ยนเป็น **Submitted**  |
| Staff ดูข้อมูล                               | ข้อมูลอัปเดตทุก character         |

# Patient Status Rules
## Status	    Meaning
* Active	    ผู้ป่วยกำลังพิมพ์อยู่
* Inactive	    ไม่พิมพ์อะไรเกิน 10 วินาที
* Submitted	    ส่งแบบฟอร์มเรียบร้อยแล้ว

# 🖥 Homepage Features
## Patient View (/patient)
* Real-time sync ทุก keypress ผ่าน Pusher
* Validation เฉพาะ Phone & Email ตอน submit
* Form fields ที่สอดคล้องกับมาตรฐานสากล:
    * Gender (inclusive select)
    * Nationality (global subset)
    * Preferred languages
    * Date picker, address textarea ฯลฯ
* SweetAlert feedback หลัง submit
* Clear form หลังส่ง ไม่กระทบข้อมูล Staff

# Staff View (/staff)
* Real-time monitoring table style
* Display all patient fields + status badge + profile initials avatar
* Progress indicator by category (Personal / Contact / Emergency)
* Modal แสดงข้อมูลทั้งหมดแบบ realtime

# 🚀 Setup & Run
**Install dependencies**
npm install

# Create .env.local
* NEXT_PUBLIC_PUSHER_KEY=
* NEXT_PUBLIC_PUSHER_CLUSTER=
* PUSHER_APP_ID=
* PUSHER_SECRET=

# Run locally
npm run dev

# Open:
Patient Form → http://localhost:3000/patient
Staff View → http://localhost:3000/staff


# 🧪 Testing
| Scenario                   | Expected                            |
| -------------------------- | ----------------------------------- |
| Start typing in First Name | Staff view update immediately       |
| Stop typing 10 sec         | Status → Inactive                   |
| Change any field           | Staff cell/row update in realtime   |
| Submit                     | Status → Submitted                  |
| Open modal                 | Display full synced patient details |

# 🎁 Bonus enhancements (Optional)
* Searchable dropdown (e.g. nationality autocomplete)
* Save to DB (MongoDB / PostgreSQL)
* Multi-patient queue view
* Authentication for staff
* Audit logging
* CRUD patient 
* Search data patient