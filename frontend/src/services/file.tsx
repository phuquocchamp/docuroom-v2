import { FileUploadResponse } from "../types/file";

const API_BASE_URL = "http://localhost:8080/v1/api/file";

const getHeaders = (): Headers => {
    const headers = new Headers();
    const token = localStorage.getItem("token");
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
};

export const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: getHeaders(),
        body: formData,
    });

    if (response.ok) {
        return response.json().then((data) => data.data);
    } else {
        throw new Error("Failed to upload file");
    }
};
