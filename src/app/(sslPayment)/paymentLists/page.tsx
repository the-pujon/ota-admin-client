"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useRedirectHelper from "@/utils/authRedirectHelper";
import PaymentList from "@/components/SSLPayment/paymentLists";

const PaymentLists = () => {
  // useRedirectHelper("/paymentLists");
 
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Payment List" />
        <PaymentList />
      </div>
    </DefaultLayout>
  );
};

export default PaymentLists;
