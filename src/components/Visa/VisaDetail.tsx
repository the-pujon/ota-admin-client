"use client"
import React from "react";
import Image from "next/image";
import VisaRequirementSection from "./VisaRequirementSection";

interface VisaInfo {
  countryName: string;
  visaType: string;
  subtitle: string;
  capital: string;
  time: string;
  telephone_code: string;
  embassy_address: string;
  visaPrice_price: string;
  visaPrice_note: string;
  description: string;
  images: string[];
  locationImages: { image: string; location: string }[];
  note: { text: string }[];
}

interface VisaRequirementCategory {
  title: string;
  details: string[];
  icon: string;
}

interface VisaRequirements {
  general_documents: VisaRequirementCategory[];
  business_person: VisaRequirementCategory[];
  student: VisaRequirementCategory[];
  job_holder: VisaRequirementCategory[];
  other_documents: VisaRequirementCategory[];
}

interface VisaDetailProps {
  visaInfo: VisaInfo;
  visaRequirements: VisaRequirements;
}

const VisaDetail: React.FC<VisaDetailProps> = ({ visaInfo, visaRequirements }) => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-gray-900">{visaInfo.countryName}</h2>
        <p className="text-lg text-gray-600 italic">{visaInfo.subtitle}</p>
        {/* <p className="text-lg text-gray-600 italic">{visaInfo.visaType}</p> */}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">Visa Information ({visaInfo.visaType})</h3>
        <p className="text-gray-600 my-4">{visaInfo.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium">
              Capital: <span className="text-gray-700">{visaInfo.capital}</span>
            </p>
            <p className="text-lg font-medium">
              Timezone: <span className="text-gray-700">{visaInfo.time}</span>
            </p>
            <p className="text-lg font-medium">
              Telephone Code: <span className="text-gray-700">{visaInfo.telephone_code}</span>
            </p>
            <p className="text-lg font-medium">
              Embassy Address: <span className="text-gray-700">{visaInfo.embassy_address}</span>
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">
              Visa Price: <span className="text-green-600">${visaInfo.visaPrice_price}</span>
            </p>
            <p className="text-md text-gray-500">
              <strong>Note:</strong> {visaInfo.visaPrice_note}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Explore Thailand</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visaInfo.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Visa Image ${index + 1}`}
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Popular Locations</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {visaInfo.locationImages.map((location, index) => (
            <div key={index} className="text-center">
              <Image
                src={location.image}
                alt={location.location}
                width={300}
                height={200}
                className="rounded-lg shadow-md mb-2"
              />
              <p className="text-gray-700">{location.location}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Important Notes</h3>
        <ul className="list-disc list-inside text-gray-600">
          {visaInfo.note.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Visa Requirements</h3>

        <VisaRequirementSection
          title="General Documents"
          requirements={visaRequirements.general_documents}
        />

        <VisaRequirementSection
          title="Business Person Documents"
          requirements={visaRequirements.business_person}
        />

        <VisaRequirementSection
          title="Student Documents"
          requirements={visaRequirements.student}
        />

        <VisaRequirementSection
          title="Job Holder Documents"
          requirements={visaRequirements.job_holder}
        />

        <VisaRequirementSection
          title="Other Documents"
          requirements={visaRequirements.other_documents}
        />
      </div>
    </div>
  );
};

export default VisaDetail;
