import { Metadata } from 'next';
import Script from 'next/script';
import ProductDetails from '@/components/ProductPage/DetailsPage';
import PriceComparison from '@/components/ProductPage/PriceComparison';
import NotFound from '@/app/not-found';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
    const id = await (await params).id
    const [productRes, offersRes] = await Promise.all([
        fetch(`${BACKEND_URL}/public/products/${id}`),
        fetch(`${BACKEND_URL}/public/products/${id}/offers`),
    ]);

    const productData = await productRes.json();
    const offersData = await offersRes.json();

    const product = productData?.data;
    const offers = offersData?.data || [];

    if (!product) {
        return {
            title: "Product Not Found | price-comparison",
            description: "Sorry, we couldn't find the product you're looking for.",
        };
    }

    const offerLines = offers.map((offer: { merchant?: string[]; price: number }) => {
        const merchant = offer.merchant?.join(", ") || "Unknown seller";
        return `${merchant} - $${offer.price}`;
    });

    const offerListString = offerLines.length
        ? `Available offers: ${offerLines.join(" | ")}.`
        : "No active offers currently.";

    return {
        title: `${product.title} | Compare Prices from ${offers.length} Sellers`,
        description: `${product.description || ''} ${offerListString}`,
        keywords: [
            product.title,
            product.brand,
            ...(offers.flatMap((o: { merchant?: string[] }) => o.merchant || [])),
            'compare prices',
            'best deals',
            'product offers'
        ].join(', '),
        openGraph: {
            title: `${product.title} | Best Offers and Prices`,
            description: offerListString,
            url: `https://www.price-comparison.com/products/${product.id}`,
            images: product.image ? [product.image] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.title} | Offers from ${offers.length} Sellers`,
            description: offerListString,
            images: product.image ? [product.image] : [],
        },
        viewport: "width=device-width, initial-scale=1",
    };
}

// ✅ 2. Product Page Component with JSON-LD
const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const [productRes, offersRes] = await Promise.all([
        fetch(`${BACKEND_URL}/public/products/${id}`),
        fetch(`${BACKEND_URL}/public/products/${id}/offers`),
    ]);

    const productData = await productRes.json();
    const offersData = await offersRes.json();

    const product = productData?.data;
    const offers = offersData?.data || [];

    if (!product) {
        return <NotFound />;
    }

    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.title,
        description: product.description,
        productId: product.feedProductId,
        gtin: product.gtin ||"N/A",
        brand: {
            "@type": "Brand",
            name: product.brand,
        },
        image: product.image ? [product.image] : [],
        review: product.rating,
        totalReviewCount: product.ratingCount,
        offers: offers.map((offer: { currencySign?: string; price: number; merchant?: string[] }) => ({
            "@type": "Offer",
            priceCurrency: offer.currencySign || "USD",
            price: offer.price,
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: offer.merchant?.join(", ") || "Unknown",
            },
        })),
        aggregateRating: product.rating && product.ratingCount
            ? {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.ratingCount,
            }
            : undefined,
    };

    return (
        <>
            {/* 🔗 SEO structured data for Google */}
            <Script
                id="product-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main>
                <ProductDetails product={product} />
                <PriceComparison params={{ id: product.id }} />
            </main>
        </>
    );
};

export default ProductPage;
