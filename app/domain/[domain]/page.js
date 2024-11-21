// app/domain/[domain]/display.js

import fs from 'fs';
import path from 'path';

export default async function DomainPage({ params }) {
  const { domain } = params; // Extract the dynamic parameter 'domain'
  
  // Read data from the JSON file
  const filePath = path.join(process.cwd(), "src", "data", "webs.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContents);

  // Find the data for the specific domain
  const domainData = data.find((item) => item.Domain === domain);

  if (!domainData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Domain Not Found</h1>
        <p>Sorry, the domain data for "{domain}" is not available.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Details for {domain}</h1>
      <p><strong>Rank:</strong> {domainData.Rank}</p>
      <p><strong>Domain:</strong> {domainData.Domain}</p>
      <p><strong>Data1:</strong> {domainData.data1}</p>
      <p><strong>Data2:</strong> {domainData.data2}</p>
      <p><strong>Data3:</strong> {domainData.data3}</p>
    </div>
  );
}
