import Image from "next/image";

export default function BrandCard() {
    return (
        <div className="relative w-72 h-40 bg-white rounded-lg shadow-sm p-4 overflow-hidden">
            {/* Title */}
            <h3 className="text-lg font-medium text-black z-10 relative">
                Trainers
            </h3>

            {/* Product Image */}
            <Image
                src="/home/6.png"
                alt="Trainers"
                className="absolute bottom-0 right-0 h-24 object-contain"
            />
        </div>
    );
}
