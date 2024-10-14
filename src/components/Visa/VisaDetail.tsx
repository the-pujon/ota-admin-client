"use client"

import React from 'react';

// Define interfaces for your data
interface VisaInfo {
  countryName: string;
  visaPrice_price: string;
  visaPrice_note: string;
}

interface VisaRequirements {
  // Define the structure of your visa requirements based on your API response
  requirementList: string[];
  additionalNotes?: string;
}

interface VisaDetailProps {
  visaInfo: VisaInfo;
  visaRequirements: VisaRequirements;
}

const VisaDetail: React.FC<VisaDetailProps> = ({ visaInfo, visaRequirements }) => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">{visaInfo.countryName}</h2>
      <p><strong>Visa Price:</strong> ${visaInfo.visaPrice_price}</p>
      <p><strong>Visa Price Note:</strong> {visaInfo.visaPrice_note}</p>
      <h3 className="mt-4">Visa Requirements:</h3>
      <pre>{JSON.stringify(visaRequirements, null, 2)}</pre>
      {/* You can format the requirements more nicely as per your needs */}
    </div>
  );
};

export default VisaDetail;