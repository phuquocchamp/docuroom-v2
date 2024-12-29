import { ReactElement, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DocumentResponse } from "../types/document";
import { getDocumentsByUser } from "../services/document";

function MyDocument(): ReactElement {
    const navigate = useNavigate();

    const [activePopup, setActivePopup] = useState<number | null>(null);
    const [documents, setDocuments] = useState<DocumentResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDocumentsByUser();
                setDocuments(response);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchData();
    }, []);

    const handlePopupToggle = (id: number): void => {
        setActivePopup((prev) => (prev === id ? null : id));
    };

    const handleRename = (doc: DocumentResponse): void => {
        console.log(`Rename ${doc.name}`);
        setActivePopup(null);
    };

    const handleDelete = (doc: DocumentResponse): void => {
        console.log(`Delete ${doc.name}`);
        setActivePopup(null);
    };

    const handleClick = (): void => {
        navigate("/upload-document");
    };

    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <h2 className="font-semibold text-lg">My Document</h2>
                <button
                    onClick={handleClick}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 shadow-md text-white font-medium rounded-full hover:bg-blue-600 transition"
                >
                    <HiOutlineDocumentArrowUp className="text-xl" />
                    Upload Document
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                {documents.map((doc) => (
                    <Link
                        key={doc.id}
                        to={`/item-details/${doc.id}`}
                        className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                        <img
                            src={"/public/doc/document.jpg"}
                            alt={doc.name}
                            className="h-32 w-full object-cover rounded-md mb-4"
                        />

                        <h3 className="font-semibold text-base text-gray-800 mb-2">
                            {doc.name}
                        </h3>

                        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                            {/* <p>{doc.createdAt}</p> */}
                            <p>Tags: {doc.tags}</p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => handlePopupToggle(doc.id)}
                                className="text-gray-600 hover:text-blue-500 transition duration-200"
                            >
                                <BsThreeDotsVertical className="w-5 h-5" />
                            </button>

                            {activePopup === doc.id && (
                                <div className="absolute right-0 mt-6 bg-white border rounded-lg shadow-lg z-10 w-40">
                                    <button
                                        onClick={() => handleRename(doc)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MyDocument;
