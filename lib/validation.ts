// import { z } from "zod";

// export const patientSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   middleName: z.string().optional(),
//   lastName: z.string().min(1, "Last name is required"),
//   dateOfBirth: z.string().min(1, "Date of birth is required"),
//   gender: z.string().min(1, "Gender is required"),
//   phone: z
//     .string()
//     .min(7, "Phone number is required")
//     .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(1, "Address is required"),
//   preferredLanguage: z.string().min(1, "Preferred language is required"),
//   nationality: z.string().min(1, "Nationality is required"),
//   emergencyContactName: z.string().optional(),
//   emergencyContactRelationship: z.string().optional(),
//   religion: z.string().optional(),
//   status: z.enum(["typing", "active", "submitted", "inactive"])
// });

// export type PatientData = z.infer<typeof patientSchema>;
// lib/validation.ts
import { z } from "zod";

export const patientSchema = z.object({
  // ฟิลด์อื่นไม่บังคับ (ปล่อยให้เป็น string ว่างได้)
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(), // datepicker ฝั่ง UI คุมเอง
  gender: z.string().optional(),

  // ✅ ฟิลด์ที่ “ต้อง” ผ่าน validation ตอน submit
  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address"),

  // ฟิลด์อื่น ๆ optional
  address: z.string().optional(),
  preferredLanguage: z.string().optional(),

  // multi select: เก็บเป็น string รวม (เช่น "Thai, Japanese")
  nationality: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  religion: z.string().optional(),

  // ✅ ใช้ 3 สถานะตามสเปกใหม่
  status: z.enum(["active", "submitted", "inactive"])
});

export type PatientData = z.infer<typeof patientSchema>;
