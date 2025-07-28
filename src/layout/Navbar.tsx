"use client";
import UserDropdown from "@/components/header/UserDropdown";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { User } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const Navbar: React.FC = () => {
    const { user } = useStore()
    // const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);




    // const toggleApplicationMenu = () => {
    //     setApplicationMenuOpen(!isApplicationMenuOpen);
    // };
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);



    return (
        <>
            <header className=" sticky top-0 flex w-full bg-[#0A3761] border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 border-b">
                <div className="container relative flex flex-wrap items-center justify-between grow flex-row px-[10px]">
                    <div className=" flex flex-wrap sm:flex-nowrap items-center justify-between  gap-2 px-3 py-3  border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal  lg:px-0 lg:py-4">
                        {/* <NavDropdown /> */}
                        <Link href="/" className="">
                            {/* <Image
                            width={154}
                            height={32}
                            className=""
                            src="./images/logo/logo.svg"
                            alt="Logo"
                        /> */}
                            <h1 className="text-2xl font-bold text-white">Logo</h1>
                        </Link>
                    </div>
                    <SearchBar className=" order-3 sm:order-1" />
                    <div
                        className={` items-center gap-4 py-4 flex justify-end px-0 shadow-none order-1`}
                    >
                        {
                            user ? <UserDropdown isHiddenName={true} /> : <div className="flex items-center gap-2 hover:bg-[#375F86] p-2 rounded-sm text-white py-3 px-4">
                                <User size={30} />
                                <Link href="/signin" className="text-base font-medium">
                                    Log in
                                </Link>
                            </div>}

                    </div>
                </div>
            </header>

        </>
    );
};

export default Navbar;
