// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { FiBriefcase, FiFileText } from "react-icons/fi";
// import {
//   FaClock,
//   FaCreditCard,
//   FaEye,
//   FaGraduationCap,
//   FaMapPin,
//   FaPhone,
//   FaRegEdit,
//   FaUser,
// } from "react-icons/fa";
// import { useVisaDetailsByCountryQuery } from "@/redux/api/visaApiV2";
// import Loader from "../common/Loader";

// interface IDoc {
//   _id: string;
//   title: string;
//   icon: string;
//   details: string[];
// }

// // Document category tabs
// const documentCategories = [
//   { id: "general", label: "General Documents", icon: <FiFileText size={16} /> },
//   { id: "business", label: "Business Person", icon: <FiBriefcase size={16} /> },
//   { id: "student", label: "Student", icon: <FaGraduationCap size={16} /> },
//   { id: "job", label: "Job Holder", icon: <FaUser size={16} /> },
//   { id: "other", label: "Other Documents", icon: <FiFileText size={16} /> },
// ];

// export default function VisaDetailsV2({ params }: any) {
//   const [activeTab, setActiveTab] = useState("general");
//   const [activeImageTab, setActiveImageTab] = useState("country");
//   const [selectedImage, setSelectedImage] = useState<any>(null);

//   const { data } = useVisaDetailsByCountryQuery(
//     { countryName: params },
//     { skip: typeof window === "undefined" },
//   );
//   console.log(data)
//   if (!data) return <Loader />;

//   const { visaCountryId } = data.data;


//   // Function to get documents based on active tab
//   const getDocuments = () => {
//     switch (activeTab) {
//       case "general":
//         return data.data.general_documents;
//       case "business":
//         return data.data.business_person;
//       case "student":
//         return data.data.student;
//       case "job":
//         return data.data.job_holder;
//       case "other":
//         return data.data.other_documents;
//       default:
//         return data.data.general_documents;
//     }
//   };

//   // Format date
//   const formatDate = (dateString: any) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-3 dark:bg-boxdark">
//       {/* Header */}

//       {/* Main Content */}
//       <div className="p-4 sm:p-6 lg:p-8">
//         {/* Country Overview Card */}
//         <div className="mb-6 overflow-hidden rounded-xl border border-stroke bg-white p-0 shadow-default dark:border-strokedark dark:bg-boxdark-2">
//           <div className="relative h-40 ">
//             <div className="absolute inset-0 overflow-hidden opacity-90">
//               <div
//                 className="h-full w-full"
//                 style={{
//                   backgroundImage: `url(${visaCountryId.images[0]})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   filter: "blur(8px)",
//                 }}
//               ></div>
//             </div>
//             <div className="absolute -bottom-0 left-0 h-full w-full bg-gradient-to-t from-white to-transparent dark:from-boxdark-2"></div>
//             <div className="absolute bottom-6 left-8 flex items-center gap-4">
//               <div className="h-24 w-24 overflow-hidden rounded-xl border-4 border-white shadow-1">
//                 <Image
//                   src={visaCountryId.images[0] || "/placeholder.svg"}
//                   alt={visaCountryId.countryName}
//                   width={96}
//                   height={96}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="dark:text-white">
//                 <h2 className="text-title-lg font-bold text-black/80 dark:text-white">
//                   {visaCountryId.title}
//                 </h2>
//                 <p className="dark:text-white/80">{visaCountryId.subtitle}</p>
//               </div>
//             </div>

//             <div className="absolute right-16 top-6 ">
//               <div className="flex items-center justify-center gap-2">
//                 <div className="rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
//                   {visaCountryId.visaType}
//                 </div>
//                 <button className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
//                   Edit <FaRegEdit />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="p-8 pt-16">
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//               <div className="col-span-2">
//                 <h3 className="mb-3 text-title-sm font-semibold">
//                   Description
//                 </h3>
//                 <p className="mb-6 text-body dark:text-bodydark1">
//                   {visaCountryId.description}
//                 </p>

