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
import { Edit, } from "lucide-react";

import Badge from "../ui/badge/Badge";
import { ClientType } from "@/lib/types/client.type";
import { getClients, GetClientsParams } from "../../../util/data/clients";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import UserEditForm from "../form/UserEditForm";
import errorMessage from "@/lib/errorMessage";
import { clientSideAxios } from "../../../lib/api/axios/clientSideAxios";
import successMessage from "@/lib/successMessage";
import SearchInput from "../common/SearchInput";




export default function ClientsTable() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clients, setClients] = useState<ClientType[]>([])
    const [totalPages, setTotalPages] = useState<number>(1);
    const [selectUser, setSelectedUser] = useState<{
        userId: string | ""
        clickCharge: number,

    }>({ userId: "", clickCharge: 0 })

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const fetchClients = async () => {
        // const result = await getPaginatedClient(currentPage, 10);
        // //console.log("result:", result)
        const params: GetClientsParams = {
            page: currentPage,
            limit: 10,
            sortOrder: "asc",

        }
        if (searchValue) {
            params.search = searchValue
        }
        const result = await getClients(params)
        //console.log("result: ", result)
        setClients(result?.items || []);
        setTotalPages(result.totalPages)
    };
    useEffect(() => {
        fetchClients();
    }, [currentPage, searchValue]);

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };


    const toggleAllRows = () => {
        if (selectedRows.length === clients.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(clients.map(client => client.id));
        }
    };

    const { isOpen, openModal, closeModal } = useModal();

    const handleConfirmUser = async (userId: string) => {
        try {
            const res = await clientSideAxios.put(`/user/${userId}/confirm`);

            const data = res.data
            successMessage(data.message)

            // ✅ Optionally re-fetch clients or update state
            fetchClients(); // If you already have this function
        } catch (error) {
            console.error("Confirmation failed:", error);
            errorMessage("Failed to confirm user.");
        }
    };


    const handleClickChargeUser = async (data: {
        userId: string,
        clickCharge: number
    }) => {
        try {
            const res = await clientSideAxios.put(`/user/${data.userId}`, { clickCharge: data.clickCharge });

            const result = res.data
            successMessage(result.message)

            // ✅ Optionally re-fetch clients or update state
            fetchClients(); // If you already have this function
        } catch (error) {
            // console.error("Confirmation failed:", error);
            if (error instanceof Error) {
                errorMessage(error.message || "Something went wrong.");
            } else {
                errorMessage("Something went wrong.");
            }
        } finally {
            closeModal()
        }
    };



    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.0 3] max-w-full">
            <div className="px-2 py-4 bg-gray-100 flex justify-between  flex-col sm:flex-row sm:items-center items-start gap-2">
                <p className=" font-medium text-gray-500 text-sm">Show {currentPage} of {totalPages}  pages</p>
                <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className="w-full overflow-auto  cursor-pointer ">
                <div className="max-w-full  h-[60vh]">
                    {clients.length > 0 ? (<Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow className="sticky top-0 bg-white z-10">
                                <TableCell className="px-2 py-3 sm:px-6 font-medium text-gray-500 text-start text-xs">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === clients.length}
                                        onChange={toggleAllRows}
                                    />
                                </TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-start text-xs">Name</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-start text-xs">Bio</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs min-w-[120px]">Charge Per Click</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Feeds</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Products</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Offers</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Clicks</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Invoices</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Email Confirmation</TableCell>
                                <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Last Login</TableCell>
                                {/* <TableCell className="px-2 py-3 font-medium text-gray-500 text-center text-xs">Action</TableCell> */}
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {clients?.map((item) => (
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
                                                {item.name}
                                            </span>
                                            <span className="block text-gray-500 text-xs dark:text-gray-400">
                                                {item.role.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-2 py-3 text-gray-500 text-start text-sm dark:text-gray-400 min-w-[250px] line-clamp-3 overflow-hidden">
                                        {item?.profile?.bio || "N/A"}
                                    </TableCell>

                                    <TableCell className="px-2 py-3 text-center">

                                        <div className="flex justify-center items-center">
                                            {item?.clickCharge}
                                            <ActionIcon className="text-[#0e82ee]" icon={Edit} label="Edit" onClick={() => {
                                                setSelectedUser({
                                                    userId: item.id,
                                                    clickCharge: item.clickCharge,

                                                })
                                                openModal()
                                            }} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-center">{item._count?.feeds}</TableCell>
                                    <TableCell className="px-2 py-3 text-center">{item._count.productCount ?? 0}</TableCell>
                                    <TableCell className="px-2 py-3 text-center">{item._count?.Offer}</TableCell>
                                    <TableCell className="px-2 py-3 text-center">{item._count?.ownClicks}</TableCell>
                                    <TableCell className="px-2 py-3 text-center">{item._count?.invoices}</TableCell>

                                    <TableCell className="px-2 py-3 text-center min-w-[130px]">
                                        {item.isConfirmed ? (
                                            <Badge size="sm" color="success">Confirmed</Badge>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <Badge size="sm" color="error">Pending</Badge>
                                                <button
                                                    onClick={() => handleConfirmUser(item.id)}
                                                    className="text-xs hover:underline bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                                                >
                                                    Confirm
                                                </button>

                                            </div>
                                        )}
                                    </TableCell>

                                    <TableCell className="px-2 py-3 text-center min-w-[130px]">
                                        {item.lastLoginAt ? formatDate(item.lastLoginAt) : "N/A"}
                                    </TableCell>
                                    {/* 
                                    <TableCell className="px-2 py-3 text-center">
                                        
                                    </TableCell> */}
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
                <UserEditForm
                    userId={selectUser.userId}
                    clickCharge={selectUser.clickCharge}
                    onSubmit={handleClickChargeUser}
                />

            </Modal>
        </div>
    );
}




