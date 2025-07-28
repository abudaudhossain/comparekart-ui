
import { ClientType } from "@/lib/types/client.type";
import { clientSideAxios } from "../../lib/api/axios/clientSideAxios";
import { ClickType } from "@/lib/types/click.type";

export interface GetParams {
    page?: number;
    limit?: number;
    sortOrder?: "asc" | "desc";
    search?: string;
    sortBy?: string;
    status?: string;
    productOwnerId?:string
}
interface Response {
    items: ClickType[];
    itemsCount: number;
    totalPages: number;

}

export async function getClicks(params: GetParams): Promise<Response> {
    try {
        const queryParams = new URLSearchParams();

        if (params.page !== undefined) queryParams.append("page", params.page.toString());
        if (params.limit !== undefined) queryParams.append("limit", params.limit.toString());
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        if (params.search) queryParams.append("search", params.search);

        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.status) queryParams.append("status", params.status);
        if (params.productOwnerId) queryParams.append("productOwnerId", params.productOwnerId);

        const response = await clientSideAxios.get(`/clicks?${queryParams.toString()}`);
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