//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//                   <div className="flex items-start gap-3">
//                     <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
//                       <FaMapPin className="text-primary" size={18} />
//                     </div>
//                     <div>
//                       <h4 className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">
//                         Capital
//                       </h4>
//                       <p className="font-medium">{visaCountryId.capital}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
//                       <FaClock className="text-primary" size={18} />
//                     </div>
//                     <div>
//                       <h4 className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">
//                         Time Zone
//                       </h4>
//                       <p className="font-medium">{visaCountryId.time}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
//                       <FaPhone className="text-primary" size={18} />
//                     </div>
//                     <div>
//                       <h4 className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">
//                         Telephone Code
//                       </h4>
//                       <p className="font-medium">
//                         {visaCountryId.telephone_code}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="rounded-xl bg-gray-2 p-6 dark:bg-boxdark">
//                 <h3 className="mb-4 flex items-center gap-2 text-title-sm font-semibold">
//                   <FaCreditCard className="text-primary" size={18} />
//                   Visa Information
//                 </h3>

//                 <div className="space-y-4">
//                   <div>
//                     <p className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">
//                       {visaCountryId.visaPrice_mainText}
//                     </p>
//                     <p className="text-title-md font-bold text-primary">
//                       {visaCountryId.visaPrice_price}
//                       <span className="ml-1 text-xs font-normal text-bodydark2 dark:text-bodydark1">
//                         ({visaCountryId.visaPrice_note})
//                       </span>
//                     </p>
//                   </div>

//                   <div>
//                     <p className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">
//                       Embassy Address
//                     </p>
//                     <p className="font-medium">
//                       {visaCountryId.embassy_address}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">
//                       Bank Time
//                     </p>
//                     <p className="font-medium">{visaCountryId.bank_time}</p>
//                   </div>

//                   <div className="border-t border-stroke pt-3 dark:border-strokedark">
//                     <p className="mb-2 text-sm text-bodydark2 dark:text-bodydark1">
//                       Custom ID
//                     </p>
//                     <p className="font-mono rounded bg-white p-2 text-xs dark:bg-boxdark-2">
//                       {visaCountryId.customId}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* Left Column - Documents & Notes */}
//           <div className="space-y-6 lg:col-span-2">
//             {/* Important Notes Card */}
//             <div className="rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark-2">
//               <h2 className="mb-5 border-b border-stroke pb-2 text-title-sm font-semibold dark:border-strokedark">
//                 Important Notes
//               </h2>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 {visaCountryId.note.map((note: any, index: string) => (
//                   <div
//                     key={note._id}
//                     className="rounded-lg border-l-4 border-primary bg-gray-2 p-4 transition-shadow hover:shadow-1 dark:bg-boxdark"
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary dark:bg-primary/20">
//                         {index + 1}
//                       </div>
//                       <p className="text-body dark:text-bodydark1">
//                         {note.text}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Required Documents Card */}
//             <div className="rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark-2">
//               <h2 className="mb-5 border-b border-stroke pb-2 text-title-sm font-semibold dark:border-strokedark">
//                 Required Documents
//               </h2>

//               {/* Document Tabs */}
//               <div className="mb-6 flex flex-wrap gap-1 rounded-lg bg-gray-2 p-1 dark:bg-boxdark">
//                 {documentCategories.map((category) => (
//                   <button
//                     key={category.id}
//                     className={`flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm transition-all ${
//                       activeTab === category.id
//                         ? "bg-white font-medium text-primary shadow-1 dark:bg-boxdark-2 dark:text-white"
//                         : "text-black/70 hover:bg-white/80 hover:text-black hover:shadow-1 dark:text-white dark:hover:bg-white/20"
//                     } `}
//                     onClick={() => setActiveTab(category.id)}
//                   >
//                     {category.icon}
//                     {category.label}
//                   </button>
//                 ))}
//               </div>

