// "use client"
// import React from 'react';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';

// function MyForm() {
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       users: [{ name: '' }], // Ensure at least one field is initialized
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'users', // Name of the field array
//   });

//   const onSubmit = (data:any) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {fields.map((field, index) => (
//         <div key={field.id}>
//           <Controller
//             name={`users[${index}].name`}
//             control={control}
//             render={({ field }) => <input {...field} />}
//           />
//           {fields.length > 1 && (
//             <button type="button" onClick={() => remove(index)}>
//               Remove
//             </button>
//           )}
//         </div>
//       ))}
      
//       <button type="button" onClick={() => append({ name: '' })}>
//         Add Field
//       </button>
      
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default MyForm;
