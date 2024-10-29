import axios from 'axios';
const API_URL = 'http://localhost:4000/api/v1'; 

interface deleteElements{
    countryName: string,
    elementType: string,
    elementIndex: string
}


export const deleteVisaElement = async ({countryName, elementType, elementIndex}: deleteElements) => {
  const response = await axios.delete(
    `${API_URL}/visa/${countryName}/element/${elementType}/${elementIndex}`
  );
  return response.data;
};

export const deleteVisaRequirementIcon = async ({countryName, documentType, iconIndex} deleteElements) => {
  const response = await axios.delete(
    `${API_URL}/visa/${countryName}/requirement/${documentType}/icon/${iconIndex}`
  );
  return response.data;
};
