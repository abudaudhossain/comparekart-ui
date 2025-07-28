"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import errorMessage from "@/lib/errorMessage";
import successMessage from "@/lib/successMessage";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);


        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Something went wrong");
            setEmail("")
            successMessage("Reset link sent successfully. Please check your email.");
        } catch (err: any) {
            errorMessage(err.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div className="rounded-2xl px-12 py-8 shadow">
                    <div className="mb-5 sm:mb-8">
                        <h1 className="text-2xl font-bold mb-2 text-center">Logo</h1>
                        <h1 className="font-medium text-gray-800 text-xl dark:text-white/90">
                            Forgot Password
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter the email address linked to your account, and we’ll send you a link to reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <Label>
                                    Email <span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    placeholder="info@gmail.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div>
                                <Button className="w-full" size="sm" disabled={loading}>
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </div>


                        </div>
                    </form>

                    <div className="mt-5">
                        <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                            Wait, I remember my password...{" "}
                            <Link
                                href="/signin"
                                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                            >
                                Click here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
