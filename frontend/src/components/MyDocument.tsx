import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

interface Document {
    title: string;
    date: string;
    user: string;
    imgSrc: string;
    id: number;
}

function MyDocument(): JSX.Element {
    const [activePopup, setActivePopup] = useState<number | null>(null);
    const navigate = useNavigate();

    const documents: Document[] = [
        {
            title: 'Giáo trình lập trình mạng',
            date: '12/10/2023',
            user: 'Khanh Linh',
            imgSrc: '/doc/GiaoTrinhLTM.png',
            id: 1,
        },
        {
            title: 'Bài tập giải tích',
            date: '12/10/2023',
            user: 'Phu Quoc',
            imgSrc: '/doc/GiaiTich.jpg',
            id: 2,
        },
        {
            title: 'Đề Thi tiếng Hàn',
            date: '12/10/2023',
            user: 'Khanh Linh',
            imgSrc: '/doc/Korean.jpg',
            id: 3,
        },
        {
            title: 'Tổng hợp ngữ pháp tiếng Anh cơ bản',
            date: '12/10/2023',
            user: 'Phu Quoc',
            imgSrc: '/doc/TiengAnh.jpg',
            id: 4,
        },
    ];

    const handlePopupToggle = (id: number): void => {
        setActivePopup((prev) => (prev === id ? null : id));
    };

    const handleRename = (doc: Document): void => {
        console.log(`Rename ${doc.title}`);
        setActivePopup(null);
    };

    const handleDelete = (doc: Document): void => {
        console.log(`Delete ${doc.title}`);
        setActivePopup(null);
    };

    const handleClick = (): void => {
        navigate('/home/addDocument');
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
                    <div
                        key={doc.id}
                        className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                        <img
                            src={doc.imgSrc}
                            alt={doc.title}
                            className="h-32 w-full object-cover rounded-md mb-4"
                        />

                        <h3 className="font-semibold text-base text-gray-800 mb-2">
                            {doc.title}
                        </h3>

                        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                            <p>{doc.date}</p>
                            <p>Posted by {doc.user}</p>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyDocument;