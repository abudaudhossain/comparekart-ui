import React from 'react'
import SideProduct from './SideProduct'
import OffersComparison from './OffersComparison'
import TabComponent from './TabComponent'
import NotFound from '@/app/not-found'

const PriceComparison = async ({ params }: { params: { id: string, gtin: string } }) => {
    const { id, gtin } = await params
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/products/${id}/offers`)
        .then((res) => res.json());

    if (!response?.data) {
        return <NotFound />;
    }
    const offers = response.data;

    const relativeProductsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/products?gtin=${gtin}`)
    const relativeProductData = await relativeProductsRes.json();
    const relativeProduct = relativeProductData.data;
  
    return (
        <div>
            <main className="min-h-screen  bg-[#fff] p-6">
                <div className="container">

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className='order-last lg:order-first'>

                            <SideProduct />

                        </div>

                        <div className="flex-1">
                            <TabComponent offers={offers} relativeProduct={relativeProduct || []}>
                                <OffersComparison offers={offers} />
                            </TabComponent>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PriceComparison