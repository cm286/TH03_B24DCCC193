import React from 'react';

interface PaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, currentPage, onPageChange }) => {
  const itemsPerPage = 6;
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
      <p>
        Trang {currentPage} / {totalPages}, Tổng {total} sản phẩm
      </p>
    </div>
  );
};

export default Pagination;