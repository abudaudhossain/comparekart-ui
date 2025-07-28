"use client";
import FileOrLinkUploader from "@/components/common/FileOrLinkUploader";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import React, { useState } from "react";

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
    rating?: number;
    ratingCount?: number;
    avg_score?: string;
    link?: string;
    description?: string;
    image?: string;
}

export default function ProductCreateForm() {
    const [formData, setFormData] = useState<ProductFormData>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (key: keyof ProductFormData, value: ProductFormData[keyof ProductFormData]) => {
        //console.log("key: ", key, value);
        setFormData((prev: ProductFormData) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create product");

            const result = await res.json();
            setMessage("Product created successfully!");
            //console.log(result);
        } catch (err) {
            if (err instanceof Error) {
                setMessage(err.message || "Something went wrong.");
            } else {
                setMessage("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };
    //console.log(formData)
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 space-y-6">
            <h1 className="text-3xl font-bold text-center">Create New Product</h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="md:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" onChange={(v) => handleChange("title", v.target.value)} placeholder="Product title" />
                </div>

                <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input id="subtitle" onChange={(v) => handleChange("subtitle", v.target.value)} placeholder="Product subtitle" />
                </div>

                <div>
                    <Label htmlFor="feedProductId">Feed Product ID</Label>
                    <Input id="feedProductId" onChange={(v) => handleChange("feedProductId", v.target.value)} placeholder="e.g. FP-001" />
                </div>

                <div>
                    <Label htmlFor="gtin">GTIN</Label>
                    <Input id="gtin" onChange={(v) => handleChange("gtin", v.target.value)} placeholder="Global Trade Item Number" />
                </div>

                <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" onChange={(v) => handleChange("brand", v.target.value)} placeholder="e.g. Apple, Samsung" />
                </div>

                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" onChange={(v) => handleChange("price", Number(v.target.value))} placeholder="Product price" />
                </div>

                <div>
                    <Label htmlFor="delivery">Delivery</Label>
                    <Input id="delivery" onChange={(v) => handleChange("delivery", v.target.value)} placeholder="e.g. Next-day" />
                </div>

                <div>
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input id="discount" type="number" onChange={(v) => handleChange("discount", Number(v.target.value))} placeholder="Optional discount" />
                </div>

                <div>
                    <Label htmlFor="currencySign">Currency</Label>
                    <Input id="currencySign" onChange={(v) => handleChange("currencySign", v.target.value)} placeholder="$ or €" />
                </div>

                <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input id="rating" onChange={(v) => handleChange("rating", v.target.value)} placeholder="e.g. 4.5" />
                </div>

                <div>
                    <Label htmlFor="ratingCount">Rating Count</Label>
                    <Input id="ratingCount" type="number" onChange={(v) => handleChange("ratingCount", Number(v.target.value))} placeholder="Number of reviews" />
                </div>

                <div>
                    <Label htmlFor="avg_score">Average Score</Label>
                    <Input id="avg_score" onChange={(v) => handleChange("avg_score", v.target.value)} placeholder="e.g. 92%" />
                </div>

                <div className="">
                    <Label htmlFor="link">Product Link</Label>
                    <Input id="link" onChange={(v) => handleChange("link", v.target.value)} placeholder="https://example.com/product" />
                </div>

                <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <TextArea
                        placeholder="Product description"
                        value={formData.description || ""}
                        onChange={(v) => handleChange("description", v)}
                    />  </div>

                <div className="md:col-span-2">
                    <FileOrLinkUploader onChange={(v) => handleChange("image", v instanceof File ? URL.createObjectURL(v) : v)} />
                </div>

                <div className="md:col-span-2 text-center">
                    <Button disabled={loading} className="w-full text-lg py-3">
                        {loading ? "Submitting..." : "Submit Product"}
                    </Button>
                    {message && <p className="mt-2 text-sm text-center text-gray-600">{message}</p>}
                </div>
            </form>
        </div>
    );
}
