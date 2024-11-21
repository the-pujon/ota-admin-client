"use client"
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';



interface InputProps {
    name: string;
    label: string;
    type?: string;
  }
  
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
  
const TextInput: React.FC<InputProps> = ({ name, label, type = 'text' }) => {
    const { register, formState: { errors } } = useFormContext();
  
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
            // defaultValue={name}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4} required
          />
        ) : (
          <input
            id={name}
            required
            type={type}
            // defaultValue={name}
            {...register(name)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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


// const FileInput: React.FC<FileInputProps> = ({ label, name, control, multiple = false }) => {
//   const { field } = useController({ name, control });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       if (multiple) {
//         field.onChange(Array.from(files)); // For multiple file upload
//       } else {
//         field.onChange(files[0]); // For single file upload
//       }
//     }
//   };

//   return (
//     <div>
//       <label>{label}</label>
//       <input
//         type="file"
//         accept="image/*"
//         multiple={multiple}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };


// const FileInput: React.FC<FileInputProps> = ({ label, control, name, rules, multiple = false }) => {
//   const { field } = useController({ name, control, rules });
//   const [previews, setPreviews] = useState<string[]>([]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length) {
//       field.onChange(multiple ? files : files[0]);

//       // Generate preview URLs
//       const previewUrls = files.map((file) => URL.createObjectURL(file));
//       setPreviews(previewUrls);
//     }
//   };

//   return (
//     <div className="file-input">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <input
//       // name={name}
//         type="file"
//         onChange={handleFileChange}
//         // onChange={(name) => handleFileChange(name)} 
//         className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
//         accept="image/*"
//         multiple={multiple}
//       />
//       <div className="flex flex-wrap gap-4 mt-2">
//         {previews.map((preview:any, index:any) => (
//           <img key={index} src={preview} alt={`File Preview ${index + 1}`} className="w-40 h-auto" />
//         ))}
//       </div>
//     </div>
//   );
// };

// const FileInput: React.FC<FileInputProps> = ({ label, control, name, rules, multiple = false }) => {
//   const { field } = useController({ name, control, rules });
//   const [previews, setPreviews] = useState<string[]>([]);

//   // Clean up object URLs to avoid memory leaks
//   useEffect(() => {
//     return () => {
//       previews.forEach(preview => URL.revokeObjectURL(preview));
//     };
//   }, [previews]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length) {
//       // Handle controlled input state
//       field.onChange(multiple ? files : files[0]);

//       // Generate preview URLs
//       const previewUrls = files.map((file) => URL.createObjectURL(file));
//       setPreviews(previewUrls);
//     }
//   };

//   return (
//     <div className="file-input">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <input
//         name={name}  // Make sure the name is applied correctly
//         type="file"
//         onChange={handleFileChange}
//         className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
//         accept="image/*"
//         multiple={multiple}
//       />
//       <div className="flex flex-wrap gap-4 mt-2">
//         {previews.map((preview, index) => (
//           <img key={index} src={preview} alt={`File Preview ${index + 1}`} className="w-40 h-auto" />
//         ))}
//       </div>
//     </div>
//   );
// };




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