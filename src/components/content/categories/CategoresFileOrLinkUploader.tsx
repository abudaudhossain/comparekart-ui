import React, { useState } from "react";
import { Upload, Link as LinkIcon, Loader2, CheckCircle, XCircle } from "lucide-react";

import { AxiosError } from "axios";
import successMessage from "@/lib/successMessage";
import { clientSideAxios } from "../../../../lib/api/axios/clientSideAxios";

type UploadMode = "file" | "link";


interface CategoriesFileOrLinkUploaderProps {

    onClose: () => void;
    fetchCategories: () => void;
}


const CategoriesFileOrLinkUploader: React.FC<CategoriesFileOrLinkUploaderProps> = ({ onClose, fetchCategories }) => {
    const [mode, setMode] = useState<UploadMode>("file");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"success" | "error" | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const isValidUrl = (url: string) => {
        const pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
        return pattern.test(url);
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("categoryFile", file);
        setLoading(true);
        setStatus(null);

        try {
            let res;

            res = await clientSideAxios.post("/categories/import", formData);

            const data = res.data;

            setMessage(`File uploaded: ${data?.fileName || file.name}`);
            setStatus("success");
            successMessage(data.message)

        } catch (error) {
            //console.log("error...", error)
            if (error instanceof Error && (error as AxiosError<{ message?: string }>).response?.data?.message) {
                setMessage((error as AxiosError<{ message?: string }>).response?.data?.message || "An unknown error occurred");
            } else {
                setMessage("An unknown error occurred");
            }
            setStatus("error");
        } finally {
            // Clear the form data by creating a new instance
            formData.delete("categoryFile");
            setLoading(false);
            fetchCategories()
            onClose()
        }
    };

    const uploadLink = async () => {
        const trimmed = link.trim();
        // if (!link.trim()) return;
        if (!isValidUrl(trimmed)) {
            setMessage("Please enter a valid URL that starts with http:// or https://");
            setStatus("error");
            return;
        }


        setLoading(true);
        setStatus(null);

        try {


            const res = await clientSideAxios.post("/categories/import", { externalUrl: link.trim() });

            const data = res.data;



            successMessage(data.message)
            setMessage(`Link submitted: ${data?.link || link}`);
            setStatus("success");

        } catch (error) {
            //console.log("error...", error)
            if (error instanceof Error && (error as AxiosError<{ message?: string }>).response?.data?.message) {
                setMessage((error as AxiosError<{ message?: string }>).response?.data?.message || "An unknown error occurred");
            } else {
                setMessage("An unknown error occurred");
            }
            setStatus("error");
        } finally {
            setLink("")
            setLoading(false);
            fetchCategories()
            onClose()
        }
    };

    return (
        <div className=" w-full mx-auto p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-center mb-4">Add Categories with a File or Paste a Link </h2>

            <div className="flex justify-center mb-6">
                <div className="inline-flex bg-gray-100 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setMode("file")}
                        className={`px-4 py-2 text-sm font-medium transition ${mode === "file" ? "bg-blue-600 text-white" : "text-gray-700"
                            }`}
                    >
                        File
                    </button>
                    <button
                        onClick={() => setMode("link")}
                        className={`px-4 py-2 text-sm font-medium transition ${mode === "link" ? "bg-blue-600 text-white" : "text-gray-700"
                            }`}
                    >
                        Link
                    </button>
                </div>
            </div>

            {mode === "file" ? (
                <label className="w-full cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 hover:border-blue-500 transition">
                    <input
                        type="file"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
                    />
                    <div className="text-center space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-blue-500" />
                        <p className="text-sm text-gray-600">Click to select a file</p>
                    </div>
                </label>
            ) : (
                <div className="flex gap-2 items-center">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className={`w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500  ${status == "error"
                                ? "border-red-500 focus:ring-red-400"
                                : "focus:ring-blue-500 border-gray-300"
                                }`}
                        />
                        <LinkIcon className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                    <button
                        onClick={uploadLink}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                        Submit
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center mt-4 text-blue-600 gap-2 text-sm">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Uploading...
                </div>
            )}


            {status && (
                <div
                    className={`mt-4 flex items-center gap-2 text-sm ${status === "success" ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {status === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    {message}
                </div>
            )}
        </div>
    );
};

export default CategoriesFileOrLinkUploader;
