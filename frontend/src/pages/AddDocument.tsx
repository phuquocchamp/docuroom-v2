import React, { useState, useRef } from 'react';
import { BsCloudUpload } from 'react-icons/bs';

interface FileUploadProps {
    onFileUpload: (file: File | null) => void;
}

const AddDocument: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0] || null;
        setUploadedFile(file);
        onFileUpload(file); // Gọi hàm onFileUpload để xử lý file
    };

    const handleButtonClick = (): void => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-8 text-center">Add Document</h1>

            <div className="flex gap-6 items-start mb-8">
                <div className="w-2/3 p-6 border-4 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-600">
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        ref={fileInputRef}
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                    >
                        <BsCloudUpload className="w-24 h-24" />
                        <p className="text-lg">Select a file or drag and drop here</p>
                        <button
                            onClick={handleButtonClick}
                            className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600"
                        >
                            Select File
                        </button>
                    </label>
                </div>

                <div className="w-1/3">
                    {uploadedFile ? (
                        <div className="border rounded-lg p-6 bg-gray-50">
                            <p className="font-medium text-lg">{uploadedFile.name}</p>
                            <div className="relative mt-4 h-3 bg-gray-300 rounded-full">
                                <div
                                    className="absolute top-0 left-0 h-3 bg-blue-500 rounded-full"
                                    style={{ width: '100%' }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-lg">No file uploaded yet.</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-8 mb-8">
                <div>
                    <label
                        htmlFor="description"
                        className="block font-semibold text-lg mb-4"
                    >
                        Descriptions
                    </label>
                    <textarea
                        id="description"
                        placeholder="Type here"
                        className="w-full h-32 border rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="folder" className="block font-semibold text-lg mb-4">
                        Folder
                    </label>
                    <select
                        id="folder"
                        className="w-full border rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                    >
                        <option>AI</option>
                        <option>Technology</option>
                        <option>Math</option>
                        <option>None of Folder</option>
                    </select>
                </div>
            </div>

            <div className="text-center">
                <button className="px-10 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition">
                    Upload Document
                </button>
            </div>
        </div>
    );
};

export default AddDocument;