"use client";
import React, { useState } from "react";
import { clientSideAxios } from "../../../../../lib/api/axios/clientSideAxios";
import { AxiosError } from "axios";


export default function ResendConfirmation() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const res = await clientSideAxios.post("/auth/reset-email", { email });

            const data = res.data;
            //console.log(data)

            setMessage(data.message || "A new confirmation link has been sent to your email.");
        } catch (error: any) {
            if (error instanceof AxiosError && error.response) {

                setError(error.response.data?.message);
            } else {

                if (error instanceof Error) {
                    setError(error.message || "An unknown error occurred. Please try again");
                } else {
                    setError("An unknown error occurred. Please try again");
                }
            }
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 shadow rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Resend Confirmation Email
                </h2>
                <form onSubmit={handleResend} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-brand-500 text-white font-medium rounded hover:bg-brand-600 disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Resend Link"}
                    </button>
                </form>

                {message && <p className="text-green-600 mt-4">{message}</p>}
                {error && <p className="text-red-600 mt-4">{error}</p>}
            </div>
        </div>
    );
}
