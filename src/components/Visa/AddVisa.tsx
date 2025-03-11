// "use client";
// import { useState } from "react";
// import { useForm, FormProvider, SubmitHandler, useFieldArray } from "react-hook-form";
// import axios from "axios";
// import { SelectInput, TextInput } from "../FormInputs";
// import Button from "../CustomButton";
// import toast from "react-hot-toast";
// import Image from "next/image";
// import { useAddVisaMutation } from "@/redux/api/visaApi";
 
// interface FormData {
//   countryName: string;
//   visaType: string;
//   customId: string; 
//   title: string;
//   subtitle: string;
//   description: string;
//   locationImages: { image: File; location: string }[];
//   images: File[]; 
//   capital: string; 
//   time: string;
//   telephone_code: string; 
//   bank_time: string; 
//   embassy_address: string;
//   note: { text?: string }[]; 
 
//   general_documents: {
//     icon: File;
//     title: string;
//     details: string[];
//   }[];
//   business_person: {
//     icon: File;
//     title: string;
//     details: string[];
//   }[];
//   student: {
//     icon: File;
//     title: string;
//     details: string[];
//   }[];
//   job_holder: {
//     icon: File;
//     title: string;
//     details: string[];
//   }[];
//   other_documents: {
//     icon: File;
//     title: string;
//     details: string[];
//   }[];
//   visaPrice_mainText: string; 
//   visaPrice_price: string; 
//   visaPrice_note: string; 
// }
 
 
// export default function AddVisa() {
//   const [addVisa, { isLoading }] = useAddVisaMutation();
//   const methods = useForm<FormData>({
//     defaultValues: {
//       locationImages: [{ image: {} as File, location: "" }],
//       countryName: '',
//       visaType: '',
//       customId: '',
//       title: '',
//       subtitle: '',
//       description: '',
//       images: [],
//       capital: '',
//       time: '',
//       telephone_code: '',
//       bank_time: '',
//       embassy_address: '',
//       note: [{ text: '' }],
//       general_documents: [{ title: '', details: [''], icon: {} as File}],
//       business_person: [{ title: '', details: [''], icon: {} as File}],
//       student: [{ title: '', details: [''], icon: {} as File}],
//       job_holder: [{ title: '', details: [''], icon: {} as File}],
//       other_documents: [{ title: '', details: [''], icon: {} as File}],
//       visaPrice_mainText: '',
//       visaPrice_price: '',
//       visaPrice_note: '',
//     },
//   });
 
//   const { control, handleSubmit, setValue, reset, formState: { errors } } = methods;
 
//   const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray({
//     control,
//     name: 'note',
//   });
 
//   const { fields: generalDocumentsFields, append: appendGeneralDocument } = useFieldArray({
//     control,
//     name: 'general_documents',
//   });
 
//   const { fields: businessPersonFields, append: appendBusinessDocument } = useFieldArray({
//     control,
//     name: 'business_person',
//   });
 
//   const { fields: studentFields, append: appendStudentDocument } = useFieldArray({
//     control,
//     name: 'student',
//   });
 
//   const { fields: jobHolderFields, append: appendJobHolderDocument } = useFieldArray({
//     control,
//     name: 'job_holder',
//   });
 
//   const { fields: otherDocumentsFields, append: appendOtherDocument } = useFieldArray({
//     control,
//     name: 'other_documents',
//   });
 
 
// const [iconPreviews, setIconPreviews] = useState<{
//   general_documents: { [key: number]: string };
//   business_person: { [key: number]: string };
//   student: { [key: number]: string };
//   job_holder: { [key: number]: string };
//   other_documents: { [key: number]: string };
// }>({
//   general_documents: {},
//   business_person: {},
//   student: {},
//   job_holder: {},
//   other_documents: {},
// });
 
// const handleFileUpload = (
//   fieldName: "general_documents" | "business_person" | "student" | "job_holder" | "other_documents",
//   index: number,
//   e: React.ChangeEvent<HTMLInputElement>
// ) => {
//   const files = e.target.files;
//   if (files && files.length > 0) {
//     const file = files[0];
//     const newIconPreviews = { ...iconPreviews };
//     if (newIconPreviews[fieldName][index]) {
//       URL.revokeObjectURL(newIconPreviews[fieldName][index]);
//     }
 
