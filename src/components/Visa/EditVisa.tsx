import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TextInput } from "../FormInputs";
import Button from "../CustomButton";

const EditVisa = ({ visaId }) => {
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
      notes: [{ text: "" }],
      visaPrice_mainText: "",
      visaPrice_price: "",
      visaPrice_note: "",
    },
  });

  const { handleSubmit, reset, control, setValue } = methods;

  const { fields: locationImageFields, append: appendLocation } = useFieldArray({
    control,
    name: "locationImages",
  });
  const { fields: noteFields, append: appendNote } = useFieldArray({
    control,
    name: "notes",
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

  const [locationImagePreviews, setLocationImagePreviews] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [iconPreviews, setIconPreviews] = useState({
    general_documents: [],
    business_person: [],
    student: [],
    job_holder: [],
    other_documents: [],
  });

  useEffect(() => {
    // Fetch visa data for editing based on visaId
    const fetchVisaData = async () => {
      try {
        const response = await axios.get(`/api/visa/${visaId}`);
        const data = response.data;

        // Populate the form with existing visa data
        reset(data);
        // Update image previews and other fields
        setLocationImagePreviews(data.locationImages?.map((img) => img.url) || []);
        setImagePreviews(data.images?.map((img) => img.url) || []);
        setIconPreviews({
          general_documents: data.general_documents?.map((doc) => doc.icon) || [],
          business_person: data.business_person?.map((doc) => doc.icon) || [],
          student: data.student?.map((doc) => doc.icon) || [],
          job_holder: data.job_holder?.map((doc) => doc.icon) || [],
          other_documents: data.other_documents?.map((doc) => doc.icon) || [],
        });
      } catch (error) {
        console.error("Error fetching visa data:", error);
      }
    };

    fetchVisaData();
  }, [visaId, reset]);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.put(`/api/visa/${visaId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Visa updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating visa:", error);
    }
  };

  const handleLocationImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedPreviews = [...locationImagePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setLocationImagePreviews(updatedPreviews);
      setValue(`locationImages.${index}.image`, file);
    }
  };

  const handleIconChange = (section, index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedPreviews = { ...iconPreviews };
      updatedPreviews[section][index] = URL.createObjectURL(file);
      setIconPreviews(updatedPreviews);
      setValue(`${section}.${index}.icon`, file);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-boxdark shadow-md rounded-md p-8 space-y-8"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Visa Information</h2>

        <div className="grid grid-cols-2 gap-8">
          <TextInput name="countryName" label="Country Name" />
          <TextInput name="title" label="Title" />
          <TextInput name="subtitle" label="Subtitle" />
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
                <img
                  src={locationImagePreviews[index]}
                  alt={`Preview ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
              <TextInput name={`locationImages.${index}.location`} label="Location Name" />
            </div>
          ))}
        </div>

        {/* General Documents Section */}
        <h3 className="text-lg font-semibold text-gray-700">General Documents</h3>
        <div className="grid grid-cols-2 gap-4">
          {generalDocumentsFields.map((field, index) => (
            <div key={field.id} className="space-y-2 bg-gray-100 p-4 rounded-lg">
              <TextInput name={`general_documents.${index}.title`} label={`Title ${index + 1}`} />
              <input
                name={`general_documents.${index}.icon`}
                type="file"
                accept="image/*"
                onChange={(e) => handleIconChange("general_documents", index, e)}
                className="w-full"
              />
              {iconPreviews.general_documents[index] && (
                <img
                  src={iconPreviews.general_documents[index]}
                  alt={`Icon Preview ${index + 1}`}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
              {/* Add fields for document details if required */}
            </div>
          ))}
        </div>

        {/* Add similar sections for business_person, student, job_holder, other_documents */}

        <h3 className="text-lg font-semibold text-gray-700">Visa Pricing</h3>
        <div className="grid grid-cols-2 gap-8">
          <TextInput name="visaPrice_mainText" label="Main Text" />
          <TextInput name="visaPrice_price" label="Price" />
          <TextInput name="visaPrice_note" label="Note" />
        </div>

        <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
        <div className="grid grid-cols-2 gap-8">
          {noteFields.map((field, index) => (
            <TextInput key={field.id} name={`notes.${index}.text`} label={`Note ${index + 1}`} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button btnType="submit" containerStyles="custom-btn-fill" textStyles="text-white" title="Update Visa" />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditVisa;
