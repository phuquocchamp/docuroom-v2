import React from "react";

interface Email {
  address: string;
  addedAgo: string;
}

interface User {
  fullName: string;
  university: string;
  emailAddresses: Email[];
}

const Account: React.FC = () => {
  const user: User = {
    fullName: "Khanh Linh",
    university: "VKU University",
    emailAddresses: [
      { address: "klnhtruong04@gmail.com", addedAgo: "1 month ago" },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-12"> {/* Adjusted margin-top */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-blue-400 to-pink-400 p-8 text-center">
          <button className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Edit
          </button>
          <img
            src="/profile/avatar1.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white cursor-pointer mx-auto"
          />
          <h2 className="text-2xl font-semibold mt-4 text-white">{user.fullName}</h2>
          <p className="text-sm text-gray-200">{user.university}</p>
        </div>
        <div className="p-8">
          <div className="mb-6">
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={user.fullName}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="university"
              className="block text-sm font-medium text-gray-700"
            >
              University
            </label>
            <select
              id="university"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value={user.university}>{user.university}</option>
              {/* Add more university options */}
            </select>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              My Email Address
            </h3>
            <div className="space-y-4">
              {user.emailAddresses.map((email, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border border-gray-300 rounded-md p-4 bg-gray-50"
                >
                  <span className="text-sm text-gray-700">{email.address}</span>
                  <span className="text-sm text-gray-500">{email.addedAgo}</span>
                </div>
              ))}
              <button className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 mt-4">
                + Add Email Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