//     newIconPreviews[fieldName] = {
//       ...newIconPreviews[fieldName],
//       [index]: URL.createObjectURL(file),
//     };
//     setIconPreviews(newIconPreviews);
//     methods.setValue(`${fieldName}.${index}.icon`, file);
//   }
// };
 
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
 
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       const newImagePreviews = fileArray.map((file) => URL.createObjectURL(file));
//       setImagePreviews(newImagePreviews);
//       setValue('images', fileArray);
//     }
//   };
 
 
//   const { fields: locationImageFields, append: appendLocation, remove: removeLocation } = useFieldArray({
//     control,
//     name: "locationImages",
//   });
//   const [locationImagePreviews, setLocationImagePreviews] = useState<string[]>([]);
//   const handleLocationImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       const newImagePreviews = [...locationImagePreviews];
//       newImagePreviews[index] = URL.createObjectURL(fileArray[0]);
//       setLocationImagePreviews(newImagePreviews);
//       setValue(`locationImages.${index}.image`, fileArray[0]);
//     }
//   };

//   const handleNoteChange = (index: number, data: string) => {
//     const plainText = data.replace(/<\/?[^>]+(>|$)/g, "");
//     setValue(`note.${index}.text` as const, plainText);
//   };
 
//   const handleDetailsChange = (
//     fieldName: "general_documents" | "business_person" | "student" | "job_holder" | "other_documents", 
//     index: number,
//     detailIndex: number,
//     data: string
//   ) => {
//     const plainText = data.replace(/<\/?[^>]+(>|$)/g, "");
//     const path = `${fieldName}.${index}.details.${detailIndex}` as const;
//     setValue(path, plainText);
//   };

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     const formData = new FormData();
//     formData.append('countryName', data.countryName);
//     formData.append('visaType', data.visaType);
//     formData.append('customId', data.customId);
//     formData.append('title', data.title);
//     formData.append('subtitle', data.subtitle);
//     formData.append('description', data.description);
 
//     data.locationImages.forEach((item) => {
//       formData.append('locationImages', item.image);  
//       formData.append(`location_${item.image.name}`, item.location);  
//     });

//   //   data.locationImages.forEach((item, index) => {
//   // // Convert location to a string if it is an array
//   //   const sanitizedLocation = Array.isArray(item.location)
//   //     ? item.location.join(', ') // Join array into a single string
//   //     : item.location;

//   //   formData.append(`locationImages`, item.image); // Append image
//   //   formData.append(`location_${item.image.name}`, item.location); // Append location as a string
//   // });

 
//     data.images.forEach((image) => {
//       formData.append('images', image);
//     });
 
 
//     formData.append('capital', data.capital);
//     formData.append('time', data.time);
//     formData.append('telephone_code', data.telephone_code);
//     formData.append('bank_time', data.bank_time);
//     formData.append('embassy_address', data.embassy_address);
 
// data.note.forEach((note, index) => {
//   formData.append(`note[${index}][text]`, note.text || ''); 
// });
 
// formData.append('general_documents', JSON.stringify(data.general_documents));
// formData.append('business_person', JSON.stringify(data.business_person));
// formData.append('student', JSON.stringify(data.student));
// formData.append('job_holder', JSON.stringify(data.job_holder));
// formData.append('other_documents', JSON.stringify(data.other_documents));
 
//   data.general_documents.forEach((doc, index) => {
//     formData.append(`general_documents[${index}].title`, doc.title);
//     formData.append(`general_documents[${index}].details`, JSON.stringify(doc.details));
//     formData.append(`general_documents[${index}].icon`, doc.icon); 
//   });
 
//   data.business_person.forEach((doc, index) => {
//     formData.append(`business_person[${index}].title`, doc.title);
//     formData.append(`business_person[${index}].details`, JSON.stringify(doc.details));
//     formData.append(`business_person[${index}].icon`, doc.icon); 
//   });
 
