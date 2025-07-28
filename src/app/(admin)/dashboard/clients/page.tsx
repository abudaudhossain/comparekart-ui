import Breadcrumbs from "@/components/common/Breadcrumbs";
import ClientsTable from "@/components/tables/ClientsTable";
// import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";
import React, { } from "react";

export const metadata: Metadata = {
    title: "Client list",
    description:
        "This is Next.js Basic Table  page for UserManagement  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function Feeds() {


    return (
        <div>
            <Breadcrumbs pageTitle="Client" />

            <div className="space-y-6">

                <ClientsTable />
            </div>
        </div>
    );
}
