export interface ClientType {
    id: string,
    email: string,
    name: string,
    clickCharge: number
    company: string | null,
    lastLoginAt: string | Date | null,
    isConfirmed: boolean,
    role: {
        name: string
    },
    profile: {
        id: string,
        name: string,
        email: string,
        company: string | null,
        bio: string | null,
        avatarUrl: string | null,
    },
    _count: {
        Offer: number
        clicks: number
        feeds: number
        ownClicks: number
        invoices: number
        productCount: number
    }
}