//   data.student.forEach((doc, index) => {
//     formData.append(`student[${index}].title`, doc.title);
//     formData.append(`student[${index}].details`, JSON.stringify(doc.details));
//     formData.append(`student[${index}].icon`, doc.icon); 
//   });
 
 
//   data.job_holder.forEach((doc, index) => {
//     formData.append(`job_holder[${index}].title`, doc.title);
//     formData.append(`job_holder[${index}].details`, JSON.stringify(doc.details));
//     formData.append(`job_holder[${index}].icon`, doc.icon);
//   });
 
 
//   data.other_documents.forEach((doc, index) => {
//     formData.append(`other_documents[${index}].title`, doc.title);
//     formData.append(`other_documents[${index}].details`, JSON.stringify(doc.details));
//     formData.append(`other_documents[${index}].icon`, doc.icon); 
//   });
 
//     formData.append('visaPrice_mainText', data.visaPrice_mainText);
//     formData.append('visaPrice_price', data.visaPrice_price);
//     formData.append('visaPrice_note', data.visaPrice_note);
 
 
//     console.log(formData, "formData");

//       for (const [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }
 
 
//     try {
//       // const response = await axios.post('http://localhost:4000/api/v1/visa/addVisaInfo', formData, {
//       // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/addVisaInfo`, formData, {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data',
//       //   },
//       // });
//       const response = await addVisa(formData).unwrap();
//       console.log(response)
//       toast.success("Content uploaded successfully!");
//       reset();
//       setImagePreviews([]);
//     } catch (error) {
//       toast.error("Something Going Wrong!");
//       console.error('Error uploading content', error);
//     }
//   };
 
//   return (
//     <>
//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-boxdark shadow-md rounded-md p-8 space-y-8" encType="multipart/form-data" >
 
//           <div className="grid grid-cols-2 gap-8">
//             <TextInput name="countryName" label="Country Name" />
//             <SelectInput
//               name="visaType"
//               label="Type of Visa"
//               options={[
//                 { value: "E-Visa", label: "E-Visa" },
//                 { value: "Sticker Visa", label: "Sticker Visa" },
//               ]}
//             />
//             <TextInput name="title" label="Title" />
//             <TextInput name="subtitle" label="Subtitle" />
//             <TextInput name="description" label="Description" type="textarea" />
//           </div>
 
//         <h3 className="text-lg font-semibold text-gray-700">Location Image Upload</h3>
//         <div className="grid grid-cols-2 gap-4">
//           {locationImageFields.map((field, index) => (
//             <div key={field.id} className="space-y-2 bg-gray-100 p-4 rounded-lg">
//               <label className="block text-sm font-semibold text-gray-600">Image {index + 1}</label>
//               <input
//                 name="locationImages"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleLocationImageChange(index, e)}
//                 className="w-full"
//               />
//               {locationImagePreviews[index] && (
//                 <Image src={locationImagePreviews[index]} 
//                  alt={`Preview ${index + 1}`} 
//                  width={300} 
//                  height={300} 
//                  className="object-cover rounded" 
//                  />
//               )}
//               <TextInput name={`locationImages.${index}.location`} label="Location Name" />
//               {locationImageFields.length > 1 && (
//                 <Button
//                 btnType="button"
//                 containerStyles="px-4 py-2 bg-red text-white rounded"
//                 title="Remove"
//                 handleClick={() => removeLocation(index)}
//                />
//               )}
//             </div>
//           ))}
//         </div>
 
//            <Button
//             btnType="button"
//             containerStyles="bg-teal_blue text-white rounded-lg px-4 py-2"
//             title="Add Another Image"
//             handleClick={() => appendLocation({ image: {} as File, location: "" })}
//            />
 
//           <h3 className="text-lg font-semibold text-gray-700">General Information Images Upload</h3>
//           <input type="file" name="images" accept="image/*" multiple onChange={handleImageChange} />
//           <div className="flex space-x-4">
//             {imagePreviews.map((preview, index) => (
//               <Image key={index} 
//                src={preview} 
//                alt={`Preview ${index}`} 
//                width={200} 
//                height={200} 
//                className="object-cover" 
//                />
//             ))}
//           </div>
 
