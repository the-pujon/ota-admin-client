"use client";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { FileInput, SelectInput, TextInput } from "../FormInputs";
import Button from "../CustomButton";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";
import { useUpdateVisaMutation } from "@/redux/api/visaApi";
interface EditVisaProps {
  visaInfo: any;
  visaRequirements: any;
}
 
const EditVisa: React.FC<EditVisaProps> = ({ visaInfo, visaRequirements }) => {
  const [updateVisa, { isLoading }] = useUpdateVisaMutation();
  const methods = useForm({
    defaultValues: {
      countryName: "",
      visaType: "",
      title: "",
      subtitle: "",
      description: "",
      locationImages: [{ image: {} as File, location: "", }],
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
        visaType: visaInfo.visaType,
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
  const onSubmit = async (formData: any) => {
    const formDataToSend = new FormData();
 
    formDataToSend.append("countryName", formData.countryName);
    formDataToSend.append("visaType", formData.visaType);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("capital", formData.capital);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("telephone_code", formData.telephone_code);
    formDataToSend.append("bank_time", formData.bank_time);
    formDataToSend.append("embassy_address", formData.embassy_address);
    formDataToSend.append("visaPrice_mainText", formData.visaPrice_mainText);
    formDataToSend.append("visaPrice_price", formData.visaPrice_price);
    formDataToSend.append("visaPrice_note", formData.visaPrice_note);
    if (formData.note && Array.isArray(formData.note)) {
      formData.note.forEach((note: any, index: number) => {
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
    for (const [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
    console.log("formData: ",formDataToSend);
    try {
      // const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${visaInfo.countryName}`, formDataToSend, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await updateVisa(formDataToSend).unwrap();
      console.log(response)
      toast.success("Content updated successfully!");
      console.log("Visa updated successfully:", response);
    } catch (error) {
      toast.error("Something Going Wrong!");
      console.error("Error updating visa:", error);
    }
  };

  return (
    <>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-boxdark shadow-md rounded-md p-8 space-y-8" encType="multipart/form-data" >
        <div className="grid grid-cols-2 gap-8">
          <TextInput name="countryName" label="Country Name" />
          <SelectInput
              name="visaType"
              label="Type of Visa"
              options={[
                { value: "E-Visa", label: "E-Visa" },
                { value: "Sticker Visa", label: "Sticker Visa" },
              ]}
            />
          <TextInput name="title" label="Title" />
          <TextInput name="subtitle" label="Subtitle" />
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
            <div key={index} className="relative inline-block">
              <Image
                src={preview}
                alt={`Preview ${index}`}
                width={200}
                height={200}
                className="object-cover"
              />
              <button
                type="button"
                // onClick={() => removeImage(index)}
 
                className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hover:bg-red-700"
              >
                <FaTimes/>
              </button>
 
              <Button
               btnType="button"
               containerStyles="absolute top-0 right-0 p-1 text-white bg-red rounded-full hover:bg-red-700"
               title=""
               icon={<FaTimes/>}
              //  handleClick={() => removeImage(index)}
               />
            </div>
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
               type="textarea"
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
         title="Add Another General Document"
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
                type="textarea"
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
               type="textarea"
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
             label="Job Holder Document Title"
             />
 
            {field.details.map((detail: string, detailIndex: number) => (
              <TextInput
                type="textarea"
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
                type="textarea"
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