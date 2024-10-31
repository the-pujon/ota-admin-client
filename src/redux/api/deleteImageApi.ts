// import axios from 'axios';
// const API_URL = 'http://localhost:4000/api/v1'; 

// interface deleteElements{
//     countryName: string,
//     elementType: string,
//     elementIndex: number
//     documentType:string
//     iconIndex:number
// }


// export const deleteVisaElement = async ({countryName, elementType, elementIndex}: deleteElements) => {
//   const response = await axios.delete(
//     `${API_URL}/visa/${countryName}/element/${elementType}/${elementIndex}`
//   );
//   return response.data;
// };


// export const deleteVisaRequirementIcon = async ({countryName, documentType, iconIndex} : deleteElements) => {
//   const response = await axios.delete(
//     `${API_URL}/visa/${countryName}/requirement/${documentType}/icon/${iconIndex}`
//   );
//   return response.data;
// };

import axios from 'axios';

interface DeleteElement {
    countryId: string; 
    mediaType: any; 
    publicId: number; 
}

export const deleteMedia = async ({ countryId, mediaType, publicId }: DeleteElement) => {
  try {
    
    // const response = await axios.delete('http://localhost:4000/api/v1/visa/deleteMedia', {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/deleteMedia`, {
      params: { 
        countryId,
        mediaType,
        publicId
      }
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error; 
  }
};
