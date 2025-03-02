import type React from "react"
import Image from "next/image"
import { TextInput } from "../ui/form/text-input"
import { MdClose } from "react-icons/md"
type DocumentFieldName = "general_documents" | "business_person" | "student" | "job_holder" | "other_documents"
interface DocumentSectionProps {
  fieldName: DocumentFieldName
  index: number
  iconPreview: string | undefined
  handleFileUpload: (fieldName: DocumentFieldName, index: number, e: React.ChangeEvent<HTMLInputElement>) => void
  removeIcon: (fieldName: DocumentFieldName, index: number) => void
  handleDetailsChange: (fieldName: DocumentFieldName, index: number, detailIndex: number, value: string) => void
  generalDocumentsFieldsLength?: number
  removeGeneralDocument?: (index: number) => void
}

const DocumentSection: React.FC<DocumentSectionProps> = ({
  fieldName,
  index,
  iconPreview,
  handleFileUpload,
  removeIcon,
  handleDetailsChange,
  generalDocumentsFieldsLength,
  removeGeneralDocument,
}) => {
  return (
    <div className="mb-6  rounded-lg p-4 shadow-sm">
        {
            fieldName === "general_documents" && <div className="flex justify-between items-center mb-4">
            <h4 className="text-base font-medium">Document {index + 1}</h4>
            {generalDocumentsFieldsLength && removeGeneralDocument && generalDocumentsFieldsLength > 1 && (
              <button
                type="button"
                onClick={() => removeGeneralDocument(index)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        }
      <div className="space-y-4">
        <TextInput required name={`${fieldName}.${index}.title`} label="Document Title" className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Document Icon</label>
          <div className="flex items-center space-x-4">
            {iconPreview ? (
              <div className="relative">
                <Image
                  src={iconPreview || "/placeholder.svg"}
                  alt={`Icon Preview ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeIcon(fieldName, index)}
                  className="absolute -top-2 -right-2 bg-red text-white p-1 rounded-full"
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-12 h-12 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-500"
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
                  required
                  onChange={(e) => handleFileUpload(fieldName, index, e)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <TextInput
          name={`${fieldName}.${index}.details.${index}`}
          label="Document Details (Comma separated)"
          required
          type="textarea"
          onChange={(e) => handleDetailsChange(fieldName, index, 0, e.target.value)}
          className="bg-gray-2 dark:bg-form-input focus:bg-white dark:focus:bg-boxdark transition-colors"
        />
      </div>
    </div>
  )
}

export default DocumentSection

