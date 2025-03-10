"use client"

import { useState } from "react"
// import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import type { FieldErrors } from "react-hook-form"
import { FiAlertCircle, FiChevronDown, FiChevronUp } from "react-icons/fi"

interface ErrorSummaryProps {
  errors: FieldErrors
  title?: string
}

const ErrorSummary = ({ errors, title = "Form Errors" }: ErrorSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Flatten nested errors into a simple array
  const flattenErrors = (obj: any, path = ""): { path: string; message: string }[] => {
    if (!obj) return []

    return Object.entries(obj).reduce((acc: { path: string; message: string }[], [key, value]: [string, any]) => {
      const currentPath = path ? `${path}.${key}` : key

      if (value && typeof value === "object" && !value.message) {
        return [...acc, ...flattenErrors(value, currentPath)]
      }

      if (value && value.message) {
        return [...acc, { path: currentPath, message: value.message as string }]
      }

      return acc
    }, [])
  }

  const errorList = flattenErrors(errors)

  if (errorList.length === 0) return null

  return (
    <div className="mb-6 border border-red-300 rounded-lg overflow-hidden bg-red-50">
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-3 bg-red-100 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center text-red-800 font-medium">
          <FiAlertCircle className="h-5 w-5 mr-2" />
          {title} ({errorList.length})
        </span>
        {isOpen ? <FiChevronUp className="h-5 w-5 text-red-800" /> : <FiChevronDown className="h-5 w-5 text-red-800" />}
      </button>

      {isOpen && (
        <div className="p-4">
          <ul className="list-disc pl-5 space-y-1">
            {errorList.map((error, index) => (
              <li key={index} className="text-red-700">
                <span className="font-medium">{error.path}:</span> {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ErrorSummary

