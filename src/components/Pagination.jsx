import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageInput, setPageInput] = useState(currentPage);
  const maxVisiblePages = 5;

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) > 0 && Number(value) <= totalPages)) {
      setPageInput(value);
    }
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(pageInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3 w-full">
      {/* Page buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-md disabled:opacity-50 bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer"
          aria-label="First page"
        >
          «
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-md disabled:opacity-50 bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer"
          aria-label="Previous page"
        >
          ‹
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer"
            >
              1
            </button>
            {startPage > 2 && <span className="text-sm px-1">...</span>}
          </>
        )}

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-2 py-1 rounded-md text-sm cursor-pointer ${
              currentPage === number
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-sm px-1">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-md disabled:opacity-50 bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer"
          aria-label="Next page"
        >
          ›
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-md disabled:opacity-50 bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer"
          aria-label="Last page"
        >
          »
        </button>
      </div>

      {/* Go to page */}
      <form onSubmit={handlePageInputSubmit} className="flex flex-wrap justify-center items-center gap-2 text-sm">
        <span className="text-gray-600">Go to page:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={handlePageInputChange}
          className="w-16 px-2 py-1 border rounded-md text-center text-sm"
          aria-label="Page number"
        />
        <button 
          type="submit"
          className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark text-sm cursor-pointer"
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default Pagination;
