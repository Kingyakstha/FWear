import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: "none",
    menProduct: [
        {
            _id:1,
            productname: "Utility Cargo Shorts",
            description: "These cargo shorts come with multiple pockets and a relaxed fit—perfect for an outdoor adventure.",
            detail: "Ideal for hiking, travel, or casual streetwear. Crafted from durable cotton twill. Wear in spring and summer with a simple tee. Long-lasting and easy to wash. Category: Shorts.",
            availablesizes: ["M", "L", "XL", "XXL"],
            gender: "women",
            price: 49.99,
            stock: 525,
            category: "Shorts",
            materials: ["Cotton"]
          },
    ],
    womenProduct:[
        {
            _id:1,
            productname: "Utility Cargo Shorts",
            description: "These cargo shorts come with multiple pockets and a relaxed fit—perfect for an outdoor adventure.",
            detail: "Ideal for hiking, travel, or casual streetwear. Crafted from durable cotton twill. Wear in spring and summer with a simple tee. Long-lasting and easy to wash. Category: Shorts.",
            availablesizes: ["M", "L", "XL", "XXL"],
            gender: "women",
            price: 49.99,
            stock: 525,
            category: "Shorts",
            materials: ["Cotton"]
          },

    ],
    kidsProduct:[
        {
            _id:1,
            productname: "Utility Cargo Shorts",
            description: "These cargo shorts come with multiple pockets and a relaxed fit—perfect for an outdoor adventure.",
            detail: "Ideal for hiking, travel, or casual streetwear. Crafted from durable cotton twill. Wear in spring and summer with a simple tee. Long-lasting and easy to wash. Category: Shorts.",
            availablesizes: ["M", "L", "XL", "XXL"],
            gender: "women",
            price: 49.99,
            stock: 525,
            category: "Shorts",
            materials: ["Cotton"]
          },
    ],
    savedProduct :["1"]
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addMenProduct: (state,action) => {
            state.menProduct.pop()
            action.payload.map(items=>state.menProduct.push(items))
            state.product="men";
        },
        addWomenProduct: (state,action) => {
            state.womenProduct.pop()
            action.payload.map(items=>state.womenProduct.push(items))
            state.product="women";

        },
        addKidsProduct: (state,action) => {
            state.kidsProduct.pop()
            action.payload.map(items=>state.kidsProduct.push(items))
            state.product="kids";
        },
        addSavedProduct:(state,action)=>{
            // console.log("save payload is ",action.payload)
            action.payload.map(items=>state.savedProduct.push(items.productid))
        },
        removeSavedProduct:(state,action)=>{
            // console.log("total saved before ",state.savedProduct.length,"   ",action.payload[0],"     ",state.savedProduct)
            state.savedProduct=state.savedProduct.filter(items=>items !== action.payload[0])
            // console.log("total saved after ",state.savedProduct.length,"     ",state.savedProduct.map(items=>{console.log(items)}))

        }
    },
});
export const { addMenProduct,addWomenProduct,addKidsProduct,addSavedProduct,removeSavedProduct } = productSlice.actions;

export default productSlice.reducer;
