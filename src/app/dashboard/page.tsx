"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAppSelector } from "@/redux/hooks";
import useRedirectHelper from "@/utils/authRedirectHelper";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
useRedirectHelper("/dashboard");
  return (
    <div>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </div>
  );
};
export default Dashboard;
