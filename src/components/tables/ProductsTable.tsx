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
import { getProducts } from "../../../util/data/products";
import { ProductCardProps } from "@/lib/types/product.type";

import Badge from "../ui/badge/Badge";
import { useRouter } from "next/navigation";
import UserIdFilter from "../common/UserIdFilter";
import SearchInput from "../common/SearchInput";
import Image from "next/image";
import DatePicker from "../ui/DatePicker/DatePicker";
import { DateRange } from "react-day-picker";
// import SearchInput from "../ui/SearchInput";




export default function ProductsTable() {
    const router = useRouter();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<ProductCardProps[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filterUserId, setFilterUserId] = useState("")
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchProducts = async () => {
        try {
            // const result = await getPaginatedProduct(currentPage, 10);
            // //console.log("result:", result)
            const result = await getProducts({
                page: currentPage,
                limit: 10,
                sortOrder: "asc",
                status: "ASSIGNED",
                search: searchValue,
                userId: filterUserId,
                createdAfter: dateRange ? dateRange?.from : "",
                createdBefore: dateRange ? dateRange?.to : "",
            })
            //console.log("result: ", result)
            setProducts(result?.products || []);
            setTotalPages(result.totalPages)
        } catch (error) {
            //console.log("error::      ", error)
            setProducts([])
            setTotalPages(0)
        }
    };
    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchValue, filterUserId, dateRange]);

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



    const handleEdit = async (id: string) => {
        // Handle save logic here
        try {
            // navigate product edit page
            router.push(`/dashboard/products/edit_products?pd=${id}`);
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

    //console.log("dateRange ", dateRange)

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
            {/* <p>{searchValue}</p> */}
            <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                <p className=" font-medium text-gray-500 text-sm">Show {currentPage} of {totalPages}  pages</p>
                <div className="flex gap-2 items-center justify-start flex-wrap">
                    <div className="min-w-[250px]">
                        <DatePicker
                            range={dateRange} onChange={setDateRange}
                        />
                    </div>
                    <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
                    <UserIdFilter filterUserId={filterUserId} setFilterUserId={setFilterUserId} />
                </div>
            </div>
            <div className=" overflow-auto  cursor-pointer ">
                <div className="max-w-[1100px]  h-[60vh]">
                    {products?.length > 0 ? (<Table >
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
                                    GTIN
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Category
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
                                    Product  status
                                </TableCell> */}
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
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[300px]">
                                        <div className="flex gap-1.5 items-center">
                                            <div>
                                                <Image width={60} height={60} src={item.image} alt="Main Image" className="max-h-[70px]" />
                                            </div>
                                            <span className="line-clamp-2">
                                                {item.title}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[200px]">
                                        {item.gtin}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[200px]">
                                        {item?.Category?.name || "N/A"}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[250px]">
                                        <span className="line-clamp-3"> {item.description || "N/A"}</span>
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

                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                        {item.createdAt ? formatDate(item.createdAt) : "N/A"}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[130px] ">
                                        <Badge
                                            size="sm"
                                            color={
                                                item.status === "ASSIGNED"
                                                    ? "success"
                                                    : "warning"

                                            }
                                        >
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ">
                                        <div className="flex">

                                            <ActionIcon className="text-[#0e82ee] font-bold" icon={Edit} label="Edit" onClick={() => { handleEdit(item.id) }} />

                                            <ActionIcon className="text-[#12f15c] font-bold" icon={PlusCircle} label="Create Offer" onClick={() => { handleCreateOffer(item.id) }} />
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