//           <h3 className="text-lg font-semibold text-gray-700">General Information</h3>
//           <div className="grid grid-cols-2 gap-8">
//             <TextInput name="capital" label="Capital" />
//             <TextInput name="time" label="Local Time" />
//             <TextInput name="telephone_code" label="Telephone Code" />
//             <TextInput name="bank_time" label="Bank Time" />
//             <TextInput type="textarea" name="embassy_address" label="Embassy Address" />
//           </div>
 
 
//           <h3 className="text-lg font-semibold text-gray-700">Notes</h3>

//           {noteFields.map((item, index) => (
//             <div key={item.id} className="flex flex-col space-y-4 w-[50%]">
//             <TextInput
//             type="textarea"
//             name={`note.${index}.text`}
//             label={`Notes ${index + 1}`}
//             onChange={(e) => handleNoteChange(index, e.target.value)}
//           />

//              <div className="mt-12">
//               {noteFields.length > 1 && (
//                 <Button
//                 btnType="button"
//                 containerStyles="px-4 py-2 bg-red text-white rounded"
//                 title="Remove"
//                 handleClick={() => removeNote(index)}
//                />
//               )}
//           </div>
//             </div>
//           ))}
 
//             <Button
//             btnType="button"
//             containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//             title="Add Another Note"
//             handleClick={() => appendNote({ text: "" })}
//           />
 
//         <h3 className="text-lg font-semibold text-gray-700">Visa Requirements</h3>
 
//             <div>
//             <h4 className="font-semibold">General Documents</h4>
//             {generalDocumentsFields.map((field, index) => (
//               <div key={field.id} className="space-y-4">
//                 <TextInput name={`general_documents.${index}.title`} label={`Document Title ${index + 1}`} />
//                 <input
//                   name="general_documents"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileUpload("general_documents", index, e)} 
//                 />
//                 {iconPreviews.general_documents[index] && ( 
//                   <Image
//                     src={iconPreviews.general_documents[index]} 
//                     alt={`Icon Preview ${index + 1}`} 
//                     width={40}
//                     height={40}
//                     className="object-cover"
//                   />
//                 )}
//                 <label htmlFor={`general_documents.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
//                   Detail
//                 </label>
          
//                 <TextInput
//                 name={`general_documents.${index}.details.${index}`}
//                 label={`Document Detail ${index + 1}`}
//                 type="textarea"
//                 onChange={(e) => handleDetailsChange("general_documents", index, 0, e.target.value)}
//                 />
//               </div>
//             ))}
//             <Button
//               btnType="button"
//               containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//               title="Add Another General Document"
//               handleClick={() => appendGeneralDocument({ title: "", details: [""], icon: {} as File })}
//             />
//           </div>
 
//           <div>
//             <h4 className="font-semibold">Business Person Documents</h4>
//             {businessPersonFields.map((field, index) => (
//               <div key={field.id} className="space-y-4">
//                 <TextInput name={`business_person.${index}.title`} label={`Document Title ${index + 1}`} />
//                 <input
//                   name="business_person"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileUpload("business_person", index, e)} 
//                 />
//                 {iconPreviews.business_person[index] && ( 
//                   <Image
//                     src={iconPreviews.business_person[index]} 
//                     alt={`Icon Preview ${index + 1}`}
//                     width={40}
//                     height={40}
//                     className="w-8 h-8 object-cover"
//                   />
//                 )}
//                 <label htmlFor={`business_person.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
//                   Detail
//                 </label>

//             <TextInput
//             name={`business_person.${index}.details.${index}`}
//             label={`Document Detail ${index + 1}`}
//             type="textarea"
//             onChange={(e) => handleDetailsChange("business_person", index, 0, e.target.value)} 
//           />
//               </div>
//             ))}
//             <Button
//               btnType="button"
//               containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//               title="Add Another Business Document"
//               handleClick={() => appendBusinessDocument({ title: "", details: [""], icon: {} as File })}
//             />
//           </div>
 
