import { ProductCardProps } from '@/lib/types/product.type';
import React from 'react'
import BestDealsProducts from './BestDealsProducts';
export const dynamic = 'force-dynamic';




const DiscoverProducts = async () => {
    const products = await fetch(`${process.env.BACKEND_URL}/public/products?page=1&limit=10&sort=discount`,{
        cache: 'no-store',
      })
        .then((res) => res.json()).then((data) => data.data).catch((err) => {
            //console.log(err)
            return [] as ProductCardProps[]
        })

    if (!products || products.length === 0) {
        return;
    }
    return (
        <div className='bg-[#FFFFFF] py-6 px-6'>
            <div className='container  '>
                <BestDealsProducts title={"Discover the bestsellers"} data={products} name={"discover"} />
            </div>

        </div>
    )
}

export default DiscoverProducts