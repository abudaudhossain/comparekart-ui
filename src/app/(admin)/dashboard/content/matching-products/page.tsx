import Breadcrumbs from '@/components/common/Breadcrumbs';
import MatchingProductsTable from '@/components/tables/MatchingProductsTable';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "All Product Group list",
    description:
        "This is Next.js Basic Table  page for UserManagement  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

const MatchingProducts = () => {
    return (
        <div>
            <Breadcrumbs pageTitle="Product Groups List" />
            {/* <PageBreadcrumb pageTitle="Products List" /> */}
            <div className="space-y-6">
                <MatchingProductsTable />
            </div>
        </div>
    )
}

export default MatchingProducts