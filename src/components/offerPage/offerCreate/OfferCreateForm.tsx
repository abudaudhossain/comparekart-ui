"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientSideAxios } from "../../../../lib/api/axios/clientSideAxios";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { BadgePercent } from "lucide-react";
import { getProducts } from "../../../../util/data/products";

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
    productId?: string;
}
interface ProductOption {
    id: string;
    title: string;
    feedProductId: string;
}

export default function OfferCreateForm() {
    const [formData, setFormData] = useState<OfferFormData>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter();

    const handleChange = (key: keyof OfferFormData, value: OfferFormData[keyof OfferFormData]) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {


            const res = await clientSideAxios.post(`/offers`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setMessage("Offer created successfully!");
            //console.log("Created offer:", res.data);

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

    const searchParams = useSearchParams();
    const [products, setProducts] = useState<ProductOption[]>([]);
    const [fetchingProducts, setFetchingProducts] = useState(true);

    const productIdFromUrl = searchParams.get("pd");

    const fetchProducts = async () => {
        try {
            const res = await getProducts({
                page: 1,
                limit: 100000,
                sortOrder: "asc",
                status: "ASSIGNED"


            }); // <-- Replace with your actual API endpoint
            const productsData = res.products;
            setProducts(productsData);

            if (productIdFromUrl) {
                const matchedProduct = productsData.find((p: ProductOption) => p.id === productIdFromUrl);
                if (matchedProduct) {
                    setFormData(prev => ({ ...prev, productId: matchedProduct.id }));
                }
            }
        } catch (err) {
            console.error("Failed to fetch products", err);
        } finally {
            setFetchingProducts(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);



    const productOptions = products.map((product) => ({
        label: product.title,
        value: product.id,
    }));

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-3xl mt-12 space-y-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
                <BadgePercent className="w-7 h-7 text-primary" />
                Create New Offer
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                {/* Product Select */}
                <div className="md:col-span-2">
                    <Label htmlFor="productId">Product</Label>
                    <Select
                        isSearchable
                        id="productId"
                        isLoading={fetchingProducts}
                        value={formData.productId ? productOptions.find(opt => opt.value === formData.productId) : null}
                        onChange={(selectedOption) => handleChange("productId", selectedOption?.value || "")}
                        placeholder="Select a product..."
                        className="mt-1"
                        classNamePrefix="react-select"
                        options={productOptions}
                    />


                </div>

                {/* Title */}
                <div className="md:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={formData.title || ""} onChange={(v) => handleChange("title", v.target.value)} placeholder="Offer title" />
                </div>

                {/* Merchant */}
                <div className="md:col-span-2">
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
                        options={[
                            { value: "ACTIVE", label: "ACTIVE" },
                            { value: "INACTIVE", label: "INACTIVE" },
                        ]}
                    />
                </div>

                {/* Currency */}
                <div>
                    <Label htmlFor="currencySign">Currency</Label>
                    <Input id="currencySign" value={formData.currencySign || ""} onChange={(v) => handleChange("currencySign", v.target.value)} placeholder="$ or €" />
                </div>

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
                        {loading ? "Creating..." : "Create Offer"}
                    </Button>
                    {message && <p className="mt-4 text-center text-sm text-gray-500">{message}</p>}
                </div>
            </form>
        </div>
    );
}
