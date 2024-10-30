"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useRedirectHelper from "@/utils/authRedirectHelper";
import AddVisa from "@/components/Visa/AddVisa";

const AddVisas = () => {
  useRedirectHelper("/addVisa");
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Add Visa" />
        <AddVisa/>
      </div>
    </DefaultLayout>
  );
};

export default AddVisas;


// "use client";
// import { useEffect, useState } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import useRedirectHelper from "@/utils/authRedirectHelper";
// import AddVisa from "@/components/Visa/AddVisa";

// const AddVisas = () => {
//   const { loading } = useRedirectHelper("/addVisa");
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); 
//   }, []);

//   if (!isClient || loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <DefaultLayout>
//       <div className="flex flex-col gap-10">
//         <Breadcrumb pageName="Add Visa" />
//         <AddVisa />
//       </div>
//     </DefaultLayout>
//   );
// };

// export default AddVisas;
