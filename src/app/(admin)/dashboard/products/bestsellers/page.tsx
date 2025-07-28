import Breadcrumbs from "@/components/common/Breadcrumbs";
import BestsellersProductsTable from "@/components/tables/BestsellersProductsTable";
// import ComponentCard from "@/components/common/ComponentCard";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "All Product list",
    description:
        "This is Next.js Basic Table  page for UserManagement  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function Bestsellers() {
    return (
        <div>
            <Breadcrumbs pageTitle="Bestsellers " />
            <div className="space-y-6">
                <BestsellersProductsTable />
            </div>
        </div>
    );
}
