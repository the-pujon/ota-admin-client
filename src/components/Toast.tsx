import toast from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";


export const successToast = (message: string) => {
  toast.success(message, {
   
  });
};
export const warningToast = (message: string) => {
  toast(message, {
    icon: <IoIosWarning size={24} style={{ color: "#FFC000" }} />,
    
  });
};
export const errorToast = (message: string) => {
  toast.error(message, {
    
  });
};
