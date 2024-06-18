import React, { useState, useEffect } from 'react';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEllipses, setShowEllipses] = useState(totalPages > 8);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const renderPagination = () => {
    return (
      <div className='pagination'>
        <button
          className='pagination-btn'
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {showEllipses && currentPage > 4 && (
          <>
            <button className='pagination-btn' onClick={() => handlePageChange(1)}>
              1
            </button>
            <span className='pagination-ellipsis'>...</span>
          </>
        )}

        {renderPageNumbers()}

        {showEllipses && currentPage < totalPages - 3 && (
          <>
            <span className='pagination-ellipsis'>...</span>
            <button
              className='pagination-btn'
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className='pagination-btn'
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return renderPagination();
};

export default Pagination;
