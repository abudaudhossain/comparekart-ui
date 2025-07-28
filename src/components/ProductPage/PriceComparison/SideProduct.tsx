import { ProductCardProps } from "@/lib/types/product.type";
import Image from "next/image";
import Link from "next/link";

// components/ProductPage/ProductFilterSidebar.tsx
export default async function SideProduct() {
    const products = await fetch(`${process.env.BACKEND_URL}/public/products?page=1&limit=5&sort=discount`)
        .then((res) => res.json()).then((data) => data.data).catch((err) => {
            //console.log(err)
            return [] as ProductCardProps[]
        })

    if (!products || products.length === 0) {
        return;
    }
    return (
        <aside className="w-full lg:w-64  rounded text-sm space-y-1 mb-4">
            <div className="bg-[#e6eef6] p-4">
                <h2 className="font-semibold text-gray-800 mb-2">Most popular products</h2>
                <div className="space-y-3">
                    {products.map((item: ProductCardProps, i: number) => (
                        <Link key={i} href={`/products/${item.id}`} className="flex items-center gap-3 bg-white p-2 rounded shadow-sm hover:bg-gray-50 transition duration-200">
                            {/* <div key={i} className="flex items-center gap-3 bg-white p-2 rounded shadow-sm"> */}
                                <Image height={32} width={32} src={item.image || "/images/product/product-01.jpg"} alt="" className="w-8 h-8 object-cover" />
                                <div>
                                    <p className="font-medium text-gray-700 line-clamp-2">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.gtin || item.feedProductId}</p>
                                </div>
                            {/* </div> */}
                        </Link>
                    ))}
                </div>
            </div>


        </aside>
    );
}
