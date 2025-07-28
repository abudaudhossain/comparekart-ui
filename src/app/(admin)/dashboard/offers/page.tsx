import Breadcrumbs from "@/components/common/Breadcrumbs";
import OffersTable from "@/components/tables/OffersTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "All Offer list",
    description:
        "This is Next.js Basic Table  page for UserManagement  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function Products() {
    return (
        <div>
            <Breadcrumbs pageTitle="Products List" />
            {/* <PageBreadcrumb pageTitle="Products List" /> */}
            <div className="space-y-6">
                <OffersTable />
            </div>
        </div>
    );
}
