import axios from 'axios';
interface DeleteElement {
    countryId: string;
    mediaType: string;
    publicId: string;
    documentCategory?: string; 
    documentTitle?: string;    
}

export const deleteMedia = async ({ countryId, mediaType, publicId, documentCategory, documentTitle }: DeleteElement) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/deleteMedia`, {
      params: { 
        countryId,
        mediaType,
        publicId,
        documentCategory, 
        documentTitle
      }
    });
    console.log("Country ID:", countryId, "Media Type:", mediaType, "Public ID:", publicId);


    return response.data; 

  } catch (error:any) {
    console.error("Error deleting media:", error.response ? error.response.data : error.message);
    throw error; 
  }
  
};
