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
    countryId: string; // The ID of the country
    mediaType: any; // Specified media type
    publicId: number; // Public ID of the media to delete
}

export const deleteMedia = async ({ countryId, mediaType, publicId }: DeleteElement) => {
  try {
    const response = await axios.delete('http://localhost:4000/api/v1/visa/deleteMedia', {
      params: { // Use 'params' to send query parameters
        countryId,
        mediaType,
        publicId
      }
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error; // Rethrow the error
  }
};
