import React, { useState, useEffect } from "react";
import { Upload, Link as LinkIcon } from "lucide-react";

type Props = {
    onChange: (value: string | File) => void;
    value?: string | File;
};

const FileOrLinkInput: React.FC<Props> = ({ onChange, value }) => {
    const [inputType, setInputType] = useState<"file" | "link">("link");
    const [link, setLink] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
        if (typeof value === "string") {
            setLink(value);
            setPreviewUrl(value);
        } else if (value instanceof File) {
            setFile(value);
            const objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value]);

    // Whenever link changes
    useEffect(() => {
        if (inputType === "link" && link.trim()) {
            const isValid = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(link);
            if (isValid) {
                setError(null);
                onChange(link.trim()); // ✅ return link
            } else {
                setError("Please enter a valid URL starting with http:// or https://");
            }
        }
    }, [link, inputType]);

    //console.log("value: ", value, "link: ", link, "file: ", file,)

    return (
        <div className="w-full space-y-4">
            {/* Switch Buttons */}
            <div className="flex space-x-2">
                <button
                    type="button"
                    className={`px-4 py-1 rounded-md text-sm font-medium ${inputType === "link" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    onClick={() => {
                        setInputType("link");
                    }}
                >
                    Link
                </button>
                <button
                    type="button"
                    className={`px-4 py-1 rounded-md text-sm font-medium ${inputType === "file" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    onClick={() => {
                        setInputType("file");

                    }}
                >
                    File
                </button>
            </div>

            {/* Input Fields */}
            {inputType === "link" ? (
                <div className="relative">
                    <input
                        type="text"
                        value={link}
                        placeholder="https://example.com"
                        onChange={(e) => {
                            setLink(e.target.value)
                            setFile(null);

                        }}
                        className={`w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500 border-gray-300"}`}
                    />
                    <LinkIcon className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>
            ) : (
                <label className="w-full cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-6 hover:border-blue-500 transition">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setError(null);
                                setFile(file);
                                onChange(file); // ✅ return file
                                setLink("");
                            }
                        }}
                    />
                    <div className="text-center space-y-2">
                        <Upload className="w-6 h-6 mx-auto text-blue-500" />
                        <p className="text-sm text-gray-600">Click to select a file</p>
                    </div>
                </label>
            )}

            {/* Preview Section */}
            {previewUrl && (
                <div className="mt-4">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 w-auto mx-auto rounded-lg border shadow-sm"
                    />
                </div>
            )}
        </div>
    );
};

export default FileOrLinkInput;
