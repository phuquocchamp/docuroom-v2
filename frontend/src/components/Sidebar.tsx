import {
    IoDocumentTextOutline,
    IoSettingsOutline,
    IoHomeOutline,
} from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { FiHelpCircle } from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface SidebarLink {
    id: number;
    path: string;
    name: string;
    icon: JSX.Element;
}

function Sidebar(): JSX.Element {
    const [activeLink, setActiveLink] = useState<number>(1);

    const handleLinkClick = (id: number): void => {
        setActiveLink(id);
    };

    const SIDEBAR_LINKS: SidebarLink[] = [
        { id: 1, path: '/home', name: 'Home', icon: <IoHomeOutline /> },
        {
            id: 2,
            path: '/home/document',
            name: 'Document',
            icon: <IoDocumentTextOutline />,
        },
        {
            id: 3,
            path: '/home/studygroup',
            name: 'StudyGroup',
            icon: <HiOutlineUserGroup />,
        },
        { id: 4, path: '/home/myaccount', name: 'Account', icon: <VscAccount /> },
        { id: 5, path: '/home/setting', name: 'Setting', icon: <IoSettingsOutline /> },
        { id: 6, path: '/home/help', name: 'Help', icon: <FiHelpCircle /> },
    ];

    return (
        <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white">
            <div className="mb-8 items-center pl-2">
                <img
                    src="/logodocuroom.png"
                    alt="logo"
                    className="w-[150px] hidden md:flex"
                />
                <img
                    src="/minilogo.png"
                    alt="minilogo"
                    className="w-12 flex md:hidden"
                />
            </div>

            <ul className="mt-6 space-y-6">
                {SIDEBAR_LINKS.map((link) => (
                    <li
                        key={link.id}
                        className={`font-medium rounded-md py-2 px-5 hover:bg-primary-blue hover:text-white 
              ${activeLink === link.id ? 'bg-primary-blue text-white' : ''}`}
                    >
                        <Link
                            to={link.path}
                            className="flex justify-center md:justify-start items-center md:space-x-5"
                            onClick={() => handleLinkClick(link.id)}
                        >
                            <span>{link.icon}</span>
                            <span
                                className={`text-sm hidden md:flex ${
                                    activeLink === link.id ? 'text-white' : 'text-gray-500'
                                } hover:text-white`}
                            >
                {link.name}
              </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="w-11/12 mx-auto absolute bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-4 cursor-pointer text-center bg-gradient-to-r from-pink-300 to-blue-500 rounded-lg shadow-lg hidden md:block">
                <p className="text-white text-xs font-normal mb-3">
                    Upgrade to PRO to get access to all Features!
                </p>
                <button className="bg-white text-blue-500 text-sm font-semibold py-1.5 px-5 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
                    Get Pro Now!
                </button>
            </div>
        </div>
    );
}

export default Sidebar;