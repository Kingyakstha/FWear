import axios from "axios";

const baseURL = "http://localhost:8000/api/v1/reviews";

async function addReview(productid, data) {
    try {
        const response = await axios.post(
            `${baseURL}/add-review/${productid}`,
            data,
            {
                withCredentials: true,
            }
        );

        if (response) return true;
        else return false;
    } catch (error) {
        console.log("Error while adding review ::", error);
    }
}

async function changeReview(reviewid, data) {
    try {
        const response = await axios.post(
            `${baseURL}/change-review/${reviewid}`,
            data,
            {
                withCredentials: true,
            }
        );

        if (response) return true;
        else return false;
    } catch (error) {
        console.log("Error while changing review ::", error);
    }
}

async function removeReview(reviewid) {
    try {
        const response = await axios.post(
            `${baseURL}/remove-review/${reviewid}`,
            {},
            {
                withCredentials: true,
            }
        );

        if (response) return true;
        else return false;
    } catch (error) {
        console.log("Error while removing review ::", error);
    }
}

async function getReview(productid) {
    try {
        const response = await axios.get(`${baseURL}/get-review/${productid}`);

        if (response) return response.data.data;
        else return false;
    } catch (error) {
        console.log("Error while geting reviews ::", error);
    }
}

export { addReview, removeReview, changeReview, getReview };
