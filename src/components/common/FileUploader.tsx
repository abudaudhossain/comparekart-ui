import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";

type Props = {
    onChange: (file: File) => void;
    value?: File | string;
};

const FileUploader: React.FC<Props> = ({ onChange, value }) => {
    const [file, setFile] = useState<File | "">(value instanceof File ? value : "");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Handle preview update
    useEffect(() => {
        if (value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if(value) {
            setPreviewUrl(value);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // setFile(selectedFile);
            onChange(selectedFile);
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* File Upload Input */}
            <label className="w-full cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-6 hover:border-blue-500 transition">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="text-center space-y-2">
                    <Upload className="w-6 h-6 mx-auto text-blue-500" />
                    <p className="text-sm text-gray-600">Click to upload an image</p>
                </div>
            </label>

            {/* Preview */}
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

export default FileUploader;
