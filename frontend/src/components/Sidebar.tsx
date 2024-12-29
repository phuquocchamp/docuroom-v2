import {IoDocumentTextOutline, IoHomeOutline, IoSettingsOutline,} from "react-icons/io5";
import {HiOutlineUserGroup} from "react-icons/hi2";
import {FiHelpCircle} from "react-icons/fi";
import {VscAccount} from "react-icons/vsc";
import {Link, useLocation} from "react-router-dom";
import {ReactElement, useEffect, useState} from "react";

interface SidebarLink {
    id: number;
    path: string;
    name: string;
    icon: ReactElement;
}

// Enum for paths
const AppRoutes = {
    Home: "/home",
    Document: "/document",
    StudyGroup: "/study-group",
    Account: "/my-account",
    Setting: "/setting",
    Help: "/help",
};

const SIDEBAR_LINKS: SidebarLink[] = [
    { id: 1, path: AppRoutes.Home, name: "Home", icon: <IoHomeOutline /> },
    {
        id: 2,
        path: AppRoutes.Document,
        name: "Document",
        icon: <IoDocumentTextOutline />,
    },
    {
        id: 3,
        path: AppRoutes.StudyGroup,
        name: "StudyGroup",
        icon: <HiOutlineUserGroup />,
    },
    { id: 4, path: AppRoutes.Account, name: "Account", icon: <VscAccount /> },
    {
        id: 5,
        path: AppRoutes.Setting,
        name: "Setting",
        icon: <IoSettingsOutline />,
    },
    { id: 6, path: AppRoutes.Help, name: "Help", icon: <FiHelpCircle /> },
];

function Sidebar(): JSX.Element {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState<number>(1);

    useEffect(() => {
        // Find the link that matches the current path and update activeLink
        const currentLink = SIDEBAR_LINKS.find(
            (link) => link.path === location.pathname,
        );
        if (currentLink) {
            setActiveLink(currentLink.id);
        }
    }, [location]);

    // Refactored class names
    const linkClass = (id: number) =>
        `flex items-center font-medium rounded-md py-2 px-5 hover:bg-primary-blue hover:text-white ${
            activeLink === id ? "bg-primary-blue text-white" : ""
        }`;
    const textClass = (id: number) =>
        `text-sm hidden md:flex ${
            activeLink === id ? "text-white" : "text-gray-500"
        } hover:text-white`;

    const handleUpgrade = () => {
        // Handle upgrade logic here
        console.log("Upgrade to PRO clicked!");
    };

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
                    <li key={link.id} className={linkClass(link.id)}>
                        <Link
                            to={link.path}
                            className="flex justify-center md:justify-start items-center md:space-x-5"
                        >
                            <span>{link.icon}</span>
                            <span className={textClass(link.id)}>
                                {link.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="w-11/12 mx-auto absolute bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-4 cursor-pointer text-center bg-gradient-to-r from-pink-300 to-blue-500 rounded-lg shadow-lg">
                <p className="text-white text-xs font-normal mb-3">
                    Upgrade to PRO to get access to all Features!
                </p>
                <button
                    onClick={handleUpgrade}
                    className="bg-white text-blue-500 text-sm font-semibold py-1.5 px-5 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
                >
                    Get Pro Now!
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
