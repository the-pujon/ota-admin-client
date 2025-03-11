import { baseApi } from "./baseApi";

const visaApiV2 = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addVisa: build.mutation({
      query: (data) => {
        console.log("Data being sent to API:", data);
        return {
          url: "/visa/v2/addVisaInfo",
          method: "POST",
          data,
          contentType: "multipart/form-data",
        };
      },
    }),
    visaList: build.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/visa/v2/countries/allVisaData?page=${page}&limit=${limit}`,
        // url:"/visa/countries/allVisaData",
        method: "GET",
      }),
      providesTags: ["visa"],
    }),
    visaDetailsByCountry: build.query({
      query: (data) => {
        console.log(data);
        return {
          url: `/visa/v2/${data.countryName}`,
          method: "GET",
        };
      },
    }),
    visaDeleteByCountry: build.mutation({
      query: (data) => {
        return {
          url: `/visa/v2/${data.countryName}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["visa"],
    }),
    updateVisaByCountry: build.mutation({
      query: (data) => {
        return {
          url: `/visa/v2/${data.countryName}`,
          method: "PUT",
          data: data.visaData,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: ["visa"],
    })
  }),
});

export const {
  useAddVisaMutation,
  useVisaListQuery,
  useVisaDetailsByCountryQuery,
  useVisaDeleteByCountryMutation,
  useUpdateVisaByCountryMutation,
} = visaApiV2;
