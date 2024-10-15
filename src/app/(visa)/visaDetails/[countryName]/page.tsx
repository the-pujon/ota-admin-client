// import React from "react";
// import { GetServerSideProps } from "next";
// import axios from "axios";

// import VisaDetail from "@/components/Visa/VisaDetail";
// import axios from "axios";

// const VisaDetail = ({ visaInfo, visaRequirements }) => {
//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-semibold">{visaInfo.countryName}</h2>
//       <p><strong>Visa Price:</strong> ${visaInfo.visaPrice_price}</p>
//       <p><strong>Visa Price Note:</strong> {visaInfo.visaPrice_note}</p>
//       <h3 className="mt-4">Visa Requirements:</h3>
//       <pre>{JSON.stringify(visaRequirements, null, 2)}</pre>
//       {/* You can format the requirements more nicely as per your needs */}
//     </div>
//   );
// };

// // Fetch the visa data for the specific country
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { countryName } = context.params!;
//   try {
//     const response = await axios.get(`http://localhost:4000/api/v1/visa/${countryName}`);
//     const { visaInfo, visaRequirements } = response.data.data;

//     return {
//       props: {
//         visaInfo,
//         visaRequirements,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching visa info:", error);
//     return {
//       notFound: true,
//     };
//   }
// };

// export default VisaDetail;


// import React from "react";
// import { GetServerSideProps } from "next";
// import axios from "axios";

// // Define interfaces for your data
// interface VisaInfo {
//   countryName: string;
//   visaPrice_price: string;
//   visaPrice_note: string;
// }

// interface VisaRequirements {
//   // Define the structure of your visa requirements based on your API response
//   // Example properties
//   requirementList: string[];
//   additionalNotes?: string;
// }

// interface VisaDetailProps {
//   visaInfo: VisaInfo;
//   visaRequirements: VisaRequirements;
// }

// const VisaDetail: React.FC<VisaDetailProps> = ({ visaInfo, visaRequirements }) => {
//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-semibold">{visaInfo.countryName}</h2>
//       <p><strong>Visa Price:</strong> ${visaInfo.visaPrice_price}</p>
//       <p><strong>Visa Price Note:</strong> {visaInfo.visaPrice_note}</p>
//       <h3 className="mt-4">Visa Requirements:</h3>
//       <pre>{JSON.stringify(visaRequirements, null, 2)}</pre>
//       {/* You can format the requirements more nicely as per your needs */}
//     </div>
//   );
// };

// // Fetch the visa data for the specific country
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { countryName } = context.params!;
//   try {
//     const response = await axios.get(`http://localhost:4000/api/v1/visa/${countryName}`);
//     const { visaInfo, visaRequirements } = response.data.data;

//     return {
//       props: {
//         visaInfo,
//         visaRequirements,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching visa info:", error);
//     return {
//       notFound: true,
//     };
//   }
// };

// export default VisaDetail;

// "use client"

// import React from "react";
// import { useRouter } from "next/router"; // Import useRouter for accessing route parameters

// // Define interfaces for your data
// interface VisaInfo {
//   countryName: string;
//   visaPrice_price: string;
//   visaPrice_note: string;
// }

// interface VisaRequirements {
//   // Define the structure of your visa requirements based on your API response
//   requirementList: string[];
//   additionalNotes?: string;
// }

// interface VisaDetailProps {
//   visaInfo: VisaInfo;
//   visaRequirements: VisaRequirements;
// }

// const VisaDetail: React.FC<VisaDetailProps> = ({ visaInfo, visaRequirements }) => {
//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-semibold">{visaInfo.countryName}</h2>
//       <p><strong>Visa Price:</strong> ${visaInfo.visaPrice_price}</p>
//       <p><strong>Visa Price Note:</strong> {visaInfo.visaPrice_note}</p>
//       <h3 className="mt-4">Visa Requirements:</h3>
//       <pre>{JSON.stringify(visaRequirements, null, 2)}</pre>
//       {/* You can format the requirements more nicely as per your needs */}
//     </div>
//   );
// };

// // Fetch the visa data for the specific country
// const fetchVisaData = async (countryName: string) => {
//   const response = await fetch(`http://localhost:4000/api/v1/visa/${countryName}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch visa info');
//   }
//   const data = await response.json();
//   return data.data; // Adjust based on your API response structure
// };

// const VisaPage = async () => {
//   const router = useRouter();
//   const { countryName } = router.query;

//   if (!countryName) {
//     return <div>Loading...</div>;
//   }

//   // Fetching data directly in the component
//   const { visaInfo, visaRequirements } = await fetchVisaData(countryName as string);

//   return <VisaDetail visaInfo={visaInfo} visaRequirements={visaRequirements} />;
// };

