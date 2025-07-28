
import { categoryType } from "@/lib/types/category.type";
import { clientSideAxios } from "../../lib/api/axios/clientSideAxios";
import { ProductOffer } from "@/lib/types/offer.type";






interface GetCategoriesParams {
    page?: number;
    limit?: number;
    sortOrder?: "asc" | "desc";
    search?: string;

    sortBy?: string;
    status?: string;

}



interface CategoriesResponse {
    items: categoryType[];
    itemsCount: number;
    totalPages: number;

}

export async function getCategories(params: GetCategoriesParams): Promise<CategoriesResponse> {
    try {
        const queryParams = new URLSearchParams();

        if (params.page !== undefined) queryParams.append("page", params.page.toString());
        if (params.limit !== undefined) queryParams.append("limit", params.limit.toString());
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        if (params.search) queryParams.append("search", params.search);

        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.status) queryParams.append("status", params.status);


        const response = await clientSideAxios.get(`/categories?${queryParams.toString()}`);
        return {
            items: response.data.data,
            totalPages: Math.ceil(response.data.meta.totalCount / (params.limit || 10)),
            itemsCount: response.data.meta.count
        };
    } catch (error) {
        return {
            items: [],
            totalPages: 0,
            itemsCount: 0
        };
    }
}



