
// app/api/webs/route.js

import fs from 'fs';
import path from 'path';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1; // Default to page 1 if not specified

  const filePath = path.join(process.cwd(), 'src', 'data', 'webs.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  const itemsPerPage = 20; // Number of items per page
  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  // Slice the data for the current page
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  return new Response(
    JSON.stringify({
      paginatedData,
      totalPages,
    }),
    { status: 200 }
  );
}
