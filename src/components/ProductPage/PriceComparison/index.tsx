import React from 'react'
import SideProduct from './SideProduct'

import OffersComparison from './OffersComparison'
import NotFound from '@/app/not-found'

const PriceComparison = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/products/${id}/offers`)
        .then((res) => res.json());

    if (!response?.data) {
        return <NotFound />;
    }
    const offers = response.data;
    return (
        <div>
            <main className="min-h-screen  bg-[#fff] p-6">
                <div className="container">

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className='order-last lg:order-first'>

                            <SideProduct />
                            
                        </div>

                        <div className="flex-1">

                            {
                                offers.length > 0 ? (<>

                                    <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                                        <span>Sort by: <strong>Prices</strong></span>
                                        <span>{offers.length} results</span>
                                    </div>
                                    <OffersComparison offers={offers} />
                                </>) : (<div className="text-center text-gray-500">No offers found</div>)

                            }

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PriceComparison