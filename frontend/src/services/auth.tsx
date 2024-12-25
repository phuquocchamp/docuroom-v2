import { RegisterCredentials, LoginCredentials } from '../types/auth';

const API_BASE_URL = "http://localhost:8080/v1/api/auth";

export const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || ""
            }),
            body: JSON.stringify(credentials),
            credentials: "include"
        });
        if (response.ok) {
            return true;
        } else {
            console.error("USER REGISTER UNSUCCESSFULLY");
            return false;
        }
    } catch (error) {
        console.error("ERROR", error);
        return false;
    }
};

export const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || "",
            }),
            body: JSON.stringify({
                email: credentials.email || "",
                password: credentials.password || "",
            }),
            credentials: 'include',
        });

        console.log(response);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const token = data.data.token;
            return !!token;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'USER LOG IN UNSUCCESSFULLY');
        }
    } catch (error) {
        console.error('ERROR:', error);
        return false;
    }
};
const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
};