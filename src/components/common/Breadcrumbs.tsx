'use client';  // Ensure this component is a Client Component to use router hooks

import { usePathname } from 'next/navigation';  // Next.js (App Router) hook to get current path
import Link from 'next/link';
import React from 'react';

type Breadcrumbs = {
    label: string,
    href: string
}

interface BreadcrumbProps {
    pageTitle: string;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(segment => segment.length > 0);

    // Helper to format a segment ID into Title Case for display.
    const formatSegment = (segment: string) => {
        // Replace dashes/underscores with spaces, and insert space before capital letters (for camelCase words)
        const spaced = segment
            .replace(/[-_]/g, ' ')                   // "top-deals" -> "top deals"
            .replace(/([a-z])([A-Z])/g, '$1 $2');    // "userSettings" -> "user Settings"
        // Capitalize the first letter of each word in the segment
        //console.log("spaced: ", spaced)
        return spaced
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const breadcrumbs: Breadcrumbs[] = [
    ];

    // Accumulate each segment with its path and formatted label.
    segments.forEach((segment, idx) => {
        const href = '/' + segments.slice(0, idx + 1).join('/');  // reconstruct the path up to this segment
        breadcrumbs.push({ label: formatSegment(segment), href });

    });

    // Determine the index of the last item for rendering (last item will be plain text).
    const lastIndex = breadcrumbs.length - 1;

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2
                className="text-xl font-semibold text-gray-800 dark:text-white/90"
                x-text="pageName"
            >
                {pageTitle}
            </h2>
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5">
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === lastIndex;
                        return (
                            <li key={index} >
                                {isLast ? (
                                    // Last crumb: plain text (current page)
                                    <span className="text-sm text-gray-800 dark:text-white/90">{crumb.label}</span>
                                ) : (
                                    // Link for all intermediate crumbs (including "Home")
                                    <Link href={crumb.href} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                        {crumb.label}
                                        <svg
                                            className="stroke-current"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                                                stroke=""
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                )}

                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>


    );
}


export default Breadcrumbs