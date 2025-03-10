// "use client";
// import { useForm, FormProvider, useFieldArray } from "react-hook-form";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FileInput, SelectInput, TextInput } from "../FormInputs";
// import Button from "../CustomButton";
// import { FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import Image from "next/image";
// import { useUpdateVisaMutation } from "@/redux/api/visaApi";
// interface EditVisaProps {
//   visaInfo: any;
//   visaRequirements: any;
// }
 
// const EditVisa: React.FC<EditVisaProps> = ({ visaInfo, visaRequirements }) => {
//   const [updateVisa, { isLoading }] = useUpdateVisaMutation();
//   const methods = useForm({
//     defaultValues: {
//       countryName: "",
//       visaType: "",
//       title: "",
//       subtitle: "",
//       description: "",
//       locationImages: [{ image: {} as File, location: "", }],
//       images: [],
//       capital: '',
//       time: '',
//       telephone_code: '',
//       bank_time: '',
//       embassy_address: '',
//       general_documents: [{ title: "", details: [""], icon: {} as File }],
//       business_person: [{ title: "", details: [""], icon: {} as File }],
//       student: [{ title: "", details: [""], icon: {} as File }],
//       job_holder: [{ title: "", details: [""], icon: {} as File }],
//       other_documents: [{ title: "", details: [""], icon: {} as File }],
//       note: [{ text: "" }],
//       visaPrice_mainText: "",
//       visaPrice_price: "",
//       visaPrice_note: "",
//     },
//   });
 
// const { handleSubmit, reset, control, setValue } = methods;
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
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     console.log(files, "files")
//     if (files) {
//       const fileArray:any = Array.from(files);
//       const newImagePreviews = fileArray.map((file:any) => URL.createObjectURL(file));
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
 
 
//   const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray({
//     control,
//     name: "note",
//   });
 
//   const { fields: generalDocumentsFields, append: appendGeneralDocument } = useFieldArray({
//     control,
//     name: "general_documents",
//   });
 
//   const { fields: businessPersonFields, append: appendBusinessDocument } = useFieldArray({
//     control,
//     name: "business_person",
//   });
 
//   const { fields: studentFields, append: appendStudentDocument } = useFieldArray({
//     control,
//     name: "student",
//   });
 
//   const { fields: jobHolderFields, append: appendJobHolderDocument } = useFieldArray({
//     control,
//     name: "job_holder",
//   });
 
//   const { fields: otherDocumentsFields, append: appendOtherDocument } = useFieldArray({
//     control,
//     name: "other_documents",
//   });
 
//   const handleIconChange = (
//     fieldName: "general_documents" | "business_person" | "student" | "job_holder" | "other_documents",
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       const newIconPreviews = { ...iconPreviews };
//       if (newIconPreviews[fieldName][index]) {
//         URL.revokeObjectURL(newIconPreviews[fieldName][index]);
//       }
 
//       newIconPreviews[fieldName] = {
//         ...newIconPreviews[fieldName],
//         [index]: URL.createObjectURL(file),
//       };
//       setIconPreviews(newIconPreviews);
//       methods.setValue(`${fieldName}.${index}.icon`, file);
//     }
//   };
//    useEffect(() => {
//     if (visaInfo && visaRequirements) {
//       reset({
//         countryName: visaInfo.countryName,
//         visaType: visaInfo.visaType,
//         title: visaInfo.title,
//         subtitle: visaInfo.subtitle,
//         description: visaInfo.description,
//         locationImages: visaInfo.locationImages || [{ image: {} as File, location: "" }],
//         images: visaInfo.images || [],
//         capital: visaInfo.capital,
//         time: visaInfo.time,
//         telephone_code: visaInfo.telephone_code,
//         bank_time: visaInfo.bank_time,
//         embassy_address: visaInfo.embassy_address,
//         general_documents: visaRequirements.general_documents || [{ title: "", details: [""], icon: {} as File }],
//         business_person: visaRequirements.business_person || [{ title: "", details: [""], icon: {} as File }],
//         student: visaRequirements.student || [{ title: "", details: [""], icon: {} as File }],
//         job_holder: visaRequirements.job_holder || [{ title: "", details: [""], icon: {} as File }],
//         other_documents: visaRequirements.other_documents || [{ title: "", details: [""], icon: {} as File }],
//         note: visaInfo.note || [{ text: "" }],
//         visaPrice_mainText: visaInfo.visaPrice_mainText,
//         visaPrice_price: visaInfo.visaPrice_price,
//         visaPrice_note: visaInfo.visaPrice_note,
//       });
 
