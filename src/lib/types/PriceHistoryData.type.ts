export interface PriceHistoryData {
    price: number;
    id: string; // Unique identifier for the price history entry
    createdAt: string; // ISO 8601 date string for when the entry was created
}
