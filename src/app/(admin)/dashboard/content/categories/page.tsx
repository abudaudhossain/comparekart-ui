import Breadcrumbs from "@/components/common/Breadcrumbs";
import CategoriesTable from "@/components/tables/CategoriesTable";

import { Metadata } from "next";
import React, { } from "react";

export const metadata: Metadata = {
    title: "Categories list",
    description:
        "This is Next.js Basic Table  page for UserManagement  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function Categories() {


    return (
        <div>
            <Breadcrumbs pageTitle="Categories List" />

            <div className="space-y-6">

                <CategoriesTable />
            </div>
        </div>
    );
}
