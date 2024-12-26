import { FolderRequest, FolderResponse } from "../types/folder";

const API_BASE_URL = "http://localhost:8080/v1/api/folder";

// Function to get headers with Authorization token
const getHeaders = (): Headers => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = localStorage.getItem("token");
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
};

export const createFolder = async (
    folderRequest: FolderRequest,
): Promise<FolderResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(folderRequest),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create folder");
        }

        return (await response.json()) as FolderResponse;
    } catch (error) {
        console.error("ERROR creating folder:", error);
        throw error;
    }
};

export const getFolderById = async (id: number): Promise<FolderResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "GET",
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch folder");
        }

        return (await response.json()) as FolderResponse;
    } catch (error) {
        console.error("ERROR fetching folder:", error);
        throw error;
    }
};

export const getAllFolders = async (): Promise<FolderResponse[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: "GET",
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch folders");
        }

        const data = await response.json();
        console.log("data in service:", data);
        return data.data as FolderResponse[];
    } catch (error) {
        console.error("ERROR fetching folders:", error);
        throw error;
    }
};

export const updateFolder = async (
    id: number,
    folderRequest: FolderRequest,
): Promise<FolderResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(folderRequest),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update folder");
        }

        return (await response.json()) as FolderResponse;
    } catch (error) {
        console.error("ERROR updating folder:", error);
        throw error;
    }
};

export const deleteFolder = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete folder");
        }
    } catch (error) {
        console.error("ERROR deleting folder:", error);
        throw error;
    }
};
