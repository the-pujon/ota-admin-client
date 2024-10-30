import React from "react";
import Button from "./CustomButton";

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <p className="mb-4 text-lg text-black dark:text-white">{message}</p>
        <div className="flex justify-center space-x-4">
          <Button
          btnType="button"
          containerStyles="bg-green-500 text-white rounded px-4 py-2"
          title="Cancel"
          handleClick={onCancel}
         />
          <Button
          btnType="button"
          containerStyles="bg-red hover:bg-red text-white py-2 px-4 rounded"
          title="Confirm"
          handleClick={onConfirm}
         />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;