"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import EditVisa from "@/components/Visa/EditVisa";
 
interface VisaInfo {
  countryName: string;
  subtitle: string;
  // visaType: string;
  capital: string;
  time: string;
  telephone_code: string;
  embassy_address: string;
  visaPrice_price: string;
  visaPrice_note: string;
  description: string;
  images: string[];
  locationImages: { image: string; location: string,}[];
  note: { text: string }[];
}

interface VisaRequirementCategory {
  title: string;
  details: string[];
  icon: string;
}

interface VisaRequirements {
  VisaInfo: string;
  VisaRequirementCategory: string;
  general_documents: VisaRequirementCategory[];
  business_person: VisaRequirementCategory[];
  student: VisaRequirementCategory[];
  job_holder: VisaRequirementCategory[];
  other_documents: VisaRequirementCategory[];
}
 
const fetchVisaData = async (countryName: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${countryName}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch visa info");
  }
  console.log("Fetch: ",response.data.data);
  return response.data.data;
};

export default function Page({ params }: { params: Promise<{ countryName: string }> }) {
  const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);
  const [visaRequirements, setVisaRequirements] = useState<VisaRequirements | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setCountryName(resolvedParams.countryName);
    };
    unwrapParams();
  }, [params]);
 
  useEffect(() => {
    if (!countryName) return;
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
        <Breadcrumb pageName={`Edit Visa for ${countryName || "Country"}`} />
        {error ? (
          <div>{error}</div>
        ) : visaInfo && visaRequirements ? (
          <EditVisa visaInfo={visaInfo} visaRequirements={visaRequirements} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </DefaultLayout>
  );

}

