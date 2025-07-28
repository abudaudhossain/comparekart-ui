
import ProductGrid from "@/components/ProductPage/ProductGrid";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "Browse & Compare Products | Find the Best Prices Today - price-comparison",
    description: "Explore our curated product listings. Compare prices, specifications, and offers from top online stores across categories like electronics, fashion, home, and more.",
    keywords: "compare products, product listings, price comparison site, best deals online, electronics, fashion, home goods, affordable prices",
    authors: [{ name: "price-comparison Team" }],
    openGraph: {
        title: "Product Comparison Made Easy | Shop Smarter with price-comparison",
        description: "Scroll through our latest product listings and instantly compare prices and features from trusted retailers.",
        images: ["/images/home/image-01.png"], // Ensure this is a real image in your assets
        url: "https://price-comparison-ui-rho.vercel.app/products", // Replace with actual URL
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Compare Products by Category | price-comparison",
        description: "Discover products, compare features, and find unbeatable prices from leading online stores.",
        images: ["/images/meta/product-listing-preview.png"],
        site: "@pricecomparison", // Replace with your actual Twitter handle
    },
    viewport: "width=device-width, initial-scale=1",
};



export default function Products() {


    return (
        <main className="min-h-screen  bg-[#fff] p-6">
            <div className="container">

                <h1 className="text-xl font-bold mb-6  text-gray-800">All Products</h1>

                <Suspense fallback={<div>Loading products...</div>}>
                    <ProductGrid />
                </Suspense>
            </div>
        </main>
    );
}
