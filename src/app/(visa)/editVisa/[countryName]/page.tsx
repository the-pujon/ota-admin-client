// src/app/(visa)/editVisa/[countryName]/page.tsx

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ClientEditVisaWrapper from "@/components/Visa/ClientEditVisaWrapper";
import axios from "axios";

// Metadata function that awaits params
export async function generateMetadata({ params }: { params: Promise<{ countryName: string[] }> }) {
  const { countryName } = await params; 
  return {
    title: `Edit Visa for ${countryName}`,
  };
}

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

// Async function to fetch visa data
async function fetchVisaData(countryName: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${countryName}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch visa info");
  }
  return response.data.data;
}

// Main component with async params handling
export default async function VisaPageEdit({ params }: { params: Promise<{ countryName: string }> }) {
  const { countryName } = await params; // Await the resolved params

  // Fetch visa data
  const { visaInfo, visaRequirements } = await fetchVisaData(countryName);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName={`Edit Visa for ${countryName}`} />
        {visaInfo && visaRequirements ? (
          <ClientEditVisaWrapper visaInfo={visaInfo} visaRequirements={visaRequirements} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </DefaultLayout>
  );
}
