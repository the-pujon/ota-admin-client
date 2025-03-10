"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useForm, FormProvider, type SubmitHandler, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../CustomButton"
import toast from "react-hot-toast"
import Image from "next/image"
import { TextInput } from "../ui/form/text-input"
import { SelectInput } from "../ui/form/select-input"
import { MdClose } from "react-icons/md"
import { FaPlus } from "react-icons/fa"
import { Accordion } from "../Accordion/Accordion"
import DocumentSection from "./DocumentInput"
import { useUpdateVisaByCountryMutation, useVisaDetailsByCountryQuery } from "@/redux/api/visaApiV2"
import Loader from "../common/Loader"
import ErrorSummary from "./ErrorSummary"
import { VisaFormSchema, type VisaFormData, isFile, isStringUrl } from "@/schema/visaUpdateSchema"

type DocumentFieldName = "general_documents" | "business_person" | "student" | "job_holder" | "other_documents"

export default function EditVisaV2({ countryName }: { countryName: string }) {
  const { data: allVisaData, isLoading } = useVisaDetailsByCountryQuery({
    countryName: countryName,
  })
  const [updateVisa, { isLoading: isUpdating }] = useUpdateVisaByCountryMutation()

  const visaData = allVisaData?.data

  const methods = useForm<VisaFormData>({
    resolver: zodResolver(VisaFormSchema),
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

  // File error state
  const [fileErrors, setFileErrors] = useState<{
    general_documents: { [key: number]: string | null }
    business_person: { [key: number]: string | null }
    student: { [key: number]: string | null }
    job_holder: { [key: number]: string | null }
    other_documents: { [key: number]: string | null }
    locationImages: { [key: number]: string | null }
    generalImages: string | null
  }>({
    general_documents: {},
    business_person: {},
    student: {},
    job_holder: {},
    other_documents: {},
    locationImages: {},
    generalImages: null,
  })

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
        images: visaData.visaCountryId.images || [],
        locationImages:
          visaData.visaCountryId.locationImages && visaData.visaCountryId.locationImages.length > 0
            ? visaData.visaCountryId.locationImages.map((loc: any) => ({
                _id: loc._id,
                image: loc.image,
                location: loc.location,
              }))
            : [{ image: {} as File, location: "" }],
        general_documents:
          visaData.general_documents && visaData.general_documents.length > 0
            ? visaData.general_documents.map((doc: any) => ({
                _id: doc._id,
                title: doc.title,
                details: doc.details.length > 0 ? doc.details : [""],
                icon: doc.icon,
              }))
            : [{ title: "", details: [""], icon: {} as File }],
        business_person:
          visaData.business_person && visaData.business_person.length > 0
            ? visaData.business_person.map((doc: any) => ({
                _id: doc._id,
                title: doc.title,
                details: doc.details.length > 0 ? doc.details : [""],
                icon: doc.icon,
              }))
            : [{ title: "", details: [""], icon: {} as File }],
        student:
          visaData.student && visaData.student.length > 0
            ? visaData.student.map((doc: any) => ({
                _id: doc._id,
                title: doc.title,
                details: doc.details.length > 0 ? doc.details : [""],
                icon: doc.icon,
              }))
            : [{ title: "", details: [""], icon: {} as File }],
        job_holder:
          visaData.job_holder && visaData.job_holder.length > 0
            ? visaData.job_holder.map((doc: any) => ({
                _id: doc._id,
                title: doc.title,
                details: doc.details.length > 0 ? doc.details : [""],
                icon: doc.icon,
              }))
            : [{ title: "", details: [""], icon: {} as File }],
        other_documents:
          visaData.other_documents && visaData.other_documents.length > 0
            ? visaData.other_documents.map((doc: any) => ({
                _id: doc._id,
                title: doc.title,
                details: doc.details.length > 0 ? doc.details : [""],
                icon: doc.icon,
              }))
            : [{ title: "", details: [""], icon: {} as File }],
      })

      // Set image previews
      setImagePreviews(visaData.visaCountryId.images || [])
      setLocationImagePreviews(visaData.visaCountryId.locationImages.map((item: any) => item.image) || [])

      // Set icon previews
      const newIconPreviews: {
        general_documents: { [key: number]: string }
        business_person: { [key: number]: string }
        student: { [key: number]: string }
        job_holder: { [key: number]: string }
        other_documents: { [key: number]: string }
      } = {
        general_documents: {},
        business_person: {},
        student: {},
        job_holder: {},
        other_documents: {},
      }

      Object.entries(newIconPreviews).forEach(([key, value]) => {
        if (visaData[key] && Array.isArray(visaData[key])) {
          visaData[key].forEach((item: any, index: number) => {
            if (item && item.icon) {
              newIconPreviews[key as keyof typeof newIconPreviews][index] = item.icon
            }
          })
        }
      })

      setIconPreviews(newIconPreviews)
    }
  }, [visaData, reset])

  // Add a file validation function
  const validateFile = (file: File, maxSizeMB = 10): string | null => {
    // Check file size (default max 10MB)
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size exceeds ${maxSizeMB}MB limit`
    }

    // Check file type (only images)
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed"
    }

    return null
  }

  const handleFileUpload = (fieldName: DocumentFieldName, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]

      // Validate the file
      const error = validateFile(file)
      if (error) {
        // Update the file error state
        const newFileErrors = { ...fileErrors }
        newFileErrors[fieldName] = {
          ...newFileErrors[fieldName],
          [index]: error,
        }
        setFileErrors(newFileErrors)
        toast.error(error)
        return
      }

      // Clear any previous error
      const newFileErrors = { ...fileErrors }
      newFileErrors[fieldName] = {
        ...newFileErrors[fieldName],
        [index]: null,
      }
      setFileErrors(newFileErrors)

      const newIconPreviews = { ...iconPreviews }
      if (newIconPreviews[fieldName][index] && !isStringUrl(newIconPreviews[fieldName][index])) {
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
      // Only revoke if it's a blob URL (not a string URL from the server)
      if (
        typeof newIconPreviews[fieldName][index] === "string" &&
        newIconPreviews[fieldName][index].startsWith("blob:")
      ) {
        URL.revokeObjectURL(newIconPreviews[fieldName][index])
      }
      delete newIconPreviews[fieldName][index]
      setIconPreviews(newIconPreviews)
      methods.setValue(`${fieldName}.${index}.icon`, {} as File)

      // Clear any error when removing the icon
      const newFileErrors = { ...fileErrors }
      newFileErrors[fieldName] = {
        ...newFileErrors[fieldName],
        [index]: null,
      }
      setFileErrors(newFileErrors)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)

      // Validate each file
      let hasError = false
      for (const file of fileArray) {
        const error = validateFile(file)
        if (error) {
          setFileErrors({
            ...fileErrors,
            generalImages: error,
          })
          toast.error(error)
          hasError = true
          break
        }
      }

      if (hasError) return

      // Clear any previous error
      setFileErrors({
        ...fileErrors,
        generalImages: null,
      })

      const newImagePreviews = fileArray.map((file) => URL.createObjectURL(file))

      // Get the current images from React Hook Form
      const currentImages = methods.getValues("images") || []

      // Merge new images with existing ones
      const updatedImages = [...currentImages, ...fileArray]

      setImagePreviews((prev) => [...prev, ...newImagePreviews])

      // Update React Hook Form field
      methods.setValue("images", updatedImages, { shouldValidate: true })
    }
  }

  const removeImage = (index: number) => {
    const newImagePreviews = [...imagePreviews]
    // Only revoke if it's a blob URL (not a string URL from the server)
    if (typeof newImagePreviews[index] === "string" && newImagePreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(newImagePreviews[index])
    }
    newImagePreviews.splice(index, 1)
    setImagePreviews(newImagePreviews)

    const currentImages = methods.getValues("images")
    const newImages = [...currentImages]
    newImages.splice(index, 1)
    setValue("images", newImages)

    // Clear any error when removing an image
    setFileErrors({
      ...fileErrors,
      generalImages: null,
    })
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
    if (files && files.length > 0) {
      const file = files[0]

      // Validate the file
      const error = validateFile(file)
      if (error) {
        // Update the file error state
        const newFileErrors = { ...fileErrors }
        newFileErrors.locationImages = {
          ...newFileErrors.locationImages,
          [index]: error,
        }
        setFileErrors(newFileErrors)
        toast.error(error)
        return
      }

      // Clear any previous error
      const newFileErrors = { ...fileErrors }
      newFileErrors.locationImages = {
        ...newFileErrors.locationImages,
        [index]: null,
      }
      setFileErrors(newFileErrors)

      const newImagePreviews = [...locationImagePreviews]
      // Only revoke if it's a blob URL (not a string URL from the server)
      if (typeof newImagePreviews[index] === "string" && newImagePreviews[index].startsWith("blob:")) {
        URL.revokeObjectURL(newImagePreviews[index])
      }
      newImagePreviews[index] = URL.createObjectURL(file)
      setLocationImagePreviews(newImagePreviews)
      setValue(`locationImages.${index}.image`, file)
    }
  }

  const removeLocationImage = (index: number) => {
    const newImagePreviews = [...locationImagePreviews]
    if (newImagePreviews[index]) {
      // Only revoke if it's a blob URL (not a string URL from the server)
      if (typeof newImagePreviews[index] === "string" && newImagePreviews[index].startsWith("blob:")) {
        URL.revokeObjectURL(newImagePreviews[index])
      }
      newImagePreviews[index] = ""
      setLocationImagePreviews(newImagePreviews)
      setValue(`locationImages.${index}.image`, {} as File)

      // Clear any error when removing the location image
      const newFileErrors = { ...fileErrors }
      newFileErrors.locationImages = {
        ...newFileErrors.locationImages,
        [index]: null,
      }
      setFileErrors(newFileErrors)
    }
  }

  const handleNoteChange = (index: number, data: string) => {
    const plainText = data.replace(/<\/?[^>]+(>|$)/g, "")
    setValue(`note.${index}.text` as const, plainText)
  }

  const handleDetailsChange = (fieldName: DocumentFieldName, index: number, value: string) => {
    const detailsArray = value
      .split(",")
      .map((detail) => detail.trim())
      .filter((detail) => detail !== "")
    setValue(`${fieldName}.${index}.details`, detailsArray)
  }

  const onSubmit: SubmitHandler<VisaFormData> = async (data) => {
    console.log(data.images)


    // Check if all location images have both image and location
    const invalidLocations = data.locationImages.filter(
      (item) => !item.location.trim() || (!isFile(item.image) && !isStringUrl(item.image))
    );
    if (invalidLocations.length > 0) {
      toast.error("At lease one location image is required and all location images must have both an image and a location name");
      return;
    }
    console.log(data)
    try {
      const formData = new FormData()

      // Separate existing images (string URLs) from new uploads (File objects)
      const existingImages: string[] = data.images.filter((img): img is string => isStringUrl(img))

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

        // General images (existing ones)
        images: existingImages,

        // Location data (without images)
        locationImages: data.locationImages
          .filter((item) => item.location.trim())
          .map((item, index) => {
            // If image is a string URL, include it in the JSON
            const imageValue = isStringUrl(item.image) ? item.image : null
            return {
              id: index, // To match with uploaded files
              _id: item._id, // Include the original ID if it exists
              location: item.location,
              image: imageValue,
            }
          }),

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

      // General images (new uploads only)
      if (data.images && data.images.length > 0) {
        data.images.forEach((file, index) => {
          if (isFile(file) && file.size > 0) {
            formData.append(`images[${index}]`, file)
          }
        })
      }

      // Location images (new uploads only)
      data.locationImages.forEach((item, index) => {
        if (isFile(item.image) && item.image.size > 0) {
          formData.append(`locationImages[${index}]`, item.image)
        }
      })

      // Document icons for each section (new uploads only)
      appendDocumentFiles(formData, data.general_documents, "general_documents")
      appendDocumentFiles(formData, data.business_person, "business_person")
      appendDocumentFiles(formData, data.student, "student")
      appendDocumentFiles(formData, data.job_holder, "job_holder")
      appendDocumentFiles(formData, data.other_documents, "other_documents")

      // Add visa ID for update
      formData.append("visaId", visaData._id)

      const response = await updateVisa({ countryName: countryName, visaData: formData }).unwrap()
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
      .map((doc, index) => {
        // If icon is a string URL, include it in the JSON
        const iconValue = isStringUrl(doc.icon) ? doc.icon : null
        return {
          id: index, // To match with uploaded files
          _id: doc._id, // Include the original ID if it exists
          title: doc.title,
          details: doc.details.filter((detail: any) => detail?.trim().length > 0),
          icon: iconValue,
        }
      })
  }

  // Helper for appending document files
  const appendDocumentFiles = (formData: FormData, docs: any[], sectionName: string) => {
    docs.forEach((doc, index) => {
      if (isFile(doc.icon) && doc.icon.size > 0) {
        formData.append(`${sectionName}Icons[${index}]`, doc.icon)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-2 px-4 py-8 dark:bg-boxdark">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[1400px]" encType="multipart/form-data">
          {/* Add Error Summary at the top of the form */}
          <ErrorSummary errors={errors} title="Please fix the following errors:" />

          {/* Header Section */}
          <div className="mb-8 rounded-xl bg-white p-8 shadow-card transition-shadow hover:shadow-1 dark:bg-boxdark-2 dark:shadow-none dark:hover:shadow-none">
            <div className="">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <TextInput
                    name="countryName"
                    label="Country Name"
                    required
                    className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
                  />
                  <TextInput
                    name="title"
                    required
                    label="Title"
                    className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
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
                    className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
                  />
                  <TextInput
                    name="subtitle"
                    required
                    label="Subtitle"
                    className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
                  />
                </div>
                <div className="md:col-span-2">
                  <TextInput
                    name="description"
                    required
                    label="Description"
                    type="textarea"
                    className="min-h-[120px] bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
                  />
                </div>
                <div className=" md:col-span-2">
                  {noteFields.map((item, index) => (
                    <TextInput
                      type="textarea"
                      key={item.id}
                      name={`note.${index}.text`}
                      label={`Note`}
                      className="min-h-[120px] bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* General Information Section */}
          <div className="mb-8 rounded-xl bg-white p-8 shadow-card transition-shadow hover:shadow-1 dark:bg-boxdark-2 dark:shadow-none dark:hover:shadow-none">
            <h3 className="mb-6 text-xl font-semibold text-black dark:text-white">General Information</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                name="capital"
                required
                label="Capital"
                className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
              />
              <TextInput
                required
                name="time"
                label="Local Time"
                className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
              />
              <TextInput
                required
                name="telephone_code"
                label="Telephone Code"
                className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
              />
              <TextInput
                required
                name="bank_time"
                label="Bank Time"
                className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
              />
              <TextInput
                required
                type="textarea"
                name="embassy_address"
                label="Embassy Address"
                className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark lg:col-span-2"
              />
            </div>
          </div>

          {/* Visa Price Section */}
          <div className="mb-8 rounded-xl bg-white p-8 shadow-card transition-shadow hover:shadow-1 dark:bg-boxdark-2 dark:shadow-none dark:hover:shadow-none">
            <h3 className="mb-6 text-xl font-semibold text-black dark:text-white">Visa Price Information</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <TextInput
                required
                name="visaPrice_mainText"
                label="Main Text"
                className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
              />
              <TextInput
                required
                name="visaPrice_price"
                label="Price"
                className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
              />
              <TextInput
                required
                name="visaPrice_note"
                label="Note"
                className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark md:col-span-2"
              />
            </div>
          </div>

          {/* Location Images Section */}
          <Accordion title="Location Images">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {locationImageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="group relative overflow-hidden rounded-xl border border-stroke bg-white transition-shadow hover:shadow-md dark:border-strokedark dark:bg-boxdark-2"
                >
                  <div className="absolute right-2 top-1 ">
                    {locationImageFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (locationImagePreviews[index]) {
                            if (
                              typeof locationImagePreviews[index] === "string" &&
                              locationImagePreviews[index].startsWith("blob:")
                            ) {
                              URL.revokeObjectURL(locationImagePreviews[index])
                            }
                          }
                          const newPreviews = [...locationImagePreviews]
                          newPreviews.splice(index, 1)
                          setLocationImagePreviews(newPreviews)
                          removeLocation(index)
                        }}
                        className="hover:text-red-700 rounded-full bg-red p-1 text-white"
                      >
                        <MdClose />
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="relative">
                        {locationImagePreviews[index] ? (
                          <div className="relative overflow-hidden rounded-lg">
                            <Image
                              src={locationImagePreviews[index] || "/placeholder.svg" || "/placeholder.svg"}
                              alt={`Location ${index + 1}`}
                              width={400}
                              height={300}
                              className="h-48 w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeLocationImage(index)}
                              className="absolute right-2 top-2 rounded-full bg-red text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <MdClose />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <label
                              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed 
                              ${fileErrors.locationImages[index] ? "border-red-500" : "border-gray-300"} 
                              rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors`}
                            >
                              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <svg
                                  className={`w-10 h-10 mb-3 ${fileErrors.locationImages[index] ? "text-red-500" : "text-gray-400"}`}
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
                                onChange={(e) => handleLocationImageChange(index, e)}
                                className="hidden"
                              />
                            </label>
                            {fileErrors.locationImages[index] && (
                              <p className="text-sm text-red-500">{fileErrors.locationImages[index]}</p>
                            )}
                          </div>
                        )}
                      </div>
                      <TextInput
                        name={`locationImages.${index}.location`}
                        label="Location Name"
                        required
                        className="bg-gray-2 transition-colors focus:bg-white dark:bg-form-input dark:focus:bg-boxdark"
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
                  className="mr-2 h-5 w-5"
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
              <div className="space-y-2">
                <label
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed 
                  ${fileErrors.generalImages ? "border-red-500" : "border-gray-300"} 
                  rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors`}
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className={`w-12 h-12 mb-4 ${fileErrors.generalImages ? "text-red-500" : "text-gray-400"}`}
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
                    <p className="text-gray-500 mb-2 text-lg">Click to upload multiple images</p>
                    <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                    {imagePreviews.length > 0 && (
                      <p className="mt-2 text-sm font-medium text-teal-600">{imagePreviews.length} images uploaded</p>
                    )}
                  </div>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {fileErrors.generalImages && <p className="text-sm text-red-500">{fileErrors.generalImages}</p>}
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md"
                    >
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        width={300}
                        height={200}
                        className="h-48 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-red p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
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
                // fileError={fileErrors.general_documents[index]}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another General Document"
              icon={<FaPlus />}
              handleClick={() =>
                appendGeneralDocument({
                  title: "",
                  details: [""],
                  icon: {} as File,
                })
              }
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
                // fileError={fileErrors.business_person[index]}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Business Person Document"
              icon={<FaPlus />}
              handleClick={() =>
                appendBusinessDocument({
                  title: "",
                  details: [""],
                  icon: {} as File,
                })
              }
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
                // fileError={fileErrors.student[index]}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Student Document"
              icon={<FaPlus />}
              handleClick={() =>
                appendStudentDocument({
                  title: "",
                  details: [""],
                  icon: {} as File,
                })
              }
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
                // fileError={fileErrors.job_holder[index]}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Job Holder Document"
              icon={<FaPlus />}
              handleClick={() =>
                appendJobHolderDocument({
                  title: "",
                  details: [""],
                  icon: {} as File,
                })
              }
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
                // fileError={fileErrors.other_documents[index]}
              />
            ))}
            <Button
              btnType="button"
              containerStyles="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              title="Add Another Document"
              icon={<FaPlus />}
              handleClick={() =>
                appendOtherDocument({
                  title: "",
                  details: [""],
                  icon: {} as File,
                })
              }
            />
          </Accordion>
          {/* Submit Button */}
          <div className="mb-16 mt-12 flex justify-center">
            <Button
              btnType="submit"
              containerStyles={`
                ${isUpdating ? "bg-bodydark" : "bg-teal-600 hover:bg-teal-700"} 
                text-white font-medium py-2 px-6 rounded-lg shadow-1 
                hover:shadow-2 transition-all duration-300 flex items-center 
                justify-center min-w-[200px]
              `}
              textStyles="text-lg"
              title={isUpdating ? "Updating..." : "Update Visa Information"}
              // disabled={isUpdating}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

