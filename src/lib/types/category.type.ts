export interface categoryType {
    id: string
    name: string
    slug: string
    image?: string | null
    description?: string | null
    status: string
    createdAt: Date | string,
}