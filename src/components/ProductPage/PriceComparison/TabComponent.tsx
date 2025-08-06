'use client'

import Link from 'next/link'
import React, { useState } from 'react'

interface TabComponentProps {
    offers: any[]
    relativeProduct: any[]
    children: React.ReactNode
}

const TabComponent: React.FC<TabComponentProps> = ({ offers, relativeProduct, children }) => {
    const [activeTab, setActiveTab] = useState<'offers' | 'relative'>('offers')
    console.log(relativeProduct)
    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('offers')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'offers'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Offers ({offers.length})
                </button>
                <button
                    onClick={() => setActiveTab('relative')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'relative'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Relative Products ({relativeProduct?.length || 0})
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'offers' && (
                    <div className="offers-tab">
                        {offers.length > 0 ? (
                            <>
                                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                                    <span>Sort by: <strong>Prices</strong></span>
                                    <span>{offers.length} results</span>
                                </div>
                                {children}
                            </>
                        ) : (
                            <div className="text-center text-gray-500 py-8">No offers found</div>
                        )}
                    </div>
                )}

                {activeTab === 'relative' && (
                    <div className="relative-products-tab">
                        {relativeProduct && relativeProduct.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {relativeProduct.map((product: any, index: number) => (
                                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <h3 className="font-semibold text-gray-900 mb-2">{product.title || 'Product Name'}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{product.description || 'No description available'}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-blue-600">
                                                ${product.price || 'N/A'}
                                            </span>
                                            <Link href={product.link} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-8">No relative products found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TabComponent 