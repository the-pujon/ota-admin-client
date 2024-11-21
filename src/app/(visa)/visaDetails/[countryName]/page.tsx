"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import VisaDetail from "@/components/Visa/VisaDetail";
import axios from "axios";


interface VisaInfo {
  countryName: string;
  subtitle: string;
  visaType: string;
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


const fetchVisaData = async (countryName: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${countryName}`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch visa info');
  }
  return response.data.data;
};


// const VisaPage = ({ params }: { params: { countryName: string } }) => {
const VisaPage = ({ params }: any) => {
  const { countryName } = params;
  
  const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);
  const [visaRequirements, setVisaRequirements] = useState<VisaRequirements | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVisaData = async () => {
      try {
        const { visaInfo, visaRequirements } = await fetchVisaData(countryName);
        setVisaInfo(visaInfo);
        setVisaRequirements(visaRequirements);
      } catch (error) {
        console.error("Error fetching visa data:", error);
        setError("Error fetching visa information. Please try again later.");
      }
    };

    getVisaData();
  }, [countryName]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName={`Visa List / Visa Details for ${countryName}`} />
        {error ? (
          <div>{error}</div>
        ) : visaInfo && visaRequirements ? (
          <VisaDetail visaInfo={visaInfo} visaRequirements={visaRequirements} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default VisaPage;
