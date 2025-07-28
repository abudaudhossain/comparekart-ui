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


import Badge from "../ui/badge/Badge";

import { ClickType } from "@/lib/types/click.type";
import { getClicks, GetParams } from "../../../util/data/clicks";
import UserIdFilter from "../common/UserIdFilter";




export default function ClicksTable() {
    const [filterUserId, setFilterUserId] = useState("");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clicks, setClicks] = useState<ClickType[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchClicks = async () => {
        // const result = await getPaginatedClick(currentPage, 10);
        // //console.log("result:", result)
        const param: GetParams = {
            page: currentPage,
            limit: 10,
            sortOrder: "asc",
        }
        if (filterUserId) {
            param.productOwnerId = filterUserId
        }
        const result = await getClicks(param)
        //console.log("result: ", result)
        setClicks(result?.items || []);
        setTotalPages(result.totalPages)
    };
    useEffect(() => {
        fetchClicks();
    }, [currentPage, filterUserId]);

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };


    const toggleAllRows = () => {
        if (selectedRows.length === clicks.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(clicks.map(click => click.id));
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
            <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                <p className=" font-medium text-gray-500 text-sm">Show {currentPage} of {totalPages}  pages</p>
                <div className="flex items-center gap-2">

                    {/* <SearchInput setSearchValue={setSearchValue} searchValue={searchValue} /> */}
                    <UserIdFilter setFilterUserId={setFilterUserId} filterUserId={filterUserId} />
                </div>
            </div>
            <div className="w-full overflow-auto  cursor-pointer ">
                <div className="max-w-[1100px]  h-[60vh]">{
                    clicks.length > 0 ? (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow className="sticky top-0 bg-white z-10">
                                    <TableCell className="px-2 py-3 sm:px-6 font-medium text-gray-500 text-start text-xs">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === clicks.length}
                                            onChange={toggleAllRows}
                                        />
                                    </TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-start text-xs">Product Owner</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-start text-xs">Offer</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs min-w-[120px]">User Agent</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">fingerprint</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">ip</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Counted</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Message</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Clicked At</TableCell>
                                    {/* <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Action</TableCell> */}
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {clicks?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="px-2 py-3 sm:px-6 text-start">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => toggleRow(item.id)}
                                            />
                                        </TableCell>

                                        <TableCell className="px-2 py-3 text-start min-w-[200px]">
                                            <div>
                                                <span className="block font-medium text-gray-800 dark:text-white/90">
                                                    {item.productOwner?.name || "N/A"}
                                                </span>

                                            </div>
                                        </TableCell>

                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-sm dark:text-gray-400 min-w-[250px] ">
                                            {item?.offer.title || "N/A"}
                                        </TableCell>

                                        <TableCell className="px-2 py-3 text-center  min-w-[250px]">

                                            {item.userAgent}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-center">{item.fingerprint}</TableCell>
                                        <TableCell className="px-2 py-3 text-center">{item.ip}</TableCell>

                                        <TableCell className="px-2 py-3 text-center min-w-[130px]">
                                            {item.isCounted ? (
                                                <Badge size="sm" color="success">Counted</Badge>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Badge size="sm" color="error">Blocked</Badge>


                                                </div>
                                            )}
                                        </TableCell>

                                        <TableCell className="px-2 py-3 text-center min-w-[200px]">
                                            {item.blockedReason || "N/A"}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-center min-w-[130px]">
                                            {item.createdAt ? formatDate(item.createdAt) : "N/A"}
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
    );
}




