"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface SelectInputProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "options"> {
  name: string
  label: string
  options: SelectOption[]
  required?: boolean
  className?: string
  labelClassName?: string
  error?: string
  placeholder?: string
}

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    { name, label, options, required = false, className = "", labelClassName = "", error, placeholder, ...props },
    ref,
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext()

    const errorMessage = error || (errors[name]?.message as string)

    const selectClassName = `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
      disabled:opacity-50 disabled:cursor-not-allowed
      ${errorMessage ? "border-red-500" : ""} 
      ${className}`

    const labelClasses = `block text-gray-700 font-medium text-lg ${labelClassName}`

    return (
      <div className="mb-4">
        <label htmlFor={name} className={labelClasses}>
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
        <select id={name} {...register(name)} className={selectClassName} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  },
)

SelectInput.displayName = "SelectInput"

