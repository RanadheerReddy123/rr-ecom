import React from 'react';

function Pagination({ pageNumber, handleNext, handlePrevious }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
      <button onClick={handlePrevious} disabled={pageNumber === 1}>
        Previous
      </button>
      <span>Page: {pageNumber}</span>
      <button onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default Pagination;