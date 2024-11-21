// app/page.js

'use client';

import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';

export default function Page() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async (page = 1) => {
      const response = await fetch(`/api/webs?page=${page}`);
      const result = await response.json();
      setData(result.paginatedData);
      setTotalPages(result.totalPages);
      setCurrentPage(page);
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <DataTable data={data} />

      {/* Pagination Controls */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>

        <span style={{ margin: '0 15px' }}>Page {currentPage}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
