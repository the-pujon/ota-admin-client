// src/components/Visa/ClientEditVisaWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import `EditVisa` with client-side rendering only
const EditVisa = dynamic(() => import("./EditVisa"), { ssr: false });

interface VisaInfo {
  countryName: string;
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

interface ClientEditVisaWrapperProps {
  visaInfo: VisaInfo;
  visaRequirements: VisaRequirements;
}

const ClientEditVisaWrapper: React.FC<ClientEditVisaWrapperProps> = ({ visaInfo, visaRequirements }) => {
  return <EditVisa visaInfo={visaInfo} visaRequirements={visaRequirements} />;
};

export default ClientEditVisaWrapper;
