// import { useForm, FormProvider, useFieldArray } from "react-hook-form";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FileInput, TextInput } from "../FormInputs";
// import Button from "../CustomButton";
// import Image from "next/image";

// interface EditVisaProps {
//   visaInfo: any;
//   visaRequirements: any;
// }

// const EditVisa: React.FC<EditVisaProps> = ({ visaInfo, visaRequirements }) => {
//   const methods = useForm({
//     defaultValues: {
//       countryName: "",
//       title: "",
//       subtitle: "",
//       description: "",
//       locationImages: [{ image: {} as File, location: "" }],
//       images: [],
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

//   const { handleSubmit, reset, control, setValue } = methods;

//   const {
//     fields: locationImageFields,
//     append: appendLocation,
//   } = useFieldArray({
//     control,
//     name: "locationImages",
//   });

//   const { fields: imageFields, append: appendImage } = useFieldArray({
//     control, 
//     name: "images",
//   });

//   const { fields: noteFields, append: appendNote } = useFieldArray({
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

//   const [locationImagePreviews, setLocationImagePreviews] = useState<string[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [iconPreviews, setIconPreviews] = useState({
//     general_documents: [] as string[],
//     business_person: [] as string[],
//     student: [] as string[],
//     job_holder: [] as string[],
//     other_documents: [] as string[],
//   });


//   useEffect(() => {
//     if (visaInfo && visaRequirements) {
//       reset({
//         countryName: visaInfo.countryName,
//         title: visaInfo.title,
//         subtitle: visaInfo.subtitle,
//         description: visaInfo.description,
//         locationImages: visaInfo.locationImages || [{ image: {} as File, location: "" }],
//         images: visaInfo.images || [],
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
  

//   const onSubmit = async (formData: any) => {
//     const formDataToSend = new FormData();
  
//     formDataToSend.append("countryName", formData.countryName);
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("subtitle", formData.subtitle);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("visaPrice_mainText", formData.visaPrice_mainText);
//     formDataToSend.append("visaPrice_price", formData.visaPrice_price);
//     formDataToSend.append("visaPrice_note", formData.visaPrice_note);
  
//     if (formData.notes && Array.isArray(formData.notes)) {
//       formData.notes.forEach((note: any, index: number) => {
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
//           if (doc.icon instanceof File) {
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
  
//     try {
//       const response = await axios.put(`http://localhost:4000/api/v1/visa/${visaInfo.countryName}`, formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Visa updated successfully:", response.data);
//     } catch (error) {
//       console.error("Error updating visa:", error);
//     }
//   };
  

  
//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-boxdark shadow-md rounded-md p-8 space-y-8">
//         {/* <TextInput name="countryName" label="Country Name" />
//         <TextInput name="title" label="Title" />
//         <TextInput name="subtitle" label="Subtitle" />
//         <TextInput name="description" label="Description" type="textarea" /> */}
//         <div className="grid grid-cols-2 gap-8">
//             <TextInput name="countryName" label="Country Name" />
//             <TextInput name="title" label="Title" />
//             <TextInput name="subtitle" label="subtitle" />
//             <TextInput name="description" label="Description" type="textarea" />
//           </div>
//           <div className="grid grid-cols-2 gap-4">

//         {locationImageFields.map((field, index) => (
//           <div key={field.id}>
//             <FileInput name={`locationImages[${index}].image`} label="Location Image" />
        
//             <TextInput name={`locationImages[${index}].location`} label="Location" />
//             {locationImagePreviews[index] &&
//               <Image
//               key={index}
//               src={locationImagePreviews[index]}
//               alt="Preview"
//               width={300}
//               height={200}
//               className="rounded-lg shadow-lg"
//             />
//              }
//            <Button
//             btnType="button"
//             containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
//             title="Add Location Image"
//             handleClick={() => appendLocation({ image: {} as File, location: "" })}
//            />
//           </div>
//         ))}

//           </div>

