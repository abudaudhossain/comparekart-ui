"use client"
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Pagination from "./Pagination";
import { getPaginatedFeeds, syncedFeedsHandler } from "../../../util/data/feeds";
import Link from "next/link";
import formatDate from "../../../util/formatDate";
import ActionIcon from "../ui/ActionIcon";
import { Import, RefreshCcw } from "lucide-react";
// import FileOrLinkUploader from "../common/FileOrLinkUploader";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import FeedsFileOrLinkUploader from "../Feeds/FeedsFileOrLinkUploader";
import errorMessage from "@/lib/errorMessage";
import { Feed } from "@/lib/types/feed.type";
import UserIdFilter from "../common/UserIdFilter";
// import SearchInput from "../ui/SearchInput";




export default function FeedsTable() {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [feeds, setFeed] = useState<Feed[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);
    const [updatedFeed, setUpdatedFeed] = useState<string | null>(null);
    const [filterUserId, setFilterUserId] = useState("")
    const limit = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const fetchFeeds = async () => {
        try {

            const result = await getPaginatedFeeds(currentPage, limit, filterUserId);
            //console.log(result, "result")
            setFeed(result?.items || []);
            setTotalPages(result?.totalPages || 1);
        } catch (error) {
            //console.log(error)
            errorMessage("Failed to fetch feeds");

        }
    };
    useEffect(() => {

        fetchFeeds();
    }, [currentPage, filterUserId]);

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAllRows = () => {
        if (selectedRows.length === feeds.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(feeds.map(feed => feed.id));
        }
    };

    const { isOpen, openModal, closeModal } = useModal();

    const syncedHandler = (id: string) => {
        try {
            syncedFeedsHandler(id)
        } catch (error) {
            //console.log(error)
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
            <div className="px-5 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                <p className=" font-medium text-gray-500 text-sm">Show {feeds.length} entries</p>
                <div className="flex  gap-2 items-center">
                    <button
                        onClick={() => {
                            setUpdatedFeed(null)
                            openModal()
                        }}
                        className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200  flex gap-3 "
                    >
                        <Import /> New Feed
                    </button>

                    <UserIdFilter filterUserId={filterUserId} setFilterUserId={setFilterUserId} />
                </div>
            </div>
            <div className="w-full overflow-auto  cursor-pointer ">
                <div className="max-w-[1100px]  h-[60vh]">
                    {feeds?.length > 0 ? (<Table >
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow className="sticky top-0 bg-white">
                                <TableCell className="px-5 py-3 sm:px-6  font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === feeds.length}
                                        onChange={toggleAllRows}
                                    />
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Provider
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    type
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Feed file
                                </TableCell>

                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Message
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Items
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    last Updated
                                </TableCell>

                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 max-w-50"
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* // {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {feeds?.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-5 py-3 sm:px-6 text-star">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(order.id)}
                                            onChange={() => toggleRow(order.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3 min-w-40">
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {order.user.name}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {order.user.role.name}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-[100px] ">
                                        {order.type}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-[200px] truncate">

                                        <Link href={order.url} target="_blank">
                                            {order.url}
                                        </Link>


                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={
                                                order.status === "SUCCESS"
                                                    ? "success"
                                                    : order.status === "PENDING"
                                                        ? "warning"
                                                        : "error"
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[200px]">
                                        {order.errorMessage || "No error"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px]">
                                        Products: {order._count.products} <br />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400  min-w-[130px]">
                                        {formatDate(order.updatedAt)}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px]">
                                        <div className="flex">
                                            <ActionIcon className="text-green-500" icon={RefreshCcw} label="Synced" onClick={() => { syncedHandler(order.id) }} />
                                            <ActionIcon className="text-[#0e82ee] font-bold" icon={Import} label="Import" onClick={() => {
                                                setUpdatedFeed(order.id)
                                                openModal()
                                            }} />
                                            {/* <ActionIcon className="text-[#f01d16] font-bold" icon={Trash2} label="Delete" /> */}
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

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                {/* <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">

                </div> */}
                <FeedsFileOrLinkUploader updatedFeed={updatedFeed} onClose={closeModal} fetchFeeds={fetchFeeds} />
            </Modal>
        </div>
    );
}




