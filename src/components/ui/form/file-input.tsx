"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "accept"> {
  name: string
  label: string
  accept?: string
  required?: boolean
  multiple?: boolean
  className?: string
  labelClassName?: string
  error?: string
  onFileSelect?: (files: FileList | null) => void
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      name,
      label,
      accept = "image/*",
      required = false,
      multiple = false,
      className = "",
      labelClassName = "",
      error,
      onFileSelect,
      onChange,
      ...props
    },
    ref,
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext()

    const { onChange: registerOnChange, ...registerProps } = register(name)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Call react-hook-form's onChange
      registerOnChange(e)

      // Call onFileSelect if provided
      if (onFileSelect) {
        onFileSelect(e.target.files)
      }

      // Call custom onChange if provided
      if (onChange) {
        onChange(e)
      }
    }

    const errorMessage = error || (errors[name]?.message as string)

    const inputClassName = `mt-1 block w-full text-sm text-gray-900 
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-teal-50 file:text-teal-700
      hover:file:bg-teal-100
      cursor-pointer
      ${errorMessage ? "border-red-500" : ""} 
      ${className}`

    const labelClasses = `block text-gray-700 font-normal text-[16px] ${labelClassName}`

    return (
      <div className="mb-4">
        <label htmlFor={name} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <input
          type="file"
          id={name}
          accept={accept}
          multiple={multiple}
          className={inputClassName}
          onChange={handleChange}
          {...registerProps}
          {...props}
        />

        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  },
)

FileInput.displayName = "FileInput"

