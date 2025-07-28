"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { clientSideAxios } from "../../../lib/api/axios/clientSideAxios";
import successMessage from "../../../lib/successMessage";
import { saveLoginData } from "../../../util/loginData";
import errorMessage from "../../../lib/errorMessage";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useStore } from "@/context/StoreContext";

export default function SignInForm() {
  const router = useRouter();
  const { setUser } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false)
  //console.log(loading)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        email,
        password,
        keepLoggedIn: isChecked,
      };
      //console.log(formData);
      if (!email || !password) {
        return;
      }
      setLoading(true);
      setPassword("")
      setEmail("")
      setIsChecked(false)
      //console.log("Form data:", formData);

      const response = await clientSideAxios.post("/auth/login", {
        identifier: formData.email,
        password: formData.password,
      });

      saveLoginData(response.data.data);

      setUser(response.data.data.user)
      successMessage("login successful");
      setLoading(false);

      router.push("/dashboard");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {

        errorMessage(error.response.data?.message);
      } else {
        console.error("Unknown error:", error);
        errorMessage("An unknown error occurred. Please try again.");
      }
      setLoading(false);
    }

  };

  useEffect(() => {
    setUser(null)
  }, [])

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="rounded-2xl p-12 shadow">
          <div className="mb-5 sm:mb-8 ">
            <h1 className="text-2xl font-bold mb-2 text-center">Logo</h1>
            <h1 className="font-medium text-gray-800 text-xl dark:text-white/90">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" type="email" value={email} // Bind value to state
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password} // Bind value to state
                      onChange={(e) => setPassword(e.target.value)}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
