// import { z } from "zod";

// // Define the schema for document sections
// const DocumentSchema = z.object({
//   icon: z.instanceof(File, "icon is required"),
//   title: z.string().min(1, "Title is required"),
//   details: z.array(z.string().min(1, "Detail is required")).min(1, "At least one detail is required")
// });

// // Define the schema for location images
// const LocationImageSchema = z.object({
//   image: z.instanceof(File, "Image is required"),
//   location: z.string().min(1, "Location name is required")
// });

// // Define the main form schema
// export const VisaFormSchema = z.object({
//   // Basic information
//   countryName: z.string().min(1, "Country name is required"),
//   visaType: z.string().min(1, "Visa type is required"),
//   customId: z.string().optional(),
//   title: z.string().min(1, "Title is required"),
//   subtitle: z.string().min(1, "Subtitle is required"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
  
//   // Images
//   locationImages: z.array(LocationImageSchema).min(1, "At least one location image is required"),
//   images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  
//   // General information
//   capital: z.string().min(1, "Capital is required"),
//   time: z.string().min(1, "Time is required"),
//   telephone_code: z.string().min(1, "Telephone code is required"),
//   bank_time: z.string().min(1, "Bank time is required"),
//   embassy_address: z.string().min(1, "Embassy address is required"),
  
//   // Notes
//   note: z.array(z.object({
//     text: z.string().optional()
//   })),
  
//   // Document sections
//   general_documents: z.array(DocumentSchema),
//   business_person: z.array(DocumentSchema),
//   student: z.array(DocumentSchema),
//   job_holder: z.array(DocumentSchema),
//   other_documents: z.array(DocumentSchema),
  
//   // Visa price information
//   visaPrice_mainText: z.string().min(1, "Main text is required"),
//   visaPrice_price: z.string().min(1, "Price is required"),
//   visaPrice_note: z.string().min(1, "Note is required")
// });

// // Export the type
// export type VisaFormData = z.infer<typeof VisaFormSchema>;




// import { z } from "zod";

// // Custom validation to check if the value is a valid File
// // const fileValidator = z.unknown().refine(val => val instanceof File, {
// //   message: "${name} is required. Must be a valid file",
// // });


// const fileValidator = z.unknown().refine((val, ctx) => {
//     if (!(val instanceof File)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: `${ctx.path[0]} is required. Must be a valid file`, // Dynamic message based on the field name
//         path: ctx.path, // Propagate the path for the field
//       });
//       return false; // Return false to indicate validation failed
//     }
//     return true; // Return true if the value is a valid File
//   }, {
//     message: "Must be a valid file", // This is a fallback message
//   });
  

// // Define the schema for document sections
// const DocumentSchema = z.object({
//   icon: fileValidator, // using custom file validation
//   title: z.string().min(1, "Title is required"),
//   details: z.array(z.string().min(1, "Detail is required")).min(1, "At least one detail is required")
// });

// // Define the schema for location images
// const LocationImageSchema = z.object({
//   image: fileValidator, // using custom file validation
//   location: z.string().min(1, "Location name is required")
// });

// // Define the main form schema
// export const VisaFormSchema = z.object({
//   // Basic information
//   countryName: z.string().min(1, "Country name is required"),
//   visaType: z.string().min(1, "Visa type is required"),
//   customId: z.string().optional(),
//   title: z.string().min(1, "Title is required"),
//   subtitle: z.string().min(1, "Subtitle is required"),
//   description: z.string().min(10, "Description must be at least 10 characters"),

//   // Images
//   locationImages: z.array(LocationImageSchema).min(1, "At least one location image is required"),
//   images: z.array(fileValidator).min(1, "At least one image is required").max(6, "Maximum 6 images are allowed"),

//   // General information
//   capital: z.string().min(1, "Capital is required"),
//   time: z.string().min(1, "Time is required"),
//   telephone_code: z.string().min(1, "Telephone code is required"),
//   bank_time: z.string().min(1, "Bank time is required"),
//   embassy_address: z.string().min(1, "Embassy address is required"),

//   // Notes
//   note: z.array(z.object({
//     text: z.string().optional()
//   })),

//   // Document sections
//   general_documents: z.array(DocumentSchema),
//   business_person: z.array(DocumentSchema),
//   student: z.array(DocumentSchema),
//   job_holder: z.array(DocumentSchema),
//   other_documents: z.array(DocumentSchema),

//   // Visa price information
//   visaPrice_mainText: z.string().min(1, "Main text is required"),
//   visaPrice_price: z.string().min(1, "Price is required"),
//   visaPrice_note: z.string().min(1, "Note is required")
// });

// // Export the type
// export type VisaFormData = z.infer<typeof VisaFormSchema>;



import { z } from "zod";

