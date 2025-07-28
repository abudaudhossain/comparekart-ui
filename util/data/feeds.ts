
import { clientSideAxios } from "../../lib/api/axios/clientSideAxios";
import successMessage from "@/lib/successMessage";
import { Feed } from "@/lib/types/feed.type";


export async function getPaginatedFeeds(currentPage: number, limit: number, userId?: string): Promise<{
    items: Feed[],
    totalPages: number,
    itemsCount: number
} | undefined> {
    try {


        const start = (currentPage - 1) * limit;

        const response = await clientSideAxios.get(`/feeds?page=${currentPage}&limit=${limit}${userId && "&userId=" + userId}`);
        //console.log("response", response.data);
        const { meta, data } = response.data
        const items: Feed[] = data;
        // successMessage("Feeds fetched successfully")

        return {
            items,
            totalPages: Math.ceil(meta.totalCount / limit),
            itemsCount: meta.count
        };
    } catch (error) {

        return {
            items: [],
            totalPages: 0,
            itemsCount: 0
        }
    }
}

export async function syncedFeedsHandler(id: string): Promise<void> {
    try {

        const response = await clientSideAxios.get(`/feeds/synced/${id}`);
        //console.log("response", response.data);

        successMessage(response.data.message)


    } catch (error) {

        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}


