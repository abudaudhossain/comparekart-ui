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
import { getMatchingProducts, GetParams } from "../../../util/data/matchingProducts";
import { matchingProducts } from "@/lib/types/matchingProducts.type";
import Image from "next/image";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import ActionIcon from "../ui/ActionIcon";
import ToggleButton from "../ui/button/ToggleButton";
import { clientSideAxios } from "../../../lib/api/axios/clientSideAxios";
import errorMessage from "@/lib/errorMessage";
import { AxiosError } from "axios";
import successMessage from "@/lib/successMessage";




export default function MatchingProductsTable() {
    const router = useRouter();
    // const [filterUserId, setFilterUserId] = useState("");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [matchingProducts, setMatchingProducts] = useState<matchingProducts[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isToggled, setIsToggled] = useState(false);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchMatchingProducts = async () => {
        // const result = await getPaginatedClick(currentPage, 10);
        // //console.log("result:", result)
        const param: GetParams = {
            page: currentPage,
            limit: 10,
            sortOrder: "asc",
        }
        // if (filterUserId) {
        //     param.productOwnerId = filterUserId
        // }
        const result = await getMatchingProducts(param)
        //console.log("result: ", result)
        setMatchingProducts(result?.items || []);
        setTotalPages(result.totalPages)
    };
    useEffect(() => {
        fetchMatchingProducts();
    }, [currentPage]);

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };


    const toggleAllRows = () => {
        if (selectedRows.length === matchingProducts.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(matchingProducts.map(click => click.id));
        }
    };

    const handleEdit = async (id: string) => {
        // Handle save logic here
        try {
            // navigate product edit page
            router.push(`/dashboard/content/matching-products/edit?mgid=${id}`);
        } catch (error) {
            //console.log(error)
        }

    };

    const toggleHomeHandler = async (id: string, value: boolean) => {
        try {
            // navigate product edit page
            const res = await clientSideAxios.put(`/matching-products/${id}`, { isHome: value });

            if (res?.data?.success) {
                setMatchingProducts(matchingProducts.map(item => (item.id == id ? { ...item, isHome: !item.isHome } : item)))
                successMessage(res?.data?.message)
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response) {

                errorMessage(error.response.data?.message);
            } else {
                console.error("Unknown error:", error);
                errorMessage("An unknown error occurred. Please try again.");
            }
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
            <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                <p className=" font-medium text-gray-500 text-sm">Show {currentPage} of {totalPages}  pages</p>
                <div className="flex items-center gap-2">

                    {/* <SearchInput setSearchValue={setSearchValue} searchValue={searchValue} /> */}
                    {/* <UserIdFilter setFilterUserId={setFilterUserId} filterUserId={filterUserId} /> */}
                </div>
            </div>
            <div className="w-full overflow-auto  cursor-pointer ">
                <div className="max-w-[1150px] h-[60vh]">{
                    matchingProducts.length > 0 ? (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow className="sticky top-0 bg-white z-10">
                                    <TableCell className="px-2 py-3 sm:px-6 font-medium text-gray-500 text-start text-xs">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === matchingProducts.length}
                                            onChange={toggleAllRows}
                                        />
                                    </TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-start text-xs">Title</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-start text-xs">Sub Title</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs min-w-[120px]">GTIN</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Show Home Page</TableCell>
                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Created At</TableCell>

                                    <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Action</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {matchingProducts?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="px-2 py-3 sm:px-6 text-start">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => toggleRow(item.id)}
                                            />
                                        </TableCell>

                                        <TableCell className="px-2 py-3 text-start min-w-[300px]">
                                            <div className="flex gap-2">
                                                <Image src={item.image || "/images/images_1.png"} width={50} height={50} alt="Banner image" />
                                                <span className="block font-medium text-gray-800 dark:text-white/90">
                                                    {item.title || "N/A"}
                                                </span>

                                            </div>
                                        </TableCell>

                                        <TableCell className="px-2 py-3 text-gray-500 text-start text-sm dark:text-gray-400 min-w-[250px] ">
                                            {item?.subTitle || "N/A"}
                                        </TableCell>

                                        <TableCell className="px-2 py-3 text-center  min-w-[250px]">

                                            {item.gtin}
                                        </TableCell>


                                        <TableCell className="px-2 py-3 text-center min-w-[150px]">

                                            <div className="flex items-center justify-around">
                                                {item.isHome ? (
                                                    <Badge size="sm" color="success">Home Page</Badge>
                                                ) : (

                                                    <Badge size="sm" color="error">Normal</Badge>

                                                )}
                                                <ToggleButton
                                                    checked={item.isHome}
                                                    onChange={() => toggleHomeHandler(item.id, !item.isHome)}
                                                    label=""
                                                />
                                            </div>


                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-center min-w-[130px]">
                                            {item.createdAt ? formatDate(item.createdAt) : "N/A"}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 text-center">
                                            <ActionIcon className="text-[#0e82ee] font-bold" icon={Edit} label="Edit" onClick={() => { handleEdit(item.id) }} />
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




