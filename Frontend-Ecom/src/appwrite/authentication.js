import axios from "axios";

const baseURL = "http://localhost:8000/api/v1";

async function userLogin(data) {
    try {
        const response = await axios.post(`${baseURL}/users/login`, data, {
            withCredentials: true,
        });
        if (response) {
            console.log("Successfully logged in ", response.data.data?.user);
            return response;
        } else return null;
    } catch (error) {
        console.log("Error occured while logging in ::", error);
    }
}

async function userSignin(formData) {
    try {
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
            console.log("Successfully signed in ", response);
            return response;
        } else return null;
    } catch (error) {
        console.log("Error occured while signing in ::", error);
    }
}

async function userLogout() {
    try {
        const response = await axios.get(`${baseURL}/users/logout`, {
            withCredentials: true,
        });
        if (response) {
            console.log("Successfully logged out ", response);
            return response;
        } else return null;
    } catch (error) {
        console.log("Error occured while logging out ::", error);
    }
}

async function getCurrentUser() {
    try {
        const response = await axios.get(`${baseURL}/users/get-currentuser`, {
            withCredentials: true,
        });
        if (response) {
            console.log("Successfully obtained current user ", response);
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
            console.log("Successfully changed password ", response);
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
            console.log("Successfully changed password ", response);
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