//       setLocationImagePreviews(visaInfo.locationImages?.map((img: any) => img.image) || []);
//       setImagePreviews(visaInfo.images?.map((img: any) => img) || []);
//       setIconPreviews({
//         general_documents: visaRequirements.general_documents?.map((doc: any) => doc.icon) || [],
//         business_person: visaRequirements.business_person?.map((doc: any) => doc.icon) || [],
//         student: visaRequirements.student?.map((doc: any) => doc.icon) || [],
//         job_holder: visaRequirements.job_holder?.map((doc: any) => doc.icon) || [],
//         other_documents: visaRequirements.other_documents?.map((doc: any) => doc.icon) || [],
//       });
//     }
//   }, [visaInfo, visaRequirements, reset]);
 
 
//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
//       locationImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
//     };
//   }, [imagePreviews, locationImagePreviews]);
//   const onSubmit = async (formData: any) => {
//     const formDataToSend = new FormData();
 
//     formDataToSend.append("countryName", formData.countryName);
//     formDataToSend.append("visaType", formData.visaType);
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("subtitle", formData.subtitle);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("capital", formData.capital);
//     formDataToSend.append("time", formData.time);
//     formDataToSend.append("telephone_code", formData.telephone_code);
//     formDataToSend.append("bank_time", formData.bank_time);
//     formDataToSend.append("embassy_address", formData.embassy_address);
//     formDataToSend.append("visaPrice_mainText", formData.visaPrice_mainText);
//     formDataToSend.append("visaPrice_price", formData.visaPrice_price);
//     formDataToSend.append("visaPrice_note", formData.visaPrice_note);
//     if (formData.note && Array.isArray(formData.note)) {
//       formData.note.forEach((note: any, index: number) => {
//         formDataToSend.append(`note[${index}].text`, note.text);
//       });
//     }
 
//     if (formData.locationImages && Array.isArray(formData.locationImages)) {
//       formData.locationImages.forEach((imageData: any, index: number) => {
//         if (imageData.image instanceof File) {
//           formDataToSend.append(`locationImages[${index}].image`, imageData.image);
//         }
//         formDataToSend.append(`locationImages[${index}].location`, imageData.location);
//       });
//     }
 
//     const categories = ["general_documents", "business_person", "student", "job_holder", "other_documents"];
//     categories.forEach((category) => {
//       if (formData[category] && Array.isArray(formData[category])) {
//         formData[category].forEach((doc: any, index: number) => {
//           formDataToSend.append(`${category}[${index}].title`, doc.title);
//           doc.details.forEach((detail: string, detailIndex: number) => {
//             formDataToSend.append(`${category}[${index}].details[${detailIndex}]`, detail);
//           });
//           if (doc.icon) {
//             formDataToSend.append(`${category}[${index}].icon`, doc.icon);
//           }
//         });
//       }
//     });
 
//     if (formData.images && Array.isArray(formData.images)) {
//       formData.images.forEach((image: any, index: number) => {
//         if (image instanceof File) {
//           formDataToSend.append(`images[${index}]`, image);
//         }
//       });
//     }
//     for (const [key, value] of formDataToSend.entries()) {
//       console.log(`${key}:`, value);
//     }
//     console.log("formData: ",formDataToSend);
//     try {
//       // const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${visaInfo.countryName}`, formDataToSend, {
//       //   headers: {
//       //     "Content-Type": "multipart/form-data",
//       //   },
//       // });
//       const response = await updateVisa(formDataToSend).unwrap();
//       console.log(response)
//       toast.success("Content updated successfully!");
//       console.log("Visa updated successfully:", response);
//     } catch (error) {
//       toast.error("Something Going Wrong!");
//       console.error("Error updating visa:", error);
//     }
//   };

//   return (
//     <>
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-boxdark shadow-md rounded-md p-8 space-y-8" encType="multipart/form-data" >
//         <div className="grid grid-cols-2 gap-8">
//           <TextInput name="countryName" label="Country Name" />
//           <SelectInput
//               name="visaType"
//               label="Type of Visa"
//               options={[
//                 { value: "E-Visa", label: "E-Visa" },
//                 { value: "Sticker Visa", label: "Sticker Visa" },
//               ]}
//             />
//           <TextInput name="title" label="Title" />
//           <TextInput name="subtitle" label="Subtitle" />
//           <TextInput name="description" label="Description" type="textarea" />
//         </div>
 
//       <h3 className="text-lg font-semibold text-gray-700">Location Image Upload</h3>
//       <div className="grid grid-cols-2 gap-4">
//         {locationImageFields.map((field, index) => (
//           <div key={field.id} className="space-y-2 bg-gray-100 p-4 rounded-lg">
//             <label className="block text-sm font-semibold text-gray-600">Image {index + 1}</label>
//             <FileInput
//             name="locationImages"
//             label="Upload Image"
//             onChange={(e) => handleLocationImageChange(index, e)}
//             />   
 
