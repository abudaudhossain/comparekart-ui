import { MatchingProductsPropsHome } from "@/lib/types/matchingProducts.type";
import Link from "next/link";
interface ImageCardProps {
    group: {
        id: string,
        title: string | null,
        subTitle: string | null,
        image: string | null,
        gtin: string,
    };
}

const ImageCard: React.FC<ImageCardProps> = ({ group }) => {

    return (
        <Link href={`/products?${group?.gtin ? `search=${group?.gtin}` : ""}`} className="group ">
            <div className="relative w-full min-h-[200px] sm:h-[220px] lg:h-full rounded-lg mx-auto overflow-hidden">
                {/* Background Image Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${group?.image || '/home/6.png'})` }}
                />

                {/* Gradient and Content Layer */}
                <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/70 to-transparent w-full z-10">
                    <h2 className="text-base sm:text-xl md:text-3xl lg:text-[30px] font-medium text-white mb-1">
                        {group?.title || "Your Title Here"}
                    </h2>
                    <p className="text-sm sm:text-base md:text-xl font-normal text-white mb-4">
                        {group?.subTitle || "  This is a subtitle or description."}
                    </p>
                    <button className="text-sm sm:text-base font-normal md:px-8 px-2 py-1.5 md:py-3 rounded bg-white/20 hover:bg-white/30 border border-white text-white leading-5 min-w-[140px] text-center whitespace-nowrap shrink-0">
                        See The More
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default ImageCard