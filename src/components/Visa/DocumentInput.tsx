"use client";

import type React from "react";
import Image from "next/image";
import { TextInput } from "../ui/form/text-input";
import { MdClose } from "react-icons/md";
import { useFormContext } from "react-hook-form";

type DocumentFieldName =
  | "general_documents"
  | "business_person"
  | "student"
  | "job_holder"
  | "other_documents";

interface DocumentSectionProps {
  fieldName: DocumentFieldName;
  index: number;
  iconPreview: string | undefined;
  handleFileUpload: (
    fieldName: DocumentFieldName,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  removeIcon: (fieldName: DocumentFieldName, index: number) => void;
  handleDetailsChange: (
    fieldName: DocumentFieldName,
    index: number,
    value: string,
  ) => void;
  // removeGeneralDocument: any;
  removeDocument: (fieldName: DocumentFieldName, index: number) => void,
  length: number;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({
  fieldName,
  index,
  iconPreview,
  handleFileUpload,
  removeIcon,
  handleDetailsChange,
  // removeGeneralDocument,
  removeDocument,
  length
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  console.log(length)

  // Get the current details value and convert it to a string representation
  const detailsValue = getValues(`${fieldName}.${index}.details`) || [];
  // Join the array with commas to display in the textarea
  const defaultDetailsValue = Array.isArray(detailsValue)
    ? detailsValue.join(", ")
    : detailsValue;

  // Get error messages from form context
  const fieldErrors = errors[fieldName] as Record<string, any> | undefined;
  const indexErrors = fieldErrors?.[index] as Record<string, any> | undefined;

  const titleError = indexErrors?.title?.message as string | undefined;

  // For array fields, the error could be on the array itself or on individual items
  let detailsError: string | undefined;

  if (indexErrors?.details) {
    const detailsErrors = indexErrors.details;

    // Check if it's a direct message
    if (typeof detailsErrors.message === "string") {
      detailsError = detailsErrors.message;
    }
    // Check if it has a root message
    else if (detailsErrors.root?.message) {
      detailsError = detailsErrors.root.message;
    }
    // Check if it has array item errors
    else if (typeof detailsErrors === "object") {
      // Try to find any error message in the object
      for (const key in detailsErrors) {
        if (detailsErrors[key]?.message) {
          detailsError = detailsErrors[key].message;
          break;
        }
      }
    }
  }

  return (
    <div className="border-gray-200 mb-6 rounded-lg border p-4 shadow-sm">
      {/* <button
          type="button"
          onClick={() => removeDocument(fieldName, index)}
          className="text-red-500 hover:text-red-700"
        >
          <MdClose size={24} />
        </button> */}
        {
          length > 1 && <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-black dark:text-white">Document {index + 1}</h4>
          <button
            type="button"
            onClick={() => removeDocument(fieldName, index)}
            className="text-red-500 hover:text-red-700"
          >
            <MdClose size={24} />
          </button>
        </div>
        }
      <div className="space-y-4">
        <TextInput
          name={`${fieldName}.${index}.title`}
          label="Document Title"
          error={titleError}
          required
        />

        <div className="space-y-2">
          <label className="text-gray-700 block text-sm font-medium">
            Document Icon
          </label>
          <div className="flex items-center space-x-4">
            {iconPreview ? (
              <div className="relative">
                <Image
                  src={iconPreview || "/placeholder.svg"}
                  alt={`Icon Preview ${index + 1}`}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeIcon(fieldName, index)}
                  className="absolute -right-2 -top-2 rounded-full bg-red p-1 text-white"
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label className="border-gray-300 bg-gray-50 hover:bg-gray-100 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md border-2 border-dashed">
                <svg
                  className="text-gray-500 h-5 w-5"
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(fieldName, index, e)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div>
          <TextInput
            label="Document Details (separate multiple details with commas)"
            type="textarea"
            defaultValue={defaultDetailsValue}
            error={detailsError}
            required
            // Use normal onChange instead of register's onChange to fix the issue
            {...register(`${fieldName}.${index}.details`)}
            // Only process the comma-separated value on blur, not while typing
            onBlur={(e) =>
              handleDetailsChange(fieldName, index, e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentSection;
