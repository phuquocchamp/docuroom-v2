import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { LiaFileDownloadSolid } from "react-icons/lia";

const DocDetails = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [viewPdf, setViewPdf] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (pdfUrl.trim() !== "") {
      try {
        const response = await fetch(pdfUrl, { method: "HEAD" });
        if (!response.ok) throw new Error("Unable to fetch the PDF file.");
        setViewPdf(pdfUrl);
      } catch (err) {
        setError("Failed to fetch the PDF. Please check the URL or server settings.");
      }
    } else {
      setViewPdf(null);
    }
  };

  const newPlugin = defaultLayoutPlugin();

  return (
    <div className="ml-8 mr-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: PDF Viewer (3/4 width) */}
        <div className="col-span-1 lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              Nhập URL của tệp PDF:
            </label>
            <input
              type="url"
              placeholder="Dán liên kết URL của tệp PDF ở đây"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Hiển thị PDF
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Trình Xem PDF</h2>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-inner">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                {viewPdf ? (
                  <Viewer fileUrl={viewPdf} plugins={[newPlugin]} />
                ) : (
                  <p className="text-center text-gray-500">Chưa có PDF được chọn</p>
                )}
              </Worker>
            </div>
          </div>
        </div>

        {/* Right Side: Document Information (1/4 width) */}
        <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Giáo trình Vi Điều Khiển</h1>
          <p className="text-gray-600 mb-4">Tài liệu tham khảo môn kỹ thuật vi điều khiển</p>
          <div className="mb-4">
            <p>
              <span className="font-semibold">Category: </span>Book
            </p>
            <div className="relative flex items-center space-x-2 pt-4">
              <img
                src="/profile/avatar1.png"
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"

              />
              <div>
                <p className="font-semibold">KhanhLinh</p>
                <p className="text-xs text-gray-500">VKU University</p>
              </div>
            </div>

           
          </div>
          <div className="mb-4">
            <p>
              <span className="font-semibold">Upload: </span>20/10/2024
            </p>
          </div>
          
          <div className="flex items-center justify-center">
  <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 space-x-2">
    <LiaFileDownloadSolid className="w-5 h-5" />
    <span>Download</span>
  </button>
</div>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Comments</h2>
            <div className="space-y-4">
              {/* Add Comment Input */}
              <div className="flex items-center space-x-4">
              <img
                src="/profile/avatar1.png"
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"

              />
                <textarea
                  rows="1"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder=""
                ></textarea>
                <button className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                  Comment
                </button>
              </div>

              {/* Existing Comments */}
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">KhanhLinh</p>
                  <p className="text-gray-600">Thanks for sharing!</p>
                  <p className="text-sm text-gray-400">2 min ago</p>
                </div>
                <div>
                  <p className="font-semibold">PhuQuoc</p>
                  <p className="text-gray-600">Thank you for writing and sharing!</p>
                  <p className="text-sm text-gray-400">5 min ago</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocDetails;
