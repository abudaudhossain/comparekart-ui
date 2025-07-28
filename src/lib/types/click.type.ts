export interface ClickType {
    id: string,
    ip: string,
    userAgent: string,
    fingerprint: string,
    isCounted: string,
    blockedReason: string,
    captchaPassed: string,
    isBlocked: string,
    blockedAt: string,
    createdAt: Date | string,

    offer: {
        id: string,
        title: string,
    },
    productOwner?: {
        id?: string,
        name?: string,

    },

}