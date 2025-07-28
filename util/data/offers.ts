
import { clientSideAxios } from "../../lib/api/axios/clientSideAxios";
import { ProductOffer } from "@/lib/types/offer.type";






interface GetOffersParams {
    page?: number;
    limit?: number;
    sortOrder?: "asc" | "desc";
    search?: string;
    brand?: string;
    sortBy?: string;
    status?: string;
    minRatingCount?: number;
    userId?: string
}



interface OffersResponse {
    items: ProductOffer[];
    itemsCount: number;
    totalPages: number;

}

export async function getOffers(params: GetOffersParams): Promise<OffersResponse> {
    try {
        const queryParams = new URLSearchParams();

        if (params.page !== undefined) queryParams.append("page", params.page.toString());
        if (params.limit !== undefined) queryParams.append("limit", params.limit.toString());
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        if (params.search) queryParams.append("search", params.search);
        if (params.brand) queryParams.append("brand", params.brand);
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.status) queryParams.append("status", params.status);
        if (params.userId) queryParams.append("userId", params.userId);
        if (params.minRatingCount !== undefined) queryParams.append("minRatingCount", params.minRatingCount.toString());

        const response = await clientSideAxios.get(`/offers?${queryParams.toString()}`);
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



