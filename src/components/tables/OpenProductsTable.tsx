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
import { RefreshCcw, } from "lucide-react";
import { getProducts } from "../../../util/data/products";
import { ProductCardProps } from "@/lib/types/product.type";
import { clientSideAxios } from "../../../lib/api/axios/clientSideAxios";
import Badge from "../ui/badge/Badge";
import successMessage from "@/lib/successMessage";
import errorMessage from "@/lib/errorMessage";
import UserIdFilter from "../common/UserIdFilter";
import SearchInput from "../common/SearchInput";
import { useStore } from "@/context/StoreContext";
import DatePicker from "../ui/DatePicker/DatePicker";
import { DateRange } from "react-day-picker";
// import SearchInput from "../ui/SearchInput";



export default function OpenProductsTable() {
    const { user } = useStore()
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<ProductCardProps[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filterUserId, setFilterUserId] = useState("")
    const [searchValue, setSearchValue] = useState<string>("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchProducts = async () => {
        // const result = await getPaginatedProduct(currentPage, 10);
        // //console.log("result:", result)
        const result = await getProducts({
            page: currentPage,
            limit: 10,
            sortOrder: "asc",
            status: "OPEN",
            search: searchValue,
            userId: filterUserId,
            createdAfter: dateRange ? dateRange?.from : "",
            createdBefore: dateRange ? dateRange?.to : "",

        })
        //console.log("result: ", result)
        setProducts(result?.products || []);
        setTotalPages(result.totalPages)
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



    const handleSynced = async (ids: string[]) => {
        if (user?.role !== "ADMIN") return;
        // Handle save logic here
        //console.log("Saving changes...", selectedRows, ids);
        try {
            const res = await clientSideAxios.post("products/assigned", {
                openProductIds: ids
            })
            successMessage(res.data.message)
            fetchProducts()
        } catch (error) {
            //console.log(error)
            errorMessage("Product assigned failed")
        }
        setSelectedRows([])
    };



    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
            <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                <p className=" font-medium text-gray-500 text-sm">Show {currentPage} of {totalPages}  pages</p>
                <div className="flex items-center gap-2">
                    <div className="flex gap-2 items-center justify-start flex-wrap">
                        <div className="min-w-[250px]">
                            <DatePicker
                                range={dateRange} onChange={setDateRange}
                            />
                        </div>
                        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
                        <UserIdFilter filterUserId={filterUserId} setFilterUserId={setFilterUserId} />
                    </div>
                    {user?.role == "ADMIN" && <button
                        onClick={() => handleSynced(selectedRows)}
                        className="bg-brand-500 hover:bg-brand-600 text-white px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200  flex gap-2"
                    >
                        <RefreshCcw />Assigned
                    </button>}
                </div>
            </div>
            <div className="w-full overflow-auto  cursor-pointer ">
                <div className="max-w-[1100px]   h-[60vh]">
                    {products?.length > 0 ? <Table >
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
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[200px]">
                                        <span className="line-clamp-2">
                                            {item.title}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[200px]">
                                        {item.gtin}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-[250px]">
                                        <span className=" line-clamp-3">
                                            {item.description || "N/A"}
                                        </span>
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
                                            <ActionIcon className={`${user?.role !== "ADMIN" && "cursor-not-allowed"}  text-green-500`} icon={RefreshCcw} label="Assigned" onClick={() => handleSynced([item.id])} />
                                            {/* <ActionIcon className="text-[#0e82ee] font-bold" icon={Edit} label="Edit" /> */}

                                            {/* <ActionIcon className="text-[#f01d16] font-bold" icon={Trash2} label="Delete" /> */}
                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> : <p className="font-medium text-gray-500 text-sm text-center mt-5">No data found</p>}
                </div>
            </div>
            <div className="my-3 ml-3">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>


        </div>
    );
}




