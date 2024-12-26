import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscNewFolder } from "react-icons/vsc";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FolderResponse, FolderRequest } from "../types/folder";
import {
    createFolder,
    getAllFolders,
    deleteFolder,
    updateFolder,
} from "../services/folder";

function MyFolder(): JSX.Element {
    const [activePopup, setActivePopup] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [folders, setFolders] = useState<FolderResponse[]>([]);
    const [newFolderName, setNewFolderName] = useState<string>("");
    const [editFolderId, setEditFolderId] = useState<number | null>(null);
    const [editFolderName, setEditFolderName] = useState<string>("");

    const fetchFolders = async (): Promise<void> => {
        try {
            const fetchedFolders = await getAllFolders();
            console.log("Fetched folders:", fetchedFolders);
            setFolders(fetchedFolders);
        } catch (error) {
            console.error("Failed to fetch folders:", error);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const handlePopupToggle = (index: number): void => {
        setActivePopup((prev) => (prev === index ? null : index));
    };

    const handleRename = (folder: FolderResponse): void => {
        setEditFolderId(folder.id);
        setEditFolderName(folder.name);
        setActivePopup(null);
        openModal();
    };

    const handleDelete = async (id: number): Promise<void> => {
        try {
            await deleteFolder(id);
            setFolders(folders.filter((folder) => folder.id !== id));
            setActivePopup(null);
        } catch (error) {
            console.error("Failed to delete folder:", error);
        }
    };

    const openModal = (): void => setIsModalOpen(true);

    const closeModal = (): void => {
        setIsModalOpen(false);
        setNewFolderName("");
        setEditFolderId(null);
        setEditFolderName("");
    };

    const handleCreateFolder = async (): Promise<void> => {
        const folderRequest: FolderRequest = { name: newFolderName };
        try {
            const newFolder = await createFolder(folderRequest);
            setFolders([...folders, newFolder]);
            closeModal();
        } catch (error) {
            console.error("Failed to create folder:", error);
        }
    };

    const handleUpdateFolder = async (): Promise<void> => {
        if (editFolderId === null) return;
        const folderRequest: FolderRequest = { name: editFolderName };
        try {
            const updatedFolder = await updateFolder(
                editFolderId,
                folderRequest,
            );
            setFolders(
                folders.map((folder) =>
                    folder.id === editFolderId ? updatedFolder : folder,
                ),
            );
            closeModal();
        } catch (error) {
            console.error("Failed to update folder:", error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <h2 className="font-semibold text-lg">My Folder</h2>
                <div>
                    <button
                        onClick={openModal}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 shadow-md text-white font-medium rounded-full hover:bg-blue-600 transition"
                    >
                        <VscNewFolder className="text-xl" />
                        Create New Folder
                    </button>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
                                <IoCloseCircleOutline
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer"
                                />

                                <h2 className="mb-4 text-xl font-semibold text-blue-600">
                                    {editFolderId
                                        ? "Edit Folder"
                                        : "Create a New Folder"}
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Enter folder name"
                                    value={
                                        editFolderId
                                            ? editFolderName
                                            : newFolderName
                                    }
                                    onChange={(e) =>
                                        editFolderId
                                            ? setEditFolderName(e.target.value)
                                            : setNewFolderName(e.target.value)
                                    }
                                    className="w-full mb-4 p-2 border rounded"
                                />

                                <button
                                    onClick={
                                        editFolderId
                                            ? handleUpdateFolder
                                            : handleCreateFolder
                                    }
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 shadow-md text-white font-medium rounded-full hover:bg-blue-600 transition"
                                >
                                    <VscNewFolder className="text-xl" />
                                    {editFolderId
                                        ? "Update Folder"
                                        : "Create Folder"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-6">
                {folders && folders.length > 0 ? (
                    folders.map((folder, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-lg px-6 py-4 shadow-lg flex items-center space-x-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                        >
                            <img
                                src="/group/folder.png"
                                alt={folder.name}
                                className="w-12 h-12"
                            />
                            <p className="font-semibold text-base flex-1">
                                {folder.name}
                            </p>
                            <button
                                onClick={() => handlePopupToggle(index)}
                                className="text-gray-600 hover:text-blue-500 transition duration-200"
                            >
                                <BsThreeDotsVertical className="w-5 h-5" />
                            </button>

                            {activePopup === index && (
                                <div className="absolute right-0 top-14 bg-white border rounded-lg shadow-lg z-10 w-40">
                                    <button
                                        onClick={() => handleRename(folder)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                    >
                                        Rename
                                    </button>
                                    <button
                                        onClick={() => handleDelete(folder.id)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No folders found.</p>
                )}
            </div>
        </div>
    );
}

export default MyFolder;