//             {locationImagePreviews[index] && (
//                 <Image
//                 key={index}
//                 src={locationImagePreviews[index]} 
//                 alt={`Preview ${index + 1}`} 
//                 width={300}
//                 height={200}
//                 className="object-cover rounded-lg"
//               />
//             )}
 
//             <TextInput name={`locationImages.${index}.location`} label="Location Name" />
//           </div>
//         ))}
//       </div>
 
//          <Button
//           btnType="button"
//           containerStyles="bg-teal_blue text-white rounded-lg px-4 py-2"
//           title="Add Another Image"
//           handleClick={() => appendLocation({ image: {} as File, location: "" })}
//          />
 
//         <h3 className="text-lg font-semibold text-gray-700">General Information Images Upload</h3>
 
//         <FileInput
//           name="images"
//           label="Upload Images"
//           multiple
//           onChange={(e) => handleImageChange(e)}
//         />
 
//         <div className="flex space-x-4">
//           {imagePreviews.map((preview, index) => (
//             <div key={index} className="relative inline-block">
//               <Image
//                 src={preview}
//                 alt={`Preview ${index}`}
//                 width={200}
//                 height={200}
//                 className="object-cover"
//               />
//               <button
//                 type="button"
//                 // onClick={() => removeImage(index)}
 
//                 className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hover:bg-red-700"
//               >
//                 <FaTimes/>
//               </button>
 
//               <Button
//                btnType="button"
//                containerStyles="absolute top-0 right-0 p-1 text-white bg-red rounded-full hover:bg-red-700"
//                title=""
//                icon={<FaTimes/>}
//               //  handleClick={() => removeImage(index)}
//                />
//             </div>
//           ))}
//         </div>
 
//         <h3 className="text-lg font-semibold text-gray-700">General Information</h3>
//         <div className="grid grid-cols-2 gap-8">
//           <TextInput name="capital" label="Capital" />
//           <TextInput name="time" label="Local Time" />
//           <TextInput name="telephone_code" label="Telephone Code" />
//           <TextInput name="bank_time" label="Bank Time" />
//           <TextInput type="textarea" name="embassy_address" label="Embassy Address" />
//         </div>
 
 
//         <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
 
//         {noteFields.map((field, index) => (
//           <div key={field.id} className="space-y-2">
//             <TextInput type="textarea" name={`note[${index}].text`} label={`Note ${index + 1}`} />
//           </div>
 
//         ))}
 
//         <Button
//          btnType="button"
//          containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//          title="Add Another Note"
//          handleClick={() => appendNote({ text: "" })}
//         />
 
//       <h3 className="text-lg font-semibold text-gray-700">Visa Requirements</h3>
 
//       {generalDocumentsFields.map((field, index) => (
//           <div key={field.id}>
 
//             <TextInput
//              name={`general_documents[${index}].title`}
//              label="General Document Title"
//              />
 
//             {field.details.map((detail: string, detailIndex: number) => (
//               <TextInput
//                type="textarea"
//                 key={detailIndex}
//                 name={`general_documents[${index}].details[${detailIndex}]`}
//                 label={`Detail ${detailIndex + 1}`}
//               />
//             ))}
 
//             <FileInput name={`general_documents[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("general_documents", index, e)} />
//             {iconPreviews.general_documents[index] && 
//              <Image
//              src={iconPreviews.general_documents[index]}
//              alt="Preview"
//              width={40}
//              height={40}
//              className="mr-3"
//            />
//             }
 
 
//           </div>
//         ))}
 
//         <Button
//          btnType="button"
//          containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//          title="Add Another General Document"
//          handleClick={() => appendGeneralDocument({ title: "", details: [""], icon: {} as File })}
//         />
 
//         {businessPersonFields.map((field, index) => (
//           <div key={field.id}>
 
//             <TextInput
//              name={`business_person[${index}].title`}
//              label="business Document Title"
//              />
 
//             {field.details.map((detail: string, detailIndex: number) => (
//               <TextInput
//                 type="textarea"
//                 key={detailIndex}
//                 name={`business_person[${index}].details[${detailIndex}]`}
//                 label={`Detail ${detailIndex + 1}`}
//               />
//             ))}
 
//             <FileInput name={`business_person[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("business_person", index, e)} />
 
//             {iconPreviews.business_person[index] &&
//               <Image
//               src={iconPreviews.business_person[index]}
//               alt="Preview"
//               width={40}
//               height={40}
//               className="mr-3"
//             />}
//           </div>
//         ))}
 
//         <Button
//          btnType="button"
//          containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//          title="Add Another Business Document"
//          handleClick={() => appendBusinessDocument({ title: "", details: [""], icon: {} as File })}
//         />
 
