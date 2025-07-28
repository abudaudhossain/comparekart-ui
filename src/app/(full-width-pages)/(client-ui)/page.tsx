export const dynamic = 'force-dynamic';
import NotFound from '@/app/not-found'
import MatchingProducts from '@/components/Cards/MatchingProducts'
import AboutUs from '@/components/Home/AboutUs'
import BestDeals from '@/components/Home/BestDeals'
import DiscoverProducts from '@/components/Home/DiscoverProduct'
import Hero from '@/components/Home/Hero'
import Promotions from '@/components/Home/Promotions'
import { MatchingProductsPropsHome } from '@/lib/types/matchingProducts.type'
import { Metadata } from 'next'

import React from 'react'

export const metadata: Metadata = {
    title: "Compare Prices Instantly | price-comparison - Smart Shopping for Everyone",
    description: "Find the best deals across top online stores. price-comparison helps you compare prices, track discounts, and make informed buying decisions on electronics, fashion, beauty, and more.",
    keywords: "price comparison, best deals, online shopping, product comparison, electronics deals, fashion discounts, cheapest prices, smart shopping",
    authors: [{ name: "price-comparison Team" }],
    openGraph: {
        title: "Smart Shopping Made Easy | price-comparison",
        description: "Compare prices and save on your next purchase. Explore verified offers from top online retailers.",
        images: ["/images/home/image-01.png"], // Update with a real image path
        url: "https://price-comparison-ui-rho.vercel.app/", // Replace with your actual URL
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Find the Best Deals with price-comparison",
        description: "Track prices, compare products, and shop smarter with price-comparison.",
        images: ["/images/home/image-01.png"], // Same image for consistency
        site: "@pricecomparison", // Replace with your actual Twitter handle
    },
    viewport: "width=device-width, initial-scale=1",
};



const HomePage = async () => {
    const groups: MatchingProductsPropsHome[] = await fetch(`${process.env.BACKEND_URL}/public/matching-products?limit=3`, {
        cache: 'no-store',
    }).then((res) => res.json()).then((data) => data.data).catch((err) => {
        //console.log(err)
        throw NotFound()
    })

    return (
        <>

            <Hero />
            <BestDeals />
            <Promotions />
            <DiscoverProducts />
            {
                groups?.length > 0 ? (groups.map((group, index: number) => (<MatchingProducts key={index} data={group} hasImageRight={index % 2 == 0} />))) : ""
            }
            {/* <MatchingProducts />
            <MatchingProducts hasImageRight={false} />
            <MatchingProducts /> */}
            <AboutUs />

        </>
    )
}

export default HomePage