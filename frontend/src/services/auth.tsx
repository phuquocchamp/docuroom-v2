import { RegisterCredentials, LoginCredentials } from "../types/auth";

const API_BASE_URL = "http://localhost:8080/v1/api/auth";

export const register = async (
    credentials: RegisterCredentials,
): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(credentials),
            credentials: "include",
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

export const login = async (
    credentials: LoginCredentials,
): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.data.token; // Adjust according to your API response

            if (token) {
                localStorage.setItem("token", token); // Store token in localStorage
                return true;
            } else {
                throw new Error("Token not found in response");
            }
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "USER LOG IN UNSUCCESSFULLY");
        }
    } catch (error) {
        console.error("ERROR:", error);
        return false;
    }
};

export const logout = (): void => {
    localStorage.removeItem("token");
};
