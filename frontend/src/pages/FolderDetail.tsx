import {useState} from 'react';
import {HiOutlineDocumentArrowUp} from 'react-icons/hi2';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {Link, useNavigate} from 'react-router-dom'

interface Document {
    title: string;
    date: string;
    user: string;
    imgSrc: string;
    id: number;
}

const FolderCard = () => {
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
    <div className="p-8">
    <div className="w-full pl-8 pr-8 bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Icon and folder name */}
        <div className="bg-blue-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75v10.5a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25V9a2.25 2.25 0 00-2.25-2.25H10.5l-1.5-1.5H6a2.25 2.25 0 00-2.25 2.25z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Software Technology</h3>
          <p className="text-sm text-gray-500">5 documents</p>
        </div>
      </div>
  
      {/* Created by section - Avatar on the right */}
      <div className="flex items-center space-x-2">
        <img
          src="/profile/avatar1.png"
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">Khanh Linh</p>
          <p className="text-xs text-gray-500">VKU University</p>
        </div>
      </div>
    </div>
  
    {/* Upload Document Button */}
    <div className="flex justify-start mt-4 w-full">
      <button
      onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 shadow-md text-white font-medium rounded-full hover:bg-blue-600 transition"
      >
        <HiOutlineDocumentArrowUp className="text-xl" />
        Upload Document
      </button>
    </div>
  
    {/* Section for Upload button and documents */}
    <div className="w-full pl-8 pr-8 mt-4">
      <div>
        <div>
          <div className="flex items-center justify-between p-4">
            <h2 className="font-semibold text-lg">My Document</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {documents.map((doc) => (
              <Link
                key={doc.id} to={`/item-details/${doc.id}`}
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default FolderCard;
