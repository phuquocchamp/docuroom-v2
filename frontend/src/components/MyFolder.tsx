import {useState} from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {VscNewFolder} from 'react-icons/vsc';
import {IoCloseCircleOutline} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {FolderRequest} from "../types/folder.tsx";

function MyFolder(): JSX.Element {
    const [activePopup, setActivePopup] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const folders = [
        { name: "Korean", id: 1 },
        { name: "Computer Network",  id: 2 },
        { name: "Software",  id: 3 },
        { name: "English",  id: 4 },
    ]

    const handlePopupToggle = (index: number): void => {
        setActivePopup((prev) => (prev === index ? null : index));
    };

    const handleRename = (folders: FolderRequest): void => {
        console.log(`Rename ${folders}`);
        setActivePopup(null);
    };

    const handleDelete = (folders: FolderRequest): void => {
        console.log(`Delete ${folders}`);
        setActivePopup(null);
    };

    const openModal = (): void => setIsModalOpen(true);

    const closeModal = (): void => setIsModalOpen(false);

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
                                    Create a New Folder
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Enter folder name"
                                    className="w-full mb-4 p-2 border rounded"
                                />

                                <div className="mb-4">
                                    <label className="block mb-2 font-semibold">
                                        Select Document(s):
                                    </label>
                                    <select className="w-full p-2 border rounded">
                                        <option>Select a document</option>
                                        <option>Document 1</option>
                                        <option>Document 2</option>
                                        <option>Document 3</option>
                                    </select>
                                </div>

                                <button
                                    onClick={closeModal}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 shadow-md text-white font-medium rounded-full hover:bg-blue-600 transition"
                                >
                                    <VscNewFolder className="text-xl" />
                                    Create Folder
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-6">
                {folders.map((folders, index) => (
                    <Link
                        className="relative bg-white rounded-lg px-6 py-4 shadow-lg flex items-center space-x-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                        key={index} to={`/folder-details/${folders.id}`}
                    >
                        <img src="/group/folder.png" alt={folders.name} className="w-12 h-12" />
                        <p className="font-semibold text-base flex-1">{folders.name}</p>
                        <button
                            onClick={() => handlePopupToggle(index)}
                            className="text-gray-600 hover:text-blue-500 transition duration-200"
                        >
                            <BsThreeDotsVertical className="w-5 h-5" />
                        </button>

                        {activePopup === index && (
                            <div className="absolute right-0 top-14 bg-white border rounded-lg shadow-lg z-10 w-40">
                                <button
                                    onClick={() => handleRename(folders)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                    Rename
                                </button>
                                <button
                                    onClick={() => handleDelete(folders)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MyFolder;