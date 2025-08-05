'use client';

import { useFingerprint } from '@/hooks/useFingerprint';
import { ProductOffer } from '@/lib/types/offer.type';
import { useState } from 'react';
import CaptchaChallenge from './CaptchaChallenge';
type ProductOfferProms = {
    offers: ProductOffer[]
}

const OffersComparison: React.FC<ProductOfferProms> = ({ offers }) => {
    const [sortBy, setSortBy] = useState<'price' | 'total'>('price');
    const [filters, setFilters] = useState({ fastDelivery: false, freeReturn: false });
    const fingerprint = useFingerprint()
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [captchaRequired, setCaptchaRequired] = useState(false);

   

    const filtered = offers.filter((offer: ProductOffer) => {
        if (filters.fastDelivery && !offer.fastDelivery) return false;
        if (filters.freeReturn && !offer.freeReturn) return false;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        const valA = sortBy === 'price' ? a.price : a.price + a.shipping;
        const valB = sortBy === 'price' ? b.price : b.price + b.shipping;
        return valA - valB;
    });

    const clickHandler = async (id: string | null, captchaToken: string | null) => {
        setClickedId(id);
        if (!fingerprint) {
            console.error('Fingerprint not ready');
            return;
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/offers/clicked`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                offerId: id,
                fingerprint,
                captchaToken
            })
        });

        const response = await res.json();
        const data = response.data;

        //console.log("click data: ", data);
        if (response.success && data.redirectUrl) {

            setClickedId(null)
            setCaptchaRequired(false);
            window.location.href = data.redirectUrl
        }
        else if (data.captchaRequired) {
            setCaptchaRequired(true);
        } else {
            alert(data.message || "Click registered!");
        }

    }


    const handleCaptchaVerify = (token: string) => {
        //console.log("Captcha token: ", token);
        clickHandler(clickedId, token); // Retry click after CAPTCHA
    };


    if (captchaRequired) {
        return <CaptchaChallenge onVerify={handleCaptchaVerify} />
    }
    return (
        <div className="border">
            <div className=" p-3  flex flex-wrap items-center justify-between bg-[#F0F0F0]">
                <h1 className="text-xl font-semibold">Price Comparison</h1>
                <div className="space-x-4">
                    <label className="inline-flex items-center space-x-1">
                        <input
                            type="checkbox"
                            checked={filters.fastDelivery}
                            onChange={(e) => setFilters((f) => ({ ...f, fastDelivery: e.target.checked }))}
                        />
                        <span className="text-sm">Fast delivery</span>
                    </label>
                    <label className="inline-flex items-center space-x-1">
                        <input
                            type="checkbox"
                            checked={filters.freeReturn}
                            onChange={(e) => setFilters((f) => ({ ...f, freeReturn: e.target.checked }))}
                        />
                        <span className="text-sm">Free return</span>
                    </label>
                </div>
                <div className="space-x-2 hidden md:block">
                    <button
                        className={`px-2 py-1 border rounded ${sortBy === 'price' ? 'bg-black text-white' : ''}`}
                        onClick={() => setSortBy('price')}
                    >
                        Price
                    </button>
                    <button
                        className={`px-2 py-1 border rounded ${sortBy === 'total' ? 'bg-black text-white' : ''}`}
                        onClick={() => setSortBy('total')}
                    >
                        Total Price
                    </button>
                </div>
            </div>
            <div
                className="hidden  p-3 md:flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0"
            >
                <div className="flex flex-col space-y-1 md:w-1/3">
                    <span className="text-gray-500 text-sm">offer title</span>
                </div>

                <div className=" md:w-1/6 text-gray-500 text-sm">
                    Price & Delivery Cost
                </div>

                <div className="space-x-1 md:w-1/6 text-gray-500 text-sm">
                    Payment Methods
                </div>

                <div className="text-gray-500 text-sm  md:w-1/4">
                    Delivery Time
                </div>

                <div className="flex flex-col items-center md:w-1/6 text-gray-500 text-sm">
                    Shop & Shop Rating
                </div>
            </div>
            {sorted.map((offer, idx) => (
                <div
                    key={idx}
                    className="p-3 border flex flex-col md:flex-row items-start md:items-center justify-between md:gap-2 gap-3 my-2 md:my-0"
                >
                    <div className="flex flex-col space-y-1 md:w-1/3">
                        {offer.tag && (
                            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded w-fit">
                                {offer.tag}
                            </span>
                        )}
                        <span className="font-medium">{offer.title}</span>
                        {offer.availability && <span className="text-gray-500 text-sm">{offer.availability}</span>}
                    </div>

                    <div className="text-lg font-bold text-green-700 md:w-1/6">
                        £{(offer.price + offer.shipping).toFixed(2)}
                    </div>

                    <div className="space-x-1 md:w-1/6">
                        {offer.merchant?.map((p, i) => (
                            <span key={i} className="inline-block text-sm bg-gray-200 px-2 py-1 rounded m-1">
                                {p.toUpperCase()}
                            </span>
                        ))}
                    </div>

                    <div className="text-sm text-gray-700 md:w-1/4">
                        <div>{offer.delivery}</div>
                        {offer.freeReturn && (
                            <div className="text-xs text-green-600">Free return</div>
                        )}
                    </div>

                    <div className="flex flex-col md:items-center md:w-1/6 w-full">
                        <span className="font-medium">{offer.shop}</span>
                        {offer.rating !== null ? (
                            <span className="text-green-600 text-sm">
                                ★ {offer.rating} ({offer.ratingCount})
                            </span>
                        ) : (
                            <span className="text-gray-400 text-sm">No rating</span>
                        )}
                        <button onClick={() => clickHandler(offer.id, null)} className="mt-2 bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600 text-sm w-full">
                            Go to shop
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default OffersComparison;