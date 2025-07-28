import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Next.js Reset Password Page | UserManagement - Next.js Dashboard Template",
    description: "This is Next.js Reset Password Page UserManagement Dashboard Template",
};

export default function ResetPassword() {
    return <Suspense fallback={<div>Loading offer form...</div>}>

        <ResetPasswordForm />;
    </Suspense>
}
