"use client";
import MainDashboard from "@/components/Dashboard/MainDashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAppSelector } from "@/redux/hooks";
import useRedirectHelper from "@/utils/authRedirectHelper";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "@/components/common/Loader";

const Dashboard = () => {
useRedirectHelper("/dashboard");
 
  return (
    <div>
      <DefaultLayout>
        <MainDashboard />
      </DefaultLayout>
    </div>
  );
};
export default Dashboard;
