import Breadcrumbs from "@/components/common/Breadcrumbs";
import ClientsTable from "@/components/tables/ClientsTable";
import InvoicesTable from "@/components/tables/InvoiceTable";
// import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";
import React, { } from "react";

export const metadata: Metadata = {
    title: "Client Invoice and Billing",
    description:
        "This is Next.js Basic Table  page for UserManagement  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function Invoice() {


    return (
        <div>
            <Breadcrumbs pageTitle="Invoice and Billing" />

            <div className="space-y-6">

                <InvoicesTable />
            </div>
        </div>
    );
}
