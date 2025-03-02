"use client"
import { useState } from "react"
import type React from "react"

import { useForm, FormProvider, type SubmitHandler, useFieldArray } from "react-hook-form"
// import { SelectInput, TextInput } from "../FormInputs"
import Button from "../CustomButton"
import toast from "react-hot-toast"
import Image from "next/image"
import { useAddVisaMutation } from "@/redux/api/visaApi"
import { TextInput } from "../ui/form/text-input"
import { SelectInput } from "../ui/form/select-input"
import { MdClose } from "react-icons/md"
import { FaPlus } from "react-icons/fa"
// import { Accordion } from "../Accordion/Accordion"
// import DocumentSection from "./DocumentInput"
import { Accordion } from "../Accordion/Accordion"
import DocumentSection from "./DocumentInput"
// import ThemeToggle from "../ThemeToggle"

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
export default function AddNewVisa() {
  const [addVisa, { isLoading, error }] = useAddVisaMutation()
  console.log("error is here", error)
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

  const handleFileUpload = (
    fieldName: DocumentFieldName,
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

  const removeIcon = (
    fieldName: DocumentFieldName,
    index: number,
  ) => {
    const newIconPreviews = { ...iconPreviews }
    if (newIconPreviews[fieldName][index]) {
      URL.revokeObjectURL(newIconPreviews[fieldName][index])
      delete newIconPreviews[fieldName][index]
      setIconPreviews(newIconPreviews)
      methods.setValue(`${fieldName}.${index}.icon`, {} as File)
    }
  }

  const [imagePreviews, setImagePreviews] = useState<string[]>([])

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

  const [locationImagePreviews, setLocationImagePreviews] = useState<string[]>([])

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

  const handleDetailsChange = (
    fieldName: DocumentFieldName,
    index: number,
    detailIndex: number,
    data: string,
  ) => {
    const plainText = data.replace(/<\/?[^>]+(>|$)/g, "")
    const path = `${fieldName}.${index}.details.${detailIndex}` as const
    setValue(path, plainText)
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData()
    formData.append("countryName", data.countryName)
    formData.append("visaType", data.visaType)
    formData.append("customId", data.customId)
    formData.append("title", data.title)
    formData.append("subtitle", data.subtitle)
    formData.append("description", data.description)

    data.locationImages.forEach((item) => {
      formData.append("locationImages", item.image)
      formData.append(`location_${item.image.name}`, item.location)
    })

    data.images.forEach((image) => {
      formData.append("images", image)
    })

    formData.append("capital", data.capital)
    formData.append("time", data.time)
    formData.append("telephone_code", data.telephone_code)
    formData.append("bank_time", data.bank_time)
    formData.append("embassy_address", data.embassy_address)

    data.note.forEach((note, index) => {
      formData.append(`note[${index}][text]`, note.text || "")
    })

    formData.append("general_documents", JSON.stringify(data.general_documents))
    formData.append("business_person", JSON.stringify(data.business_person))
    formData.append("student", JSON.stringify(data.student))
    formData.append("job_holder", JSON.stringify(data.job_holder))
    formData.append("other_documents", JSON.stringify(data.other_documents))

    data.general_documents.forEach((doc, index) => {
      formData.append(`general_documents[${index}].title`, doc.title)
      formData.append(`general_documents[${index}].details`, JSON.stringify(doc.details))
      formData.append(`general_documents[${index}].icon`, doc.icon)
    })

    data.business_person.forEach((doc, index) => {
      formData.append(`business_person[${index}].title`, doc.title)
      formData.append(`business_person[${index}].details`, JSON.stringify(doc.details))
      formData.append(`business_person[${index}].icon`, doc.icon)
    })

    data.student.forEach((doc, index) => {
      formData.append(`student[${index}].title`, doc.title)
      formData.append(`student[${index}].details`, JSON.stringify(doc.details))
      formData.append(`student[${index}].icon`, doc.icon)
    })

    data.job_holder.forEach((doc, index) => {
      formData.append(`job_holder[${index}].title`, doc.title)
      formData.append(`job_holder[${index}].details`, JSON.stringify(doc.details))
      formData.append(`job_holder[${index}].icon`, doc.icon)
    })

    data.other_documents.forEach((doc, index) => {
      formData.append(`other_documents[${index}].title`, doc.title)
      formData.append(`other_documents[${index}].details`, JSON.stringify(doc.details))
      formData.append(`other_documents[${index}].icon`, doc.icon)
    })

    formData.append("visaPrice_mainText", data.visaPrice_mainText)
    formData.append("visaPrice_price", data.visaPrice_price)
    formData.append("visaPrice_note", data.visaPrice_note)

    console.log( "formData" , formData);

    for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }


    try {
      const response = await addVisa(formData).unwrap()
      console.log(response)
      toast.success("Content uploaded successfully!")
    //   reset()
    //   setImagePreviews([])
    //   setLocationImagePreviews([])
    //   setIconPreviews({
    //     general_documents: {},
    //     business_person: {},
    //     student: {},
    //     job_holder: {},
    //     other_documents: {},
    //   })
    } catch (error) {
      toast.error("Something Going Wrong!")
      console.error("Error uploading content", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-2 dark:bg-boxdark py-8 px-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1400px] mx-auto" encType="multipart/form-data">
          {/* Header Section */}
          <div className="bg-white dark:bg-boxdark-2 rounded-xl shadow-card dark:shadow-none hover:shadow-1 dark:hover:shadow-none transition-shadow p-8 mb-8">
            <div className="">
              {/* <h1 className="text-title-xl font-bold text-black dark:text-white mb-2">Add New Visa</h1>
              <p className="text-body dark:text-bodydark mb-8">Fill in the details below to create a new visa entry.</p> */}

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
                    // className="bg-white focus:bg-white transition-colors"
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

                          // Then update the locationImagePreviews array by removing the item at index
                          const newPreviews = [...locationImagePreviews]
                          newPreviews.splice(index, 1)
                          setLocationImagePreviews(newPreviews)

                          // Finally remove the location field
                          removeLocation(index)
                        
                      }}
                      className="bg-red hover:text-red-700 text-white p-1 rounded-full "
                    >
                      <MdClose/>
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
                               <MdClose/>
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
                generalDocumentsFieldsLength={generalDocumentsFields.length}
                removeGeneralDocument={removeGeneralDocument}
              />
            ))}
            <Button
                btnType="button"
                containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
                title="Add Another General Document"
                icon={
                    <FaPlus/>
                }
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
               />
            ))}
          </Accordion>
          {/* Submit Button */}
          <div className="flex justify-center mt-12 mb-16">
            <Button
              btnType="submit"
              containerStyles={`
                ${isLoading ? "bg-bodydark" : "bg-teal-600 hover:bg-teal-700"} 
                text-white font-medium py-2 px-6 rounded-lg shadow-1 
                hover:shadow-2 transition-all duration-300 flex items-center 
                justify-center min-w-[200px]
              `}
              textStyles="text-lg"
              title={isLoading ? "Saving..." : "Save Visa Information"}
            //   disabled={isLoading}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}