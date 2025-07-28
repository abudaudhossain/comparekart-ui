import Breadcrumbs from "@/components/common/Breadcrumbs";
// import ComponentCard from "@/components/common/ComponentCard";
import FeedsTable from "@/components/tables/FeedsTable";
import { Metadata } from "next";
import React, { } from "react";

export const metadata: Metadata = {
    title: "Feeds list",
    description:
        "This is Next.js Basic Table  page for UserManagement  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function Feeds() {


    return (
        <div>
            <Breadcrumbs pageTitle="Feeds" />
         
            <div className="space-y-6">

                <FeedsTable />
            </div>
        </div>
    );
}
