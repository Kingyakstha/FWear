import React, { useEffect, useState } from "react";
import data_product from "./Assets/data";
import Items from "./Items";
import { getGenderBasedProduct } from "../appwrite/productConfig";
import { getImages } from "../appwrite/imagencolorConfig";
import { useSelector } from "react-redux";

function Popular() {
    // const [product, setProduct]=useState()
    const product= useSelector((state)=>state.product.womenProduct).slice(1,5)
    // const product=products.slice(1,5)
    const savedItems= useSelector(state=>state.product.savedProduct)
    // console.log("Product ",product,"saved is", savedItems)

    return (
        <div className="w-screen flex flex-col items-center gap-2 ">
            <h1 className="text-[#171717] text-2xl font-mono">
                POPULAR IN WOMEN
            </h1>
            <hr className="w-52 h-2 bg-[#252525] rounded-full"></hr>
            <div className="flex flex-row flex-wrap gap-8 justify-evenly">
                {product && product.map((items, i) => (
                    <Items
                    key={items.productname+i}
                    id={items._id}
                    name={items.productname}
                    description={items.description}
                    image={items.image}
                    new_price={ items.price - 0.15 * items.price }
                    old_price={items.price}
                    label="Popular"
                    saved={ savedItems.includes(items._id)}
                />
                ))}
            </div>
        </div>
    );
}

export default Popular;
