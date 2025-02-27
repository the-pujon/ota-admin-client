"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  required?: boolean
  className?: string
  labelClassName?: string
  error?: string
  rows?: number
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { name, label, required = false, className = "", labelClassName = "", error, rows = 4, onChange, ...props },
    ref,
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext()

    const errorMessage = error || (errors[name]?.message as string)

    const textareaClassName = `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
      disabled:opacity-50 disabled:cursor-not-allowed resize-vertical
      ${errorMessage ? "border-red-500" : ""} 
      ${className}`

    const labelClasses = `block text-gray-700 font-normal text-[16px] ${labelClassName}`

    return (
      <div className="mb-4">
        <label htmlFor={name} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <textarea
          id={name}
          {...register(name)}
          className={textareaClassName}
          rows={rows}
          onChange={onChange}
          {...props}
        />

        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  },
)

Textarea.displayName = "Textarea"

