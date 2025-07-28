"use client";

import FileOrLinkUploader from "@/components/common/FileOrLinkUploader";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientSideAxios } from "../../../../lib/api/axios/clientSideAxios";
import { AxiosError } from "axios";
import errorMessage from "@/lib/errorMessage";
import Select from "react-select";
import { getCategories } from "../../../../util/data/categories";
import { categoryType } from "@/lib/types/category.type";

interface ProductFormData {
    title?: string;
    subtitle?: string;
    feedProductId?: string;
    gtin?: string;
    brand?: string;
    price?: number;
    delivery?: string;
    discount?: number;
    currencySign?: string;
    categoryId?: string;
    rating?: number;
    ratingCount?: number;
    avg_score?: string;
    link?: string;
    description?: string;

    image?: string | File; // 🔥 Accept both URL string or File
}

export default function ProductUpdateForm() {
    const [formData, setFormData] = useState<ProductFormData>({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [categories, setCategories] = useState<categoryType[]>([]);


    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get("pd");

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                const res = await clientSideAxios.get(`/products/${productId}`);
                const data = await res.data.data;

                const {
                    title,
                    subtitle,
                    feedProductId,
                    gtin,
                    brand,
                    price,
                    delivery,
                    discount,
                    currencySign,
                    rating,
                    ratingCount,
                    avg_score,
                    link,
                    description,
                    image,
                    categoryId
                } = data;

                setFormData({
                    title,
                    subtitle,
                    feedProductId,
                    gtin,
                    brand,
                    price,
                    delivery,
                    discount,
                    currencySign,
                    rating,
                    ratingCount,
                    avg_score,
                    link,
                    description,
                    image, // Keep image as string initially (URL)
                    categoryId
                });
            } catch (err) {
                console.error(err);
                setMessage("Failed to load product data.");
            } finally {
                setFetching(false);
            }
        };



        fetchProduct();
    }, [productId]);

    const handleChange = (key: keyof ProductFormData, value: ProductFormData[keyof ProductFormData]) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (value: string | File) => {
        if (typeof value === "string") {
            setFormData(prev => ({ ...prev, image: value }));
        } else {
            setFormData(prev => ({ ...prev, image: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productId) return;
        setLoading(true);
        setMessage(null);

        try {
            const dataToSend = new FormData();

            // Handle image separately
            if (typeof formData.image === "string") {
                dataToSend.append("image", formData.image);
            } else if (formData.image instanceof File) {
                dataToSend.append("image", formData.image);
            }

            // Add other fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "image") return; // skip image, handled separately
                if (value !== undefined && value !== null) {
                    dataToSend.append(key, String(value));
                }
            });

            const res = await clientSideAxios.put(`/products/${productId}`, dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = res.data;

            setMessage("Product updated successfully!");
            //console.log("Updated product:", data);

            // Optional redirect
            router.push('/dashboard/products');
        } catch (err) {
            console.error(err);
            if (err instanceof AxiosError) {
                setMessage(err.response?.data.message)
                errorMessage(err.response?.data.message)
            }
            else if (err instanceof Error) {
                setMessage(err.message || "Something went wrong.");
            } else {
                setMessage("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };


    const fetchCategories = async () => {
        try {
            const res = await getCategories({
                page: 1,
                limit: 100000,
                sortOrder: "asc",
            });
            setCategories(res.items);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    if (fetching) {
        return <p className="text-center mt-10">Loading product data...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 space-y-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="md:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={formData.title || ""} onChange={(v) => handleChange("title", v.target.value)} placeholder="Product title" />
                </div>

                <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input id="subtitle" value={formData.subtitle || ""} onChange={(v) => handleChange("subtitle", v.target.value)} placeholder="Product subtitle" />
                </div>

                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                        id="category"
                        value={
                            formData.categoryId
                                ? categories
                                    .map(item => ({ value: item.id, label: item.name }))
                                    .find(option => option.value === formData.categoryId)
                                : null
                        }
                        onChange={(selectedOption) =>
                            handleChange("categoryId", selectedOption?.value || "")
                        }
                        placeholder="Select a category..."
                        className="mt-1"
                        classNamePrefix="react-select"
                        options={categories.map(item => ({
                            value: item.id,
                            label: item.name,
                        }))}
                    />
                </div>

                <div>
                    <Label htmlFor="feedProductId">Feed Product ID</Label>
                    <Input id="feedProductId" value={formData.feedProductId || ""} onChange={(v) => handleChange("feedProductId", v.target.value)} placeholder="e.g. FP-001" />
                </div>

                <div>
                    <Label htmlFor="gtin">GTIN</Label>
                    <Input id="gtin" value={formData.gtin || ""} onChange={(v) => handleChange("gtin", v.target.value)} placeholder="Global Trade Item Number" />
                </div>

                <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" value={formData.brand || ""} onChange={(v) => handleChange("brand", v.target.value)} placeholder="e.g. Apple, Samsung" />
                </div>

                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" value={formData.price !== undefined ? String(formData.price) : ""} onChange={(v) => handleChange("price", Number(v.target.value))} placeholder="Product price" />
                </div>

                <div>
                    <Label htmlFor="delivery">Delivery</Label>
                    <Input id="delivery" value={formData.delivery || ""} onChange={(v) => handleChange("delivery", v.target.value)} placeholder="e.g. Next-day" />
                </div>

                <div>
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input id="discount" type="number" value={formData.discount !== undefined ? String(formData.discount) : ""} onChange={(v) => handleChange("discount", Number(v.target.value))} placeholder="Optional discount" />
                </div>

                <div>
                    <Label htmlFor="currencySign">Currency</Label>
                    <Input id="currencySign" value={formData.currencySign || ""} onChange={(v) => handleChange("currencySign", v.target.value)} placeholder="$ or €" />
                </div>

                <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input id="rating" value={formData.rating !== undefined ? String(formData.rating) : ""} onChange={(v) => handleChange("rating", Number(v.target.value))} placeholder="e.g. 4.5" />
                </div>

                <div>
                    <Label htmlFor="ratingCount">Rating Count</Label>
                    <Input id="ratingCount" type="number" value={formData.ratingCount !== undefined ? String(formData.ratingCount) : ""} onChange={(v) => handleChange("ratingCount", Number(v.target.value))} placeholder="Number of reviews" />
                </div>

                <div>
                    <Label htmlFor="avg_score">Average Score</Label>
                    <Input id="avg_score" value={formData.avg_score || ""} onChange={(v) => handleChange("avg_score", v.target.value)} placeholder="e.g. 92%" />
                </div>

                <div className="">
                    <Label htmlFor="link">Product Link</Label>
                    <Input id="link" value={formData.link || ""} onChange={(v) => handleChange("link", v.target.value)} placeholder="https://example.com/product" />
                </div>

                <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <TextArea value={formData.description || ""} onChange={(v) => handleChange("description", v)} placeholder="Product description" />
                </div>

                <div className="md:col-span-2">
                    <Label>Product Image</Label>
                    <FileOrLinkUploader onChange={handleFileChange} value={formData.image || ""} />
                </div>

                <div className="md:col-span-2 text-center">
                    <Button disabled={loading} className="w-full text-lg py-3">
                        {loading ? "Saving..." : "Update Product"}
                    </Button>
                    {message && <p className="mt-2 text-sm text-center text-gray-600">{message}</p>}
                </div>
            </form>
        </div>
    );
}