//         <TextInput name="visaPrice_mainText" label="Visa Price Main Text" />
//         <TextInput name="visaPrice_price" label="Visa Price" />
//         <TextInput name="visaPrice_note" label="Visa Price Note" type="textarea"  />

      //  {noteFields.map((field, index) => (
      //     <div key={field.id} className="space-y-2">
      //       <TextInput type="textarea" name={`note[${index}].text`} label={`Note ${index + 1}`} />
      //     </div>
          
      //   ))}

      //   <Button
      //    btnType="button"
      //    containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
      //    title="Add Another Note"
      //    handleClick={() => appendNote({ text: "" })}
      //   />


//          {imageFields.map((field, index) => (
//           <div key={field.id}>
//             <FileInput name={`images[${index}]`} label="Image" />
//             {imagePreviews[index] &&
//               <Image
//               key={index}
//               src={imagePreviews[index]}
//               alt="Preview"
//               width={300}
//               height={200}
//               className="rounded-lg shadow-lg"
//             />
//              }
//           </div>
//         ))}

        // {generalDocumentsFields.map((field, index) => (
        //   <div key={field.id}>

        //     <TextInput
        //      name={`general_documents[${index}].title`}
        //      label="General Document Title"
        //      />

        //     {field.details.map((detail: string, detailIndex: number) => (
        //       <TextInput
        //         key={detailIndex}
        //         name={`general_documents[${index}].details[${detailIndex}]`}
        //         label={`Detail ${detailIndex + 1}`}
        //       />
        //     ))}

        //     <FileInput name={`general_documents[${index}].icon`} label="Icon" />
        //     {iconPreviews.general_documents[index] && 
        //      <Image
        //      src={iconPreviews.general_documents[index]}
        //      alt="Preview"
        //      width={40}
        //      height={40}
        //      className="mr-3"
        //    />
        //     }
        //   </div>
        // ))}

        // <Button
        //  btnType="button"
        //  containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
        //  title="Add Another Genaral Document"
        //  handleClick={() => appendGeneralDocument({ title: "", details: [""], icon: {} as File })}
        // />

        // {businessPersonFields.map((field, index) => (
        //   <div key={field.id}>

        //     <TextInput
        //      name={`business_person[${index}].title`}
        //      label="business Document Title"
        //      />

        //     {field.details.map((detail: string, detailIndex: number) => (
        //       <TextInput
        //         key={detailIndex}
        //         name={`business_person[${index}].details[${detailIndex}]`}
        //         label={`Detail ${detailIndex + 1}`}
        //       />
        //     ))}

        //     <FileInput name={`business_person[${index}].icon`} label="Icon" />
        //     {iconPreviews.business_person[index] &&
        //       <Image
        //       src={iconPreviews.business_person[index]}
        //       alt="Preview"
        //       width={40}
        //       height={40}
        //       className="mr-3"
        //     />}
        //   </div>
        // ))}

        // <Button
        //  btnType="button"
        //  containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
        //  title="Add Another Business Document"
        //  handleClick={() => appendBusinessDocument({ title: "", details: [""], icon: {} as File })}
        // />

        // {studentFields.map((field, index) => (
        //   <div key={field.id}>

        //     <TextInput
        //      name={`student[${index}].title`}
        //      label="Student Document Title"
        //      />

        //     {field.details.map((detail: string, detailIndex: number) => (
        //       <TextInput
        //         key={detailIndex}
        //         name={`student[${index}].details[${detailIndex}]`}
        //         label={`Detail ${detailIndex + 1}`}
        //       />
        //     ))}

        //     <FileInput name={`student[${index}].icon`} label="Icon" />
        //     {iconPreviews.student[index] &&
        //      <Image
        //      src={iconPreviews.student[index]}
        //      alt="Preview"
        //      width={40}
        //      height={40}
        //      className="mr-3"
        //    />
        //      }
        //   </div>
        // ))}

        // <Button
        //  btnType="button"
        //  containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
        //  title="Add Another Student Document"
        //  handleClick={() => appendStudentDocument({ title: "", details: [""], icon: {} as File })}
        // />

        // {jobHolderFields.map((field, index) => (
        //   <div key={field.id}>

        //     <TextInput
        //      name={`job_holder[${index}].title`}
        //      label="General Document Title"
        //      />

        //     {field.details.map((detail: string, detailIndex: number) => (
        //       <TextInput
        //         key={detailIndex}
        //         name={`job_holder[${index}].details[${detailIndex}]`}
        //         label={`Detail ${detailIndex + 1}`}
        //       />
        //     ))}

        //     <FileInput name={`job_holder[${index}].icon`} label="Icon" />
        //     {iconPreviews.job_holder[index] && 
        //      <Image
        //      src={iconPreviews.job_holder[index]}
        //      alt="Preview"
        //      width={40}
        //      height={40}
        //      className="mr-3"
        //    /> }
        //   </div>
        // ))}

        // <Button
        //  btnType="button"
        //  containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
        //  title="Add Another Job Holder Document"
        //  handleClick={() => appendJobHolderDocument({ title: "", details: [""], icon: {} as File })}
        // />


        // {otherDocumentsFields.map((field, index) => (
        //   <div key={field.id}>

        //     <TextInput
        //      name={`other_documents[${index}].title`}
        //      label="Other Document Title"
        //      />

        //     {field.details.map((detail: string, detailIndex: number) => (
        //       <TextInput
        //         key={detailIndex}
        //         name={`other_documents[${index}].details[${detailIndex}]`}
        //         label={`Detail ${detailIndex + 1}`}
        //       />
        //     ))}

        //     <FileInput name={`other_documents[${index}].icon`} label="Icon" />
        //     {iconPreviews.other_documents[index] &&   
        //     <Image
        //     src={iconPreviews.other_documents[index]}
        //     alt="Preview"
        //     width={40}
        //     height={40}
        //     className="mr-3"
        //   />}
        //   </div>
        // ))}

        // <Button
        //  btnType="button"
        //  containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
        //  title="Add Another Other Document"
        //  handleClick={() => appendOtherDocument({ title: "", details: [""], icon: {} as File })}
        // />


