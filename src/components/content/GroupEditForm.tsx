"use client";

import FileOrLinkUploader from "@/components/common/FileOrLinkUploader";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientSideAxios } from "../../../lib/api/axios/clientSideAxios";
import FileUploader from "../common/FileUploader";


interface ProductGroupFormData {
    title?: string;
    subTitle?: string;
    gtin?: string;
    image?: string | File; // 🔥 Accept both URL string or File
}

interface GroupEditFormProps {
    group: ProductGroupFormData;
    id: string;
}

export default function GroupEditForm() {
    const router = useRouter()

    const searchParams = useSearchParams();


    const [formData, setFormData] = useState<ProductGroupFormData>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [fetching, setFetching] = useState(true);
    const [id, setId] = useState(searchParams.get("mgid"))




    useEffect(() => {
        if (!id) return;

        const fetchOffer = async () => {
            try {
                const res = await clientSideAxios.get(`/matching-products/${id}`);
                const data = await res.data.data;
                const {
                    title,
                    subTitle,
                    image,
                    gtin
                } = data;


                setFormData({
                    title,
                    subTitle,
                    image,
                    gtin
                });
            } catch (err) {
                console.error(err);
                setMessage("Failed to load offer data.");
            } finally {
                setFetching(false);
            }
        };

        fetchOffer();
    }, [id]);

    //console.log("id...........", id)

    const handleChange = (key: keyof ProductGroupFormData, value: ProductGroupFormData[keyof ProductGroupFormData]) => {
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
        if (!id) return;
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

            const res = await clientSideAxios.put(`/matching-products/${id}`, dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = res.data;

            setMessage("Content updated successfully!");
            //console.log("Updated product:", data);

            // Optional redirect

        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setMessage(err.message || "Something went wrong.");
            } else {
                setMessage("Something went wrong.");
            }
        } finally {
            setLoading(false);
            router.push('/dashboard/content/matching-products');
        }
    };

    if (fetching) {
        return <p className="text-center mt-10">Loading product data...</p>;
    }
    //console.log(formData)
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 space-y-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="md:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={formData.title || ""} onChange={(v) => handleChange("title", v.target.value)} placeholder="Product title" />
                </div>

                <div>
                    <Label htmlFor="subTitle">subTitle</Label>
                    <Input id="subTitle" value={formData.subTitle || ""} onChange={(v) => handleChange("subTitle", v.target.value)} placeholder="Product subTitle" />
                </div>



                <div>
                    <Label htmlFor="gtin">GTIN</Label>
                    <Input id="gtin" value={formData.gtin || ""} onChange={(v) => handleChange("gtin", v.target.value)} placeholder="Global Trade Item Number" />
                </div>


                <div className="md:col-span-2">
                    <Label>Image</Label>
                    {/* <FileOrLinkUploader onChange={handleFileChange} value={formData.image || ""} /> */}
                    <FileUploader onChange={handleFileChange} value={formData.image || ""} />
                </div>

                <div className="md:col-span-2 text-center">
                    <Button disabled={loading} className="w-full text-lg py-3">
                        {loading ? "Saving..." : "Update Group"}
                    </Button>
                    {message && <p className="mt-2 text-sm text-center text-gray-600">{message}</p>}
                </div>
            </form>
        </div>
    );
}
