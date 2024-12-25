import { useState } from 'react';
import MyFolder from '../components/MyFolder';
import MyDocument from '../components/MyDocument';

interface Doc {
  title: string;
  date: string;
  user: string;
  imgSrc: string;
  id: number;
}

function Document(): JSX.Element {
  // State để quản lý trạng thái bookmark của các mục
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([]);

  // Hàm xử lý bookmark toggle
  const handleBookmarkToggle = (id: number): void => {
    setBookmarkedItems((prevBookmarks) => {
      if (prevBookmarks.includes(id)) {
        return prevBookmarks.filter((itemId) => itemId !== id);
      } else {
        return [...prevBookmarks, id];
      }
    });
  };

  const docs: Doc[] = [
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

  return (
      <div>
        <div className="flex bg-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-9 gap-6 w-full h-full pl-8 pr-8 pt-6">
            <div className="xl:col-span-7 overflow-y-auto">
              <MyFolder />
              <MyDocument />
            </div>

            <div className="xl:col-span-2 space-y-6 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Bookmark</h3>
                  <a href="#" className="text-blue-600 text-sm">
                    View all
                  </a>
                </div>
                <div className="flex flex-col space-y-4">
                  {/* Lọc ra các mục đã được bookmark */}
                  {docs
                      .filter((doc) => bookmarkedItems.includes(doc.id))
                      .map((doc) => (
                          <div
                              key={doc.id}
                              className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                          >
                            <img
                                src={doc.imgSrc}
                                alt={doc.title}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{doc.title}</h4>
                              <p className="text-xs text-gray-500">{doc.date}</p>
                              <p className="text-xs text-gray-500">
                                Posted by {doc.user}
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <button
                                  onClick={() => handleBookmarkToggle(doc.id)}
                                  className="text-blue-500 transition duration-200"
                              >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                >
                                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                      ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Recent</h3>
                  <a href="#" className="text-blue-600 text-sm">
                    View all
                  </a>
                </div>
                <div className="flex flex-col space-y-4">
                  {docs.map((doc) => (
                      <div
                          key={doc.id}
                          className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                      >
                        <img
                            src={doc.imgSrc}
                            alt={doc.title}
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="font-semibold">{doc.title}</h4>
                          <p className="text-xs text-gray-500">{doc.date}</p>
                          <p className="text-xs text-gray-500">
                            Posted by {doc.user}
                          </p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Document;