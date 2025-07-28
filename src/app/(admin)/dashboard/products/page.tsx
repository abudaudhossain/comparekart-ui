import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductsTable from "@/components/tables/ProductsTable";
// import ComponentCard from "@/components/common/ComponentCard";
// import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "All Product list",
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
                <ProductsTable />
            </div>
        </div>
    );
}
