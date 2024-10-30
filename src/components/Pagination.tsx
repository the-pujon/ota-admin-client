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
        containerStyles={`text-black rounded px-4 py-2 ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title=""
        handleClick={handlePrevPage}
        isDisabled={currentPage === 1}
        icon={<FaArrowCircleLeft />}
        style={{ backgroundColor: '#1C2434' }} 
      />
      {/* <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage ? 'text-white' : 'bg-gray text-graydark'
              } hover:text-white transition`}
              style={pageNum === currentPage ? { backgroundColor: '#1C2434' } : undefined} 
            >
              {pageNum}
            </button>
          );
        })}
      </div> */}
      <div className="flex space-x-1">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNum = index + 1;
        const isCurrentPage = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 rounded transition ${
              isCurrentPage ? 'text-white' : 'bg-gray text-graydark'
            }`}
            style={{
              backgroundColor: isCurrentPage ? '#1C2434' : undefined,
              color: isCurrentPage ? '#FFFFFF' : undefined,
            }}
            onMouseEnter={(e) => {
              if (isCurrentPage) {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#1C2434';
              } else {
                e.currentTarget.classList.remove('bg-gray', 'text-graydark');
                e.currentTarget.classList.add('bg-[#1C2434]', 'text-white');
              }
            }}
            onMouseLeave={(e) => {
              if (isCurrentPage) {
                e.currentTarget.style.backgroundColor = '#1C2434';
                e.currentTarget.style.color = '#FFFFFF';
              } else {
                e.currentTarget.classList.remove('bg-[#1C2434]', 'text-white');
                e.currentTarget.classList.add('bg-gray', 'text-graydark');
              }
            }}
          >
            {pageNum}
          </button>
        );
      })}
    </div>

      <Button
        btnType="button"
        containerStyles={`text-black rounded px-4 py-2 ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title=""
        handleClick={handleNextPage}
        isDisabled={currentPage === totalPages}
        icon={<FaArrowCircleRight />}
        style={{ backgroundColor: '#1C2434' }} 
      />
    </div>
  );
};

export default Pagination;
