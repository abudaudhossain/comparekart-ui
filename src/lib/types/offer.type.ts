export interface ProductOffer {
    id: string,
    productId: string,
    userId: string,
    title: string,
    tag: string,
    merchant: string[],
    price: number,
    currency: string | undefined,
    shipping: number,
    availability: string,
    clickUrl: string,
    shop: string | null,
    rating: number,
    ratingCount: number,
    deliveryTimeMin: number,
    deliveryTimeMax: number,
    delivery: string,
    status: string,
    createdAt: Date | string,
    updatedAt: Date | string,
    freeReturn: boolean,
    fastDelivery: boolean,
    product: {
        id: string,
        title: string,
        feedProductId?: string
    },
    user?: {
        id?: string,
        name?: string,
        role?: {
            name?: string
        }
    },
    _count: {
        clicks: number,
    }
}