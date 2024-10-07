// "use client";
// import { useState } from "react";
// import { useForm, FormProvider, SubmitHandler, useFieldArray } from "react-hook-form";
// import axios from "axios";
// import { TextInput } from "../FormInputs";
// // import { TextInput } from "../FormInputs";

// interface FormData {
//   countryName: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   locationNames: { image: File; location: string }[];
//   capitalCity: string;
//   telephoneCode: string;
//   localTime: string;
//   bankTime: string;
//   embassyAddress: string;
//   note: string;
//   visaRequirements: {
//     generalDocuments: { title: string; icon: File; bulletPoints: string[] }[];
//     jobHolder: { icon: File; bulletPoints: string[] };
//     businessPerson: { icon: File; bulletPoints: string[] };
//     student: { icon: File; bulletPoints: string[] };
//     otherDocuments: { icon: File };
//   };
//   visaPrice: {
//     mainText: string;
//     price: number;
//     note: string;
//   };
//   generalInformationImages: { image: File }[];
// }

// export default function AddVisa() {
//   const methods = useForm<FormData>({
//     defaultValues: {
//       locationNames: [{ image: {} as File, location: "" }],
//       visaRequirements: {
//         generalDocuments: [{ title: "", icon: {} as File, bulletPoints: [] }],
//         jobHolder: { icon: {} as File, bulletPoints: [] },
//         businessPerson: { icon: {} as File, bulletPoints: [] },
//         student: { icon: {} as File, bulletPoints: [] },
//         otherDocuments: { icon: {} as File },
//       },
//       visaPrice: { mainText: "", price: 0, note: "" },
//       generalInformationImages: [{ image: {} as File }],
//     },
//   });

//   const { control, handleSubmit, setValue, reset, formState: { errors } } = methods;

//   // Location image and location name uploads
//   const { fields: locationFields, append: appendLocation, remove: removeLocation } = useFieldArray({
//     control,
//     name: "locationNames",
//   });
//   const [locationPreviews, setLocationPreviews] = useState<string[]>([]);

//   // General Information image uploads
//   const { fields: generalInfoFields, append: appendGeneralInfoImage, remove: removeGeneralInfoImage } = useFieldArray({
//     control,
//     name: "generalInformationImages",
//   });
//   const [generalInfoImagePreviews, setGeneralInfoImagePreviews] = useState<string[]>([]);


//   const handleLocationImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       const newImagePreviews = [...locationPreviews];
//       newImagePreviews[index] = URL.createObjectURL(fileArray[0]);
//       setLocationPreviews(newImagePreviews);
//       setValue(`locationNames.${index}.image`, fileArray[0]);
//     }
//   };

//   const handleGeneralInfoImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       const newImagePreviews = [...generalInfoImagePreviews];
//       newImagePreviews[index] = URL.createObjectURL(fileArray[0]);
//       setGeneralInfoImagePreviews(newImagePreviews);
//       setValue(`generalInformationImages.${index}.image`, fileArray[0]);
//     }
//   };
  

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     console.log(data, "data");

//     const formData = new FormData();

//     formData.append("countryName", data.countryName);
//     formData.append("title", data.title);
//     formData.append("subtitle", data.subtitle);
//     formData.append("description", data.description);

//     data.locationNames.forEach((item, index) => {
//       formData.append(`location_image_${index}`, item.image);
//       formData.append(`location_name_${index}`, item.location);
//     });

//     formData.append("capitalCity", data.capitalCity);
//     formData.append("telephoneCode", data.telephoneCode);
//     formData.append("localTime", data.localTime);
//     formData.append("bankTime", data.bankTime);
//     formData.append("embassyAddress", data.embassyAddress);
//     formData.append("note", data.note);

//     // Visa Requirements
//     data.visaRequirements.generalDocuments.forEach((doc, index) => {
//       formData.append(`general_document_title_${index}`, doc.title);
//       formData.append(`general_document_icon_${index}`, doc.icon);
//       doc.bulletPoints.forEach((point, bulletIndex) => {
//         formData.append(`general_document_bullet_${index}_${bulletIndex}`, point);
//       });
//     });

