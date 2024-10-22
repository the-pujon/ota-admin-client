import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { FileInput, TextInput } from "../FormInputs";
import Button from "../CustomButton";
import Image from "next/image";

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

  const {
    fields: locationImageFields,
    append: appendLocation,
  } = useFieldArray({
    control,
    name: "locationImages",
  });

  const { fields: imageFields, append: appendImage } = useFieldArray({
    control, 
    name: "images",
  });

  const { fields: noteFields, append: appendNote } = useFieldArray({
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

  const [locationImagePreviews, setLocationImagePreviews] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [iconPreviews, setIconPreviews] = useState({
    general_documents: [] as string[],
    business_person: [] as string[],
    student: [] as string[],
    job_holder: [] as string[],
    other_documents: [] as string[],
  });


  useEffect(() => {
    if (visaInfo && visaRequirements) {
      reset({
        countryName: visaInfo.countryName,
        title: visaInfo.title,
        subtitle: visaInfo.subtitle,
        description: visaInfo.description,
        locationImages: visaInfo.locationImages || [{ image: {} as File, location: "" }],
        images: visaInfo.images || [],
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
          if (doc.icon instanceof File) {
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput name="countryName" label="Country Name" />
        <TextInput name="title" label="Title" />
        <TextInput name="subtitle" label="Subtitle" />
        <TextInput name="description" label="Description" type="textarea" />

        <TextInput name="visaPrice_mainText" label="Visa Price Main Text" />
        <TextInput name="visaPrice_price" label="Visa Price" />
        <TextInput name="visaPrice_note" label="Visa Price Note" type="textarea"  />

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
        

        {locationImageFields.map((field, index) => (
          <div key={field.id}>
            <FileInput name={`locationImages[${index}].image`} label="Location Image" />

            <TextInput name={`locationImages[${index}].location`} label="Location" />
            {locationImagePreviews[index] &&
              <Image
              key={index}
              src={locationImagePreviews[index]}
              alt="Preview"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
             }
          </div>
        ))}

        <Button
         btnType="button"
         containerStyles="bg-teal_blue text-white rounded-lg mt-4 px-4 py-2"
         title="Add Location Image"
         handleClick={() => appendLocation({ image: {} as File, location: "" })}
        />


         {imageFields.map((field, index) => (
          <div key={field.id}>
            <FileInput name={`images[${index}]`} label="Image" />
            {imagePreviews[index] &&
              <Image
              key={index}
              src={imagePreviews[index]}
              alt="Preview"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
             }
          </div>
        ))}

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

            <FileInput name={`general_documents[${index}].icon`} label="Icon" />
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

            <FileInput name={`business_person[${index}].icon`} label="Icon" />
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

            <FileInput name={`student[${index}].icon`} label="Icon" />
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

            <FileInput name={`job_holder[${index}].icon`} label="Icon" />
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

            <FileInput name={`other_documents[${index}].icon`} label="Icon" />
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


        <div className="flex justify-center mt-8">
         <Button
           btnType="submit"
           containerStyles="custom-btn-fill" 
           textStyles="text-white" 
           title="Update"
         />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditVisa;
