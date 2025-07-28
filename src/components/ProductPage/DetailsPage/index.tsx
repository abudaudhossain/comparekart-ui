import React from 'react';
import ProductGallery from '@/components/ProductPage/DetailsPage/ProductGallery';
import Rating from '@/components/ui/Rating';
// import PriceHistoryChart from '@/components/ProductPage/DetailsPage/PriceHistoryChart';
import PriceHistoryGraph from '@/components/ProductPage/DetailsPage/PriceHistoryGraph';
import { ProductCardProps } from '@/lib/types/product.type';



type ProductDetailsProps = {
    product: ProductCardProps;
};


const ProductDetails: React.FC<ProductDetailsProps> = ({
    product
}) => {
    const images = [
    ];
    if (product?.images) {
        images.push(...product.images);
    }
    if (images.length < 1) {
        images.push(product.image)
    }
    const priceHistoryData = product.PriceHistory?.map((item) => ({
        date: item.createdAt,
        price: item.price,
    })) || [];

    return (
        <main className="container">
            <div className=' px-4 py-8 grid lg:grid-cols-7 gap-4'>
                <div className='lg:col-span-5 md:grid md:grid-cols-5 gap-6'>
                    <div className="md:col-span-2">
                        <ProductGallery images={images} />
                    </div>

                    <div className="md:col-span-3 flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{product.title}</h1>

                        <div className="flex items-center gap-2">
                            <span>{product.ratingCount} User Review:</span>
                            <Rating rating={product.rating} ratingCount={product.ratingCount} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm">{product.feedProductId}</span>
                            {product.gtin && <span className="text-gray-500 text-sm">{product.gtin}</span>}
                            {product.brand && <span className="text-gray-500 text-sm">{product.brand}</span>}
                            {product.subtitle && <span className="text-gray-500 text-sm">{product.subtitle}</span>}
                            {product.delivery && <span className="text-gray-500 text-sm">{product.delivery}</span>}
                        </div>
                        <p className="text-gray-600">
                            <strong>Product Overview:</strong> {product.description}
                        </p>
                    </div>
                </div>
                <div className='lg:col-span-2'>

                    <div className="mt-6">
                        <PriceHistoryGraph
                            savingsAmount={product.price * (product.discount || 0) / 100}
                            savingsPercent={product.discount || 0}
                            data={priceHistoryData}
                        />
                    </div>
                </div>
            </div>

        </main>
    )
}

export default ProductDetails