//     formData.append("jobHolder_icon", data.visaRequirements.jobHolder.icon);
//     data.visaRequirements.jobHolder.bulletPoints.forEach((point, index) => {
//       formData.append(`jobHolder_bullet_${index}`, point);
//     });

//     formData.append("businessPerson_icon", data.visaRequirements.businessPerson.icon);
//     data.visaRequirements.businessPerson.bulletPoints.forEach((point, index) => {
//       formData.append(`businessPerson_bullet_${index}`, point);
//     });

//     formData.append("student_icon", data.visaRequirements.student.icon);
//     data.visaRequirements.student.bulletPoints.forEach((point, index) => {
//       formData.append(`student_bullet_${index}`, point);
//     });

//     formData.append("otherDocuments_icon", data.visaRequirements.otherDocuments.icon);

//     // Visa Price
//     formData.append("visaPrice_mainText", data.visaPrice.mainText);
//     formData.append("visaPrice_price", data.visaPrice.price.toString());
//     formData.append("visaPrice_note", data.visaPrice.note);

//     // General Information Images
//     data.generalInformationImages.forEach((item, index) => {
//       formData.append(`general_info_image_${index}`, item.image);
//     });

//     try {
//       // await axios.post("http://localhost:5000/upload-combined-content", formData, {
//       await axios.post("http://localhost:4000/api/v1/visa/addVisaInfo", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Content uploaded successfully!");
//       reset();
//       setLocationPreviews([]);
//       setGeneralInfoImagePreviews([]);
//     } catch (error) {
//       console.error("Error uploading content", error);
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-8">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Countries Content and Image Upload Form</h2>

//         <div className="grid grid-cols-2 gap-8">
//           <TextInput name="countryName" label="Country Name" />
//           <TextInput name="title" label="Title" />
//           <TextInput name="subtitle" label="Subtitle" />
//           <TextInput name="description" label="Description" type="textarea" />
//         </div>

//         {/* Location Image Upload */}
//         <h3 className="text-lg font-semibold text-gray-700">Location Image Upload</h3>
//         <div className="grid grid-cols-2 gap-4">
//           {locationFields.map((field, index) => (
//             <div key={field.id} className="space-y-2 bg-gray-100 p-4 rounded-lg">
//               <label className="block text-sm font-semibold text-gray-600">Image {index + 1}</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleLocationImageChange(index, e)}
//                 className="w-full"
//               />
//               {locationPreviews[index] && (
//                 <img src={locationPreviews[index]} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover rounded-lg" />
//               )}
//               <TextInput name={`locationNames.${index}.location`} label="Location Name" />
//               {locationFields.length > 1 && (
//                 <button type="button" onClick={() => removeLocation(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
//                   Remove Image
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         <button
//           type="button"
//           onClick={() => appendLocation({ image: {} as File, location: "" })}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Add Another Image
//         </button>

//         <h3 className="text-lg font-semibold text-gray-700">General Information</h3>

//         <div className="grid grid-cols-2 gap-8">
//           <TextInput name="capitalCity" label="Capital City" />
//           <TextInput name="telephoneCode" label="Telephone Code" />
//           <TextInput name="localTime" label="Local Time" />
//           <TextInput name="bankTime" label="Bank Time" />
//         </div>

//         <div className="grid grid-cols-2 gap-8">
//           <TextInput name="embassyAddress" label="Embassy Address" />
//           <TextInput name="note" label="Note" type="textarea" />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//   {generalInfoFields.map((field, index) => (
//     <div key={field.id} className="space-y-2 bg-gray-100 p-4 rounded-lg">
//       <label className="block text-sm font-semibold text-gray-600">Image {index + 1}</label>
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         onChange={(e) => handleGeneralInfoImageChange(index, e)}
//         className="w-full"
//       />
//       {generalInfoImagePreviews.map((preview, i) => (
//         <img
//           key={i}
//           src={preview}
//           alt={`General Info Preview ${i + 1}`}
//           className="w-32 h-32 object-cover rounded-lg"
//         />
//       ))}
//       {generalInfoFields.length > 1 && (
//         <button
//           type="button"
//           onClick={() => removeGeneralInfoImage(index)}
//           className="px-4 py-2 bg-red-500 text-white rounded-lg"
//         >
//           Remove Image
//         </button>
//       )}
//     </div>
//   ))}
// </div>

