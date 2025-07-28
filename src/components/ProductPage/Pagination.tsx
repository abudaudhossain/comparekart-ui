"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function Pagination({ totalPages = 112 }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dynamically get current page
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  // Calculate pages to display: two before, current, two after
  const pagesAroundCurrent = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) {
      pagesAroundCurrent.push(i);
    }
  }

  return (
    <div className="flex items-center justify-center mt-10 text-sm">
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {currentPage > 3 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="px-4 py-2 rounded flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
            >
              1
            </button>
            <span className="px-2">...</span>
          </>
        )}

        {pagesAroundCurrent.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] ${currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
              }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            <span className="px-2">...</span>
            <button
              onClick={() => goToPage(totalPages)}
              className="px-4 py-2 rounded flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
      >
        Next
      </button>
    </div>
  );
}

interface PageProps {
  totalPage: {
    totalPages: number;
  };
}

export default function Page({ totalPage: { totalPages } }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Pagination totalPages={totalPages} />
    </Suspense>
  );
}
