// import React from "react";
// import { useFormContext, useFieldArray } from "react-hook-form";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { TextInput } from "../FormInputs";
// import Button from "../CustomButton";


// interface VisaSectionProps {
//     sectionTitle: string; // Title of the section (e.g., "General Documents")
//     fieldsArrayName: string; // The name for the array field in form context
//     appendDocument: (newDocument: { title: string; details: string[]; icon: string }) => void; // Function to append a new document field
//     handleFileUpload: (fieldsArrayName: string, index: number, event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle file upload changes
//     handleDetailsCKEditorChange: (fieldsArrayName: string, index: number, detailIndex: number, data: string) => void; // Function to handle CKEditor content changes
//     iconPreviews: Record<string, { [key: number]: string }> | null; // Object to hold preview URLs for uploaded icons
//   }
  

// const VisaSection = ({
//   sectionTitle,
//   fieldsArrayName,
//   appendDocument,
//   handleFileUpload,
//   handleDetailsCKEditorChange,
//   iconPreviews,
// } : VisaSectionProps) => {
//   const { control, getValues } = useFormContext();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: fieldsArrayName,
//   });

//   return (
//     <div>
//       <h4 className="font-semibold">{sectionTitle}</h4>
//       {fields.map((field, index) => (
//         <div key={field.id} className="space-y-4">
//           <TextInput name={`${fieldsArrayName}.${index}.title`} label={`Document Title ${index + 1}`} />
//           <input
//             name={`${fieldsArrayName}.${index}.icon`}
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleFileUpload(fieldsArrayName, index, e)}
//           />
//           {iconPreviews[fieldsArrayName] && iconPreviews[fieldsArrayName][index] && (
//             <img
//               src={iconPreviews[fieldsArrayName][index]}
//               alt={`Icon Preview ${index + 1}`}
//               className="w-8 h-8 object-cover"
//             />
//           )}
//           <label
//             htmlFor={`${fieldsArrayName}.${index}.details.0`}
//             className="block text-sm font-semibold text-gray-600"
//           >
//             Detail
//           </label>
//           <CKEditor
//             editor={ClassicEditor}
//             data={getValues(`${fieldsArrayName}.${index}.details.0`) || ""}
//             onChange={(event, editor) => {
//               const data = editor.getData();
//               handleDetailsCKEditorChange(fieldsArrayName, index, 0, data);
//             }}
//           />
//           {fields.length > 1 && (
//             <Button
//               btnType="button"
//               containerStyles="px-4 py-2 bg-red text-white rounded"
//               title="Remove"
//               handleClick={() => remove(index)}
//             />
//           )}
//         </div>
//       ))}
//       <Button
//         btnType="button"
//         containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//         title={`Add Another ${sectionTitle}`}
//         handleClick={() => appendDocument({ title: "", details: [""], icon: {} })}
//       />
//     </div>
//   );
// };

// export default VisaSection;
