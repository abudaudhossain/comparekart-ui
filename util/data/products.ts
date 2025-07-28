import {
  ProductCardProps
} from "@/lib/types/product.type";
import { clientSideAxios } from "../../lib/api/axios/clientSideAxios";

const products: ProductCardProps[] = [
  {
    "id": "prod-1",
    "feedProductId": "FP-1",
    "gtin": "10000000000001",
    "delivery": "Next-day",
    "image": "/images/product/product-01.jpg",
    "link": "https://example.com/product/1",
    "title": "Product 1",
    "description": "This is a reliable and innovative product, number 1, designed to meet everyday needs.",
    "subtitle": "Amazing product 1",
    "price": 11.23,
    "brand": "Brand B",
    "rating": 3.5,
    "ratingCount": 110,
    "avg_score": "5.9",
    "currencySign": "$",
    "isBestSeller": false,
    "is_synced": false,
    "sync_status": false,
    "last_synced_at": "2025-04-21T04:52:49.417843",
    "createdAt": "2025-04-22T04:52:49.417843",
    "discount": 1.5,
    "OfferCount": 9,
    feed: {
      id: "1",
      url: "aa",
      "user": {
        "image": "/avatars/avatar-1.png",
        "name": "Alice Johnson",
        "role": {
          name: "CLIENT"
        }
      }
    },
    "images": []
  },

];


type SortBy = 'price' | 'rating' | 'ratingCount';
type SortOrder = 'asc' | 'desc';

type GetProductsOptions = {
  filter?: string;
  page?: number;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  priceMin?: number;
  priceMax?: number;
  ratingMin?: number;
  ratingMax?: number;
};

export function getFilteredPaginatedProducts(
  options: GetProductsOptions
): {
  total: number;
  totalPages: number;
  currentPage: number;
  results: ProductCardProps[];
} {
  const {
    filter = '',
    page = 1,
    limit = 10,
    sortBy = 'price',
    sortOrder = 'asc',
    priceMin = 0,
    priceMax = Infinity,
    ratingMin = 0,
    ratingMax = 5,
  } = options;

  // Convert string price to number for sorting/filtering


  // Filter by search keyword and range filters
  const filtered = products.filter((product) => {
    const keyword = filter.toLowerCase();
    const matchesKeyword =
      product.title.toLowerCase().includes(keyword) ||
      product.subtitle.toLowerCase().includes(keyword) ||
      (product.brand?.toLowerCase().includes(keyword) ?? false);

    const productPrice = product.price
    const matchesPrice = productPrice >= priceMin && productPrice <= priceMax;
    const matchesRating = product.rating >= ratingMin && product.rating <= ratingMax;

    return matchesKeyword && matchesPrice && matchesRating;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    let aValue: number, bValue: number;

    switch (sortBy) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'ratingCount':
        aValue = a.ratingCount;
        bValue = b.ratingCount;
        break;
      default:
        return 0;
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  // Paginate
  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  const results = sorted.slice(start, end);

  return {
    total,
    totalPages,
    currentPage,
    results,
  };
}




export async function getPaginatedProduct(currentPage: number, limit: number): Promise<{
  items: ProductCardProps[],
  totalPages: number,
  itemsCount: number
} | undefined> {
  try {


    const start = (currentPage - 1) * limit;

    const response = await clientSideAxios.get(`/products?page=${currentPage}&limit=${limit}`);

    //console.log(response.data)
    const { meta, data } = response.data
    const items: ProductCardProps[] = data;
    // successMessage("Feeds fetched successfully")

    return {
      items,
      totalPages: Math.ceil(meta.totalCount / limit),
      itemsCount: meta.count
    };
  } catch (error) {

    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}




interface GetProductsParams {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
  search?: string;
  brand?: string;
  sortBy?: string;
  status?: string;
  minRatingCount?: number;
  userId?: string;
  createdBefore?: string | Date;
  createdAfter?: string | Date;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  ratingCount: number;
  status: string;
  search: string;

  // Add other fields if needed
}

interface ProductsResponse {
  products: ProductCardProps[];
  itemsCount: number;
  totalPages: number;
}

export async function getProducts(params: GetProductsParams): Promise<ProductsResponse> {
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
    if (params.createdBefore) queryParams.append("createdBefore", typeof params.createdBefore === "string" ? params.createdBefore : params.createdBefore.toISOString());
    if (params.createdAfter) queryParams.append("createdAfter", typeof params.createdAfter === "string" ? params.createdAfter : params.createdAfter.toISOString());
    if (params.userId) queryParams.append("userId", params.userId);
    if (params.minRatingCount !== undefined) queryParams.append("minRatingCount", params.minRatingCount.toString());

    const response = await clientSideAxios.get(`/products?${queryParams.toString()}`);
    return {
      products: response.data.data,
      totalPages: Math.ceil(response.data.meta.totalCount / (params.limit || 10)),
      itemsCount: response.data.meta.count
    };
  } catch (error) {
    return {
      products: [],
      totalPages: 0,
      itemsCount: 0
    };
  }
}



