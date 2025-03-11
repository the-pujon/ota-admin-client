

"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditVisa from "@/components/Visa/EditVisa";
import { useEditVisaMutation } from "@/redux/api/visaApi";
import { use } from "react";
import EditVisaV2 from "@/components/Visa/EditVisaV2";
import { useParams } from "next/navigation";
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
  VisaInfo: string;
  VisaRequirementCategory: string;
  general_documents: VisaRequirementCategory[];
  business_person: VisaRequirementCategory[];
  student: VisaRequirementCategory[];
  job_holder: VisaRequirementCategory[];
  other_documents: VisaRequirementCategory[];
}

export default function Page() {
  // const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);
  // const [visaRequirements, setVisaRequirements] = useState<VisaRequirements | null>(null);
  // const [error, setError] = useState<string | null>(null);

  // // Initialize the mutation hook
  // const [editVisa, { isLoading: isFetching, isError, error: fetchError }] = useEditVisaMutation();

  // // Unwrap params
  // const [countryName, setCountryName] = useState<string | null>(null);
  // useEffect(() => {
  //   const unwrapParams = async () => {
  //     const resolvedParams = await params;
  //     setCountryName(resolvedParams.countryName);
  //   };
  //   unwrapParams();
  // }, [params]);

  // const {countryName} = params;
  const {countryName} = useParams()

  // Fetch data when countryName is set


  return (
    <DefaultLayout  >
      <div className="flex flex-col gap-10" suppressHydrationWarning={true}>
        <Breadcrumb pageName={`Edit Visa for ${countryName || "Country"}`} />
        {/* {isFetching ? (
          <div>Loading...</div>
        ) : isError && fetchError ? (
          // Handle RTK Query error structure
          <div>
            {typeof fetchError === "object" && "data" in fetchError
              ? (fetchError as any).data?.message || "Error fetching visa information."
              : "An unexpected error occurred."}
          </div>
        ) : visaInfo && visaRequirements ? (
          <EditVisa visaInfo={visaInfo} visaRequirements={visaRequirements} />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>No data available.</div>
        )} */}
        <EditVisaV2 countryName={countryName as string} />
      </div>
    </DefaultLayout>
  );
}