//         {/* <div className="grid grid-cols-2 gap-4">
//           {generalInfoFields.map((field, index) => (
//             <div key={field.id} className="space-y-2 bg-gray-100 p-4 rounded-lg">
//               <label className="block text-sm font-semibold text-gray-600">Image {index + 1}</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleGeneralInfoImageChange(index, e)}
//                 className="w-full"
//               />
//               {generalInfoImagePreviews[index] && (
//                 <img src={generalInfoImagePreviews[index]} alt={General Info Preview ${index + 1}} className="w-32 h-32 object-cover rounded-lg" />
//               )}
//               {generalInfoFields.length > 1 && (
//                 <button type="button" onClick={() => removeGeneralInfoImage(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
//                   Remove Image
//                 </button>
//               )}
//             </div>
//           ))}
//         </div> */}
//         {/* <button
//           type="button"
//           onClick={() => appendGeneralInfoImage({ image: {} as File })}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Add Another Image
//         </button> */}

//         <h3 className="text-lg font-semibold text-gray-700">Visa Requirements</h3>
//         <div className="grid grid-cols-2 gap-8">
//           <TextInput name="generalDocuments" label="General Documents" />
//           <TextInput name="jobHolder" label="Job Holder" />
//           <TextInput name="businessPerson" label="Business Person" />
//           <TextInput name="student" label="Student" /> 
//           <TextInput name="otherDocuments" label="Other Documents" /> 
//         </div>

//         <h3 className="text-lg font-semibold text-gray-700">Visa Price Info</h3>
//         <div className="grid grid-cols-2 gap-8">
//           <TextInput name="visaPrice.mainText" label="Visa Price Main Text" />
//           <TextInput name="visaPrice.price" label="Visa Price" type="number" />
//           <TextInput name="visaPrice.note" label="Visa Price Note" type="textarea" />
//         </div>

//         <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg">Submit</button>
//       </form>
//     </FormProvider>
//   );
// }

"use client";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler, useFieldArray } from "react-hook-form";
import axios from "axios";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TextInput } from "../FormInputs";

interface FormData {
  countryName: string;
  customId: string; 
  title: string;
  subtitle: string;
  description: string;
  locationImages: { image: File; location: string }[];
  images: File[]; 
  capital: string; 
  time: string;
  telephone_code: string; 
  embassy_address: string;
  note: { text?: string }[]; 
  general_documents: {
    title: string;
    details: string[];
  }[];
  business_person: {
    title: string;
    details: string[];
  }[];
  student: {
    title: string;
    details: string[];
  }[];
  job_holder: {
    title: string;
    details: string[];
  }[];
  other_documents: {
    title: string;
    details: string[];
  }[];
  visaPrice: {
    mainText: string;
    price: number;
    note: string;
  };
}


