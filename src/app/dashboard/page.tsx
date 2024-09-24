import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
const Dashboard = () => {
  return (
    <div>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </div>
  );
};
export default Dashboard;
