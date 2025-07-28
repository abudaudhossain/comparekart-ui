"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { AxiosError } from "axios";
import errorMessage from "@/lib/errorMessage";
import { clientSideAxios } from "../../../lib/api/axios/clientSideAxios";

export default function ConfirmEmailForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("No token provided.");
            return;
        }

        const confirmEmail = async () => {
            try {
                const response = await clientSideAxios.get(`/auth/confirm-email?token=${token}`);
                const data = response.data
                setStatus("success");
                setMessage(data.message || "Email confirmed successfully! You can now log in.");
            } catch (error: any) {
                //console.log(error)
                if (error instanceof AxiosError && error.response) {

                    errorMessage(error.response.data?.message);
                    setMessage(error.response.data?.message);
                } else {
                    console.error("Unknown error:", error);
                    errorMessage("An unknown error occurred. Please try again.");
                    if (error instanceof Error) {
                        setMessage(error.message || "Something went wrong.");
                    } else {
                        setMessage(error.message || "Something went wrong.");
                    }
                }

                setStatus("error");

            }
        };

        confirmEmail();
    }, [token]);

    return (
     
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 shadow rounded-xl text-center">
                    {status === "loading" && (
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Confirming Email...</h1>
                            <p className="text-gray-500 dark:text-gray-400">Please wait while we verify your email.</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div>
                            <h1 className="text-xl font-semibold text-green-600 mb-2">Success</h1>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
                            <Link
                                href="/signin"
                                className="text-brand-600 hover:text-brand-700 font-medium"
                            >
                                Go to Login
                            </Link>

                        </div>
                    )}

                    {status === "error" && (
                        <div>
                            <h1 className="text-xl font-semibold text-red-600 mb-2">Error</h1>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
                            <div className="flex gap-2 underline">
                                <Link
                                    href="/"
                                    className="text-brand-600 hover:text-brand-700 font-medium"
                                >
                                    Return to Home
                                </Link>
                                <Link
                                    href="/resend-confirmation"
                                    className="text-brand-600 hover:text-brand-700 font-medium"
                                >
                                    Resend Email
                                </Link>
                            </div>

                        </div>
                    )}
                </div>
            </div>
      
    );
}
