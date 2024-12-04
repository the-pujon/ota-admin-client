import { baseApi } from "@/redux/api/baseApi";

const visaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addVisa: build.mutation({
      query: (formData) => ({
        url: "/visa/addVisaInfo",
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }),
      invalidatesTags: ["visa"], 
    }),
    
    listVisa: build.mutation({
      query: () => ({
        url:"/visa/countries/allVisaData",
        method:"GET",
      }),
      invalidatesTags:['visa']
    }),

    editVisa: build.mutation({
      query: (countryName) => ({
        url: `/visa/${countryName}`,
        method:"GET",
        // data:data,
      }),
      invalidatesTags:['visa']
    }),

    viewVisa: build.mutation({
      query: (countryName) => ({
        url: `/visa/${countryName}`,
        method:"GET",
        // data:data,
      }),
      invalidatesTags:['visa']
    }),
        
  }),

})

export const { useAddVisaMutation,useListVisaMutation,useEditVisaMutation, useViewVisaMutation } = visaApi
