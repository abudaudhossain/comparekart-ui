"use client";

import Image from "next/image";

import { ProductCardProps } from "@/lib/types/product.type";
import Rating from "../ui/Rating";
import DiscountBadge from "./DiscountBadge";
import Link from "next/link";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  subtitle,
  price,
  brand,
  rating,
  ratingCount,
  avg_score,
  isBestSeller,
  discount,
  currencySign
}) => {
  return (
    <Link href={`/products/${id}`} className="group/product">
      <div className={`px-3 bg-white rounded-sm h-[350px] shadow-md border-1 hover:shadow-md transition flex flex-col  `}>
        {/* Image */}
        <div className="relative ">

          <div className="relative w-full sm:h-[165px] h-[135px] mt-[1px] overflow-hidden z-0">
            <Image
              src={image ? image : "/images/images_1.png"}
              alt={title}
              fill
              className={`object-contain w-full rounded-t-sm transform transition-transform duration-500 group-hover/product:scale-110 `}
            />
          </div>
          {
            discount ? <div className={`absolute top-3 z-50`}>
              <DiscountBadge discount={discount} />
            </div> : ""
          }
        </div>


        {/* Card Content */}
        <div className="flex flex-col justify-between flex-1 py-2">
          {/* Top: Title, Subtitle, Badge */}
          <div>
            <p className="text-sm font-normal text-[#767676] line-clamp-1 capitalize mb-1">
              {isBestSeller && (
                <span className="inline-block bg-[#0C6DCD] text-white font-medium text-sm px-2 py-1 mr-2 rounded-[4px]">
                  Bestseller
                </span>
              )}
              {subtitle}
            </p>

            <h1 className="sm:text-base text-sm text-[#2D2D2D] font-medium line-clamp-2">
              {title}
              {brand && (
                <span className="font-normal text-[#767676]"> – {brand}</span>
              )}
            </h1>
          </div>

          {/* Bottom: Rating & Price */}
          <div className="mt-auto">
            <div className="flex gap-2 my-2">
              {avg_score && (
                <span className="text-[#0C6DCD] bg-[#EEF5FB] font-normal text-[12px] px-2 py-[2px] rounded-full hidden sm:block">
                  Avg Score {avg_score}
                </span>
              )}
              {/* <span className="text-[#0C6DCD] bg-[#EEF5FB] font-medium text-xs px-2 py-[2px] rounded-full">
              {rating}
              <Star size={12} className="inline-block ml-1" />
            </span> */}
              {rating > 0 && <Rating rating={rating} ratingCount={ratingCount} />}
            </div>

            <div>
              <p className="text-sm font-normal text-[#767676]">From</p>
              <p className="text-xl font-bold text-[#f60]"> {currencySign?currencySign:"€ "}{price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
