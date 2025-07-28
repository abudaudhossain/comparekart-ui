"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { clientSideAxios } from "../../../lib/api/axios/clientSideAxios";
import { AxiosError } from "axios";
import errorMessage from "@/lib/errorMessage";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      setFormData({ name: "", email: "", password: "" });
      const data = {...formData}
      const response = await clientSideAxios.post("/auth/register", data);

      const result = response.data;
      //console.log(result)

      // if (!res.ok) throw new Error(result.message || "Something went wrong");

      setSuccess(result.message || "Account created successfully!");

    } catch (error: unknown) {
      //console.log(error)
      if (error instanceof AxiosError && error.response) {

        errorMessage(error.response.data?.message);
        setError(error.response.data?.message);
      } else {
        console.error("Unknown error:", error);
        errorMessage("An unknown error occurred. Please try again.");
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
    <div className="flex flex-col flex-1 lg:w-1/2 w-full ">
      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
        <div className="rounded-2xl px-12 py-8 shadow">
          <div className="mb-5 sm:mb-8">
            <h1 className="text-2xl font-bold mb-2 text-center">Logo</h1>
            <h1 className="font-medium text-gray-800 text-xl dark:text-white/90">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>

          <form onSubmit={ handleSubmit}>
            <div className="space-y-5">
              {/* Name */}
              <div className="sm:col-span-1">
                <Label>
                  Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account, you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions
                  </span>{" "}
                  and our{" "}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading || !isChecked}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>

              {/* Feedback */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
