import React, { useState } from "react";
import { Link } from "react-router-dom";
// import dbService from '../appwrite/config'
import { FaHeart } from "react-icons/fa";
import { saveProduct, unsaveProduct } from "../appwrite/saveConfig";

function Items(props) {
    // console.log("Key of this item is ", props);
    const [product, setProduct] = useState(props);
    const [save, setSave] = useState(product.saved);
    // console.log("saved while passing props", props.saved," name ",props.name)

    const saveThis = async () => {
        if (!save) {
            setSave(true);
            const response = await saveProduct(product.id);
            if (response) setProduct({ ...product, saved: true });
            else setSave(false);
        } else {
            setSave(false);
            const response = await unsaveProduct(product.id);
            if (response) setProduct({ ...product, saved: false });
            else setSave(true);
        }
    };

    function upperCase(str) {
        if (typeof str !== "string" || str.length == 0) {
            return null;
        } else {
            return str.charAt(0).toUpperCase() + str.substring(1);
        }
    }
    // console.log("saved in the usestate", save,"name ", props.name)

    return (
        <div className="w-60  mt-4 shadow-lg rounded-2xl overflow-hidden relative select-none">
            <Link to={`/product/${props._id || props.id}`}>
                {/* Image Container with Label */}
                {/* {console.log("Inside the shop for ",props)} */}
                <div className="relative">
                    <img
                        className="rounded-2xl w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                        alt={props.title}
                        src={
                            props.id.length>7?(props.image[0].image[0].includes("/") ? props.image[0].image[0] : null):(props.image)
                            // : dbService.getFilePreview(props.image)
                        }
                    />
                    {/* Label */}
                    <div className="absolute top-0 left-0 bg-lime-600 text-white text-sm font-semibold px-3 py-1 rounded-tl-lg">
                        {props.label || "New"}
                        {/* Use dynamic label from props */}
                    </div>
                </div>
            </Link>

            {/* Product Details */}

            <div className="flex flex-col mt-2 mb-4 justify-between">
                <div className="w-full flex text-left mx-2 my-0">
                    <p className="w-5/6 font-mono font-extrabold text-lg">
                        {upperCase(props.name) || "The model"}
                    </p>
                    <FaHeart
                        className={`w-1/6 h-6 mr-1 cursor-pointer  ${save ? "fill-red-300 text-red-500" : "text-gray-200"}`}
                        onClick={() => saveThis()}
                    />
                </div>
                {
                    <p className="text-gray-600 text-sm px-1 py-1">
                        {props?.description?.split(/(?<=[.!?])\s/)[0] ||
                            "This is a short description of this model."}
                    </p>
                }
                <p class="font-mono ml-1"> $ {props.new_price.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default Items;
