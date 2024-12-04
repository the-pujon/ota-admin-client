import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Pagination from "../Pagination";
import ConfirmationModal from "../ConfirmationModal";
import toast from "react-hot-toast";
import { useListVisaMutation, useViewVisaMutation, useEditVisaMutation } from "@/redux/api/visaApi";

interface VisaData {
  visaInfo: any;
  countryName: string;
  visaPrice_price: string;
  visaPrice_note: string;
}


const ListVisa = () => {
  const [visaData, setVisaData] = useState<VisaData[]>([]);
  // const [selectedVisaInfo, setSelectedVisaInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCountryName, setDeleteCountryName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const [listVisa] = useListVisaMutation();
  const [viewVisa] = useViewVisaMutation();
  const [editVisa] = useEditVisaMutation();

  const fetchVisaData = async () => {
    try {
      // console.log("hello")
      // const response = await axios.get("http://localhost:4000/api/v1/visa/countries/allVisaData");
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/countries/allVisaData`);
      const response = await listVisa({}).unwrap();
      // console.log("data: ",response.data);
      setVisaData(response.data);
    } catch (error) {
      console.error("Error fetching visa data:", error);
    }
  };

  const handleViewClick = async (countryName: string) => {
    try {
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${countryName}`);
      const response = await viewVisa(countryName).unwrap();
      console.log("viewVisa: ",response);
      // setSelectedVisaInfo(response.data.data);
      router.push(`/visaDetails/${countryName}`);
    } catch (error) {
      console.error("Error fetching visa info:", error);
    }
  };

  const handleEditClick = async (countryName: string) => {
    try {
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${countryName}`);
      const response = await editVisa(countryName).unwrap();
      // setSelectedVisaInfo(response.data.data);
      router.push(`/editVisa/${countryName}`);
    } catch (error) {
      console.error("Error fetching visa info:", error);
    }
  };

  const handleDeleteClick = (countryName: string) => {
    setDeleteCountryName(countryName);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteCountryName) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visa/${deleteCountryName}`);
      setVisaData(visaData.filter((visaItem) => visaItem.visaInfo.countryName !== deleteCountryName));
      toast.success("Visa information deleted successfully.");
    } catch (error) {
      console.error("Error deleting visa info:", error);
      toast.error("Failed to delete visa information.");
    } finally {
      setIsModalOpen(false); 
      setDeleteCountryName(null);
    }
  };

  useEffect(() => {
    fetchVisaData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = visaData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(visaData.length / itemsPerPage);



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
            {currentItems.map((visaItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {visaItem.visaInfo.countryName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-sm">৳{visaItem.visaInfo.visaPrice_price}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {visaItem.visaInfo.visaPrice_note}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="bg-green-200 text-success p-2 rounded" onClick={() => handleEditClick(visaItem.visaInfo.countryName)}>
                      <FaEdit />
                    </button>
                    <button className="bg-rose-200 text-danger p-2 rounded" onClick={() => handleDeleteClick(visaItem.visaInfo.countryName)}>
                      <FaTrashAlt />
                    </button>
                    <button className="bg-blue-200 text-primary p-2 rounded" onClick={() => handleViewClick(visaItem.visaInfo.countryName)}>
                      <FaEye />
                    </button> 
                  </div>
                </td>
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

      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Are you sure you want to delete the visa information for ${deleteCountryName}?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ListVisa;
/// checking something