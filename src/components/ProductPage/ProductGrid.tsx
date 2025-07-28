'use client';
export const dynamic = 'force-dynamic';
import { ProductCardProps } from "@/lib/types/product.type";
import Product from "../Cards/Product";
import ProductFilterSidebar from "./ProductFilterSidebar";
import { useEffect, useState } from "react";
import Pagination from "../tables/Pagination";
import RelatedSearches from "./RelatedSearches";
import { useRouter, useSearchParams } from "next/navigation";


export default function ProductGrid() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const searchValue = searchParams.get("search");

    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [search, setSearch] = useState<string>(searchValue ?? "");

    const [currentPage, setCurrentPage] = useState(parseInt("1"));
    const [selectedFilters, setSelectedFilters] = useState<{
        minPrice?: number;
        maxPrice?: number;
        deliveryTimes?: string[];
    }>({}); // Adjust type as needed
    interface MetaData {
        totalCount?: number;
        count?: number;
    }

    const [meta, setMeta] = useState<MetaData>({ totalCount: 0 });

    const handleFilters = (filters: {
        minPrice?: number;
        maxPrice?: number;
        deliveryTimes?: string[];
    }) => {
        //console.log('Selected Filters:', filters);
        setSelectedFilters(filters);
    };

    const handlePageChange = (newPage: number) => {

        setCurrentPage(newPage);

    };


    useEffect(() => {

        const fetchProducts = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/products?page=${currentPage}&sortOrder=asc&sortBy=price${selectedFilters?.minPrice && selectedFilters?.minPrice >= 0 ? "&minPrice=" + selectedFilters.minPrice : ""}${selectedFilters.maxPrice ? "&maxPrice=" + selectedFilters.maxPrice : ""}${selectedFilters?.deliveryTimes ? "&delivery=" + selectedFilters.deliveryTimes.join(",") : ""}${search ? "&search=" + search : ""}`, {
                cache: 'no-store',
            }); // Replace with your API endpoint
            const data = await response.json();
            //console.log('Fetched Products:', data);
            setProducts(data.data); // Assuming `data` is the product list
            setMeta(data.meta); // Assuming `meta` contains pagination info
        };

        fetchProducts();
        setSearch(searchValue ?? "")
    }, [currentPage, selectedFilters, searchValue, search])

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <ProductFilterSidebar onFilterChange={handleFilters} />
            <div className="flex-1">
                <div className="mb-16">

                    <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                        <div>
                            <span>Sort by: <strong>Popularity </strong></span>
                            {
                                search ? <span className="ml-2">Search by: <strong>{search}</strong> <span className="cursor-pointer" onClick={() => { router.push(`/products`); }}>clear</span></span> : ""
                            }
                        </div>

                        <span>{products.length} results</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                        {products.length > 0 ? products.map((product, idx) => (
                            <Product key={idx} {...product} />
                        )) : (<div data-testid="no-products">No products found</div>)}
                    </div>
                </div>
                <Pagination
                    totalPages={Math.ceil((meta?.totalCount ?? 0
                    ) / 10)} // Replace with actual total pages if available
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <RelatedSearches />
            </div>
        </div>
    );
}
