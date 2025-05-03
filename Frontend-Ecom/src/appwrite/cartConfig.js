import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL+"/carts";

async function addtoCart(productId, data) {
    try {
        const response = await axios.post(
            `${baseURL}/add-cart/${productId}`,
            data,
            {
                withCredentials: true,
            }
        );

        if (response) {
            return true;
        } else return false;
    } catch (error) {
        console.log("Error occured while adding product in cart :: ", error);
    }
}

async function removefromCart(cartId) {
    try {
        const response = await axios.get(`${baseURL}/remove-cart/${cartId}`);

        if (response) {
            return true;
        } else return false;
    } catch (error) {
        console.log(
            "Error occured while removing product from cart :: ",
            error
        );
    }
}

async function getCartItems() {
    try {
        const response = await axios.get(`${baseURL}/get-cartitem`, {
            withCredentials: true,
        });

        if (response) {
            return response.data.data;
        } else return null;
    } catch (error) {
        console.log("Error occured while getting product from cart :: ", error);
    }
}

export { addtoCart, removefromCart, getCartItems };
