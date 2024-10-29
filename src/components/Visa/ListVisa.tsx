// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// interface VisaData {
//   visaInfo: any;
//   countryName: string;
//   visaPrice_price: string;
//   visaPrice_note: string;
// }

// const ListVisa = () => {
//   const [visaData, setVisaData] = useState<VisaData[]>([]);
//   const [selectedVisaInfo, setSelectedVisaInfo] = useState<any | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   const fetchVisaData = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/v1/visa/countries/allVisaData");
//       setVisaData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching visa data:", error);
//     }
//   };

//   const handleViewClick = async (countryName: string) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/v1/visa/${countryName}`);
//       setSelectedVisaInfo(response.data.data);
//       router.push(`/visaDetails/${countryName}`);
//       // console.log(response.data, "country")
//       // setIsModalOpen(true);

//     } catch (error) {
//       console.error("Error fetching visa info:", error);
//     }
//   };

//   const handleEditClick = async (countryName: string) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/v1/visa/${countryName}`);
//       setSelectedVisaInfo(response.data.data);
//       router.push(`/editVisa/${countryName}`);
//       // console.log(response.data, "country")
//       // setIsModalOpen(true);

//     } catch (error) {
//       console.error("Error fetching visa info:", error);
//     }
//   };

//   useEffect(() => {
//     fetchVisaData();
//   }, []);


//   const handleDeleteClick = async (countryName: string) => {
//     const confirmDelete = window.confirm(`Are you sure you want to delete the visa information for ${countryName}?`);
    
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:4000/api/v1/visa/${countryName}`);
//         setVisaData(visaData.filter((visaItem) => visaItem.visaInfo.countryName !== countryName)); // Remove deleted item from the state
//         alert("Visa information deleted successfully.");
//       } catch (error) {
//         console.error("Error deleting visa info:", error);
//         alert("Failed to delete visa information.");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchVisaData();
//   }, []);

//   return (
//     <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <div className="max-w-full overflow-x-auto">
//         <table className="w-full table-auto">
//           <thead>
//             <tr className="bg-gray-2 text-left dark:bg-meta-4">
//               <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
//                 Country Name
//               </th>
//               <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
//                 Visa Price
//               </th>
//               <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
//                 Visa Price Note
//               </th>
//               <th className="px-4 py-4 font-medium text-black dark:text-white">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {visaData.map((visaItem, key) => (
//               <tr key={key}>
//                 <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
//                   <h5 className="font-medium text-black dark:text-white">
//                     {visaItem.visaInfo.countryName}
//                   </h5>
//                 </td>
//                 <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
//                   <p className="text-sm">${visaItem.visaInfo.visaPrice_price}</p>
//                 </td>
//                 <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
//                   <p className="text-black dark:text-white">
//                     {visaItem.visaInfo.visaPrice_note}
//                   </p>
//                 </td>
//                 <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
//                   <div className="flex items-center space-x-3.5">
//                     <button className="bg-green-200 text-success p-2 rounded">
//                       <FaEdit onClick={() => handleEditClick(visaItem.visaInfo.countryName)}  />
//                     </button>
//                     <button className="bg-rose-200 text-danger p-2 rounded" onClick={() => handleDeleteClick(visaItem.visaInfo.countryName)}>
//                       <FaTrashAlt />
//                     </button>
//                     <button className="bg-blue-200 text-primary p-2 rounded" onClick={() => handleViewClick(visaItem.visaInfo.countryName)}>
//                       <FaEye />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ListVisa;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Pagination from "../Pagination";

interface VisaData {
  visaInfo: any;
  countryName: string;
  visaPrice_price: string;
  visaPrice_note: string;
}

const ListVisa = () => {
  const [visaData, setVisaData] = useState<VisaData[]>([]);
  const [selectedVisaInfo, setSelectedVisaInfo] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const router = useRouter();

  const fetchVisaData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/visa/countries/allVisaData");
      setVisaData(response.data.data);
    } catch (error) {
      console.error("Error fetching visa data:", error);
    }
  };

  const handleViewClick = async (countryName: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/visa/${countryName}`);
      setSelectedVisaInfo(response.data.data);
      router.push(`/visaDetails/${countryName}`);
    } catch (error) {
      console.error("Error fetching visa info:", error);
    }
  };

  const handleEditClick = async (countryName: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/visa/${countryName}`);
      setSelectedVisaInfo(response.data.data);
      router.push(`/editVisa/${countryName}`);
    } catch (error) {
      console.error("Error fetching visa info:", error);
    }
  };

  const handleDeleteClick = async (countryName: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the visa information for ${countryName}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/visa/${countryName}`);
        setVisaData(visaData.filter((visaItem) => visaItem.visaInfo.countryName !== countryName));
        alert("Visa information deleted successfully.");
      } catch (error) {
        console.error("Error deleting visa info:", error);
        alert("Failed to delete visa information.");
      }
    }
  };

  useEffect(() => {
    fetchVisaData();
  }, []);

  // Pagination logic
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
                  <p className="text-sm">${visaItem.visaInfo.visaPrice_price}</p>
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
    </div>
  );
};

export default ListVisa;
