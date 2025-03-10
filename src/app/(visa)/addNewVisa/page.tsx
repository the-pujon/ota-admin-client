"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import AddNewVisa from "@/components/Visa/AddNewVisa";
import useRedirectHelper from "@/utils/authRedirectHelper";

const Page = () => {
  useRedirectHelper("/addNewVisa");

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Add New Visa" />
        {/* <AddNewVisa/> */}
      </div>
    </DefaultLayout>
  );
};

export default Page;

