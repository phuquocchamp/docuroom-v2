import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {logout} from "../services/auth.tsx";

interface UserData {
    fullName: string;
    email: string;
    school: string;
}

interface UserProfileProps {
    userData: UserData;
}

function UserProfile({ userData }: UserProfileProps): JSX.Element {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        const success = await logout(); // Await the logout promise
        if (success) {
            console.log("Logged out successfully");
            navigate("/");
        } else {
            console.error("Logout failed");
        }
    };

    return (
        <div className="relative flex items-center space-x-2">
            <img
                src="/profile/avatar1.png"
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
                onClick={toggleDropdown} // Mở dropdown khi click vào avatar
            />
            <div>
                <p className="font-semibold">{userData.fullName}</p>
                <p className="text-xs text-gray-500">{userData.school}</p>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-24 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out"
                        onClick={handleLogout}
                    >
                        <AiOutlineLogout className="mr-2" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
