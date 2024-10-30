import { useState, useEffect } from "react";
import axios from "axios";

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

export const useVisaData = (countryName: string) => {
  const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);
  const [visaRequirements, setVisaRequirements] = useState<VisaRequirements | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${countryName}`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch visa info");
        }
        const { visaInfo, visaRequirements } = response.data.data;
        setVisaInfo(visaInfo);
        setVisaRequirements(visaRequirements);
      } catch (error) {
        console.error("Error fetching visa data:", error);
        setError("Error fetching visa information. Please try again later.");
      }
    };

    fetchVisaData();
  }, [countryName]);

  return { visaInfo, visaRequirements, error };
};
