"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
const { currentUser } = useAppSelector((state) => state.authUI);
    const router = useRouter();
    useEffect(()=>{
        if(!currentUser){
          router.push('/')
        }else{
          router.push('/dashboard')
        }
    },[currentUser,router])

  return (
    <div>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </div>
  );
};
export default Dashboard;