export default function CombinedForm() {
  const methods = useForm<FormData>({
    defaultValues: {
      locationImages: [{ image: {} as File, location: "" }],
      countryName: '',
      customId: '',
      title: '',
      description: '',
      images: [],
      capital: '',
      time: '',
      telephone_code: '',
      embassy_address: '',
      note: [{ text: '' }],
      general_documents: [{ title: '', details: [''] }],
      business_person: [{ title: '', details: [''] }],
      student: [{ title: '', details: [''] }],
      job_holder: [{ title: '', details: [''] }],
      other_documents: [{ title: '', details: [''] }],
      visaPrice: { mainText: "", price: 0, note: "" },
    },
  });

  const { control, handleSubmit, setValue, reset, formState: { errors } } = methods;

  const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray({
    control,
    name: 'note',
  });

  const { fields: generalDocumentsFields, append: appendGeneralDocument } = useFieldArray({
    control,
    name: 'general_documents',
  });

  const { fields: businessPersonFields, append: appendBusinessDocument } = useFieldArray({
    control,
    name: 'business_person',
  });

  const { fields: studentFields, append: appendStudentDocument } = useFieldArray({
    control,
    name: 'student',
  });

  const { fields: jobHolderFields, append: appendJobHolderDocument } = useFieldArray({
    control,
    name: 'job_holder',
  });

  const { fields: otherDocumentsFields, append: appendOtherDocument } = useFieldArray({
    control,
    name: 'other_documents',
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImagePreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(newImagePreviews);
      setValue('images', fileArray);
    }
  };


  const { fields: locationImageFields, append: appendLocation, remove: removeLocation } = useFieldArray({
    control,
    name: "locationImages",
  });

  const [locationImagePreviews, setLocationImagePreviews] = useState<string[]>([]);


  const handleLocationImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImagePreviews = [...locationImagePreviews];
      newImagePreviews[index] = URL.createObjectURL(fileArray[0]);
      setLocationImagePreviews(newImagePreviews);
      setValue(`locationImages.${index}.image`, fileArray[0]);
    }
  };


  const handleCKEditorChange = (index: number, fieldName: "note", data: string) => {
    setValue(`note.${index}.text` as const, data);
  };

  const handleDetailsCKEditorChange = (
    fieldName: "general_documents" | "business_person" | "student" | "job_holder" | "other_documents", 
    index: number,
    detailIndex: number,
    data: string
  ) => {

    const path = `${fieldName}.${index}.details.${detailIndex}` as const;

    setValue(path, data);
  };
  

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const formData = new FormData();

    formData.append('countryName', data.countryName);
    formData.append('customId', data.customId);
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('description', data.description);

    data.locationImages.forEach((item) => {
      formData.append('locationImages', item.image);  
      formData.append(`location_${item.image.name}`, item.location);  
    });
    
    data.images.forEach((image) => {
      formData.append('images', image);
    });
    
  

    formData.append('capital', data.capital);
    formData.append('time', data.time);
    formData.append('telephone_code', data.telephone_code);
    formData.append('embassy_address', data.embassy_address);

data.note.forEach((note, index) => {
  formData.append(`note[${index}][text]`, note.text || ''); 
});


