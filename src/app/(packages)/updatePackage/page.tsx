"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddPackage from "@/components/Package/AddPackage";
import useRedirectHelper from "@/utils/authRedirectHelper";

const Page = () => {
  useRedirectHelper("/updatePackage");
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Edit Package" />
        {/* <AddPackage /> */}
      </div>
    </DefaultLayout>
  );
};
export default Page;
