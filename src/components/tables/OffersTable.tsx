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
import { Edit, PlusCircle, } from "lucide-react";
import Badge from "../ui/badge/Badge";
import { useRouter } from "next/navigation";
import { getOffers } from "../../../util/data/offers";
import { ProductOffer } from "@/lib/types/offer.type";
import UserIdFilter from "../common/UserIdFilter";
import SearchInput from "../common/SearchInput";


export default function OffersTable() {
    const router = useRouter();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [offers, setOffers] = useState<ProductOffer[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filterUserId, setFilterUserId] = useState("")
    const [searchValue, setSearchValue] = useState("")

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchOffers = async () => {
        // const result = await getPaginatedProduct(currentPage, 10);
        // //console.log("result:", result)
        const result = await getOffers({
            page: currentPage,
            limit: 10,
            sortOrder: "asc",
            search: searchValue,
            userId: filterUserId
        })
        //console.log("result: ", result)
        setOffers(result?.items || []);
        setTotalPages(result.totalPages)
    };
    useEffect(() => {
        fetchOffers();
    }, [currentPage, filterUserId, searchValue]);

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };


    const toggleAllRows = () => {
        if (selectedRows.length === offers.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(offers.map(product => product.id));
        }
    };



    const handleEdit = async (id: string) => {
        // Handle save logic here
        try {
            // navigate product edit page
            router.push(`/dashboard/offers/edit_offers?pd=${id}`);
        } catch {

        }

    };
    const handleCreateOffer = async (id: string) => {
        // Handle save logic here
        try {
            // navigate product edit page
            router.push(`/dashboard/offers/created?pd=${id}`);
        } catch {

        }

    };



    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
            <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                <p className=" font-medium text-gray-500 text-sm">Show {currentPage} of {totalPages}  pages</p>
                <div className="flex gap-2 items-center justify-start flex-wrap">
                    <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
                    <UserIdFilter filterUserId={filterUserId} setFilterUserId={setFilterUserId} />
                </div>
            </div>
            <div className="w-full overflow-auto  cursor-pointer ">
                <div className="max-w-[1100px]   h-[60vh]">
                    {offers?.length > 0 ? (<Table >
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow className="sticky top-0 bg-white">
                                <TableCell className="px-2 py-3 sm:px-6  font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === offers.length}
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
                                    Offer Title
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
                                    className="px-2 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                >
                                    Clicked Count
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Click Url
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    last Updated
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
                            {offers?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-2 py-3 sm:px-6 text-star">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.id)}
                                            onChange={() => toggleRow(item.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="px-2 py-4 sm:px-6 text-start min-w-[120px] ">
                                        {item.product.feedProductId}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[200px]">
                                        <span className="line-clamp-2">
                                            {item.title}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[250px] line-clamp-3 overflow-hidden">
                                        <span className="line-clamp-2">
                                            {item.product.title}
                                        </span>
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

                                    <TableCell className="px-2 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 ">
                                        {item.price}
                                    </TableCell>

                                    <TableCell className="px-2 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                        {item._count.clicks}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400  truncate">
                                        {item.clickUrl}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px] ">

                                        {item.updatedAt ? formatDate(item.updatedAt) : "N/A"}
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

                                            <ActionIcon className="text-[#12f15c] font-bold" icon={PlusCircle} label="Create Offer" onClick={() => { handleCreateOffer(item.productId) }} />
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
    );
}




