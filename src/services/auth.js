import { SERVER_URL } from "../utils/constants";
import axios from 'axios'

export const register = async ({ name, email, password, confirmPassword }) => {
    try {
        const response = await axios.post(`${SERVER_URL}/user/signup`, {
            name,
            email,
            password,
            confirmPassword,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);

        console.log('User signed up successfully');
        return response;

    } catch (error) {
        console.log(error.message);
        return new Error(error.response.data.message);
    }
};

export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(`${SERVER_URL}/user/login`, {
            email,
            password,
        })

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);

        console.log('user logged in successfully');
        return response;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.response.data.message);
    }
}

export const updateUser = async (personalInfo) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${SERVER_URL}/user/updateUser`, 
            {
                name: personalInfo.name,
                updatedEmail: personalInfo.updatedEmail,
                oldPassword: personalInfo.oldPassword,
                newPassword: personalInfo.newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        if (response.data.name) {
            localStorage.setItem("user", response.data.name);
        }

        console.log('User updated successfully');
        return response;
    } catch (error) {
        console.error("Error updating user:", error); 
        throw new Error(error.response?.data?.message || "An error occurred while updating user information.");
    }
};