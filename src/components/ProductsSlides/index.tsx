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
import { Swiper as SwiperTypes } from "swiper/types";



interface ProductsProps {
    data: ProductCardProps[] | [];
    title: {
        text: string
        color: string
    }
}

const ProductsSlides: React.FC<ProductsProps> = ({ title, data }) => {
    const [isBeginning, setIsBeginning] = useState(true); // Track if at the beginning
    const [isEnd, setIsEnd] = useState(false);
    const handleSlideChange = (swiper: SwiperTypes) => {
        setIsBeginning(swiper?.isBeginning);
        setIsEnd(swiper?.isEnd);
    };

    // Creating a reference for Swiper instance
    const swiperRef = useRef<SwiperRef | null>(null);

    // This will ensure the swiper instance is properly initialized when the component mounts
    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.navigation.init();
            swiperRef.current.swiper.navigation.update();
        }
    }, []);


    return (
        <div className="relative">
            <h1 className={`text-xl  font-normal mb-2`} style={{ color: title.color }}>{title.text} </h1>
            <div className='group'>

                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    slidesPerView={1.25}

                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation={{
                        nextEl: ".swiper-top-button-next",
                        prevEl: ".swiper-top-button-prev",
                    }}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        255: { slidesPerView: 1.25, spaceBetween: 5 },
                        400: { slidesPerView: 2, spaceBetween: 5 },
                        500: { slidesPerView: 2.25, spaceBetween: 10 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        868: { slidesPerView: 2, spaceBetween: 15 },
                        1100: { slidesPerView: 3, spaceBetween: 15 },
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

                <div className={`${isBeginning && "hidden"} hidden ${!isBeginning && "group-hover:block"} swiper-top-button-prev absolute top-1/2 left-0 transform -translate-y-1/2  py-3 text-white bg-gray-400 hover:bg-gray-500 z-10 `}>
                    <ChevronLeft size={35} />
                </div>
                <div className={`${isEnd && "hidden"} hidden ${!isEnd && "group-hover:block"} swiper-top-button-next absolute top-1/2 right-0 transform -translate-y-1/2 py-3 text-white bg-gray-400 hover:bg-gray-500   z-10 `}>
                    <ChevronRight size={35} />
                </div>
            </div>


        </div>
    );
};

export default ProductsSlides;

