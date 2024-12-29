import React, { useState, useRef, useEffect } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { getAllFolders } from "../services/folder";
import { FolderResponse } from "../types/folder";
import { uploadFile } from "../services/file";
import { useNavigate } from "react-router-dom";
import { createDocument } from "../services/document";


const UploadDocument: React.FC = () => {
    const [folders, setFolders] = useState<FolderResponse[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedFolder, setSelectedFolder] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedFolders = await getAllFolders();
                setFolders(fetchedFolders);
                if (fetchedFolders.length > 0) {
                    setSelectedFolder(fetchedFolders[0].name);
                }
            } catch (error) {
                console.error("Error fetching folders:", error);
            }
        };
        fetchData();
    }, []);

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ): Promise<void> => {
        const file = event.target.files?.[0] || null;
        if (!file) {
            return;
        }

        setUploadedFile(file);
        setIsUploading(true);

        try {
            const response = await uploadFile(file);
            setFileUrl(response);
            console.log("File uploaded successfully:", response);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleButtonClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTags(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setDescription(event.target.value);
    };

    const handleFolderChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedFolder(event.target.value);
    };

    const handleCreateDocument = async () => {
        if (!fileUrl) {
            return;
        }

        setIsUploading(true);

        try {
            const response = await createDocument({
                name,
                url: fileUrl,
                folder: selectedFolder,
                tags,
                description,
            });
            console.log("Document created successfully:", response);

            setName("");
            setTags("");
            setDescription("");
            setSelectedFolder(folders.length > 0 ? folders[0].name : "");
            setFileUrl(null);
            setUploadedFile(null);
            navigate("/home/document");
        } catch (error) {
            console.error("Error creating document:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-8 text-center">
                Upload Document
            </h1>

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
                        <p className="text-lg">
                            Select a file or drag and drop here
                        </p>
                        <button
                            onClick={handleButtonClick}
                            className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600"
                        >
                            Select File
                        </button>
                    </label>
                </div>

                <div className="w-1/3">
                    {uploadedFile && (
                        <div className="border rounded-lg p-6 bg-gray-50">
                            <p className="font-medium text-lg">
                                {uploadedFile.name}
                            </p>
                            <div className="relative mt-4 h-3 bg-gray-300 rounded-full">
                                <div
                                    className="absolute top-0 left-0 h-3 bg-blue-500 rounded-full"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>
                            {fileUrl && (
                                <p className="mt-2 text-sm">
                                    <strong>URL:</strong> File uploaded successfully!
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-8 mb-8">
                <div>
                    <label
                        htmlFor="name"
                        className="block font-semibold text-lg mb-4"
                    >
                        File Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Type here"
                        className="w-full h-12 border rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="tags"
                        className="block font-semibold text-lg mb-4"
                    >
                        Tags
                    </label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="Type here"
                        className="w-full h-12 border rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                        value={tags}
                        onChange={handleTagsChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block font-semibold text-lg mb-4"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Type here"
                        className="w-full h-32 border rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="folder"
                        className="block font-semibold text-lg mb-4"
                    >
                        Folder
                    </label>
                    <select
                        id="folder"
                        className="w-full border rounded-lg p-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                        value={selectedFolder}
                        onChange={handleFolderChange}
                    >
                        {folders.map((folder) => (
                            <option key={folder.id} value={folder.name}>
                                {folder.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={handleCreateDocument}
                    className="px-10 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
                    disabled={isUploading}
                >
                    {isUploading ? "Creating..." : "Create Document"}
                </button>
            </div>
        </div>
    );
};

export default UploadDocument;
