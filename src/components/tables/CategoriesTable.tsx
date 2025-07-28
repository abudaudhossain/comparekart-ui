"use client"
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Pagination from "./Pagination";
import formatDate from "../../../util/formatDate";
import ActionIcon from "../ui/ActionIcon";
import { Edit, Import, PlusCircle, } from "lucide-react";
import Badge from "../ui/badge/Badge";
import { useRouter } from "next/navigation";

import UserIdFilter from "../common/UserIdFilter";
import SearchInput from "../common/SearchInput";
import { categoryType } from "@/lib/types/category.type";
import { getCategories } from "../../../util/data/categories";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import CategoriesFileOrLinkUploader from "../content/categories/CategoresFileOrLinkUploader";


export default function CategoriesTable() {
    const router = useRouter();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState<categoryType[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchValue, setSearchValue] = useState("")
    const { isOpen, openModal, closeModal } = useModal();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchCategories = async () => {
        // const result = await getPaginatedProduct(currentPage, 10);
        // //console.log("result:", result)
        const result = await getCategories({
            page: currentPage,
            limit: 10,
            sortOrder: "asc",
            search: searchValue,
        })
        //console.log("result: ", result)
        setCategories(result?.items || []);
        setTotalPages(result.totalPages)
    };
    useEffect(() => {
        fetchCategories();
    }, [currentPage, searchValue]);

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };


    const toggleAllRows = () => {
        if (selectedRows.length === categories.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(categories.map(item => item.id));
        }
    };

    const handleEdit = async (id: string) => {
        // Handle save logic here
        try {
            // navigate product edit page
            router.push(`/dashboard/content/categories/edit?cid=${id}`);
        } catch {

        }

    };
    const handleCreateOffer = async () => {
        // Handle save logic here
        try {
            // navigate product edit page
            router.push(`/dashboard/content/categories/created`);
        } catch {

        }

    };



    return (
        <>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
                <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                    <p className=" font-medium text-gray-500 text-sm">Show {currentPage} of {totalPages}  pages</p>
                    <div className="flex gap-2 items-center justify-start flex-wrap">
                        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
                        <button
                            onClick={() => {
                                handleCreateOffer()

                            }}
                            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200  flex gap-3 "
                        >
                            <PlusCircle /> New Category
                        </button>
                        <button
                            onClick={() => {

                                openModal()
                            }}
                            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200  flex gap-3 "
                        >
                            <Import /> Import Categories
                        </button>
                    </div>
                </div>
                <div className="w-full overflow-auto  cursor-pointer ">
                    <div className="max-w-[1100px]   h-[60vh]">
                        {categories?.length > 0 ? (<Table >
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow className="sticky top-0 bg-white">
                                    <TableCell className="px-2 py-3 sm:px-6  font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === categories.length}
                                            onChange={toggleAllRows}
                                        />
                                    </TableCell>

                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Category Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Slug
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Description
                                    </TableCell>

                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 max-w-50 min-w-[130px]"
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* // {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {categories?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="px-2 py-3 sm:px-6 text-star">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => toggleRow(item.id)}
                                            />
                                        </TableCell>

                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[200px]">
                                            <span className="line-clamp-2">
                                                {item.name}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[250px] line-clamp-3 overflow-hidden">
                                            <span className="line-clamp-2">
                                                {item.slug}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px]">
                                            <span>
                                                {item.description}
                                            </span>
                                        </TableCell>


                                        <TableCell className="px-2 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                            <Badge
                                                size="sm"
                                                color={
                                                    item.status === "ACTIVE"
                                                        ? "success"
                                                        : "error"

                                                }
                                            >
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ">
                                            <div className="flex">

                                                <ActionIcon className="text-[#0e82ee] font-bold" icon={Edit} label="Edit" onClick={() => { handleEdit(item.id) }} />

                                            </div>

                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>) : <p className="font-medium text-gray-500 text-sm text-center mt-5">No data found</p>}
                    </div>
                </div>
                <div className="my-3 ml-3">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>


            </div>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <CategoriesFileOrLinkUploader onClose={closeModal} fetchCategories={fetchCategories} />
            </Modal>
        </>
    );
}




