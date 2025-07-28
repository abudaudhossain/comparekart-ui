export const dynamic = 'force-dynamic';
import ImageCard from '@/components/Cards/ImageCard'
import React from 'react'

import ProductsSlides from '@/components/ProductsSlides'
import NotFound from '@/app/not-found';

const Hero = async () => {
    let products = await fetch(`${process.env.BACKEND_URL}/public/top-products?limit=5`,{
        cache: 'no-store',
      })
        .then((res) => res.json()).then((data) => data.data).catch((err) => {
            //console.log(err)
            throw NotFound()
        })

    if (!products || products.length === 0) {
        products = []
    }


    return (
        <div className='bg-[#076DCD] py-16 px-6'>
            <div className='container grid grid-cols-1 xl:grid-cols-[704px_544px] xl:gap-8 lg:grid-cols-2  gap-6'>
                <div className=' w-full lg:order-2 order-1'>
                    <ImageCard group={{
                        id: "",
                        title: "Your Title Here",
                        subTitle: null,
                        image: null,
                        gtin: "",
                    }} />
                </div>
                <div className='w-full lg:order-1 order-2'>
                    <div>
                        {/* <h1 className='text-xl  text-white font-normal mb-2'>Top Products </h1> */}

                        <ProductsSlides title={
                            {
                                text: "Top Product",
                                color: "#fff"
                            }
                        } data={products} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Hero