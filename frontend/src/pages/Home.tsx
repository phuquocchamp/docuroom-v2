import { Link } from 'react-router-dom';
import Category from '../components/Category';
import DocumentItems from '../components/DocumentItems';
function Home() {

  return (

    <div>
      {/* group */}
      <div className="relative w-full px-4">
        <div className="flex justify-end space-x-4 mb-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md">
            {/* Icon mũi tên trái (Heroicons hoặc Font Awesome) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md">
            {/* Icon mũi tên phải */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between space-x-4 mb-6 overflow-x-auto w-full px-8">
          {[
            { group: "Korean", color: "bg-blue-500", imgSrc: "/group/Korean.jpg" },
            { group: "Lập trình mạng", color: "bg-orange-500", imgSrc: "/group/LapTrinhMang.jpg" },
            { group: "English", color: "bg-green-500", imgSrc: "/group/English.jpg" },
            { group: "Trí Tuệ Nhân Tạo", color: "bg-yellow-500", imgSrc: "/group/AI.jpg" }
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} rounded-xl p-4 text-left flex items-center justify-center w-full max-w-xs shadow-lg`} // Sử dụng flex để bố trí ngang
            >
              <div className="flex items-center space-x-8">
                <div
                  className="w-20 h-20 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.imgSrc})` }}
                ></div>
                <div className="flex-1"> {/* Để phần văn bản và nút chiếm hết không gian còn lại */}
                  <h3 className="font-semibold text-white text-base">{item.group}</h3>
                  <p className="text-sm text-gray-200">35 people</p>
                  <button className="mt-2 bg-white text-blue-500  px-6 py-2 rounded-full shadow-md hover:bg-blue-100 transition-colors duration-200">Join</button> {/* Hiệu ứng hover cho nút */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="flex bg-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-9 gap-6 w-full h-full pl-8 pr-8 pt-6">

          {/* Left and Center Content (Categories and Documents) */}
          <div className="xl:col-span-7 overflow-y-auto">

            {/* Category Section */}
            <Category />

            {/* Document Section */}
            <DocumentItems />


          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-2 space-y-6 overflow-y-auto">
            {/* Your Group Section */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Your Group</h3>
                <a href="#" className="text-blue-600 text-sm">View all</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { group: "AI Group", imgSrc: "/group/AIGroup.png" },
                  { group: "Speaking Korean", imgSrc: "/group/speakingkorean.png" },
                  { group: "Learn Toeic", imgSrc: "/group/toeic.jpg" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img src={item.imgSrc} alt={item.group} className="w-16 h-16 rounded-full bg-cover bg-center" />
                    <p className="text-xs text-center">{item.group}</p>
                  </div>
                ))}
              </div>
            </div>





            {/* Recent Section */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Recent</h3>
                <a href="#" className="text-blue-600 text-sm">View all</a>
              </div>
              <div className="flex flex-col space-y-4">
                {[
                  { title: "Giáo trình lập trình mạng", date: "12/10/2023", user: "Khanh Linh", imgSrc: "/doc/GiaoTrinhLTM.png", id: 1 },
                  { title: "Bài tập giải tích", date: "12/10/2023", user: "Phu Quoc", imgSrc: "/doc/GiaiTich.jpg", id: 2 },
                ].map((doc) => (
                  <Link to={`/item-details/${doc.id}`} key={doc.id} className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <img src={doc.imgSrc} alt={doc.title} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h4 className="font-semibold text-text-base">{doc.title}</h4>
                      <p className="text-xs text-gray-500">{doc.date}</p>
                      <p className="text-xs text-gray-500">Posted by {doc.user}</p>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>


      </div>


    </div>
  )
}

export default Home