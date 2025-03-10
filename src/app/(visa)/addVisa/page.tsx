"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import AddVisa from "@/components/Visa/AddVisa";
import useRedirectHelper from "@/utils/authRedirectHelper";

const Page = () => {
  useRedirectHelper("/addVisa");

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Add Visa" />
        {/* <AddVisa/> */}
      </div>
    </DefaultLayout>
  );
};

export default Page;