// export default VisaPage;

// src/app/(visa)/visaDetails/[countryName]/page.tsx
// import React from "react";
// import axios from "axios";

// // Define interfaces for your data
// interface VisaInfo {
//   countryName: string;
//   visaPrice_price: string;
//   visaPrice_note: string;
// }

// interface VisaRequirements {
//   // Define the structure of your visa requirements based on your API response
//   requirementList: string[];
//   additionalNotes?: string;
// }

// interface VisaDetailProps {
//   visaInfo: VisaInfo;
//   visaRequirements: VisaRequirements;
// }

// const VisaDetail: React.FC<VisaDetailProps> = ({ visaInfo, visaRequirements }) => {
//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-semibold">{visaInfo.countryName}</h2>
//       <p><strong>Visa Price:</strong> ${visaInfo.visaPrice_price}</p>
//       <p><strong>Visa Price Note:</strong> {visaInfo.visaPrice_note}</p>
//       <h3 className="mt-4">Visa Requirements:</h3>
//       <pre>{JSON.stringify(visaRequirements, null, 2)}</pre>
//       {/* You can format the requirements more nicely as per your needs */}
//     </div>
//   );
// };

// Fetch the visa data for the specific country
// const fetchVisaData = async (countryName: string) => {
//   const response = await axios.get(`http://localhost:4000/api/v1/visa/${countryName}`);
//   if (response.status !== 200) {
//     throw new Error('Failed to fetch visa info');
//   }
//   return response.data.data; // Adjust based on your API response structure
// };

// // This is a Server Component
// const VisaPage = async ({ params }: { params: { countryName: string } }) => {
//   const { countryName } = params;

//   // Fetching data directly in the component
//   try {
//     const { visaInfo, visaRequirements } = await fetchVisaData(countryName);
//     return <VisaDetail visaInfo={visaInfo} visaRequirements={visaRequirements} />;
//   } catch (error) {
//     console.error("Error fetching visa data:", error);
//     return <div>Error fetching visa information. Please try again later.</div>;
//   }
// };

// export default VisaPage;

// src/app/(visa)/listVisa/page.tsx


// "use client";

// import React, { useEffect, useState } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import TableThree from "@/components/Tables/TableThree";
// import axios from "axios";
// import useRedirectHelper from "@/utils/authRedirectHelper";
// import VisaDetail from "@/components/Visa/VisaDetail";

// const fetchVisaData = async () => {
//   const response = await axios.get("http://localhost:4000/api/v1/visa/countries/allVisaData");
//   if (response.status !== 200) {
//     throw new Error('Failed to fetch visa list');
//   }
//   return response.data.data; // Adjust based on your API response structure
// };

// // This is a Client Component
// // const VisaPage = () => {
//     const VisaPage = async ({ params }: { params: { countryName: string } }) => {
//         const { countryName } = params;
// //   useRedirectHelper("/listVisa");
//   const [visaData, setVisaData] = useState([]);
//   const [error, setError] = useState<string | null>(null);

//   // Fetching data directly in the component
//   useEffect(() => {
//     const getVisaData = async () => {
//       try {
//         const data = await fetchVisaData();
//     //  const { visaInfo, visaRequirements } = await fetchVisaData(countryName);

//         setVisaData(data);
//       } catch (error) {
//         console.error("Error fetching visa data:", error);
//         setError("Error fetching visa information. Please try again later.");
//       }
//     };

//     getVisaData();
//   }, []);

//   return (
//     <DefaultLayout>
//       <div className="flex flex-col gap-10">
//         <Breadcrumb pageName="Visa List" />
//         {error ? (
//           <div>{error}</div>
//         ) : (
//           <VisaDetail visaData={visaData} />
//         )}
//       </div>
//     </DefaultLayout>
//   );
// };

// export default VisaPage;


"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import VisaDetail from "@/components/Visa/VisaDetail";
import axios from "axios";
import useRedirectHelper from "@/utils/authRedirectHelper";

interface VisaInfo {
  countryName: string;
  visaPrice_price: string;
  visaPrice_note: string;
}

interface VisaRequirements {
  requirementList: string[];
  additionalNotes?: string;
}

interface VisaDetailProps {
  visaInfo: VisaInfo;
  visaRequirements: VisaRequirements;
}

const fetchVisaData = async (countryName: string) => {
  const response = await axios.get(`http://localhost:4000/api/v1/visa/${countryName}`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch visa info');
  }
  return response.data.data;
};


const VisaPage = ({ params }: { params: { countryName: string } }) => {
  const { countryName } = params;
//   useRedirectHelper("/listVisa");
  
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
        <Breadcrumb pageName={`Visa Details for ${countryName}`} />
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
