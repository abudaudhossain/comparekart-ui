
import { ClientType } from "@/lib/types/client.type";
import { clientSideAxios } from "../../lib/api/axios/clientSideAxios";

export interface GetClientsParams {
    page?: number;
    limit?: number;
    sortOrder?: "asc" | "desc";
    search?: string;
    sortBy?: string;
    status?: string;
}
interface ClientsResponse {
    items: ClientType[];
    itemsCount: number;
    totalPages: number;

}

export async function getClients(params: GetClientsParams): Promise<ClientsResponse> {
    try {
        const queryParams = new URLSearchParams();

        if (params.page !== undefined) queryParams.append("page", params.page.toString());
        if (params.limit !== undefined) queryParams.append("limit", params.limit.toString());
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        if (params.search) queryParams.append("search", params.search);

        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.status) queryParams.append("status", params.status);

        const response = await clientSideAxios.get(`/user/clients?${queryParams.toString()}`);
        return {
            items: response.data.data,
            totalPages: Math.ceil(response.data.meta.totalCount / (params.limit || 10)),
            itemsCount: response.data.meta.count
        };
    } catch (error) {
        console.error("Failed to fetch client:", error);
        throw error;
    }
}


export async function getUsersOptions(): Promise<{items:{id:string,name:string}[]}> {
    try {
       

        const response = await clientSideAxios.get(`/user/users-options`);
        //console.log("response..........",response)
        return {
            items: response.data.data,
        };
    } catch (error) {
        console.error("Failed to fetch client:", error);
        throw error;
    }
}





