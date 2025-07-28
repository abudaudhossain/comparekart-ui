import ImageCard from '@/components/Cards/ImageCard'
import React from 'react'

import ProductsSlides from '@/components/ProductsSlides'
import { ProductCardProps } from '@/lib/types/product.type'
import { MatchingProductsPropsHome } from '@/lib/types/matchingProducts.type'
import { group } from 'console'

const products: ProductCardProps[] = []
interface MatchingProductsProps {
    data: MatchingProductsPropsHome;
    hasImageRight?: boolean
}

const MatchingProducts: React.FC<MatchingProductsProps> = ({ hasImageRight = true, data }) => {
    
    return (
        <div className='bg-[#FFFFFF] py-9 px-6'>
            <div className={`container grid grid-cols-1 ${hasImageRight ? "xl:grid-cols-[704px_544px]" : "xl:grid-cols-[544px_704px]"} xl:gap-8 lg:grid-cols-2  gap-6 `}>
                <div className={` w-full  ${hasImageRight ? "xl:lg:order-2 order-1" : ""}  `}>
                    <ImageCard group={{
                        id: data?.id || "",
                        title: data.title || null,
                        subTitle: data.subTitle || null,
                        image: data.image,
                        gtin: data.gtin,
                    }} />
                </div>
                <div className='w-full lg:order-1 order-2'>
                    <div>

                        <ProductsSlides title={
                            {
                                text: "Matching products",
                                color: "#0A3761"
                            }
                        } data={data?.products || []} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default MatchingProducts