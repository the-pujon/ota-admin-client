"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  name: string
  label: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url"
  required?: boolean
  className?: string
  labelClassName?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { name, label, type = "text", required = false, className = "", labelClassName = "", error, onChange, ...props },
    ref,
  ) => {
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

        <input id={name} type={type} {...register(name)} className={inputClassName} onChange={onChange} {...props} />

        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"

