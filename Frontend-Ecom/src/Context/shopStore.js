import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice";
import authReducer from "./authSlice";
import  productReducer  from "./productSlice";

export const shopStore = configureStore({
    reducer: {
        shop: shopReducer,
        auth: authReducer,
        product: productReducer
    },
});
