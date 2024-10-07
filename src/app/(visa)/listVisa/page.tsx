"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import useRedirectHelper from "@/utils/authRedirectHelper";
import { useRouter } from "next/navigation";
import TableThree from "@/components/Tables/TableThree";

const listVisa = () => {
  useRedirectHelper("/listVisa");
 
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Breadcrumb pageName="Visa List" />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default listVisa;
