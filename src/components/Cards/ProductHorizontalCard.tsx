"use client"

import Image from "next/image"
import { Star, BadgeCheck } from "lucide-react"

interface ProductCardProps {
  image: string
  title: string
  brand: string
  price: string
  originalPrice?: string
  rating: number
  isBestOffer?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  brand,
  price,
  originalPrice,
  rating,
  isBestOffer = false,
}) => {
  return (
    <div className="flex w-full max-w-2xl rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="relative min-w-[140px] h-[140px]">
        <Image src={image} alt={title} fill className="object-contain p-4" />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div className="space-y-1">
          <p className="text-xs text-gray-400">{brand}</p>
          <h3 className="text-sm font-medium leading-tight text-gray-900 line-clamp-2">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={16}
                className={i < rating ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-300"}
              />
            ))}
          </div>
        </div>

        {/* Price and badge */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-bold text-brand-600">{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">{originalPrice}</span>
            )}
          </div>

          {isBestOffer && (
            <div className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-100 px-2 py-0.5 rounded-md">
              <BadgeCheck size={14} />
              Best Offer
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
