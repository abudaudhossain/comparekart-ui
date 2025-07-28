export interface InvoiceProps {
    id: string,
    invoiceNumber: string,
    userId: string,
    month: string,
    year: string | number,
    clickCount: string | number,
    clickPrice: string | number,
    total: string | number,

    invoiceDate: Date | string,
    periodStart: Date | string,
    periodEnd: Date | string,
    createdAt: Date | string,
    updatedAt: Date | string,
    link: string | null,

    user: {
        id?: string,
        name?: string,
        email: string,
        company: string | null
        role?: {
            name?: string
        }
    },

}