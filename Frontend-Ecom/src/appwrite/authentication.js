import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
// console.log(baseURL)

// Configure axios defaults
axios.defaults.withCredentials = true;

async function userLogin(data) {
    try {
        console.log("Attempting login to:", `${baseURL}/users/login`);
        const response = await axios.post(`${baseURL}/users/login`, data);
        console.log("Login response:", response);
        return response;
    } catch (error) {
        console.error("Login error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

async function userSignin(formData) {
    try {
        console.log("Attempting signup to:", `${baseURL}/users/register`);
        const response = await axios.post(
            `${baseURL}/users/register`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        if (response) {
            // console.log("Successfully signed in ", response);
            return response;
        } else return null;
    } catch (error) {
        console.error("Signup error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

async function userLogout() {
    try {
        console.log("Attempting logout to:", `${baseURL}/users/logout`);
        const response = await axios.get(`${baseURL}/users/logout`);
        console.log("Logout response:", response);
        return response;
    } catch (error) {
        console.error("Logout error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

async function getCurrentUser() {
    try {
        const response = await axios.get(`${baseURL}/users/get-currentuser`, {
            withCredentials: true,
        });
        if (response) {
            // console.log("Successfully obtained current user ", response);
            return response.data.data;
        } else return null;
    } catch (error) {
        console.log("Error occured while getting user ::", error);
    }
}

async function changePassword(data) {
    try {
        const response = await axios.patch(`${baseURL}/change-password`, data, {
            withCredentials: true,
        });

        if (response) {
            // console.log("Successfully changed password ", response);
            return true;
        } else return false;
    } catch (error) {
        console.log("Error occured while changing password ::", error);
    }
}

async function changeAvatar(formData) {
    try {
        const response = await axios.patch(
            `${baseURL}/change-avatar`,
            formData,
            {
                withCredentials: true,
            }
        );

        if (response) {
            // console.log("Successfully changed password ", response);
            return true;
        } else return false;
    } catch (error) {
        console.log("Error occured while changing avatar ::", error);
    }
}

export {
    userLogin,
    userSignin,
    userLogout,
    getCurrentUser,
    changeAvatar,
    changePassword,
};
