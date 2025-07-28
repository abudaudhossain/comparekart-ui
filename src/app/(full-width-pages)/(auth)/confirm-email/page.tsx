

import { Suspense } from "react";

import ConfirmEmailForm from "@/components/form/ConfirmEmailForm";

export default function ConfirmEmailPage() {


    return (
        <Suspense fallback={<div>Loading offer form...</div>}>
            <ConfirmEmailForm />
        </Suspense>
    );
}
