import axios from 'axios';

interface DeleteElement {
    countryId: string;
    mediaType: string;
    publicId: number;
}

export const deleteMedia = async ({ countryId, mediaType, publicId }: DeleteElement) => {
  try {
    const response = await axios.delete('http://localhost:4000/api/v1/visa/deleteMedia', {
      params: {
        countryId,
        mediaType,
        publicId
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error; 
  }
};
