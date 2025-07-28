"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import successMessage from "@/lib/successMessage";
import errorMessage from "@/lib/errorMessage";

export default function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            errorMessage("Missing token in URL.");
            return;
        }

        if (password !== confirmPassword) {
            errorMessage("Passwords do not match.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to reset password");

            successMessage("Password reset successfully!");
            setTimeout(() => {
                router.push("/signin");
            }, 2000);
        } catch (err: any) {
            errorMessage(err.message || "Something went wrong");
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
                            Reset Password
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter and confirm your new password to reset your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <Label>
                                    Password <span className="text-error-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <Label>
                                    Confirm Password <span className="text-error-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <Button className="w-full" size="sm" disabled={loading}>
                                    {loading ? "Resetting..." : "Reset Password"}
                                </Button>
                            </div>

                            {message && (
                                <p className="text-sm text-center text-gray-700 dark:text-gray-300">
                                    {message}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
