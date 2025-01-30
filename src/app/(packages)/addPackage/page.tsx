"use client";
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  about: z.string().min(1, "About is required"),
  price: z.preprocess(
    (value) => Number(value),
    z.number().positive("Price must be greater than zero")
  ),
  highlights: z
    .array(
      z.object({
        title: z.string().min(1, "Highlight title is required"),
        description: z.string().min(1, "Highlight description is required"),
      })
    )
    .min(1, "At least one highlight is required"),
  inclusions: z
    .array(
      z.object({
        title: z.string().min(1, "Inclusions title is required"),
      })
    )
    .min(1, "At least one Inclusions is required"),
  exclusions: z
  .array(
    z.object({
      title: z.string().min(1, "Exclusions title is required"),
    })
  )
  .min(1, "At least one Exclusions is required"),
  cities: z
  .array(
    z.object({
      title: z.string().min(1, "Cities title is required"),
    })
  )
  .min(1, "At least one Cities is required"),
  importantNotes: z
  .array(
    z.object({
      title: z.string().min(1, "ImportantNotes title is required"),
    })
  )
  .min(1, "At least one ImportantNotes is required"),
  detailedItinerary: z.array(
    z.object({
      day: z.string().min(1, "Day is required"),
      title: z.string().min(1, "Itinerary title is required"),
      description: z.string().min(1, "Itinerary description is required"),
    })
  ),
  category: z.string().min(1, "Category is required"), // New select field
  duration: z.string().min(1, "Category is required"), // New select field
  images: z
    .array(
      z.object({
        file: z.instanceof(File).nullable(),
      })
    )
    .length(4, "Exactly 4 images are required")
    .refine(
      (images) => images.every((image) => image.file),
      "All images must have a file"
    ),
});

type FormSchema = z.infer<typeof formSchema>;

const DynamicForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      about: "",
      price: 0,
      highlights: [{ title: "", description: "" }],
      inclusions: [{ title: ""}],
      exclusions: [{ title: ""}],
      cities: [{ title: ""}],
      importantNotes: [{ title: ""}],
      detailedItinerary: [{ day: "", title: "", description: "" }],
      category: "", // Default value for the select field
      duration: "", // Default value for the select Duration
      images: [{ file: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images", // Field array name
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });

  const {
    fields: inclusionFields,
    append: appendInclusion,
    remove: removeInclusion,
  } = useFieldArray({
    control,
    name: "inclusions",
  });

  const {
    fields: exclusionFields,
    append: appendExclusion,
    remove: removeExclusion,
  } = useFieldArray({
    control,
    name: "exclusions",
  });
  const {
    fields: citiesFields,
    append: appendcities,
    remove: removecities,
  } = useFieldArray({
    control,
    name: "cities",
  });

  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: "importantNotes",
  });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control,
    name: "detailedItinerary",
  });

  const onSubmit = async (data: FormSchema) => {
    console.log("data.... :", data)
    setLoading(true);
    console.log("Form Data:", data);

    const formData = new FormData();

    // Append simple fields
    formData.append("title", data.title);
    formData.append("about", data.about);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    formData.append("duration", data.duration);

    // Append array fields
    data.highlights.forEach((highlight, index) => {
      formData.append(`highlights[${index}][title]`, highlight.title);
      formData.append(
        `highlights[${index}][description]`,
        highlight.description
      );
    });

    data.inclusions.forEach((inclusion, index) => {
      formData.append(`inclusions[${index}][title]`, inclusion.title);
    });

    data.exclusions.forEach((exclusion, index) => {
      formData.append(`exclusions[${index}][title]`, exclusion.title);
    });

    data.cities.forEach((city, index) => {
      formData.append(`cities[${index}][title]`, city.title);
    });

    data.importantNotes.forEach((note, index) => {
      formData.append(`importantNotes[${index}][title]`, note.title);
    });

    data.detailedItinerary.forEach((itinerary, index) => {
      formData.append(`detailedItinerary[${index}][day]`, itinerary.day);
      formData.append(`detailedItinerary[${index}][title]`, itinerary.title);
      formData.append(
        `detailedItinerary[${index}][description]`,
        itinerary.description
      );
    });

    // Append images
    data.images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    // console formdata
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/package/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload Failed: " + response.statusText);
      }

      const responseData = await response.json();
      console.log("Upload Success:", responseData);
    } catch (error) {
      console.error("Upload Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen flex justify-center items-start mt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title")}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        {/* Title End */}
        {/* About */}
        <div>
          <label className="block text-sm font-medium">About</label>
          <textarea
            {...register("about")}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter about text"
          />
          {errors.about && (
            <p className="text-red-500 text-sm">{errors.about.message}</p>
          )}
        </div>
        {/* About End */}
        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            {...register("price")}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter price"
            type="number"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price?.message}</p>
          )}
        </div>
        {/* Price End*/}
        {/* Highlights */}
        <div>
          <label className="block text-sm font-medium">Highlights</label>
          {highlightFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 mb-2">
              <input
                {...register(`highlights.${index}.title`)}
                className="border border-gray-300 rounded p-2 w-1/2"
                placeholder="Highlight Title"
              />
              <input
                {...register(`highlights.${index}.description`)}
                className="border border-gray-300 rounded p-2 w-1/2"
                placeholder="Highlight Description"
              />
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendHighlight({ title: "", description: "" })}
            className="text-blue-500"
          >
            Add Highlight
          </button>
        </div>
        {/* Highlights End */}
        {/* Inclusions */}
        <div>
          <label className="block text-sm font-medium">Inclusions</label>
          {inclusionFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 mb-2">
              <input
                {...register(`inclusions.${index}.title`)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Inclusion"
              />
              <button
                type="button"
                onClick={() => removeInclusion(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendInclusion({ title: ""})}
            className="text-blue-500"
          >
            Add Inclusion
          </button>
        </div>
        {/* Inclusions End */}
        {/* Exclusions */}
        <div>
          <label className="block text-sm font-medium">Exclusions</label>
          {exclusionFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 mb-2">
              <input
                {...register(`exclusions.${index}.title`)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Exclusion"
              />
              <button
                type="button"
                onClick={() => removeExclusion(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendExclusion({ title: ""})}
            className="text-blue-500"
          >
            Add Exclusion
          </button>
        </div>
        {/* Exclusions End*/}

        {/* Cities */}
        <div>
          <label className="block text-sm font-medium">Cities</label>
          {citiesFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 mb-2">
              <input
                {...register(`cities.${index}.title`)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Exclusion"
              />
              <button
                type="button"
                onClick={() => removecities(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendcities({ title: ""})}
            className="text-blue-500"
          >
            Add Cities
          </button>
        </div>
        {/* Cities End*/}

        {/* Important Notes */}
        <div>
          <label className="block text-sm font-medium">Important Notes</label>
          {noteFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 mb-2">
              <input
                {...register(`importantNotes.${index}.title`)}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Note"
              />
              <button
                type="button"
                onClick={() => removeNote(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendNote({ title: ""})}
            className="text-blue-500"
          >
            Add Note
          </button>
        </div>
        {/* Important Notes End */}

        {/* Detailed Itinerary */}
        <div>
          <label className="block text-sm font-medium">
            Detailed Itinerary
          </label>
          {itineraryFields.map((field, index) => (
            <div key={field.id} className="space-y-2 mb-4">
              <div className=" flex justify-center items-start w-full">
                <div className=" flex flex-col justify-start items-start w-full">
                  <input
                    {...register(`detailedItinerary.${index}.day`)}
                    className="border border-gray-300 rounded p-2 w-full"
                    placeholder="Day"
                  />
                  <input
                    {...register(`detailedItinerary.${index}.title`)}
                    className="border border-gray-300 rounded p-2 w-full"
                    placeholder="Itinerary Title"
                  />
                  <textarea
                    {...register(`detailedItinerary.${index}.description`)}
                    className="border border-gray-300 rounded p-2 w-full"
                    placeholder="Itinerary Description"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItinerary(index)}
                  className="text-red-500 ml-3"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendItinerary({ day: "", title: "", description: "" })
            }
            className="text-blue-500"
          >
            Add Detailed Itinerary
          </button>
        </div>
        {/* Detailed Itinerary End */}
        {/* Select Option (Category) */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            {...register("category")}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select a category</option>
            <option value="adventure">Adventure</option>
            <option value="beach">Beach</option>
            <option value="cultural">Cultural</option>
            <option value="wildlife">Wildlife</option>
            <option value="historical">Historical</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <select
            {...register("duration")}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select a duration</option>
            <option value="3 day 2 night">3 day 2 night</option>
            <option value="4 day 3 night">4 day 3 night</option>
            <option value="5 day 4 night">5 day 4 night</option>
            <option value="5 day 4 night">5 day 4 night</option>
            <option value="7 day 6 night">7 day 6 night</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.duration?.message}</p>
          )}
        </div>
        {/* images */}

        <div>
          <label className="block font-medium">Images</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 mb-2">
              <Controller
                control={control}
                name={`images.${index}.file`}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                    className="file-input"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          {errors.images && (
            <p className="text-red-500">{errors.images.message}</p>
          )}
          <button
            type="button"
            onClick={() => append({ file: null })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Image
          </button>
        </div>

        {/* images */}
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Loading ...." : "Submit Here"}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
