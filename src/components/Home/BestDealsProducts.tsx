// components/Products.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

import {  ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "@/components/Cards/ProductCard";
import { ProductCardProps } from "@/lib/types/product.type";
import type { Swiper as SwiperType } from 'swiper/types';


// interface ProductProps {
//     image?: string;
//     title?: string;
//     price?: string;
//     brand?: string;
//     rating?: number; // out of 5
//     isBestSeller?: boolean;
// }

interface ProductsProps {
    data: ProductCardProps[];
    title: string
    name?: string
}

const BestDealsProducts: React.FC<ProductsProps> = ({ title, data,name="deal" }) => {
    const [isBeginning, setIsBeginning] = useState(true); // Track if at the beginning
    const [isEnd, setIsEnd] = useState(false);
    const handleSlideChange = (swiper: SwiperType) => {
        setIsBeginning(swiper?.isBeginning);
        setIsEnd(swiper?.isEnd);
    };
    //console.log("isBeg: ", isBeginning, "isEnd: ", isEnd)
    // Creating a reference for Swiper instance
    const swiperRef = useRef<SwiperRef | null>(null);

    // This will ensure the swiper instance is properly initialized when the component mounts
    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.navigation.init();
            swiperRef.current.swiper.navigation.update();
        }
    }, []);
    // const className = `.swiper-${name}-button-next"`

    return (
        <div className="">
            <h1 className='text-xl  text-[#0a3761] font-normal mb-4'>{title} </h1>
            <div className='group relative'>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    slidesPerView={1.25}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation={{
                        nextEl: `.swiper-${name}-button-next`,
                        prevEl: `.swiper-${name}-button-prev`,
                    }}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        255: { slidesPerView: 1.25, spaceBetween: 5 },
                        400: { slidesPerView: 2, spaceBetween: 5 },
                        500: { slidesPerView: 2.25, spaceBetween: 10 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        868: { slidesPerView: 5.5, spaceBetween: 15 },
                        1100: { slidesPerView: 5.5, spaceBetween: 15 },
                        // 1600: { slidesPerView: 3, spaceBetween: 10 },
                    }}
                    className="flex items-stretch"
                >
                    {data.map((product, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className={`${isBeginning && "hidden"} hidden ${!isBeginning && "group-hover:block"} swiper-${name}-button-prev absolute top-1/2 left-0 transform -translate-y-1/2  py-3 text-white bg-gray-400 hover:bg-gray-500 z-10 `}>
                    <ChevronLeft size={35} />
                </div>
                <div className={`${isEnd && "hidden"} hidden ${!isEnd && "group-hover:block"} swiper-${name}-button-next absolute top-1/2 right-0 transform -translate-y-1/2 py-3 text-white bg-gray-400 hover:bg-gray-500   z-10 `}>
                    <ChevronRight size={35} />
                </div>
            </div>
        </div>
    );
};

export default BestDealsProducts;

