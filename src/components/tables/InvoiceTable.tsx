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
import { EyeIcon, PlusCircle, } from "lucide-react";


import Badge from "../ui/badge/Badge";
import { useRouter } from "next/navigation";
import UserIdFilter from "../common/UserIdFilter";
import SearchInput from "../common/SearchInput";
import { InvoiceProps } from "@/lib/types/invoice.type";
import { getInvoices } from "../../../util/data/invoice";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import InvoicesCreated from "../Invoices/InvoicesCreated";
import Link from "next/link";
// import SearchInput from "../ui/SearchInput";




export default function InvoicesTable() {
    const router = useRouter();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [invoices, setInvoices] = useState<InvoiceProps[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filterUserId, setFilterUserId] = useState("")
    const { isOpen, openModal, closeModal } = useModal();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchInvoices = async () => {
        try {
            // const result = await getPaginatedInvoice(currentPage, 10);
            // //console.log("result:", result)
            const result = await getInvoices({
                page: currentPage,
                limit: 10,
                sortOrder: "asc",
                status: "ASSIGNED",
                search: searchValue,
                userId: filterUserId
            })
            //console.log("result: ", result)
            setInvoices(result?.items || []);
            setTotalPages(result.totalPages)
        } catch (error) {
            //console.log("error::      ", error)
            setInvoices([])
            setTotalPages(0)
        }
    };
    useEffect(() => {
        fetchInvoices();
    }, [currentPage, searchValue, filterUserId, isOpen]);

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };


    const toggleAllRows = () => {
        if (selectedRows.length === invoices.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(invoices.map(invoice => invoice.id));
        }
    };



    const handleEdit = async (id: string) => {
        // Handle save logic here
        try {
            // navigate invoice edit page
            router.push(`/dashboard/invoices/edit_invoices?pd=${id}`);
        } catch {

        }

    };

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
                {/* <p>{searchValue}</p> */}
                <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                    <p className=" font-medium text-gray-500 text-sm">Show {currentPage} of {totalPages}  pages</p>
                    <div className="flex gap-2 items-center justify-start flex-wrap">
                        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
                        <UserIdFilter filterUserId={filterUserId} setFilterUserId={setFilterUserId} />
                        <button
                            onClick={() => {

                                openModal()
                            }}
                            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200  flex gap-3 "
                        >
                            <PlusCircle /> Create New Invoice
                        </button>
                    </div>
                </div>
                <div className="w-full overflow-auto  cursor-pointer ">
                    <div className="max-w-full  h-[60vh]">
                        {invoices?.length > 0 ? (<Table >
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow className="sticky top-0 bg-white">
                                    <TableCell className="px-2 py-3 sm:px-6  font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === invoices.length}
                                            onChange={toggleAllRows}
                                        />
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Invoice Number
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Client Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Billing Period Start
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Billing Period End
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Click Count
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Price Per Click
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Total Amount
                                    </TableCell>
                                    {/* <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Clicked Count
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    invoice  status
                                </TableCell> */}
                                    <TableCell
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Created AT
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
                                {invoices?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="px-2 py-3 sm:px-6 text-star">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => toggleRow(item.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="px-2 py-4 sm:px-6 text-start min-w-[120px] ">
                                            {item.invoiceNumber}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px]">
                                            <div className="flex items-center">
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {item.user?.name}
                                                    </span>
                                                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                        {item.user?.role?.name || "N/A"}

                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                            {item.periodStart ? formatDate(item.periodStart) : "N/A"}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                            {item.periodEnd ? formatDate(item.periodEnd) : "N/A"}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ">
                                            {item.clickCount}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.clickPrice}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.total}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                            {item.createdAt ? formatDate(item.createdAt) : "N/A"}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ">
                                            <div className="flex">
                                                {item.link ? <Link href={item.link || ""} target="_blank">

                                                    <ActionIcon className="text-[#0e82ee] font-bold" icon={EyeIcon} label="View" />
                                                </Link> :
                                                    <ActionIcon className="text-[#0e82ee] font-bold cursor-not-allowed" icon={EyeIcon} label="No Link" />
                                                }

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
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] min-h-[150px] m-4">
                <InvoicesCreated onClose={closeModal} />

            </Modal>
        </>
    );
}




