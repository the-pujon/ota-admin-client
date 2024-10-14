import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface VisaData {
  visaInfo: any,
  countryName: string;
  visaPrice_price: string;
  visaPrice_note: string;
}

const TableThree = () => {
  const [visaData, setVisaData] = useState<VisaData[]>([]); 

  const fetchVisaData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/visa/countries/allVisaData");

      setVisaData(response.data.data);
      console.log(response.data.data, "data");
    } catch (error) {
      console.error("Error fetching visa data:", error);
    }
  };
  useEffect(() => {

    fetchVisaData();
  }, []);

  console.log(visaData, "visaData")

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
            {visaData.map((visaItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {visaItem.visaInfo.countryName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-sm">${visaItem.visaInfo.visaPrice_price}</p>
                  
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {visaItem.visaInfo.visaPrice_note}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="bg-green-200 text-success p-2 rounded">
                      <FaEdit />
                    </button>
                    <button className=" bg-rose-200 text-danger p-2 rounded">
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