//         {studentFields.map((field, index) => (
//           <div key={field.id}>
 
//             <TextInput
//              name={`student[${index}].title`}
//              label="Student Document Title"
//              />
 
//             {field.details.map((detail: string, detailIndex: number) => (
//               <TextInput
//                type="textarea"
//                 key={detailIndex}
//                 name={`student[${index}].details[${detailIndex}]`}
//                 label={`Detail ${detailIndex + 1}`}
//               />
//             ))}
 
//             <FileInput name={`student[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("student", index, e)} />
 
//             {iconPreviews.student[index] &&
//              <Image
//              src={iconPreviews.student[index]}
//              alt="Preview"
//              width={40}
//              height={40}
//              className="mr-3"
//            />
//              }
//           </div>
//         ))}
 
//         <Button
//          btnType="button"
//          containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//          title="Add Another Student Document"
//          handleClick={() => appendStudentDocument({ title: "", details: [""], icon: {} as File })}
//         />
 
//         {jobHolderFields.map((field, index) => (
//           <div key={field.id}>
 
//             <TextInput
//              name={`job_holder[${index}].title`}
//              label="Job Holder Document Title"
//              />
 
//             {field.details.map((detail: string, detailIndex: number) => (
//               <TextInput
//                 type="textarea"
//                 key={detailIndex}
//                 name={`job_holder[${index}].details[${detailIndex}]`}
//                 label={`Detail ${detailIndex + 1}`}
//               />
//             ))}
 
//             <FileInput name={`job_holder[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("job_holder", index, e)} />
//             {iconPreviews.job_holder[index] && 
//              <Image
//              src={iconPreviews.job_holder[index]}
//              alt="Preview"
//              width={40}
//              height={40}
//              className="mr-3"
//            /> }
//           </div>
//         ))}
 
//         <Button
//          btnType="button"
//          containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//          title="Add Another Job Holder Document"
//          handleClick={() => appendJobHolderDocument({ title: "", details: [""], icon: {} as File })}
//         />
 
 
//         {otherDocumentsFields.map((field, index) => (
//           <div key={field.id}>
 
//             <TextInput
//              name={`other_documents[${index}].title`}
//              label="Other Document Title"
//              />
 
//             {field.details.map((detail: string, detailIndex: number) => (
//               <TextInput
//                 type="textarea"
//                 key={detailIndex}
//                 name={`other_documents[${index}].details[${detailIndex}]`}
//                 label={`Detail ${detailIndex + 1}`}
//               />
//             ))}
 
//             <FileInput name={`other_documents[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("other_documents", index, e)} />
//             {iconPreviews.other_documents[index] &&   
//             <Image
//             src={iconPreviews.other_documents[index]}
//             alt="Preview"
//             width={40}
//             height={40}
//             className="mr-3"
//           />}
//           </div>
//         ))}
 
//         <Button
//          btnType="button"
//          containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//          title="Add Another Other Document"
//          handleClick={() => appendOtherDocument({ title: "", details: [""], icon: {} as File })}
//         />
 
//         <h3 className="text-lg font-semibold text-gray-700 mt-8">Visa Price</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <TextInput name="visaPrice_mainText" label="Main Text" />
//           <TextInput name="visaPrice_price" label="Price" />
//           <TextInput name="visaPrice_note" label="Note" />
//         </div>
 
//          <div className="flex justify-center mt-8">
//           <Button
//             btnType="submit"
//             containerStyles="custom-btn-fill" 
//             textStyles="text-white" 
//             title="Save"
//             />
//         </div>
//       </form>
//     </FormProvider>
//   </>
 
//   );
// };
 
// export default EditVisa;




"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useForm, FormProvider, type SubmitHandler, useFieldArray } from "react-hook-form"
import Button from "../CustomButton"
import toast from "react-hot-toast"
import Image from "next/image"
import { TextInput } from "../ui/form/text-input"
import { SelectInput } from "../ui/form/select-input"
import { MdClose } from "react-icons/md"
import { FaPlus } from "react-icons/fa"
import { Accordion } from "../Accordion/Accordion"
import DocumentSection from "./DocumentInput"
import { useVisaDetailsByCountryQuery } from "@/redux/api/visaApiV2"
import Loader from "../common/Loader"

interface FormData {
  countryName: string
  visaType: string
  customId: string
  title: string
  subtitle: string
  description: string
  locationImages: { image: File; location: string }[]
  images: File[]
  capital: string
  time: string
  telephone_code: string
  bank_time: string
  embassy_address: string
  note: { text?: string }[]