formData.append('general_documents', JSON.stringify(data.general_documents));
formData.append('business_person', JSON.stringify(data.business_person));
formData.append('student', JSON.stringify(data.student));
formData.append('job_holder', JSON.stringify(data.job_holder));
formData.append('other_documents', JSON.stringify(data.other_documents));

    // formData.append('visaPrice.mainText', data.visaPrice.mainText);
    // formData.append('visaPrice.price', data.visaPrice.price.toString());
    // formData.append('visaPrice.note', data.visaPrice.note);


    // console.log(formData, "formData");
    

    try {
      const response = await axios.post('http://localhost:4000/api/v1/visa/addVisaInfo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data, "data")
      // alert('Content uploaded successfully!');
      // reset();
      setImagePreviews([]);
    } catch (error) {
      console.error('Error uploading content', error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-boxdark shadow-md rounded-md p-8 space-y-8" encType="multipart/form-data" >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Countries Content and Image Upload Form</h2>

          <div className="grid grid-cols-2 gap-8">
            <TextInput name="countryName" label="Country Name" />
            {/* <TextInput name="customId" label="Custom ID" /> */}
            <TextInput name="title" label="Title" />
            <TextInput name="subtitle" label="subtitle" />
            <TextInput name="description" label="Description" type="textarea" />
          </div>

          <h3 className="text-lg font-semibold text-gray-700">Location Image Upload</h3>
        <div className="grid grid-cols-2 gap-4">
          {locationImageFields.map((field, index) => (
            <div key={field.id} className="space-y-2 bg-gray-100 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-gray-600">Image {index + 1}</label>
              <input
                name="locationImages"
                type="file"
                accept="image/*"
                onChange={(e) => handleLocationImageChange(index, e)}
                className="w-full"
              />
              {locationImagePreviews[index] && (
                <img src={locationImagePreviews[index]} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover rounded-lg" />
              )}
              <TextInput name={`locationImages.${index}.location`} label="Location Name" />
              {locationImageFields.length > 1 && (
                <button type="button" onClick={() => removeLocation(index)} className="px-4 py-2 bg-red text-white rounded-lg">
                  Remove Image
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => appendLocation({ image: {} as File, location: "" })}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Another Image
        </button>

          <h3 className="text-lg font-semibold text-gray-700">General Information Images Upload</h3>
          <input type="file" name="images" accept="image/*" multiple onChange={handleImageChange} />
          <div className="flex space-x-4">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index}`} className="w-24 h-24 object-cover" />
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-700">General Information</h3>
          <div className="grid grid-cols-2 gap-8">
            <TextInput name="capital" label="Capital" />
            <TextInput name="time" label="Local Time" />
            <TextInput name="telephone_code" label="Telephone Code" />
          </div>
          <TextInput name="embassy_address" label="Embassy Address" />

          
          <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
          {noteFields.map((item, index) => (
            <div key={item.id} className="flex space-x-4">
              <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleCKEditorChange(index, "note", data);
                }}
              />
              <button
                type="button"
                onClick={() => removeNote(index)}
                className="mt-8 px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendNote({ text: "" })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Another Note
          </button>

        <h3 className="text-lg font-semibold text-gray-700">Visa Requirements</h3>
        
        <div>
          <h4 className="font-semibold">General Documents</h4>
          {generalDocumentsFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <TextInput name={`general_documents.${index}.title`} label={`Document Title ${index + 1}`} />
              <label htmlFor={`general_documents.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
                Detail
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={methods.getValues(`general_documents.${index}.details.0`) || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleDetailsCKEditorChange("general_documents", index, 0, data);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendGeneralDocument({ title: "", details: [""] })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Another General Document
          </button>
        </div>
        
        <div>
          <h4 className="font-semibold">Business Person Documents</h4>
          {businessPersonFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <TextInput name={`business_person.${index}.title`} label={`Document Title ${index + 1}`} />
              <label htmlFor={`business_person.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
                Detail
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={methods.getValues(`business_person.${index}.details.0`) || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleDetailsCKEditorChange("business_person", index, 0, data);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendBusinessDocument({ title: "", details: [""] })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Another Business Document
          </button>
        </div>
        
        <div>
          <h4 className="font-semibold">Student Documents</h4>
          {studentFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <TextInput name={`student.${index}.title`} label={`Document Title ${index + 1}`} />
              <label htmlFor={`student.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
                Detail
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={methods.getValues(`student.${index}.details.0`) || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleDetailsCKEditorChange("student", index, 0, data);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendStudentDocument({ title: "", details: [""] })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Another Student Document
          </button>
        </div>
        
        <div>
          <h4 className="font-semibold">Job Holder Documents</h4>
          {jobHolderFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <TextInput name={`job_holder.${index}.title`} label={`Document Title ${index + 1}`} />
              <label htmlFor={`job_holder.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
                Detail
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={methods.getValues(`job_holder.${index}.details.0`) || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleDetailsCKEditorChange("job_holder", index, 0, data);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendJobHolderDocument({ title: "", details: [""] })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Another Job Holder Document
          </button>
        </div>
        
        <div>
          <h4 className="font-semibold">Other Documents</h4>
          {otherDocumentsFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <TextInput name={`other_documents.${index}.title`} label={`Document Title ${index + 1}`} />
              <label htmlFor={`other_documents.${index}.details.0`} className="block text-sm font-semibold text-gray-600">
                Detail
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={methods.getValues(`other_documents.${index}.details.0`) || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleDetailsCKEditorChange("other_documents", index, 0, data);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendOtherDocument({ title: "", details: [""] })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Another Other Document
          </button>
        </div>

          
          <h3 className="text-lg font-semibold text-gray-700">Visa Price</h3>
          {/* <TextInput name="visaPrice.mainText" label="Main Text" />
          <TextInput name="visaPrice.price" label="Price" type="number" />
          <TextInput name="visaPrice.note" label="Note" /> */}
                            
          <div className="flex justify-center mt-8">
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-md">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}