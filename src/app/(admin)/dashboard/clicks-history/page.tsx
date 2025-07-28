import Breadcrumbs from "@/components/common/Breadcrumbs";
import ClicksTable from "@/components/tables/ClicksTable";

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
            <Breadcrumbs pageTitle="Clicks History" />

            <div className="space-y-6">

                <ClicksTable />
            </div>
        </div>
    );
}