// Custom validation to check if the value is a valid File and show error messages based on key
// const fileValidator = z.unknown().superRefine((val : any, ctx: any) => {
//   if (!(val instanceof File)) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: `${ctx.path[0]} is required. Must be a valid file`, // Dynamic message based on the field name
//       path: ctx.path, // Propagate the path for the field
//     });
//     return false; // Return false to indicate validation failed
//   }
//   return true; // Return true if the value is a valid File
// }, {
//   message: "Must be a valid file", // This is a fallback message
// });

// const fileValidator = z.unknown().superRefine((val, ctx) => {
//     if (!(val instanceof File)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: `${ctx.path[0]} is required. Must be a valid file`,
//         path: ctx.path,
//       });
//       return false;
//     }
//     return true;
//   }, {
//     message: "Must be a valid file",
//   });


const fileValidator = z.unknown().superRefine((val, ctx) => {
    if (!(val instanceof File)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${ctx.path[0]} is required. Must be a valid file`,
        path: ctx.path,
      });
      return false;
    }
    return true;
  });

// Define the schema for document sections
const DocumentSchema = z.object({
  icon: fileValidator, // using custom file validation
  title: z.string().min(1, "Title is required"),
  details: z.union([
    z.array(z.string().min(1, "Detail is required")).min(1, "At least one detail is required"),
    // z.any()
    z.string()
  ])
});

const updateDocumentSchema = z.object({
    icon: z.any().optional(), // using custom file validation
    title: z.string().min(1, "Title is required"),
    details: z.array(z.string().min(1, "Detail is required")).min(1, "At least one detail is required")
  });

// Define the schema for location images
const LocationImageSchema = z.object({
  image: fileValidator, // using custom file validation
  location: z.string().min(1, "Location name is required")
});

// Define the main form schema
export const VisaFormSchema = z.object({
  // Basic information
  countryName: z.string().min(1, "Country name is required"),
  visaType: z.string().min(1, "Visa type is required"),
  customId: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  // Images
  locationImages: z.array(LocationImageSchema).min(1, "At least one location image is required"),
  images: z.array(fileValidator).min(1, "At least one image is required").max(6, "Maximum 6 images are allowed"),

  // General information
  capital: z.string().min(1, "Capital is required"),
  time: z.string().min(1, "Time is required"),
  telephone_code: z.string().min(1, "Telephone code is required"),
  bank_time: z.string().min(1, "Bank time is required"),
  embassy_address: z.string().min(1, "Embassy address is required"),

  // Notes
  note: z.array(z.object({
    text: z.string().optional()
  })),

  // Document sections
  general_documents: z.array(DocumentSchema),
  business_person: z.array(DocumentSchema),
  student: z.array(DocumentSchema),
  job_holder: z.array(DocumentSchema),
  other_documents: z.array(DocumentSchema),

  // Visa price information
  visaPrice_mainText: z.string().min(1, "Main text is required"),
  visaPrice_price: z.string().min(1, "Price is required"),
  visaPrice_note: z.string().min(1, "Note is required")
});



// export const VisaFormUpdateSchema = z.object({
//     // Basic information
//     countryName: z.string().min(1, "Country name is required"),
//     visaType: z.string().min(1, "Visa type is required"),
//     customId: z.string().optional(),
//     title: z.string().min(1, "Title is required"),
//     subtitle: z.string().min(1, "Subtitle is required"),
//     description: z.string().min(10, "Description must be at least 10 characters"),
  
//     // Images
//     locationImages: z.array(LocationImageSchema).min(1, "At least one location image is required").optional(),
//     images: z.array(fileValidator).min(1, "At least one image is required").max(6, "Maximum 6 images are allowed").optional(),
  
//     // General information
//     capital: z.string().min(1, "Capital is required"),
//     time: z.string().min(1, "Time is required"),
//     telephone_code: z.string().min(1, "Telephone code is required"),
//     bank_time: z.string().min(1, "Bank time is required"),
//     embassy_address: z.string().min(1, "Embassy address is required"),
  
//     // Notes
//     note: z.array(z.object({
//       text: z.string().optional()
//     })),
  
//     // Document sections
//     general_documents: z.array(updateDocumentSchema),
//     business_person: z.array(updateDocumentSchema),
//     student: z.array(updateDocumentSchema),
//     job_holder: z.array(updateDocumentSchema),
//     other_documents: z.array(updateDocumentSchema),
  
//     // Visa price information
//     visaPrice_mainText: z.string().min(1, "Main text is required"),
//     visaPrice_price: z.string().min(1, "Price is required"),
//     visaPrice_note: z.string().min(1, "Note is required")
//   });

// Export the type
export type VisaFormData = z.infer<typeof VisaFormSchema>;
// export type VisaFormUpdateData = z.infer<typeof VisaFormSchema>;
