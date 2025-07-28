// components/Products.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "@/components/Cards/ProductCard";
import { ProductCardProps } from "@/lib/types/product.type";



interface ProductsProps {
    data: ProductCardProps[];
}

const Products: React.FC<ProductsProps> = ({ data }) => {
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
        <div>
            <h1 className='text-xl  text-white font-normal mb-2'>Top Products </h1>
            <div className=''>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    slidesPerView={1.25}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    breakpoints={{
                        255: { slidesPerView: 1.25, spaceBetween: 5 },
                        400: { slidesPerView: 2, spaceBetween: 5 },
                        500: { slidesPerView: 2.25, spaceBetween: 10 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        868: { slidesPerView: 2, spaceBetween: 15 },
                        1100: { slidesPerView: 3, spaceBetween: 15 },
                        // 1600: { slidesPerView: 3, spaceBetween: 10 },
                    }}
                    className=""
                >
                    {data.map((product, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* <div className="relative flex justify-center gap-4 mt-[33px]">
                <div className="swiper-button-prev border border-neutral-200 p-[13px] text-neutral-800 hover:text-primary-500 rounded-full hover:border-primary-500 transition">
                    <ArrowLeft />
                </div>
                <div className="swiper-button-next border border-neutral-200 p-[13px] text-neutral-800 hover:text-primary-500 rounded-full hover:border-primary-500 transition">
                    <ArrowRight />
                </div>
            </div> */}
        </div>
    );
};

export default Products;

