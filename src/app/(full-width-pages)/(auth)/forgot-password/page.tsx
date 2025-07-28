import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next.js Reset Password Page | UserManagement - Next.js Dashboard Template",
    description: "This is Next.js Reset Password Page UserManagement Dashboard Template",
};

export default function ForgotPassword() {
    return <ForgotPasswordForm />;
}
