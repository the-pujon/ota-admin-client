"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import AddNewVisa from "@/components/Visa/AddNewVisa";
// import AddVisa from "@/components/Visa/AddVisa";
import AddVisaV2 from "@/components/Visa/AddVisaV2";
import useRedirectHelper from "@/utils/authRedirectHelper";

const Page = () => {
  useRedirectHelper("/addVisa-V2");

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Add New Visa" />
        <AddVisaV2/>
      </div>
    </DefaultLayout>
  );
};

export default Page;

