import { baseApi } from "./api/baseApi"

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url:"/auth/login",
        method:"POST",
        data:loginData,
      }),
      invalidatesTags:['user']
    }),
    
    userLogout: build.mutation({
      query: () => ({
        url:"/auth/logout",
        method:"POST",
      }),
      invalidatesTags:['user']
    }),
        
  }),

})

export const { useUserLoginMutation,useUserLogoutMutation } = authApi
