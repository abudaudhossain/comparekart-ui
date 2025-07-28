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
import { RefreshCcw, Trash2 } from "lucide-react";
import { getFilteredPaginatedProducts } from "../../../util/data/products";
import { ProductCardProps } from "@/lib/types/product.type";
// import SearchInput from "../ui/SearchInput";

// interface Product extends ProductCardProps {

// }


export default function BestsellersProductsTable() {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<ProductCardProps[]>([])
    const totalPages = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const result = getFilteredPaginatedProducts({ page: currentPage, limit: totalPages })
        setProducts(result?.results)
    }, [currentPage])

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAllRows = () => {
        if (selectedRows.length === products.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(products.map(product => product.id));
        }
    };

    // const handleUpload = (data: File | string) => {
    //     if (typeof data === "string") {
    //         //console.log("Link submitted:", data);
    //     } else {
    //         //console.log("File uploaded:", data);
    //     }
    // };

    // const handleSynced = (id: string[]) => {
    //   // Handle save logic here
    //   //console.log("Saving changes...", selectedRows);
    //   setSelectedRows([])
    // };



    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
            <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                <p className=" font-medium text-gray-500 text-sm">Show {totalPages} entries</p>
                {/* <button
          onClick={() => handleSynced(selectedRows)}
          className="bg-brand-500 hover:bg-brand-600 text-white px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200  flex gap-2"
        >
          <RefreshCcw /> Synced
        </button> */}
            </div>
            <div className="w-full overflow-auto  cursor-pointer ">
                <div className="max-w-[1100px] h-[60vh]">
                    <Table >
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow className="sticky top-0 bg-white">
                                <TableCell className="px-2 py-3 sm:px-6  font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === products.length}
                                        onChange={toggleAllRows}
                                    />
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Product ID
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Product Name
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Client
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Price
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Clicked Count
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Product  status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    last Updated
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Last Synced
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
                            {products?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-2 py-3 sm:px-6 text-star">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.id)}
                                            onChange={() => toggleRow(item.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="px-2 py-4 sm:px-6 text-start min-w-[120px] ">
                                        {item.feedProductId}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[200px]">
                                        {item.title}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[250px] line-clamp-3 overflow-hidden">
                                        {item.description}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px]">
                                        <div className="flex items-center">
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.feed.user?.name}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {item.feed.user?.role.name}

                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ">
                                        {item.price}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[120px]">
                                        Offers: {item.OfferCount}<br />
                                        click: {item.clickCount ? item.clickCount : 0}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[120px] ">

                                        {item.rating !== null ? (
                                            <span className="text-green-600 text-sm">
                                                ★ {item.rating} ({item.OfferCount})
                                            </span>) : "nul"}
                                        {item.avg_score && (
                                            <span className="mt-2 text-[#0C6DCD] bg-[#EEF5FB] font-normal text-[12px] px-2 py-[2px] rounded-full hidden sm:block">
                                                Avg Score {item.avg_score}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                        {item.createdAt ? formatDate(item.createdAt) : "N/A"}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                        {item.last_synced_at ? formatDate(item.last_synced_at) : "N/A"}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex">
                                            <ActionIcon className="text-green-500" icon={RefreshCcw} label="Synced" />
                                            {/* <ActionIcon className="text-[#0e82ee] font-bold" icon={Edit} label="Edit" /> */}

                                            <ActionIcon className="text-[#f01d16] font-bold " icon={Trash2} label="Delete" />
                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="my-3 ml-3">
                <Pagination currentPage={currentPage} totalPages={10} onPageChange={handlePageChange} />
            </div>


        </div>
    );
}




