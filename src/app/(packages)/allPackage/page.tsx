"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddPackage from "@/components/Package/AddPackage";
import useRedirectHelper from "@/utils/authRedirectHelper";

const Page = () => {
  useRedirectHelper("/allPackage");
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="All Package" />
        {/* <AddPackage /> */}
      </div>
    </DefaultLayout>
  );
};

export default Page;
