// app/page/[page].js

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DataTable from '../components/DataTable';

export default function Page() {
  const router = useRouter();
  const { page } = router.query; // Extract the page number from the URL
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);

  useEffect(() => {
    // Fetch data when the page number changes
    const fetchData = async (page) => {
      const response = await fetch(`/api/webs?page=${page}`);
      const result = await response.json();
      setData(result.paginatedData);
      setTotalPages(result.totalPages);
      setCurrentPage(page);
    };

    if (page) {
      fetchData(parseInt(page));
    }
  }, [page]); // Fetch data when the page number in the URL changes

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // Update the URL to reflect the new page number
      router.push(`/page/${newPage}`);
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
