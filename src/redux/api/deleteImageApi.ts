import axios from 'axios';
interface DeleteElement {
    countryId: string; 
    mediaType: any; 
    publicId: number; 
}

export const deleteMedia = async ({ countryId, mediaType, publicId }: DeleteElement) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/deleteMedia`, {
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
