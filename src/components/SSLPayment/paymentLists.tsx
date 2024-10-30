import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Pagination from "../Pagination";

// interface PaymentInfo {
//   cus_name: string;
//   cus_email: string;
//   cus_phone: string;
// }

interface PaymentData {
  tran_id: string;
  amount: string;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
}

const PaymentList = () => {
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
  const [selectedpaymentInfo, setSelectedpaymentInfo] = useState<any | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ssl/paymentList`);
      setPaymentData(response.data.data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  // const handleViewClick = async (cus_name: string) => {
  //   try {
  //     console.log("view")
  //     return;
  //     const response = await axios.get(`http://localhost:4000/api/v1/visa/${cus_name}`);
  //     setSelectedpaymentInfo(response.data.data);
  //     router.push(`/visaDetails/${cus_name}`);
  //     console.log(response.data, "country")
  //     // setIsModalOpen(true);

  //   } catch (error) {
  //     console.error("Error fetching payment info:", error);
  //   }
  // };

  useEffect(() => {
    fetchPaymentData();
  }, []);
 const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(paymentData.length / itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                SL
              </th>
              <th className="min-w-[20px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Transaction ID
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[20px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Amount
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Phone
              </th>
              {/* <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((paymentItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {key+1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {paymentItem.tran_id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {paymentItem.cus_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {paymentItem.amount}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-sm">{paymentItem.cus_email}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {paymentItem.cus_phone}
                  </p>
                </td>
                {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="bg-green-200 text-success p-2 rounded">
                      <FaEdit />
                    </button>
                    <button className="bg-rose-200 text-danger p-2 rounded">
                      <FaTrashAlt />
                    </button>
                    <button className="bg-blue-200 text-primary p-2 rounded" onClick={() => handleViewClick(paymentItem .cus_name)}>
                      <FaEye />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default PaymentList;
