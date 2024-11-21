// app/components/DataTable.js
"use client";

import { useRouter } from "next/navigation";
import React from "react";

const DataTable = ({ data }) => {
  const router = useRouter();

  const handleDomainClick = (domain) => {
    router.push(`/domain/${domain}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <table style={{ borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>
              Rank
            </th>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>
              Domain
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", borderBottom: "1px solid gray" }}>
                {item.Rank}
              </td>
              <td
                style={{
                  padding: "10px",
                  borderBottom: "1px solid gray",
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => handleDomainClick(item.Domain)}
              >
                {item.Domain}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