//               {/* Document List */}
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 {getDocuments().map((doc: IDoc) => (
//                   <div
//                     key={doc._id}
//                     className="flex gap-4 rounded-xl border border-stroke bg-gray-2 p-5 transition-shadow hover:border-primary/30 hover:shadow-2 dark:border-strokedark dark:bg-boxdark"
//                   >
//                     <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-1 dark:bg-boxdark-2">
//                       <Image
//                         src={doc.icon || "/placeholder.svg"}
//                         alt={doc.title}
//                         width={28}
//                         height={28}
//                         className="object-contain"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="mb-2 font-semibold">{doc.title}</h4>
//                       <ul className="ml-5 list-disc space-y-1">
//                         {" "}
//                         {/* Add list-disc and ml-5 */}
//                         {doc.details.map((detail, idx) => (
//                           <li
//                             key={idx}
//                             className="text-sm text-body dark:text-bodydark1"
//                           >
//                             {detail.split("\r\n").map((line, lineIdx) => (
//                               <React.Fragment key={lineIdx}>
//                                 {line}
//                                 {lineIdx < detail.split("\r\n").length - 1 && (
//                                   <br />
//                                 )}
//                               </React.Fragment>
//                             ))}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Images */}
//           <div className="space-y-6">
//             {/* Images Card */}
//             <div className="rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark-2">
//               <h2 className="mb-5 border-b border-stroke pb-2 text-title-sm font-semibold dark:border-strokedark">
//                 Images
//               </h2>

//               {/* Image Tabs */}
//               <div className="mb-6 flex gap-2 rounded-lg bg-gray-2 p-1 dark:bg-boxdark">
//                 <button
//                   className={`flex-1 rounded-md py-2.5 text-sm transition-all ${
//                     activeImageTab === "country"
//                       ? "bg-white font-medium text-primary shadow-1 dark:bg-boxdark-2 dark:text-white"
//                       : "text-bodydark hover:bg-white/20 hover:text-black dark:text-bodydark1 dark:text-white"
//                   }`}
//                   onClick={() => setActiveImageTab("country")}
//                 >
//                   Country Images
//                 </button>
//                 <button
//                   className={`flex-1 rounded-md py-2.5 text-sm transition-all ${
//                     activeImageTab === "location"
//                       ? "bg-white font-medium text-primary shadow-1 dark:bg-boxdark-2 dark:text-white"
//                       : "text-bodydark hover:bg-white/20 hover:text-black dark:text-bodydark1 dark:text-white"
//                   }`}
//                   onClick={() => setActiveImageTab("location")}
//                 >
//                   Location Images
//                 </button>
//               </div>

//               {/* Country Images */}
//               {activeImageTab === "country" && (
//                 <>
//                   {/* Selected Image Preview */}
//                   {selectedImage !== null && (
//                     <div className="mb-4">
//                       <div className="relative mb-2 aspect-video overflow-hidden rounded-xl border border-stroke dark:border-strokedark">
//                         <Image
//                           src={
//                             visaCountryId.images[selectedImage] ||
//                             "/placeholder.svg"
//                           }
//                           alt={`Thailand - ${selectedImage + 1}`}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <p className="text-sm text-bodydark2 dark:text-bodydark1">
//                           Selected Image {selectedImage + 1}
//                         </p>
//                         <button
//                           className="text-xs text-primary"
//                           onClick={() => setSelectedImage(null)}
//                         >
//                           Close Preview
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {/* Image Grid */}
//                   <div className="grid grid-cols-2 gap-3">
//                     {visaCountryId.images.map(
//                       (image: string, index: number) => (
//                         <div
//                           key={index}
//                           className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
//                             selectedImage === index
//                               ? "border-primary shadow-2"
//                               : "border-stroke hover:border-primary/50 dark:border-strokedark"
//                           }`}
//                           onClick={() => setSelectedImage(index)}
//                         >
//                           <div className="relative aspect-video">
//                             <Image
//                               src={image || "/placeholder.svg"}
//                               alt={`Thailand - ${index + 1}`}
//                               fill
//                               className="object-cover"
//                             />
//                             <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
//                               <FaEye size={20} className="text-white" />
//                             </div>
//                           </div>
//                         </div>
//                       ),
//                     )}
//                   </div>
//                 </>
//               )}

//               {/* Location Images */}
//               {activeImageTab === "location" && (
//                 <div className="grid grid-cols-2 gap-3">
//                   {visaCountryId.locationImages.map((location: any) => (
//                     <div
//                       key={location._id}
//                       className="group overflow-hidden rounded-xl border border-stroke transition-all hover:border-primary/30 hover:shadow-2 dark:border-strokedark"
//                     >
//                       <div className="relative aspect-square">
//                         <Image
//                           src={location.image || "/placeholder.svg"}
//                           alt={location.location}
//                           fill
//                           className="object-cover transition-transform duration-300 group-hover:scale-105"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//                         <div className="absolute bottom-0 left-0 p-3">
//                           <h4 className="text-sm font-medium text-white">
//                             {location.location}
//                           </h4>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Metadata Card */}
//             <div className="rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark-2">
//               <h2 className="mb-5 border-b border-stroke pb-2 text-title-sm font-semibold dark:border-strokedark">
//                 Metadata
//               </h2>

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between rounded-lg bg-gray-2 p-3 dark:bg-boxdark">
//                   <div>
//                     <p className="text-sm text-bodydark2 dark:text-bodydark1">
//                       Created
//                     </p>
//                     <p className="font-medium">
//                       {formatDate(visaCountryId.createdAt)}
//                     </p>
//                   </div>
//                   <span className="rounded bg-white px-2 py-1 text-xs text-bodydark2 dark:bg-boxdark-2 dark:text-bodydark1">
//                     {new Date(visaCountryId.createdAt).toLocaleTimeString()}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between rounded-lg bg-gray-2 p-3 dark:bg-boxdark">
//                   <div>
//                     <p className="text-sm text-bodydark2 dark:text-bodydark1">
//                       Last Updated
//                     </p>
//                     <p className="font-medium">
//                       {formatDate(visaCountryId.updatedAt)}
//                     </p>
//                   </div>
//                   <span className="rounded bg-white px-2 py-1 text-xs text-bodydark2 dark:bg-boxdark-2 dark:text-bodydark1">
//                     {new Date(visaCountryId.updatedAt).toLocaleTimeString()}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between rounded-lg bg-gray-2 p-3 dark:bg-boxdark">
//                   <div>
//                     <p className="text-sm text-bodydark2 dark:text-bodydark1">
//                       Status
//                     </p>
//                     <p className="font-medium">Active</p>
//                   </div>
//                   <span className="flex items-center gap-1.5">
//                     <span className="h-2.5 w-2.5 rounded-full bg-success"></span>
//                     <span className="text-xs text-success">Published</span>
//                   </span>
//                 </div>

//                 <div className="rounded-lg bg-gray-2 p-3  dark:bg-boxdark">
//                   <p className="mb-1.5 text-sm text-bodydark2 dark:text-bodydark1">
//                     ID
//                   </p>
//                   <p className="font-mono rounded border border-stroke bg-white p-2 text-xs dark:border-strokedark dark:bg-boxdark-2">
//                     {visaCountryId._id}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { FiBriefcase, FiFileText } from "react-icons/fi"
import { FaClock, FaCreditCard, FaEye, FaGraduationCap, FaMapPin, FaPhone, FaRegEdit, FaUser } from "react-icons/fa"
import { useVisaDetailsByCountryQuery } from "@/redux/api/visaApiV2"
import Loader from "../common/Loader"
// import "./scrollbar-hide.css"

interface IDoc {
  _id: string
  title: string
  icon: string
  details: string[]
}

// Document category tabs
const documentCategories = [
  { id: "general", label: "General Documents", icon: <FiFileText size={16} /> },
  { id: "business", label: "Business Person", icon: <FiBriefcase size={16} /> },
  { id: "student", label: "Student", icon: <FaGraduationCap size={16} /> },
  { id: "job", label: "Job Holder", icon: <FaUser size={16} /> },
  { id: "other", label: "Other Documents", icon: <FiFileText size={16} /> },
]

export default function VisaDetailsV2({ params }: any) {
  const [activeTab, setActiveTab] = useState("general")
  const [activeImageTab, setActiveImageTab] = useState("country")
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const { data, isLoading } = useVisaDetailsByCountryQuery({ countryName: params }, { skip: typeof window === "undefined" })

  if (isLoading) {
    return <Loader />
  }
  
  const { visaCountryId } = data.data


  // Function to get documents based on active tab
  const getDocuments = () => {
    switch (activeTab) {
      case "general":
        return data.data.general_documents
      case "business":
        return data.data.business_person
      case "student":
        return data.data.student
      case "job":
        return data.data.job_holder
      case "other":
        return data.data.other_documents
      default:
        return data.data.general_documents
    }
  }

  // Format date
  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen h-full bg-gray-3 dark:bg-boxdark">
      {/* Header */}

      {/* Main Content */}
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Country Overview Card */}
        <div className="mb-6 overflow-hidden rounded-xl border border-stroke bg-white p-0 shadow-default dark:border-strokedark dark:bg-boxdark-2">
          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64">
            <div className="absolute inset-0 overflow-hidden opacity-90">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url(${visaCountryId.images[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(8px)",
                }}
              ></div>
            </div>
            <div className="absolute -bottom-0 left-0 h-full w-full bg-gradient-to-t from-white to-transparent dark:from-boxdark-2"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 overflow-hidden rounded-xl border-4 border-white shadow-1">
                <Image
                  src={visaCountryId.images[0] || "/placeholder.svg"}
                  alt={visaCountryId.countryName}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="dark:text-white">
                <h2 className="text-title-lg font-bold text-black/80 dark:text-white">{visaCountryId.title}</h2>
                <p className="dark:text-white/80">{visaCountryId.subtitle}</p>
              </div>
            </div>

            <div className="absolute right-4 sm:right-8 md:right-16 top-4 sm:top-6">
              <div className="flex items-center justify-center gap-2">
                <div className="rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  {visaCountryId.visaType}
                </div>
                <button className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  Edit <FaRegEdit />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 pt-12 sm:pt-16">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
              <div className="col-span-2">
                <h3 className="mb-3 text-title-sm font-semibold">Description</h3>
                <p className="mb-6 text-body dark:text-bodydark1">{visaCountryId.description}</p>

                <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                      <FaMapPin className="text-primary" size={18} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">Capital</h4>
                      <p className="font-medium">{visaCountryId.capital}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                      <FaClock className="text-primary" size={18} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">Time Zone</h4>
                      <p className="font-medium">{visaCountryId.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                      <FaPhone className="text-primary" size={18} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">Telephone Code</h4>
                      <p className="font-medium">{visaCountryId.telephone_code}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gray-2 p-4 sm:p-5 md:p-6 dark:bg-boxdark">
                <h3 className="mb-4 flex items-center gap-2 text-title-sm font-semibold">
                  <FaCreditCard className="text-primary" size={18} />
                  Visa Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">
                      {visaCountryId.visaPrice_mainText}
                    </p>
                    <p className="text-title-md font-bold text-primary">
                      {visaCountryId.visaPrice_price}
                      <span className="ml-1 text-xs font-normal text-bodydark2 dark:text-bodydark1">
                        ({visaCountryId.visaPrice_note})
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">Embassy Address</p>
                    <p className="font-medium">{visaCountryId.embassy_address}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-bodydark2 dark:text-bodydark1">Bank Time</p>
                    <p className="font-medium">{visaCountryId.bank_time}</p>
                  </div>

                  <div className="border-t border-stroke pt-3 dark:border-strokedark">
                    <p className="mb-2 text-sm text-bodydark2 dark:text-bodydark1">Custom ID</p>
                    <p className="font-mono rounded bg-white p-2 text-xs dark:bg-boxdark-2">{visaCountryId.customId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Left Column - Documents & Notes */}
          <div className="space-y-6 lg:col-span-2">
            {/* Important Notes Card */}
            <div className="rounded-xl border border-stroke bg-white p-4 sm:p-5 md:p-6 shadow-default dark:border-strokedark dark:bg-boxdark-2">
              <h2 className="mb-3 sm:mb-4 md:mb-5 border-b border-stroke pb-2 text-base sm:text-title-sm font-semibold dark:border-strokedark">
                Important Notes
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                {visaCountryId.note.map((note: any, index: string) => (
                  <div
                    key={note._id}
                    className="rounded-lg border-l-4 border-primary bg-gray-2 p-4 transition-shadow hover:shadow-1 dark:bg-boxdark"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary dark:bg-primary/20">
                        {index + 1}
                      </div>
                      <p className="text-body dark:text-bodydark1">{note.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents Card */}
            <div className="rounded-xl border border-stroke bg-white p-4 sm:p-5 md:p-6 shadow-default dark:border-strokedark dark:bg-boxdark-2">
              <h2 className="mb-3 sm:mb-4 md:mb-5 border-b border-stroke pb-2 text-base sm:text-title-sm font-semibold dark:border-strokedark">
                Required Documents
              </h2>

              {/* Document Tabs */}
              <div className="mb-6 flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-1 rounded-lg bg-gray-2 p-1 dark:bg-boxdark">
                {documentCategories.map((category) => (
                  <button
                    key={category.id}
                    data-tab={category.id}
                    className={`flex items-center gap-1 sm:gap-1.5 rounded-md px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all ${
                      activeTab === category.id
                        ? "bg-white font-medium text-primary shadow-1 dark:bg-boxdark-2 dark:text-white"
                        : "text-black/70 hover:bg-white/80 hover:text-black hover:shadow-1 dark:text-white dark:hover:bg-white/20"
                    } `}
                    onClick={() => setActiveTab(category.id)}
                  >
                    {category.icon}
                    <span className="hidden xs:inline">{category.label}</span>
                    {/* Show only icon on very small screens */}
                    <span className="xs:hidden">{category.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Document List */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                {getDocuments().map((doc: IDoc) => (
                  <div
                    key={doc._id}
                    className="flex flex-col xs:flex-row gap-3 sm:gap-4 rounded-xl border border-stroke bg-gray-2 p-3 sm:p-4 md:p-5 transition-shadow hover:border-primary/30 hover:shadow-2 dark:border-strokedark dark:bg-boxdark"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 mx-auto xs:mx-0 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-1 dark:bg-boxdark-2">
                      <Image
                        src={doc.icon || "/placeholder.svg"}
                        alt={doc.title}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 font-semibold">{doc.title}</h4>
                      <ul className="ml-5 list-disc space-y-1">
                        {" "}
                        {/* Add list-disc and ml-5 */}
                        {doc.details.map((detail, idx) => {
                          console.log("detail", detail)
                          return (
                            <li key={idx} className="text-sm text-body dark:text-bodydark1">
                            {detail !== null && detail.split("\r\n").map((line, lineIdx) => (
                              <React.Fragment key={lineIdx}>
                                {line}
                                {lineIdx < detail.split("\r\n").length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            {/* Images Card */}
            <div className="rounded-xl border border-stroke bg-white p-4 sm:p-5 md:p-6 shadow-default dark:border-strokedark dark:bg-boxdark-2">
              <h2 className="mb-3 sm:mb-4 md:mb-5 border-b border-stroke pb-2 text-base sm:text-title-sm font-semibold dark:border-strokedark">
                Images
              </h2>

              {/* Image Tabs */}
              <div className="mb-6 flex gap-1 sm:gap-2 rounded-lg bg-gray-2 p-1 dark:bg-boxdark">
                <button
                  className={`flex-1 rounded-md py-2 sm:py-2.5 text-xs sm:text-sm transition-all ${
                    activeImageTab === "country"
                      ? "bg-white font-medium text-primary shadow-1 dark:bg-boxdark-2 dark:text-white"
                      : "text-bodydark hover:bg-white/20 hover:text-black dark:text-bodydark1 dark:text-white"
                  }`}
                  onClick={() => setActiveImageTab("country")}
                >
                  Country
                </button>
                <button
                  className={`flex-1 rounded-md py-2 sm:py-2.5 text-xs sm:text-sm transition-all ${
                    activeImageTab === "location"
                      ? "bg-white font-medium text-primary shadow-1 dark:bg-boxdark-2 dark:text-white"
                      : "text-bodydark hover:bg-white/20 hover:text-black dark:text-bodydark1 dark:text-white"
                  }`}
                  onClick={() => setActiveImageTab("location")}
                >
                  Location
                </button>
              </div>

              {/* Country Images */}
              {activeImageTab === "country" && (
                <>
                  {/* Selected Image Preview */}
                  {selectedImage !== null && (
                    <div className="mb-4">
                      <div className="relative mb-2 aspect-video overflow-hidden rounded-xl border border-stroke dark:border-strokedark">
                        <Image
                          src={visaCountryId.images[selectedImage] || "/placeholder.svg"}
                          alt={`Thailand - ${selectedImage + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1">
                        <p className="text-xs sm:text-sm text-bodydark2 dark:text-bodydark1">
                          Selected Image {selectedImage + 1}
                        </p>
                        <button className="text-xs text-primary" onClick={() => setSelectedImage(null)}>
                          Close Preview
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Image Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {visaCountryId.images.map((image: string, index: number) => (
                      <div
                        key={index}
                        className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                          selectedImage === index
                            ? "border-primary shadow-2"
                            : "border-stroke hover:border-primary/50 dark:border-strokedark"
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thailand - ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <FaEye size={20} className="text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Location Images */}
              {activeImageTab === "location" && (
                <div className="grid grid-cols-2 gap-3">
                  {visaCountryId.locationImages.map((location: any) => (
                    <div
                      key={location._id}
                      className="group overflow-hidden rounded-xl border border-stroke transition-all hover:border-primary/30 hover:shadow-2 dark:border-strokedark"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={location.image || "/placeholder.svg"}
                          alt={location.location}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-3">
                          <h4 className="text-sm font-medium text-white">{location.location}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Metadata Card */}
            <div className="rounded-xl border border-stroke bg-white p-4 sm:p-5 md:p-6 shadow-default dark:border-strokedark dark:bg-boxdark-2">
              <h2 className="mb-3 sm:mb-4 md:mb-5 border-b border-stroke pb-2 text-base sm:text-title-sm font-semibold dark:border-strokedark">
                Metadata
              </h2>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg bg-gray-2 p-2 sm:p-3 dark:bg-boxdark">
                  <div>
                    <p className="text-sm text-bodydark2 dark:text-bodydark1">Created</p>
                    <p className="font-medium">{formatDate(visaCountryId.createdAt)}</p>
                  </div>
                  <span className="rounded bg-white px-2 py-1 text-xs text-bodydark2 dark:bg-boxdark-2 dark:text-bodydark1">
                    {new Date(visaCountryId.createdAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg bg-gray-2 p-2 sm:p-3 dark:bg-boxdark">
                  <div>
                    <p className="text-sm text-bodydark2 dark:text-bodydark1">Last Updated</p>
                    <p className="font-medium">{formatDate(visaCountryId.updatedAt)}</p>
                  </div>
                  <span className="rounded bg-white px-2 py-1 text-xs text-bodydark2 dark:bg-boxdark-2 dark:text-bodydark1">
                    {new Date(visaCountryId.updatedAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg bg-gray-2 p-2 sm:p-3 dark:bg-boxdark">
                  <div>
                    <p className="text-sm text-bodydark2 dark:text-bodydark1">Status</p>
                    <p className="font-medium">Active</p>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-success"></span>
                    <span className="text-xs text-success">Published</span>
                  </span>
                </div>

                <div className="rounded-lg bg-gray-2 p-3  dark:bg-boxdark">
                  <p className="mb-1.5 text-sm text-bodydark2 dark:text-bodydark1">ID</p>
                  <p className="font-mono rounded border border-stroke bg-white p-2 text-xs dark:border-strokedark dark:bg-boxdark-2">
                    {visaCountryId._id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

