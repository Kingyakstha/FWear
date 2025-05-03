import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL+"/products";


async function addProduct(data) {
    try {
        const response = await axios.post(`${baseURL}/add-product`, data);
        if (response) {
            return response.data;
        } else return null;
    } catch (error) {
        console.log("Error occured while adding product :: ", error);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await axios.post(
            `${baseURL}/delete-product/${productId}`
        );
        if (response) {
            return response.data;
        } else return null;
    } catch (error) {
        console.log("Error occured while adding product :: ", error);
    }
}

async function editProduct(productId, data) {
    try {
        const response = await axios.patch(
            `${baseURL}/add-product/${productId}`,
            data
        );
        if (response) {
            return response.data;
        } else return null;
    } catch (error) {
        console.log("Error occured while adding product :: ", error);
    }
}

async function getProduct(productId) {
    try {
        const response = await axios.get(`${baseURL}/get-product/${productId}`);
        if (response) {
            return response.data;
        } else return null;
    } catch (error) {
        console.log("Error occured while getting product details :: ", error);
    }
}

async function getGenderBasedProduct(gender) {
    try {
        const response = await axios.get(
            `${baseURL}/get-product-gender/${gender}`
        );
        if (response) {
            // console.log("response from the pc is ", response.data.data);
            return response.data.data;
        } else return null;
    } catch (error) {
        console.log(
            "Error occured while getting product based on gender :: ",
            error
        );
    }
}

async function getCategoryBasedProduct(category) {
    try {
        const response = await axios.get(
            `${baseURL}/get-product-category/${category}`
        );
        if (response) {
            return response.data;
        } else return null;
    } catch (error) {
        console.log(
            "Error occured while getting product based on category :: ",
            error
        );
    }
}

export {
    addProduct,
    deleteProduct,
    editProduct,
    getProduct,
    getCategoryBasedProduct,
    getGenderBasedProduct,
};
