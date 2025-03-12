"use client";

import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaArrowCircleLeft,
  FaArrowCircleRight,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  useVisaDeleteByCountryMutation,
  useVisaListQuery,
} from "@/redux/api/visaApiV2";
import Pagination from "../Pagination";
import Link from "next/link";
import { errorToast, successToast } from "../Toast";
// import Button from "./CustomButton";

const VisaList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  // Fetch paginated data from API
  const {
    data: visaData,
    isLoading,
    isError,
    error,
  } = useVisaListQuery(
    { page: currentPage, limit: itemsPerPage },
    { skip: typeof window === "undefined" },
  );

  const [deleteVisa] = useVisaDeleteByCountryMutation();
  console.log("visaData:", visaData);
  console.log(error);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !visaData) return <p>Error loading data.</p>;

  // const { data: visas, totalPages } = visaData;
  const visas = visaData.data;
  // const visas = []
  const totalPages = visaData?.meta?.totalPage;

  // console.log("visaData", visas)
  const handleDelete = async (countryName: string) => {
    try {
      console.log("countryName", countryName);
      const res = await deleteVisa({ countryName: countryName });
      console.log(res);
      successToast("Visa Deleted Successfully");
    } catch (error) {
      console.error("Error deleting visa: ", error);
      // errorToast("Visa Deleted Failed")
    }
  };

  return (
    <div
      className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      suppressHydrationWarning={true}
    >
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Country Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Visa Price
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Visa Price Note
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {visas.map((visaItem: any, key: any) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {visaItem?.countryName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-sm">৳{visaItem?.visaPrice_price}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {visaItem?.visaPrice_note}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      href={`/editVisa-V2/${visaItem?.countryName}`}
                      className="rounded bg-green-200 p-2 text-success"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(visaItem?.countryName);
                      }}
                      className="rounded bg-rose-200 p-2 text-danger"
                    >
                      <FaTrashAlt />
                    </button>
                    {/* {
                      console.log("visaItem?.countryName",visaItem?.countryName)
                    } */}
                    <Link
                      onClick={() => {
                        console.log(`/visaDetailsV2/${visaItem?.countryName}}`);
                      }}
                      href={`/visaDetailsV2/${visaItem?.countryName}`}
                      className="rounded bg-blue-200 p-2 text-primary"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default VisaList;
