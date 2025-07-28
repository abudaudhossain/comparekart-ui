import { PriceHistoryData } from "./PriceHistoryData.type"

export interface ProductCardProps {
    id: string,
    feedProductId: string,
    gtin: string,
    delivery: string,
    image: string
    images: string[],
    link: string
    title: string
    description?: string
    subtitle: string
    price: number
    brand?: string
    rating: number
    ratingCount: number
    avg_score?: string
    status?: string
    currencySign?: string
    isBestSeller?: boolean
    is_synced?: boolean
    sync_status?: boolean
    last_synced_at?: Date | string
    createdAt: Date | string
    discount?: number
    OfferCount: number
    clickCount?: number
    PriceHistory?: PriceHistoryData[]
    Category?: {
        id?: string,
        name?: string
    },
    feed: {
        id: string,
        url: string,
        user?: {
            image: string;
            name: string;
            role: {
                name: string
            };
        }
    }
}