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
import FileUploader from "@/components/common/FileUploader";
import TextArea from "@/components/form/input/TextArea";
import FileOrLinkInput from "@/components/common/FileOrLinkUploader";
import { AxiosError } from "axios";
import errorMessage from "@/lib/errorMessage";

interface CategoriesFormData {
    name?: string;
    slug?: string;
    description?: string;
    status?: string;
    image?: string | File;
}
// interface CategoriesOption {
//     id: string;
//     name: string;
// }

export default function CategoriesCreateForm() {
    const [formData, setFormData] = useState<CategoriesFormData>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter();

    const handleChange = (key: keyof CategoriesFormData, value: CategoriesFormData[keyof CategoriesFormData]) => {
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

            const res = await clientSideAxios.post(`/categories`, dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = res.data;

            setMessage("Product updated successfully!");
            //console.log("Updated product:", data);

            // Optional redirect
            router.push('/dashboard/content/categories');
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


    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-3xl mt-12 space-y-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
                Create New Category
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                {/* name */}
                <div className="md:col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={formData.name || ""} onChange={(v) => handleChange("name", v.target.value)} placeholder="Category name" />
                </div>


                {/* Slug */}
                <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" value={formData.slug || ""} onChange={(v) => handleChange("slug", v.target.value)} placeholder="Category Slug , like to category-name" />
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
                <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <TextArea value={formData.description || ""} onChange={(v) => handleChange("description", v)} placeholder="Category description" />
                </div>

                <div className="md:col-span-2">
                    <Label>Image</Label>
                    <FileOrLinkInput onChange={handleFileChange} value={formData.image || ""} />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <Button disabled={loading} className="w-full py-3 text-lg">
                        {loading ? "Creating..." : "Create Category"}
                    </Button>
                    {message && <p className="mt-4 text-center text-sm text-gray-500">{message}</p>}
                </div>
            </form>
        </div>
    );
}
