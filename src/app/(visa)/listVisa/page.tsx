"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useRedirectHelper from "@/utils/authRedirectHelper";
import ListVisa from "@/components/Visa/ListVisa";

const Page = () => {
  useRedirectHelper("/listVisa");
 
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Visa List" />
        <ListVisa />
      </div>
    </DefaultLayout>
  );
};
export default Page;

