import { CommentResponse } from "../types/comment";
import { DocumentRequest, DocumentResponse } from "../types/document";

const API_BASE_URL = "http://localhost:8080/v1/api/document";

const getHeaders = (): Headers => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = localStorage.getItem("token");
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
};

export const getDocumentsByUser = async (): Promise<DocumentResponse[]> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (response.ok) {
        return response.json().then((data) => data.data);
    } else {
        throw new Error("Failed to fetch documents");
    }
};

export const getDocumentById = async (
    id: number,
): Promise<DocumentResponse> => {
    const response = await fetch(`${API_BASE_URL}/id/${id}`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (response.ok) {
        return response.json().then((data) => data.data);
    } else {
        throw new Error("Failed to fetch documents");
    }
};

export const getCommentsByFolderAndDocumentId = async (
    folder: string,
    documentId: number,
): Promise<CommentResponse[]> => {
    const response = await fetch(
        `${API_BASE_URL}/${folder}/${documentId}/comments`,
        {
            method: "GET",
            headers: getHeaders(),
        },
    );

    if (response.ok) {
        return response.json().then((data) => data.data);
    } else {
        throw new Error("Failed to fetch comments");
    }
};

export const createComment = async (
    folder: string,
    documentId: number,
    message: string,
): Promise<CommentResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/${folder}/${documentId}/comments`,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ message }),
        },
    );

    if (response.ok) {
        return response.json().then((data) => data.data);
    } else {
        throw new Error("Failed to create comment");
    }
};

export const createDocument = async (
    documentRequest: DocumentRequest,
): Promise<DocumentResponse> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(documentRequest),
    });

    if (response.ok) {
        return response.json().then((data) => data.data);
    } else {
        throw new Error("Failed to create document");
    }
};
