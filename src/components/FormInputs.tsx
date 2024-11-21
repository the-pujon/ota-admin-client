"use client"
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';


  interface SelectProps {
    name: string;
    label: string;
    options: { value: string | number; label: string }[];
  }
  
  interface FileInputProps {
    name: string;
    label: string;
    multiple?: boolean; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  interface InputProps {
    name: string;
    label: string;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  }
  
  const TextInput: React.FC<InputProps> = ({ name, label, type = 'text', onChange }) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
  
    const isTextArea = type === 'textarea';
  
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 font-normal text-[16px]">
          {label}*
        </label>
  
        {isTextArea ? (
          <textarea
            id={name}
            {...register(name)}
            onChange={(e) => {
              // Call the provided onChange if it exists
              if (onChange) onChange(e);
            }}

            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
            required
          />
        ) : (
          <input
            id={name}
            type={type}
            {...register(name)}
            onChange={(e) => {
              // Call the provided onChange if it exists
              if (onChange) onChange(e);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        )}
  
        {errors[name] && (
          <span className="text-red text-sm">{(errors[name] as any).message}</span>
        )}
      </div>
    );
  };
  

const SelectInput: React.FC<SelectProps> = ({ name, label, options }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}:
            </label>
            <select
                id={name}
                {...register(name)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && <span className="text-red-600 text-sm">{(errors[name] as any).message}</span>}
        </div>
    );
};

const DateInput: React.FC<InputProps> = ({ name, label }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}:
            </label>
            <input
                id={name}
                type="date"
                {...register(name)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors[name] && <span className="text-red-600 text-sm">{(errors[name] as any).message}</span>}
        </div>
    );
};
const FileInput: React.FC<FileInputProps> = ({ name, label, multiple = false, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        multiple={multiple} 
        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 cursor-pointer focus:outline-none"
        onChange={onChange}
        accept="image/*"
      />
    </div>
  );
};

export { TextInput, SelectInput, DateInput, FileInput };