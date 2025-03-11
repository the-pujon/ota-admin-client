// import { z } from "zod"

// // Custom type for files that can be either a string URL or a File object
// const FileOrString = z.union([
//   z.string(),
//   z.instanceof(File),
//   z
//     .object({})
//     .optional(), // For empty file objects
// ])

// // Schema for location images
// const LocationImageSchema = z.object({
//   _id: z.string().optional(),
//   image: FileOrString,
//   location: z.string().min(1, "Location name is required"),
// })

// // Schema for document sections
// const DocumentSchema = z.object({
//   _id: z.string().optional(),
//   icon: FileOrString,
//   title: z.string().min(1, "Title is required"),
//   details: z.array(z.string()).min(1, "At least one detail is required"),
// })

// // Note schema
// const NoteSchema = z.object({
//   text: z.string().optional(),
// })

// // Main visa form schema
// export const VisaFormUpdateSchema = z.object({
//   countryName: z.string().min(1, "Country name is required"),
//   visaType: z.string().min(1, "Visa type is required"),
//   customId: z.string().optional(),
//   title: z.string().min(1, "Title is required"),
//   subtitle: z.string().min(1, "Subtitle is required"),
//   description: z.string().min(1, "Description is required"),

//   // Images can be an array of strings or Files
//   images: z.array(z.any()).optional().default([]),

//   // Location images
//   locationImages: z.array(z.any()).min(1, "At least one location image is required"),

//   // General information
//   capital: z.string().min(1, "Capital is required"),
//   time: z.string().min(1, "Time is required"),
//   telephone_code: z.string().min(1, "Telephone code is required"),
//   bank_time: z.string().min(1, "Bank time is required"),
//   embassy_address: z.string().min(1, "Embassy address is required"),

//   // Notes
//   note: z
//     .array(NoteSchema)
//     .optional()
//     .default([{ text: "" }]),

//   // Document sections
//   general_documents: z.array(z.any()).min(1, "At least one general document is required"),
//   business_person: z.array(z.any()).min(1, "At least one business person document is required"),
//   student: z.array(z.any()).min(1, "At least one student document is required"),
//   job_holder: z.array(z.any()).min(1, "At least one job holder document is required"),
//   other_documents: z.array(z.any()).min(1, "At least one other document is required"),

//   // Visa price information
//   visaPrice_mainText: z.string().min(1, "Visa price main text is required"),
//   visaPrice_price: z.string().min(1, "Visa price is required"),
//   visaPrice_note: z.string().min(1, "Visa price note is required"),
// })

// // Export the type for use with react-hook-form
// export type VisaFormUpdateData = z.infer<typeof VisaFormUpdateSchema>

// // Helper function to check if a value is a File
// export const isFile = (value: any): value is File => {
//   return value instanceof File
// }

// // Helper function to check if a value is a string URL
// export const isStringUrl = (value: any): value is string => {
//   return typeof value === "string"
// }



import { z } from "zod"

// Custom type for files that can be either a string URL or a File object
const FileOrString = z.union([
  z.string(),
  z.instanceof(File),
  z
    .object({})
    .optional(), // For empty file objects
])

// Schema for location images
const LocationImageSchema = z.object({
  _id: z.string().optional(),
  image: FileOrString,
  location: z.string().min(1, "Location name is required"),
})

// Schema for document sections
const DocumentSchema = z.object({
  _id: z.string().optional(),
  icon: FileOrString,
  title: z.string().min(1, "Title is required"),
  details: z.array(z.string()).min(1, "At least one detail is required"),
})

// Note schema
const NoteSchema = z.object({
  text: z.string().optional(),
})

// Main visa form schema
export const VisaFormSchema = z.object({
  countryName: z.string().min(1, "Country name is required"),
  visaType: z.string().min(1, "Visa type is required"),
  customId: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),

  // Images can be an array of strings or Files
  // images: z.array(FileOrString).default([]),
  images: z.array(FileOrString).min(1, "At least one general information image is required"),

  // Location images
  locationImages: z.array(LocationImageSchema).min(1, "At least one location image is required"),

  // General information
  capital: z.string().min(1, "Capital is required"),
  time: z.string().min(1, "Time is required"),
  telephone_code: z.string().min(1, "Telephone code is required"),
  bank_time: z.string().min(1, "Bank time is required"),
  embassy_address: z.string().min(1, "Embassy address is required"),

  // Notes
  note: z
    .array(NoteSchema)
    .optional()
    .default([{ text: "" }]),

  // Document sections
  general_documents: z.array(DocumentSchema).min(1, "At least one general document is required"),
  business_person: z.array(DocumentSchema).min(1, "At least one business person document is required"),
  student: z.array(DocumentSchema).min(1, "At least one student document is required"),
  job_holder: z.array(DocumentSchema).min(1, "At least one job holder document is required"),
  other_documents: z.array(DocumentSchema).min(1, "At least one other document is required"),

  // Visa price information
  visaPrice_mainText: z.string().min(1, "Visa price main text is required"),
  visaPrice_price: z.string().min(1, "Visa price is required"),
  visaPrice_note: z.string().min(1, "Visa price note is required"),
})

// Export the type for use with react-hook-form
export type VisaFormData = z.infer<typeof VisaFormSchema>

// Helper function to check if a value is a File
export const isFile = (value: any): value is File => {
  return value instanceof File
}

// Update the isStringUrl helper function to be more explicit with TypeScript
export const isStringUrl = (value: any): value is string => {
  return typeof value === "string"
}

