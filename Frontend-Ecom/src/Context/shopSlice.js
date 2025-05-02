import { createSlice, nanoid } from "@reduxjs/toolkit";
import all_product from "../Components/Assets/all_product";

const initialState = {
    product: { all_product },
    cart: [
        {
            image: "/src/Components/Assets/product_11.png",
            name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
            price: 85,
            size: "S",
            quantity: 1,
        },
    ],
};

export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let b = 0;
            state.cart.map((cart_item) => {
                if (
                    cart_item.name == action.payload.name &&
                    cart_item.size == action.payload.size
                ) {
                    cart_item.quantity += 1;
                    b = 1;
                }
            });
            let item = {
                image: action.payload.image,
                name: action.payload.name,
                price: action.payload.price,
                size: action.payload.size,
                quantity: action.payload.quantity,
            };
            if (b == 0) state.cart.push(item);
            // console.log('hi',item)
            // console.log(state.cart.length)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (cart) =>
                    cart.name !== action.payload.name &&
                    cart.size !== action.payload.size
            );
            // console.log("payload has ", action.payload);
        },
    },
});

// export {reducers...}=shopSlice.actions
export const { addToCart, removeFromCart } = shopSlice.actions;
export default shopSlice.reducer;