  general_documents: {
    icon: File
    title: string
    details: string[]
  }[]
  business_person: {
    icon: File
    title: string
    details: string[]
  }[]
  student: {
    icon: File
    title: string
    details: string[]
  }[]
  job_holder: {
    icon: File
    title: string
    details: string[]
  }[]
  other_documents: {
    icon: File
    title: string
    details: string[]
  }[]
  visaPrice_mainText: string
  visaPrice_price: string
  visaPrice_note: string
}
type DocumentFieldName = "general_documents" | "business_person" | "student" | "job_holder" | "other_documents"

export default function EditVisaV2({ countryName }: { countryName: string }) {
  const { data: allVisaData, isLoading } = useVisaDetailsByCountryQuery({ countryName: countryName })
  // const [updateVisa, { isLoading: false }] = useUpdateVisaMutation()

  const visaData = allVisaData?.data

  console.log("visaData:", visaData)

  const methods = useForm<FormData>({
    defaultValues: {
      locationImages: [{ image: {} as File, location: "" }],
      countryName: "",
      visaType: "",
      customId: "",
      title: "",
      subtitle: "",
      description: "",
      images: [],
      capital: "",
      time: "",
      telephone_code: "",
      bank_time: "",
      embassy_address: "",
      note: [{ text: "" }],
      general_documents: [{ title: "", details: [""], icon: {} as File }],
      business_person: [{ title: "", details: [""], icon: {} as File }],
      student: [{ title: "", details: [""], icon: {} as File }],
      job_holder: [{ title: "", details: [""], icon: {} as File }],
      other_documents: [{ title: "", details: [""], icon: {} as File }],
      visaPrice_mainText: "",
      visaPrice_price: "",
      visaPrice_note: "",
    },
  })

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
  } = methods

  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: "note",
  })

  const {
    fields: generalDocumentsFields,
    append: appendGeneralDocument,
    remove: removeGeneralDocument,
  } = useFieldArray({
    control,
    name: "general_documents",
  })

  const {
    fields: businessPersonFields,
    append: appendBusinessDocument,
    remove: removeBusinessDocument,
  } = useFieldArray({
    control,
    name: "business_person",
  })

  const {
    fields: studentFields,
    append: appendStudentDocument,
    remove: removeStudentDocument,
  } = useFieldArray({
    control,
    name: "student",
  })

  const {
    fields: jobHolderFields,
    append: appendJobHolderDocument,
    remove: removeJobHolderDocument,
  } = useFieldArray({
    control,
    name: "job_holder",
  })

  const {
    fields: otherDocumentsFields,
    append: appendOtherDocument,
    remove: removeOtherDocument,
  } = useFieldArray({
    control,
    name: "other_documents",
  })

  const [iconPreviews, setIconPreviews] = useState<{
    general_documents: { [key: number]: string }
    business_person: { [key: number]: string }
    student: { [key: number]: string }
    job_holder: { [key: number]: string }
    other_documents: { [key: number]: string }
  }>({
    general_documents: {},
    business_person: {},
    student: {},
    job_holder: {},
    other_documents: {},
  })

  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [locationImagePreviews, setLocationImagePreviews] = useState<string[]>([])

  useEffect(() => {
    if (visaData) {
      // Pre-populate form fields
      reset({
        countryName: visaData.visaCountryId.countryName,
        visaType: visaData.visaCountryId.visaType,
        customId: visaData.visaCountryId.customId,
        title: visaData.visaCountryId.title,
        subtitle: visaData.visaCountryId.subtitle,
        description: visaData.visaCountryId.description,
        capital: visaData.visaCountryId.capital,
        time: visaData.visaCountryId.time,
        telephone_code: visaData.visaCountryId.telephone_code,
        bank_time: visaData.visaCountryId.bank_time,
        embassy_address: visaData.visaCountryId.embassy_address,
        note: visaData.visaCountryId.note,
        visaPrice_mainText: visaData.visaCountryId.visaPrice_mainText,
        visaPrice_price: visaData.visaCountryId.visaPrice_price,
        visaPrice_note: visaData.visaCountryId.visaPrice_note,
        locationImages: visaData.visaCountryId.locationImages.map((item: any) => ({
          image: {} as File,
          location: item.location,
        })),
        general_documents: visaData.general_documents.map((doc: any) => ({
          title: doc.title,
          details: doc.details,
          icon: {} as File,
        })),
        business_person: visaData.business_person.map((doc: any) => ({
          title: doc.title,
          details: doc.details,
          icon: {} as File,
        })),
        student: visaData.student.map((doc: any) => ({
          title: doc.title,
          details: doc.details,
          icon: {} as File,
        })),
        job_holder: visaData.job_holder.map((doc: any) => ({
          title: doc.title,
          details: doc.details,
          icon: {} as File,
        })),
        other_documents: visaData.other_documents.map((doc: any) => ({
          title: doc.title,
          details: doc.details,
          icon: {} as File,
        })),
      })

      // Set image previews
      setImagePreviews(visaData.visaCountryId.images)
      setLocationImagePreviews(visaData.visaCountryId.locationImages.map((item: any) => item.image))

      // Set icon previews
      const newIconPreviews = {
        general_documents: {},
        business_person: {},
        student: {},
        job_holder: {},
        other_documents: {},
      }

      Object.entries(newIconPreviews).forEach(([key, value]) => {
        visaData[key].forEach((item: any, index: number) => {
          newIconPreviews[key as keyof typeof newIconPreviews][index] = item.icon
        })
      })

      setIconPreviews(newIconPreviews)
    }
  }, [visaData, reset])

  const handleFileUpload = (fieldName: DocumentFieldName, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const newIconPreviews = { ...iconPreviews }
      if (newIconPreviews[fieldName][index]) {
        URL.revokeObjectURL(newIconPreviews[fieldName][index])
      }

      newIconPreviews[fieldName] = {
        ...newIconPreviews[fieldName],
        [index]: URL.createObjectURL(file),
      }
      setIconPreviews(newIconPreviews)
      methods.setValue(`${fieldName}.${index}.icon`, file)
    }
  }

  const removeIcon = (fieldName: DocumentFieldName, index: number) => {
    const newIconPreviews = { ...iconPreviews }
    if (newIconPreviews[fieldName][index]) {
      URL.revokeObjectURL(newIconPreviews[fieldName][index])
      delete newIconPreviews[fieldName][index]
      setIconPreviews(newIconPreviews)
      methods.setValue(`${fieldName}.${index}.icon`, {} as File)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      const newImagePreviews = fileArray.map((file) => URL.createObjectURL(file))
      setImagePreviews(newImagePreviews)
      setValue("images", fileArray)
    }
  }

  const removeImage = (index: number) => {
    const newImagePreviews = [...imagePreviews]
    URL.revokeObjectURL(newImagePreviews[index])
    newImagePreviews.splice(index, 1)
    setImagePreviews(newImagePreviews)

    const currentImages = methods.getValues("images")
    const newImages = [...currentImages]
    newImages.splice(index, 1)
    setValue("images", newImages)
  }

  const {
    fields: locationImageFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control,
    name: "locationImages",
  })

  if (isLoading) return <Loader />

  const handleLocationImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      const newImagePreviews = [...locationImagePreviews]
      newImagePreviews[index] = URL.createObjectURL(fileArray[0])
      setLocationImagePreviews(newImagePreviews)
      setValue(`locationImages.${index}.image`, fileArray[0])
    }
  }

  const removeLocationImage = (index: number) => {
    console.log("locationImageFields.length", locationImageFields.length)
    const newImagePreviews = [...locationImagePreviews]
    if (newImagePreviews[index]) {
      URL.revokeObjectURL(newImagePreviews[index])
      newImagePreviews[index] = ""
      setLocationImagePreviews(newImagePreviews)
      setValue(`locationImages.${index}.image`, {} as File)
    }
  }

  const handleNoteChange = (index: number, data: string) => {
    const plainText = data.replace(/<\/?[^>]+(>|$)/g, "")
    setValue(`note.${index}.text` as const, plainText)
  }

  const handleDetailsChange = (fieldName: DocumentFieldName, index: number, detailIndex: number, data: string) => {
    const plainText = data.replace(/<\/?[^>]+(>|$)/g, "")
    const path = `${fieldName}.${index}.details.${detailIndex}` as const
    setValue(path, plainText)
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData()

      // Clean up data structure to remove empty fields, etc.
      const cleanedData = {
        // Basic info
        countryName: data.countryName,
        visaType: data.visaType,
        customId: data.customId,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,

        // General info
        capital: data.capital,
        time: data.time,
        telephone_code: data.telephone_code,
        bank_time: data.bank_time,
        embassy_address: data.embassy_address,

        // Visa price info
        visaPrice_mainText: data.visaPrice_mainText,
        visaPrice_price: data.visaPrice_price,
        visaPrice_note: data.visaPrice_note,

        // Notes
        notes: data.note,

        // Location data (without images)
        locationImages: data.locationImages
          .filter((item) => item.location.trim())
          .map((item, index) => ({
            id: index, // To match with uploaded files
            location: item.location,
          })),

        // Document sections (without files)
        general_documents: prepareDocumentData(data.general_documents),
        business_person: prepareDocumentData(data.business_person),
        student: prepareDocumentData(data.student),
        job_holder: prepareDocumentData(data.job_holder),
        other_documents: prepareDocumentData(data.other_documents),
      }

      // Add all regular data as a single JSON string
      formData.append("data", JSON.stringify(cleanedData))

      // Add files separately with identifiable keys

      // General images
      if (data.images && data.images.length > 0) {
        data.images.forEach((file, index) => {
          if (file instanceof File && file.size > 0) {
            formData.append(`images[${index}]`, file)
          }
        })
      }

      // Location images
      data.locationImages.forEach((item, index) => {
        if (item.image instanceof File && item.image.size > 0) {
          formData.append(`locationImages[${index}]`, item.image)
        }
      })

      // Document icons for each section
      appendDocumentFiles(formData, data.general_documents, "general_documents")
      appendDocumentFiles(formData, data.business_person, "business_person")
      appendDocumentFiles(formData, data.student, "student")
      appendDocumentFiles(formData, data.job_holder, "job_holder")
      appendDocumentFiles(formData, data.other_documents, "other_documents")

      // Add visa ID for update
      formData.append("visaId", visaData._id)

      const response = await updateVisa(formData).unwrap()
      toast.success("Visa information updated successfully!")
      // Optionally, redirect or refresh data after successful update
    } catch (error) {
      toast.error("Error updating visa information")
      console.error("Error updating visa:", error)
    }
  }

  // Helper for preparing document data without files
  const prepareDocumentData = (docs: any[]) => {
    return docs
      .filter((doc) => doc.title && doc.details.some((detail: any) => detail?.trim().length > 0))
      .map((doc, index) => ({
        id: index, // To match with uploaded files
        title: doc.title,
        details: doc.details.filter((detail: any) => detail?.trim().length > 0),
      }))
  }

  // Helper for appending document files
  const appendDocumentFiles = (formData: any, docs: any[], sectionName: string) => {
    docs.forEach((doc, index) => {
      if (doc.icon instanceof File && doc.icon.size > 0) {
        formData.append(`${sectionName}Icons[${index}]`, doc.icon)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-2 dark:bg-boxdark py-8 px-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1400px] mx-auto" encType="multipart/form-data">
          {/* Header Section */}
          <div className="bg-white dark:bg-boxdark-2 rounded-xl shadow-card dark:shadow-none hover:shadow-1 dark:hover:shadow-none transition-shadow p-8 mb-8">
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <TextInput
                    name="countryName"
                    label="Country Name"
                    required
                    className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
                  />
                  <TextInput
                    name="title"
                    required
                    label="Title"
                    className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
                  />
                </div>
                <div className="space-y-6">
                  <SelectInput
                    name="visaType"
                    required
                    label="Type of Visa"
                    options={[
                      { value: "E-Visa", label: "E-Visa" },
                      { value: "Sticker Visa", label: "Sticker Visa" },
                    ]}
                    className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
                  />
                  <TextInput
                    name="subtitle"
                    required
                    label="Subtitle"
                    className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <TextInput
                    name="description"
                    required
                    label="Description"
                    type="textarea"
                    className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors min-h-[120px]"
                  />
                </div>
                <div className=" md:col-span-2">
                  {noteFields.map((item, index) => (
                    <TextInput
                      type="textarea"
                      key={item.id}
                      name={`note.${index}.text`}
                      label={`Note`}
                      className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors min-h-[120px]"
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* General Information Section */}
          <div className="bg-white dark:bg-boxdark-2 rounded-xl shadow-card dark:shadow-none hover:shadow-1 dark:hover:shadow-none transition-shadow p-8 mb-8">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-6">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TextInput
                name="capital"
                required
                label="Capital"
                className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
              />
              <TextInput
                required
                name="time"
                label="Local Time"
                className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
              />
              <TextInput
                required
                name="telephone_code"
                label="Telephone Code"
                className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
              />
              <TextInput
                required
                name="bank_time"
                label="Bank Time"
                className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
              />
              <TextInput
                required
                type="textarea"
                name="embassy_address"
                label="Embassy Address"
                className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors lg:col-span-2"
              />
            </div>
          </div>

          {/* Visa Price Section */}
          <div className="bg-white dark:bg-boxdark-2 rounded-xl shadow-card dark:shadow-none hover:shadow-1 dark:hover:shadow-none transition-shadow p-8 mb-8">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Visa Price Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TextInput
                required
                name="visaPrice_mainText"
                label="Main Text"
                className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
              />
              <TextInput
                required
                name="visaPrice_price"
                label="Price"
                className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
              />
              <TextInput
                required
                name="visaPrice_note"
                label="Note"
                className="md:col-span-2 bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
              />
            </div>
          </div>

          {/* Location Images Section */}
          <Accordion title="Location Images">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationImageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="group relative bg-white dark:bg-boxdark-2 rounded-xl border border-stroke dark:border-strokedark overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="absolute right-2 top-1 ">
                    {locationImageFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (locationImagePreviews[index]) {
                            URL.revokeObjectURL(locationImagePreviews[index])
                          }
                          const newPreviews = [...locationImagePreviews]
                          newPreviews.splice(index, 1)
                          setLocationImagePreviews(newPreviews)
                          removeLocation(index)
                        }}
                        className="bg-red hover:text-red-700 text-white p-1 rounded-full "
                      >
                        <MdClose />
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="relative">
                        {locationImagePreviews[index] ? (
                          <div className="relative rounded-lg overflow-hidden">
                            <Image
                              src={locationImagePreviews[index] || "/placeholder.svg"}
                              alt={`Location ${index + 1}`}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeLocationImage(index)}
                              className="absolute top-2 right-2 bg-red text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MdClose />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">Click to upload location image</p>
                              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              required
                              onChange={(e) => handleLocationImageChange(index, e)}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <TextInput
                        name={`locationImages.${index}.location`}
                        label="Location Name"
                        required
                        className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              btnType="button"
              containerStyles="mt-6 bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Location"
              handleClick={() => appendLocation({ image: {} as File, location: "" })}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            />
          </Accordion>

          {/* General Information Images Section */}
          <Accordion title="General Information Images (Select multiple image together)">
            <div className="space-y-6">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-12 h-12 mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-lg text-gray-500">Click to upload multiple images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  required
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Accordion>

          {/* General Documents Section */}
          <Accordion title="General Documents">
            {generalDocumentsFields.map((field, index) => (
              <DocumentSection
                key={field.id}
                fieldName="general_documents"
                index={index}
                iconPreview={iconPreviews.general_documents[index]}
                handleFileUpload={handleFileUpload}
                removeIcon={removeIcon}
                handleDetailsChange={handleDetailsChange}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another General Document"
              icon={<FaPlus />}
              handleClick={() => appendGeneralDocument({ title: "", details: [""], icon: {} as File })}
            />
          </Accordion>

          {/* Business Person Documents Section */}
          <Accordion title="Business Person Documents">
            {businessPersonFields.map((field, index) => (
              <DocumentSection
                key={field.id}
                fieldName="business_person"
                index={index}
                iconPreview={iconPreviews.business_person[index]}
                handleFileUpload={handleFileUpload}
                removeIcon={removeIcon}
                handleDetailsChange={handleDetailsChange}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Business Person Document"
              icon={<FaPlus />}
              handleClick={() => appendBusinessDocument({ title: "", details: [""], icon: {} as File })}
            />
          </Accordion>

          {/* Student Documents Section */}
          <Accordion title="Student Documents">
            {studentFields.map((field, index) => (
              <DocumentSection
                key={field.id}
                fieldName="student"
                index={index}
                iconPreview={iconPreviews.student[index]}
                handleFileUpload={handleFileUpload}
                removeIcon={removeIcon}
                handleDetailsChange={handleDetailsChange}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Student Document"
              icon={<FaPlus />}
              handleClick={() => appendStudentDocument({ title: "", details: [""], icon: {} as File })}
            />
          </Accordion>

          {/* Job Holder Documents Section */}
          <Accordion title="Job Holder Documents">
            {jobHolderFields.map((field, index) => (
              <DocumentSection
                key={field.id}
                fieldName="job_holder"
                index={index}
                iconPreview={iconPreviews.job_holder[index]}
                handleFileUpload={handleFileUpload}
                removeIcon={removeIcon}
                handleDetailsChange={handleDetailsChange}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Job Holder Document"
              icon={<FaPlus />}
              handleClick={() => appendJobHolderDocument({ title: "", details: [""], icon: {} as File })}
            />
          </Accordion>

          {/* Other Documents Section */}
          <Accordion title="Other Documents">
            {otherDocumentsFields.map((field, index) => (
              <DocumentSection
                key={field.id}
                fieldName="other_documents"
                index={index}
                iconPreview={iconPreviews.other_documents[index]}
                handleFileUpload={handleFileUpload}
                removeIcon={removeIcon}
                handleDetailsChange={handleDetailsChange}
                control={control}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Document"
              icon={<FaPlus />}
              handleClick={() => appendOtherDocument({ title: "", details: [""], icon: {} as File })}
            />
          </Accordion>
          {/* Submit Button */}
          <div className="flex justify-center mt-12 mb-16">
            <Button
              btnType="submit"
              containerStyles={`
                ${false ? "bg-bodydark" : "bg-teal-600 hover:bg-teal-700"} 
                text-white font-medium py-2 px-6 rounded-lg shadow-1 
                hover:shadow-2 transition-all duration-300 flex items-center 
                justify-center min-w-[200px]
              `}
              textStyles="text-lg"
              title={false ? "Updating..." : "Update Visa Information"}
              disabled={false}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

