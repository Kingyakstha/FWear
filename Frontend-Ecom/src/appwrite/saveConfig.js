import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL+"/saves";

async function saveProduct(productid) {
    try {
        const response = await axios.post(
            `${baseURL}/save-product/${productid}`,
            {},
            {
                withCredentials: true,
            }
        );
        if (response) return true;
        else return false;
    } catch (error) {
        console.log("Error occured while saving :: ", error);
    }
}

async function unsaveProduct(productid) {
    try {
        const response = await axios.post(
            `${baseURL}/unsave-product/${productid}`,
            {},
            {
                withCredentials: true,
            }
        );
        if (response) {
            // console.log("response after unsaving", response);
            return true;
        } else return false;
    } catch (error) {
        console.log("Error occured while unsaving :: ", error);
    }
}

async function getSavedProduct() {
    try {
        const response = await axios.get(`${baseURL}/get-save`, {
            withCredentials: true,
        });
        if (response) return response.data;
        else return null;
    } catch (error) {
        console.log("Error occured while getting saved product :: ", error);
    }
}

export { saveProduct, unsaveProduct, getSavedProduct };