//         <div className="flex justify-center mt-8">
//          <Button
//            btnType="submit"
//            containerStyles="custom-btn-fill" 
//            textStyles="text-white" 
//            title="Update"
//          />
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default EditVisa;






import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { FileInput, TextInput } from "../FormInputs";
import Button from "../CustomButton";
import Image from "next/image";
import { Console } from "console";

interface EditVisaProps {
  visaInfo: any;
  visaRequirements: any;
}

const EditVisa: React.FC<EditVisaProps> = ({ visaInfo, visaRequirements }) => {
  const methods = useForm({
    defaultValues: {
      countryName: "",
      title: "",
      subtitle: "",
      description: "",
      locationImages: [{ image: {} as File, location: "" }],
      images: [],
      capital: '',
      time: '',
      telephone_code: '',
      bank_time: '',
      embassy_address: '',
      general_documents: [{ title: "", details: [""], icon: {} as File }],
      business_person: [{ title: "", details: [""], icon: {} as File }],
      student: [{ title: "", details: [""], icon: {} as File }],
      job_holder: [{ title: "", details: [""], icon: {} as File }],
      other_documents: [{ title: "", details: [""], icon: {} as File }],
      note: [{ text: "" }],
      visaPrice_mainText: "",
      visaPrice_price: "",
      visaPrice_note: "",
    },
  });

  const { handleSubmit, reset, control, setValue } = methods;


const [iconPreviews, setIconPreviews] = useState<{
  general_documents: { [key: number]: string };
  business_person: { [key: number]: string };
  student: { [key: number]: string };
  job_holder: { [key: number]: string };
  other_documents: { [key: number]: string };
}>({
  general_documents: {},
  business_person: {},
  student: {},
  job_holder: {},
  other_documents: {},
});


  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files, "files")
    if (files) {
      const fileArray:any = Array.from(files);
      const newImagePreviews = fileArray.map((file:any) => URL.createObjectURL(file));
      setImagePreviews(newImagePreviews);
      setValue('images', fileArray);
    }
  };

  const { fields: locationImageFields, append: appendLocation, remove: removeLocation } = useFieldArray({
    control,
    name: "locationImages",
  });

  const [locationImagePreviews, setLocationImagePreviews] = useState<string[]>([]);


  const handleLocationImageChange = (index:any, event:any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews:any = [...locationImagePreviews];
        newPreviews[index] = reader.result; 
        setLocationImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
      
    }
  };
  
  

  const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray({
    control,
    name: "note",
  });

  const { fields: generalDocumentsFields, append: appendGeneralDocument } = useFieldArray({
    control,
    name: "general_documents",
  });

  const { fields: businessPersonFields, append: appendBusinessDocument } = useFieldArray({
    control,
    name: "business_person",
  });

  const { fields: studentFields, append: appendStudentDocument } = useFieldArray({
    control,
    name: "student",
  });

  const { fields: jobHolderFields, append: appendJobHolderDocument } = useFieldArray({
    control,
    name: "job_holder",
  });

  const { fields: otherDocumentsFields, append: appendOtherDocument } = useFieldArray({
    control,
    name: "other_documents",
  });

  const handleIconChange = (
    fieldName: "general_documents" | "business_person" | "student" | "job_holder" | "other_documents",
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newIconPreviews = { ...iconPreviews };
      if (newIconPreviews[fieldName][index]) {
        URL.revokeObjectURL(newIconPreviews[fieldName][index]);
      }
  
      newIconPreviews[fieldName] = {
        ...newIconPreviews[fieldName],
        [index]: URL.createObjectURL(file),
      };
      setIconPreviews(newIconPreviews);
      methods.setValue(`${fieldName}.${index}.icon`, file);
    }
  };

  useEffect(() => {
    if (visaInfo && visaRequirements) {
      reset({
        countryName: visaInfo.countryName,
        title: visaInfo.title,
        subtitle: visaInfo.subtitle,
        description: visaInfo.description,
        locationImages: visaInfo.locationImages || [{ image: {} as File, location: "" }],
        images: visaInfo.images || [],
        capital: visaInfo.capital,
        time: visaInfo.time,
        telephone_code: visaInfo.telephone_code,
        bank_time: visaInfo.bank_time,
        embassy_address: visaInfo.embassy_address,
        general_documents: visaRequirements.general_documents || [{ title: "", details: [""], icon: {} as File }],
        business_person: visaRequirements.business_person || [{ title: "", details: [""], icon: {} as File }],
        student: visaRequirements.student || [{ title: "", details: [""], icon: {} as File }],
        job_holder: visaRequirements.job_holder || [{ title: "", details: [""], icon: {} as File }],
        other_documents: visaRequirements.other_documents || [{ title: "", details: [""], icon: {} as File }],
        note: visaInfo.note || [{ text: "" }],
        visaPrice_mainText: visaInfo.visaPrice_mainText,
        visaPrice_price: visaInfo.visaPrice_price,
        visaPrice_note: visaInfo.visaPrice_note,
      });
  
      setLocationImagePreviews(visaInfo.locationImages?.map((img: any) => img.image) || []);
      setImagePreviews(visaInfo.images?.map((img: any) => img) || []);
      setIconPreviews({
        general_documents: visaRequirements.general_documents?.map((doc: any) => doc.icon) || [],
        business_person: visaRequirements.business_person?.map((doc: any) => doc.icon) || [],
        student: visaRequirements.student?.map((doc: any) => doc.icon) || [],
        job_holder: visaRequirements.job_holder?.map((doc: any) => doc.icon) || [],
        other_documents: visaRequirements.other_documents?.map((doc: any) => doc.icon) || [],
      });
    }
  }, [visaInfo, visaRequirements, reset]);
  

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      locationImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews, locationImagePreviews]);

  console.log(locationImagePreviews, "locationImagePreviews");
  



  const onSubmit = async (formData: any) => {

    const formDataToSend = new FormData();
  
    formDataToSend.append("countryName", formData.countryName);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("visaPrice_mainText", formData.visaPrice_mainText);
    formDataToSend.append("visaPrice_price", formData.visaPrice_price);
    formDataToSend.append("visaPrice_note", formData.visaPrice_note);
  
    if (formData.notes && Array.isArray(formData.notes)) {
      formData.notes.forEach((note: any, index: number) => {
        formDataToSend.append(`note[${index}].text`, note.text);
      });
    }
  
    if (formData.locationImages && Array.isArray(formData.locationImages)) {
      formData.locationImages.forEach((imageData: any, index: number) => {
        if (imageData.image instanceof File) {
          formDataToSend.append(`locationImages[${index}].image`, imageData.image);
        }
        formDataToSend.append(`locationImages[${index}].location`, imageData.location);
      });
    }
  
    const categories = ["general_documents", "business_person", "student", "job_holder", "other_documents"];
    categories.forEach((category) => {
      if (formData[category] && Array.isArray(formData[category])) {
        formData[category].forEach((doc: any, index: number) => {
          formDataToSend.append(`${category}[${index}].title`, doc.title);
          doc.details.forEach((detail: string, detailIndex: number) => {
            formDataToSend.append(`${category}[${index}].details[${detailIndex}]`, detail);
          });
          if (doc.icon) {
            formDataToSend.append(`${category}[${index}].icon`, doc.icon);
          }
        });
      }
    });
  
    if (formData.images && Array.isArray(formData.images)) {
      formData.images.forEach((image: any, index: number) => {
        if (image instanceof File) {
          formDataToSend.append(`images[${index}]`, image);
        }
      });
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/visa/${visaInfo.countryName}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Visa updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating visa:", error);
    }
  };
  

  
  return (

    <>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-boxdark shadow-md rounded-md p-8 space-y-8" encType="multipart/form-data" >

        <div className="grid grid-cols-2 gap-8">
          <TextInput name="countryName" label="Country Name" />
          <TextInput name="title" label="Title" />
          <TextInput name="subtitle" label="subtitle" />
          <TextInput name="description" label="Description" type="textarea" />
        </div>

      <h3 className="text-lg font-semibold text-gray-700">Location Image Upload</h3>
      <div className="grid grid-cols-2 gap-4">
        {locationImageFields.map((field, index) => (
          <div key={field.id} className="space-y-2 bg-gray-100 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600">Image {index + 1}</label>
            <FileInput
            name="locationImages"
            label="Upload Image"
            onChange={(e) => handleLocationImageChange(index, e)}
            />   

            {locationImagePreviews[index] && (
                <Image
                key={index}
                src={locationImagePreviews[index]} 
                alt={`Preview ${index + 1}`} 
                width={300}
                height={200}
                className="object-cover rounded-lg"
              />
            )}

            <TextInput name={`locationImages.${index}.location`} label="Location Name" />
            {locationImageFields.length > 1 && (
              <Button
              btnType="button"
              containerStyles="px-4 py-2 bg-red text-white rounded"
              title="Remove"
              handleClick={() => removeLocation(index)}
             />
            )}
          </div>
        ))}
      </div>

         <Button
          btnType="button"
          containerStyles="bg-teal_blue text-white rounded-lg px-4 py-2"
          title="Add Another Image"
          handleClick={() => appendLocation({ image: {} as File, location: "" })}
         />

        <h3 className="text-lg font-semibold text-gray-700">General Information Images Upload</h3>

        <FileInput
         name="images"
         label="Upload Images"
         multiple 
         onChange={(e) => handleImageChange(e)}
         />

        <div className="flex space-x-4">
          {imagePreviews.map((preview, index) => (
            <Image
            key={index} 
            src={preview}
            alt={`Preview ${index}`}
            width={200}
            height={200}
            className="object-cover"
          />
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-700">General Information</h3>
        <div className="grid grid-cols-2 gap-8">
          <TextInput name="capital" label="Capital" />
          <TextInput name="time" label="Local Time" />
          <TextInput name="telephone_code" label="Telephone Code" />
          <TextInput name="bank_time" label="Bank Time" />
          <TextInput type="textarea" name="embassy_address" label="Embassy Address" />
        </div>

        
        <h3 className="text-lg font-semibold text-gray-700">Notes</h3>

        {noteFields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <TextInput type="textarea" name={`note[${index}].text`} label={`Note ${index + 1}`} />
          </div>
          
        ))}

        <Button
         btnType="button"
         containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
         title="Add Another Note"
         handleClick={() => appendNote({ text: "" })}
        />

      <h3 className="text-lg font-semibold text-gray-700">Visa Requirements</h3>

      {generalDocumentsFields.map((field, index) => (
          <div key={field.id}>

            <TextInput
             name={`general_documents[${index}].title`}
             label="General Document Title"
             />

            {field.details.map((detail: string, detailIndex: number) => (
              <TextInput
                key={detailIndex}
                name={`general_documents[${index}].details[${detailIndex}]`}
                label={`Detail ${detailIndex + 1}`}
              />
            ))}

            <FileInput name={`general_documents[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("general_documents", index, e)} />
            {iconPreviews.general_documents[index] && 
             <Image
             src={iconPreviews.general_documents[index]}
             alt="Preview"
             width={40}
             height={40}
             className="mr-3"
           />
            }


          </div>
        ))}

        <Button
         btnType="button"
         containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
         title="Add Another Genaral Document"
         handleClick={() => appendGeneralDocument({ title: "", details: [""], icon: {} as File })}
        />

        {businessPersonFields.map((field, index) => (
          <div key={field.id}>

            <TextInput
             name={`business_person[${index}].title`}
             label="business Document Title"
             />

            {field.details.map((detail: string, detailIndex: number) => (
              <TextInput
                key={detailIndex}
                name={`business_person[${index}].details[${detailIndex}]`}
                label={`Detail ${detailIndex + 1}`}
              />
            ))}

            <FileInput name={`business_person[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("business_person", index, e)} />

            {iconPreviews.business_person[index] &&
              <Image
              src={iconPreviews.business_person[index]}
              alt="Preview"
              width={40}
              height={40}
              className="mr-3"
            />}
          </div>
        ))}

        <Button
         btnType="button"
         containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
         title="Add Another Business Document"
         handleClick={() => appendBusinessDocument({ title: "", details: [""], icon: {} as File })}
        />

        {studentFields.map((field, index) => (
          <div key={field.id}>

            <TextInput
             name={`student[${index}].title`}
             label="Student Document Title"
             />

            {field.details.map((detail: string, detailIndex: number) => (
              <TextInput
                key={detailIndex}
                name={`student[${index}].details[${detailIndex}]`}
                label={`Detail ${detailIndex + 1}`}
              />
            ))}

            <FileInput name={`student[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("student", index, e)} />

            {iconPreviews.student[index] &&
             <Image
             src={iconPreviews.student[index]}
             alt="Preview"
             width={40}
             height={40}
             className="mr-3"
           />
             }
          </div>
        ))}

        <Button
         btnType="button"
         containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
         title="Add Another Student Document"
         handleClick={() => appendStudentDocument({ title: "", details: [""], icon: {} as File })}
        />

        {jobHolderFields.map((field, index) => (
          <div key={field.id}>

            <TextInput
             name={`job_holder[${index}].title`}
             label="General Document Title"
             />

            {field.details.map((detail: string, detailIndex: number) => (
              <TextInput
                key={detailIndex}
                name={`job_holder[${index}].details[${detailIndex}]`}
                label={`Detail ${detailIndex + 1}`}
              />
            ))}

            <FileInput name={`job_holder[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("job_holder", index, e)} />
            {iconPreviews.job_holder[index] && 
             <Image
             src={iconPreviews.job_holder[index]}
             alt="Preview"
             width={40}
             height={40}
             className="mr-3"
           /> }
          </div>
        ))}

        <Button
         btnType="button"
         containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
         title="Add Another Job Holder Document"
         handleClick={() => appendJobHolderDocument({ title: "", details: [""], icon: {} as File })}
        />


        {otherDocumentsFields.map((field, index) => (
          <div key={field.id}>

            <TextInput
             name={`other_documents[${index}].title`}
             label="Other Document Title"
             />

            {field.details.map((detail: string, detailIndex: number) => (
              <TextInput
                key={detailIndex}
                name={`other_documents[${index}].details[${detailIndex}]`}
                label={`Detail ${detailIndex + 1}`}
              />
            ))}

            <FileInput name={`other_documents[${index}].icon`} label="Icon" onChange={(e) => handleIconChange("other_documents", index, e)} />
            {iconPreviews.other_documents[index] &&   
            <Image
            src={iconPreviews.other_documents[index]}
            alt="Preview"
            width={40}
            height={40}
            className="mr-3"
          />}
          </div>
        ))}

        <Button
         btnType="button"
         containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
         title="Add Another Other Document"
         handleClick={() => appendOtherDocument({ title: "", details: [""], icon: {} as File })}
        />

        <h3 className="text-lg font-semibold text-gray-700 mt-8">Visa Price</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput name="visaPrice_mainText" label="Main Text" />
          <TextInput name="visaPrice_price" label="Price" />
          <TextInput name="visaPrice_note" label="Note" />
        </div>
                          
         <div className="flex justify-center mt-8">
          <Button
            btnType="submit"
            containerStyles="custom-btn-fill" 
            textStyles="text-white" 
            title="Save"
            />
        </div>
      </form>
    </FormProvider>
  </>

  );
};

export default EditVisa;





// import { useForm, FormProvider, useFieldArray } from "react-hook-form";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FileInput, TextInput } from "../FormInputs";
// import Button from "../CustomButton";
// import Image from "next/image";

// interface EditVisaProps {
//   visaInfo: any;
//   visaRequirements: any;
// }

// const EditVisa: React.FC<EditVisaProps> = ({ visaInfo, visaRequirements }) => {
//   const methods = useForm({
//     defaultValues: {
//       countryName: "",
//       title: "",
//       subtitle: "",
//       description: "",
//       locationImages: [{ image: {} as File, location: "" }],
//       images: [],
//       capital: "",
//       time: "",
//       telephone_code: "",
//       bank_time: "",
//       embassy_address: "",
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

//   const { handleSubmit, reset, control, setValue } = methods;

//   const [iconPreviews, setIconPreviews] = useState<{
//     general_documents: { [key: number]: string };
//     business_person: { [key: number]: string };
//     student: { [key: number]: string };
//     job_holder: { [key: number]: string };
//     other_documents: { [key: number]: string };
//   }>({
//     general_documents: {},
//     business_person: {},
//     student: {},
//     job_holder: {},
//     other_documents: {},
//   });

//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [locationImagePreviews, setLocationImagePreviews] = useState<string[]>([]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       const newImagePreviews = fileArray.map((file) => URL.createObjectURL(file));
//       setImagePreviews(newImagePreviews);
//       setValue("images", fileArray);
//     }
//   };

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


//   const handleIconChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const file = files[0]; // Only handle a single icon
//       const iconPreview = URL.createObjectURL(file);
  
//       // Update the form state for the icon file
//       setValue(`visaDocuments.${index}.icon`, file);
  
//       // Optionally, you can manage an icon preview state if needed
//       const updatedIconPreviews = [...iconPreviews];
//       updatedIconPreviews[index] = iconPreview;
//       setIconPreviews(updatedIconPreviews);
//     }
//   };
  

//   const { fields: locationImageFields, append: appendLocation, remove: removeLocation } = useFieldArray({
//     control,
//     name: "locationImages",
//   });

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

//   useEffect(() => {
//     if (visaInfo && visaRequirements) {
//       reset({
//         countryName: visaInfo.countryName,
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

//   const onSubmit = async (formData: any) => {
//     const formDataToSend = new FormData();

//     formDataToSend.append("countryName", formData.countryName);
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("subtitle", formData.subtitle);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("visaPrice_mainText", formData.visaPrice_mainText);
//     formDataToSend.append("visaPrice_price", formData.visaPrice_price);
//     formDataToSend.append("visaPrice_note", formData.visaPrice_note);

//     if (formData.notes && Array.isArray(formData.notes)) {
//       formData.notes.forEach((note: any, index: number) => {
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

//     try {
//       const response = await axios.put(`http://localhost:4000/api/v1/visa/${visaInfo.countryName}`, formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Visa updated successfully:", response.data);
//     } catch (error) {
//       console.error("Error updating visa:", error);
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-boxdark shadow-md rounded-md p-8 space-y-8" encType="multipart/form-data">
//         {/* General Information */}
//         <div className="grid grid-cols-2 gap-8">
//           <TextInput name="countryName" label="Country Name" />
//           <TextInput name="title" label="Title" />
//           <TextInput name="subtitle" label="Subtitle" />
//           <TextInput name="capital" label="Capital" />
//           <TextInput name="time" label="Time" />
//           <TextInput name="telephone_code" label="Telephone Code" />
//           <TextInput name="bank_time" label="Bank Time" />
//           <TextInput name="embassy_address" label="Embassy Address" />
//         </div>

//         {/* Visa Price Information */}
//         <div className="grid grid-cols-3 gap-8">
//           <TextInput name="visaPrice_mainText" label="Visa Price Main Text" />
//           <TextInput name="visaPrice_price" label="Visa Price" />
//           <TextInput name="visaPrice_note" label="Visa Price Note" />
//         </div>

//         {/* Location Images */}
//         <h2 className="text-lg font-semibold">Location Images</h2>
//         {locationImageFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-4 items-center">
//             <FileInput name={`locationImages.${index}.image`} label="Upload Image" onChange={(e) => handleLocationImageChange(index, e)} />
//             <TextInput name={`locationImages.${index}.location`} label="Location" />
//             {locationImagePreviews[index] && (
//               <Image src={locationImagePreviews[index]} alt={`Location Image ${index}`} width={100} height={100} />
//             )}
//             <Button type="button" onClick={() => removeLocation(index)}>
//               Remove
//             </Button>
//           </div>
//         ))}
//         <Button type="button" onClick={() => appendLocation({ image: {} as File, location: "" })}>
//           Add Another Location Image
//         </Button>

//         {/* Notes */}
//         <h2 className="text-lg font-semibold">Notes</h2>
//         {noteFields.map((field, index) => (
//           <div key={field.id} className="flex space-x-4 items-center">
//             <TextInput name={`note.${index}.text`} label={`Note ${index + 1}`} />
//             <Button type="button" onClick={() => removeNote(index)}>
//               Remove
//             </Button>
//           </div>
//         ))}
//         <Button type="button" onClick={() => appendNote({ text: "" })}>
//           Add Another Note
//         </Button>

//         {/* Visa Documents */}
//         <h2 className="text-lg font-semibold">Visa Requirements</h2>
//         {categories.map((category) => (
//           <div key={category}>
//             <h3 className="text-md font-semibold capitalize">{category.replace("_", " ")}</h3>
//             {methods.getValues()[category].map((doc: any, index: number) => (
//               <div key={index} className="grid grid-cols-3 gap-4">
//                 <TextInput name={`${category}.${index}.title`} label="Title" />
//                 <FileInput name={`${category}.${index}.icon`} label="Upload Icon" onChange={(e) => handleIconChange(category, index, e)} />
//                 {iconPreviews[category][index] && (
//                   <Image src={iconPreviews[category][index]} alt={`Icon for ${category} ${index}`} width={100} height={100} />
//                 )}
//               </div>
//             ))}
//             <Button type="button" onClick={() => appendGeneralDocument({ title: "", details: [""], icon: {} as File })}>
//               Add Another Document
//             </Button>
//           </div>
//         ))}

//         <Button type="submit" className="mt-8">
//           Update Visa
//         </Button>
//       </form>
//     </FormProvider>
//   );
// };

// export default EditVisa;
