import { baseApi } from "@/redux/api/baseApi";
import axios, { AxiosError } from 'axios';  
import { getBaseUrl } from '@/helpers/config/envConfig';

const visaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // addVisa: build.mutation({
    //   query: (formData) => ({
    //     url: "/visa/addVisaInfo",
    //     method: "POST",
    //     body: formData,
    //     // headers: {
    //     //   'Content-Type': 'multipart/form-data', 
    //     // },
    //   }),
    //   invalidatesTags: ["visa"], 
    // }),
    // addVisa: build.mutation({
    //   queryFn: async (formData): Promise<{ data: unknown } | { error: { status: number; data: unknown } }> => {
    //     try {
    //       const baseUrl = getBaseUrl();
    //       // const response = await axios.post('https://tpn-ota-backend.vercel.app/api/v1/visa/addVisaInfo', formData);
    //       const response = await axios.post('http://localhost:4000/api/v1/visa/addVisaInfo', formData);
    //       return { data: response.data }; 
    //     } catch (err) {
    //       const error = err as AxiosError; 
    //       return {
    //         error: {
    //           status: error.response?.status || 500,
    //           data: error.response?.data || error.message,
    //         },
    //       };
    //     }
    //   },
    // }),

    addVisa: build.mutation({
      queryFn: async (formData): Promise<{ data: unknown } | { error: { status: number; data: unknown } }> => {
        try {
          const baseUrl = getBaseUrl();
          const response = await fetch(`${baseUrl}/visa/addVisaInfo`, {
            method: 'POST',
            body: formData, 
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          return { data };
        } catch (err) {
          return {
            error: {
              status: (err as any).status || 500,
              data: err || 'Something went wrong!',
            },
          };
        }
      },
    }),
    updateVisa: build.mutation({
      queryFn: async (formDataToSend): Promise<{ data: unknown } | { error: { status: number; data: unknown } }> => {
        try {
          const baseUrl = getBaseUrl();
          const response = await fetch(`${baseUrl}/visa/${formDataToSend.countryName}`, {
            method: 'PUT',
            body: formDataToSend, 
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          return { data };
        } catch (err) {
          return {
            error: {
              status: (err as any).status || 500,
              data: err || 'Something went wrong!',
            },
          };
        }
      },
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

export const { useAddVisaMutation,useListVisaMutation,useEditVisaMutation, useViewVisaMutation, useUpdateVisaMutation } = visaApi
