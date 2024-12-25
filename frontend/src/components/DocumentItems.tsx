import { Link } from 'react-router-dom'

function DocumentItems() {
  return (
    <div>
      {/* Document Section */}
      <h2 className="font-semibold text-lg mb-4">Document</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Giáo trình lập trình mạng", date: "12/10/2023", user: "Khanh Linh", imgSrc: "/doc/GiaoTrinhLTM.png", id: 1 },
          { title: "Bài tập giải tích", date: "12/10/2023", user: "Phu Quoc", imgSrc: "/doc/GiaiTich.jpg", id: 2 },
          { title: "Đề Thi tiếng Hàn", date: "12/10/2023", user: "Khanh Linh", imgSrc: "/doc/Korean.jpg", id: 3 },
          { title: "Tổng hợp ngữ pháp tiếng Anh cơ bản", date: "12/10/2023", user: "Phu Quoc", imgSrc: "/doc/TiengAnh.jpg", id: 4 },
        ].map((doc, index) => (
          <Link key={index} to={`/item-details/${doc.id}`} className="bg-white rounded-lg shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out">
            {/* Image Placeholder */}
            <img src={doc.imgSrc} alt={doc.title} className="h-32 w-full object-cover rounded-md mb-4" />

            {/* Document Title */}
            <h3 className="font-semibold text-base text-gray-800 mb-2">{doc.title}</h3>

            {/* Document Details */}
            <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
              <p>{doc.date}</p>
              <p>Posted by {doc.user}</p>
            </div>

            {/* Bookmark Icon */}
            <div className="flex justify-end">
              <button className="text-gray-600 hover:text-blue-500 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16z"></path>
                </svg>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DocumentItems;
