"use client";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientSideAxios } from "../../../../lib/api/axios/clientSideAxios";
import { BadgePercent } from "lucide-react";

interface OfferFormData {
    title?: string;
    merchant?: string[];
    price?: number;
    shipping?: number;
    availability?: string;
    shop?: string;
    rating?: number;
    ratingCount?: number;
    status?: string;
    currencySign?: string;
    clickUrl?: string;
}

export default function OfferEditForm() {
    const [formData, setFormData] = useState<OfferFormData>({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [product, setProduct] = useState<{
        title: string,
        feedProductId: string
    } | null>(null)

    const router = useRouter();
    const searchParams = useSearchParams();
    const offerId = searchParams.get("pd");

    useEffect(() => {
        if (!offerId) return;

        const fetchOffer = async () => {
            try {
                const res = await clientSideAxios.get(`/offers/${offerId}`);
                const data = await res.data.data;

                const {
                    title,
                    merchant,
                    availability,
                    shop,
                    price,
                    status,
                    shipping,
                    currencySign,
                    rating,
                    ratingCount,
                    clickUrl,
                    product
                } = data;

                setProduct({
                    title: product.title as string || "N/A",
                    feedProductId: product.feedProductId as string || "N/A"
                })
                setFormData({
                    title,
                    merchant,
                    availability,
                    shop,
                    price,
                    status,
                    shipping,
                    currencySign,
                    rating,
                    ratingCount,
                    clickUrl,
                });
            } catch (err) {
                console.error(err);
                setMessage("Failed to load offer data.");
            } finally {
                setFetching(false);
            }
        };

        fetchOffer();
    }, [offerId]);

    const handleChange = (key: keyof OfferFormData, value: OfferFormData[keyof OfferFormData]) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };
    //console.log(formData, "formdata...........")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!offerId) return;
        setLoading(true);
        setMessage(null);

        try {


            const res = await clientSideAxios.put(`/offers/${offerId}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = res.data;

            setMessage("Offer updated successfully!");
            //console.log("Updated offer:", data);

            router.push("/dashboard/offers");
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setMessage(err.message || "Something went wrong.");
            } else {
                setMessage("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <p className="text-center mt-10">Loading offer data...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-3xl mt-12 space-y-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
                <BadgePercent className="w-7 h-7 text-primary" />
                Edit Offer
            </h1>
            <h1 className='text-xl font-bold text-center text-gray-800 flex items-center justify-center gap-2'>Product: {product?.title} ({product?.feedProductId})</h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="md:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={formData.title || ""} onChange={(v) => handleChange("title", v.target.value)} placeholder="Offer title" />
                </div>

                {/* Merchant */}
                <div>
                    <Label htmlFor="merchant">Merchant</Label>
                    <CreatableSelect
                        isMulti
                        id="merchant"
                        value={(formData.merchant || []).map((m) => ({ label: m, value: m }))}
                        onChange={(selectedOptions) =>
                            handleChange(
                                "merchant",
                                selectedOptions.map((option) => option.value)
                            )
                        }
                        placeholder="Select or create merchants..."
                        className="mt-1"
                        classNamePrefix="react-select"
                        styles={{
                            control: (base) => ({
                                ...base,
                                padding: "2px",
                                borderRadius: "0.75rem",
                                borderColor: "#d1d5db",
                                boxShadow: "none",
                                '&:hover': { borderColor: "#3b82f6" },
                            }),
                        }}
                        options={[
                            { value: "Stripe", label: "Stripe" },
                            { value: "PayPal", label: "PayPal" },
                            { value: "Square", label: "Square" },
                            { value: "Adyen", label: "Adyen" },
                            { value: "AuthorizeNet", label: "Authorize.Net" },
                            { value: "Braintree", label: "Braintree" },
                            { value: "Razorpay", label: "Razorpay" },
                            { value: "2Checkout", label: "2Checkout" },
                            { value: "Klarna", label: "Klarna" },
                            { value: "Afterpay", label: "Afterpay" },
                            { value: "AmazonPay", label: "Amazon Pay" },
                            { value: "ApplePay", label: "Apple Pay" },
                            { value: "GooglePay", label: "Google Pay" },
                            { value: "WePay", label: "WePay" },
                            { value: "Alipay", label: "Alipay" },
                            { value: "Worldpay", label: "Worldpay" }
                        ]}

                    />
                </div>

                {/* Availability */}
                <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Input id="availability" value={formData.availability || ""} onChange={(v) => handleChange("availability", v.target.value)} placeholder="In Stock, Out of Stock" />
                </div>

                {/* Shop */}
                <div>
                    <Label htmlFor="shop">Shop</Label>
                    <Select
                        id="shop"
                        value={formData.shop ? { label: formData.shop, value: formData.shop } : null}
                        onChange={(selectedOption) => handleChange("shop", selectedOption?.value || "")}
                        placeholder="Select a shop..."
                        className="mt-1"
                        classNamePrefix="react-select"
                        styles={{
                            control: (base) => ({
                                ...base,
                                padding: "2px",
                                borderRadius: "0.75rem",
                                borderColor: "#d1d5db",
                                boxShadow: "none",
                                '&:hover': { borderColor: "#3b82f6" },
                            }),
                        }}
                        options={[
                            { value: "Amazon", label: "Amazon" },
                            { value: "eBay", label: "eBay" },
                            { value: "Walmart", label: "Walmart" },
                            { value: "Target", label: "Target" },
                            { value: "BestBuy", label: "BestBuy" },
                        ]}
                    />
                </div>

                {/* Price */}
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" value={formData.price !== undefined ? String(formData.price) : ""} onChange={(v) => handleChange("price", Number(v.target.value))} placeholder="Offer price" />
                </div>

                {/* Shipping */}
                <div>
                    <Label htmlFor="shipping">Shipping</Label>
                    <Input id="shipping" type="number" value={formData.shipping !== undefined ? String(formData.shipping) : ""} onChange={(v) => handleChange("shipping", Number(v.target.value))} placeholder="Shipping cost" />
                </div>

                {/* Status */}

                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                        id="status"
                        value={formData.status ? { label: formData.status, value: formData.status } : null}
                        onChange={(selectedOption) => handleChange("status", selectedOption?.value || "")}
                        placeholder="Select status..."
                        className="mt-1"
                        classNamePrefix="react-select"
                        styles={{
                            control: (base) => ({
                                ...base,
                                padding: "2px",
                                borderRadius: "0.75rem",
                                borderColor: "#d1d5db",
                                boxShadow: "none",
                                '&:hover': { borderColor: "#3b82f6" },
                            }),
                        }}
                        options={[
                            { value: "ACTIVE", label: "ACTIVE" },
                            { value: "INACTIVE", label: "INACTIVE" },
                        ]}
                    />
                </div>

                {/* Currency */}
                {/* <div>
                    <Label htmlFor="currencySign">Currency</Label>
                    <Input id="currencySign" value={formData.currencySign || ""} onChange={(v) => handleChange("currencySign", v.target.value)} placeholder="$ or €" />
                </div> */}

                {/* Rating */}
                <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input id="rating" type="number" value={formData.rating !== undefined ? String(formData.rating) : ""} onChange={(v) => handleChange("rating", Number(v.target.value))} placeholder="e.g. 4.5" />
                </div>

                {/* Rating Count */}
                <div>
                    <Label htmlFor="ratingCount">Rating Count</Label>
                    <Input id="ratingCount" type="number" value={formData.ratingCount !== undefined ? String(formData.ratingCount) : ""} onChange={(v) => handleChange("ratingCount", Number(v.target.value))} placeholder="Number of reviews" />
                </div>

                {/* Click URL */}
                <div className="md:col-span-2">
                    <Label htmlFor="clickUrl">Offer Click URL</Label>
                    <Input id="clickUrl" value={formData.clickUrl || ""} onChange={(v) => handleChange("clickUrl", v.target.value)} placeholder="https://example.com/offer" />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <Button disabled={loading} className="w-full py-3 text-lg">
                        {loading ? "Saving..." : "Update Offer"}
                    </Button>
                    {message && <p className="mt-4 text-center text-sm text-gray-500">{message}</p>}
                </div>
            </form>
        </div>
    );
}
