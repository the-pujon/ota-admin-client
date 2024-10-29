import React from 'react';
import Button from './CustomButton';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  return (
    <div className="flex justify-center items-center mt-6 px-4 py-2 border-t border-gray-300 dark:border-gray-700 space-x-2">
      <Button
        btnType="button"
        containerStyles={`bg-teal_blue text-white rounded px-4 py-2 ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title=""
        handleClick={handlePrevPage}
        isDisabled={currentPage === 1}
        icon={<FaArrowCircleLeft/>}
      />

      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage ? 'bg-teal_blue text-white' : 'bg-gray text-graydark'
              } hover:bg-teal_blue hover:text-white transition`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <Button
        btnType="button"
        containerStyles={`bg-teal_blue text-white rounded px-4 py-2 ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title=""
        handleClick={handleNextPage}
        isDisabled={currentPage === totalPages}
        icon={<FaArrowCircleRight />}
      />
    </div>
  );
};

export default Pagination;
