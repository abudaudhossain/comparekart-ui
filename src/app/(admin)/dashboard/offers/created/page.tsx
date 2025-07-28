import Breadcrumbs from "@/components/common/Breadcrumbs";
import OfferCreateForm from "@/components/offerPage/offerCreate/OfferCreateForm";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
    title: "All Offer list",
    description:
        "This is Next.js Basic Table  page for UserManagement  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function Products() {
    return (
        <div>
            <Breadcrumbs pageTitle="Offer create" />
            {/* <PageBreadcrumb pageTitle="Products List" /> */}
            <div className="space-y-6">
                <Suspense fallback={<div>Loading offer form...</div>}>
                    <OfferCreateForm />
                </Suspense>
            </div>
        </div>
    );
}
