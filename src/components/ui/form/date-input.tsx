"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  name: string
  label: string
  required?: boolean
  className?: string
  labelClassName?: string
  error?: string
  minDate?: string
  maxDate?: string
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ name, label, required = false, className = "", labelClassName = "", error, minDate, maxDate, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext()

    const errorMessage = error || (errors[name]?.message as string)

    const inputClassName = `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
      disabled:opacity-50 disabled:cursor-not-allowed
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
          type="date"
          id={name}
          min={minDate}
          max={maxDate}
          {...register(name)}
          className={inputClassName}
          {...props}
        />
        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  },
)

DateInput.displayName = "DateInput"