//           <div>
//             <h4 className="font-semibold">Student Documents</h4>
//             {studentFields.map((field, index) => (
//               <div key={field.id} className="space-y-4">
//                 <TextInput name={`student.${index}.title`} label={`Document Title ${index + 1}`} />
//                 <input
//                   name="student"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileUpload("student", index, e)} 
//                 />
//                 {iconPreviews.student[index] && ( 
//                   <Image
//                     src={iconPreviews.student[index]} 
//                     alt={`Icon Preview ${index + 1}`} 
//                     width={40}
//                     height={40}
//                     className="w-8 h-8 object-cover"
//                   />
//                 )}
//                 <label htmlFor={`student.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
//                   Detail
//                 </label>
//             <TextInput
//             name={`student.${index}.details.0`}
//             label={`Document Detail ${index + 1}`}
//             type="textarea"
//             onChange={(e) => handleDetailsChange("student", index, 0, e.target.value)}
//           />
//               </div>
//             ))}
//             <Button
//               btnType="button"
//               containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//               title="Add Another Student Document"
//               handleClick={() => appendStudentDocument({ title: "", details: [""], icon: {} as File })}
//             />
//           </div>
 
//           <div>
//             <h4 className="font-semibold">Job Holder Documents</h4>
//             {jobHolderFields.map((field, index) => (
//               <div key={field.id} className="space-y-4">
//                 <TextInput name={`job_holder.${index}.title`} label={`Document Title ${index + 1}`} />
//                 <input
//                   name="job_holder"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileUpload("job_holder", index, e)} 
//                 />
//                 {iconPreviews.job_holder[index] && ( 
//                   <Image
//                     src={iconPreviews.job_holder[index]} 
//                     alt={`Icon Preview ${index + 1}`} 
//                     width={40}
//                     height={40}
//                     className="object-cover"
//                   />
//                 )}
//                 <label htmlFor={`job_holder.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
//                   Detail
//                 </label>
//                   <TextInput
//                   name={`job_holder.${index}.details.${index}`}
//                   label={`Document Detail ${index + 1}`}
//                   type="textarea"
//                   onChange={(e) => handleDetailsChange("job_holder", index, 0, e.target.value)}
//                  />
//               </div>
//             ))}
//             <Button
//               btnType="button"
//               containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//               title="Add Another Job Holder Document"
//               handleClick={() => appendJobHolderDocument({ title: "", details: [""], icon: {} as File })}
//             />
//           </div>
 
//           <div>
//             <h4 className="font-semibold">Other Documents</h4>
//             {otherDocumentsFields.map((field, index) => (
//               <div key={field.id} className="space-y-4">
//                 <TextInput name={`other_documents.${index}.title`} label={`Document Title ${index + 1}`} />
//                 <input
//                   name="other_documents"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileUpload("other_documents", index, e)} 
//                 />
//                 {iconPreviews.other_documents[index] && ( 
//                   <Image
//                     src={iconPreviews.other_documents[index]} 
//                     alt={`Icon Preview ${index + 1}`} 
//                     width={40}
//                     height={40}
//                     className="object-cover"
//                   />
//                 )}
//                 <label htmlFor={`other_documents.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
//                   Detail
//                 </label>
//                     <TextInput
//             name={`other_documents.${index}.details.${index}`}
//             label={`Document Detail ${index + 1}`}
//             type="textarea"
//             onChange={(e) => handleDetailsChange("other_documents", index, 0, e.target.value)}
//           />
//               </div>
//             ))}
//             <Button
//               btnType="button"
//               containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//               title="Add Another Other Document"
//               handleClick={() => appendOtherDocument({ title: "", details: [""], icon: {} as File })}
//             />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-700 mt-8">Visa Price</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <TextInput name="visaPrice_mainText" label="Main Text" />
//             <TextInput name="visaPrice_price" label="Price" />
//             <TextInput name="visaPrice_note" label="Note" />
//           </div>
 
//            <div className="flex justify-center mt-8">
//             <Button
//               btnType="submit"
//               containerStyles="custom-btn-fill" 
//               textStyles="text-white" 
//               title="Save"
//               />
//           </div>
//         </form>
//       </FormProvider>
//     </>
//   );
// }