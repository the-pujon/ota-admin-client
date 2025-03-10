"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useRedirectHelper from "@/utils/authRedirectHelper";
// import ListVisa from "@/components/Visa/ListVisa";
import VisaList from "@/components/Visa/VisaList";
import { Suspense } from "react";
const Page = () => {
  // useRedirectHelper("/visaList");

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Visa List" />

        {/* <Suspense fallback={<p>Loading visa data...</p>}> */}
          <VisaList />
        {/* </Suspense> */}

        {/* <VisaList /> */}
      </div>
    </DefaultLayout>
  );
};
export default Page;
