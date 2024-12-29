import { LocalizationMap, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import en_US from "@react-pdf-viewer/locales/lib/en_US.json";
import { useParams } from "react-router-dom";
import { DocumentResponse } from "../types/document";
import { useEffect, useState } from "react";
import {
    createComment,
    getCommentsByFolderAndDocumentId,
    getDocumentById,
} from "../services/document";
import { CommentResponse } from "../types/comment";

interface UserData {
    fullName: string;
    email: string;
    school: string;
}

const DocumentDetail = () => {
    const { id } = useParams();
    const [document, setDocument] = useState<DocumentResponse | null>(null);
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [userData, setUserData] = useState<UserData>({
        fullName: "",
        email: "",
        school: "",
    });

    const [newComment, setNewComment] = useState<string>("");

    useEffect(() => {
        const fullName = localStorage.getItem("docuroom_fullName");
        const email = localStorage.getItem("docuroom_email");
        const school = localStorage.getItem("docuroom_school");

        if (fullName && email && school) {
            setUserData({
                fullName: fullName,
                email: email,
                school: school,
            });
        }
    }, []);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await getDocumentById(Number(id));
                setDocument(response);
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        fetchDocument();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            if (document) {
                try {
                    const fetchedComments =
                        await getCommentsByFolderAndDocumentId(
                            document.folder,
                            Number(id),
                        );
                    setComments(fetchedComments);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                }
            }
        };
        fetchComments();
    }, [document, id]);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    if (!document) {
        return <div>Loading...</div>; // Or a more elaborate loading indicator
    }

    const handleCommentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (document && newComment.trim() !== "") {
            try {
                const createdComment = await createComment(
                    document.folder,
                    Number(id),
                    newComment,
                );
                setComments([createdComment, ...comments]); // Update comments state with the new comment
                setNewComment(""); // Clear the input field
            } catch (error) {
                console.error("Error creating comment:", error);
            }
        }
    };

    // @ts-ignore
    return (
        <div className="ml-8 mr-8">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Side: PDF Viewer (3/4 width) */}
                <div className="col-span-1 lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
                    <Viewer
                        fileUrl={document.url}
                        localization={en_US as unknown as LocalizationMap}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </div>

                {/* Right Side: Document Information (1/4 width) */}
                <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        {document.name}
                    </h1>
                    <p className="text-gray-600 mb-4">{document.description}</p>
                    <div className="mb-4">
                        <p>
                            <span className="font-semibold">Folder: </span>
                            {document.folder}
                        </p>
                        <div className="relative flex items-center space-x-2 pt-4">
                            <img
                                src="/profile/avatar1.png"
                                alt="Avatar"
                                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
                            />
                            <div>
                                <p className="font-semibold">
                                    {userData.fullName}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {userData.school}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p>
                            <span className="font-semibold">Upload: </span>
                            {document.createdAt}
                        </p>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Comments
                        </h2>
                        <div className="space-y-4">
                            {/* Add Comment Input */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src="/profile/avatar1.png"
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
                                />
                                <textarea
                                    rows={1}
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder=""
                                    value={newComment}
                                    onChange={handleCommentChange}
                                ></textarea>

                                <button
                                    onClick={handleCommentSubmit}
                                    className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                >
                                    Comment
                                </button>
                            </div>

                            {/* Existing Comments */}
                            <div className="space-y-2">
                                {comments.map((comment) => (
                                    <div key={comment.id}>
                                        <p className="font-semibold">
                                            {comment.user}
                                        </p>
                                        <p className="text-gray-600">
                                            {comment.message}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {comment.createdAt}
                                        </p>
                                    </div>
                                ))}
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

export default DocumentDetail;
