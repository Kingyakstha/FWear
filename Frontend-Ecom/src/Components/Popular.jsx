import React, { useEffect, useState } from "react";
import data_product from "./Assets/data";
import Items from "./Items";
import { getGenderBasedProduct } from "../appwrite/productConfig";
import { getImages } from "../appwrite/imagencolorConfig";

function Popular() {
    const [product, setProduct]=useState()

    useEffect(() => {
        async function fetchProduct() {
            try {
                const products = await getGenderBasedProduct('women');
                const productWithImage = await Promise.all(
                    products.map(async (prod) => {
                        try {
                            const response = await getImages(prod._id);
                            console.log( "Response for the image is ", response[0].color );
                            //correction needed (done)
                            if (response) {
                                const image = response[0].color;
                                if (image) {
                                    return {
                                        ...prod,
                                        // image:response.data.data[0].color[0].image[0]
                                        image: image,
                                    };
                                }
                                return null;
                            }
                        } catch (error) {
                            console.log( "Error occured while fetching the images or image doesn't exist",error);
                            return null;
                        }
                    })
                );

//Products which contains image/s
                const validProduct = productWithImage.filter((items) => items !== null);
                setProduct(validProduct.slice(0,4));
                // console.log("Valid product :",validProduct," product with image :",productWithImage)
            } catch (error) {
                console.log("Error occured while fetching", error);
            }
        }
        fetchProduct();
    }, []);

    console.log("product",product)
    return (
        <div className="w-screen flex flex-col items-center gap-2 ">
            <h1 className="text-[#171717] text-2xl font-mono">
                POPULAR IN WOMEN
            </h1>
            <hr className="w-52 h-2 bg-[#252525] rounded-full"></hr>
            <div className="flex flex-row flex-wrap gap-8 justify-evenly">
                {product && product.map((items, i) => (
                    <Items
                    key={items.productname}
                    id={items._id}
                    name={items.productname}
                    description={items.description}
                    image={items.image}
                    new_price={ items.price - 0.15 * items.price }
                    old_price={items.price}
                    label="Popular"
                    // saved={ savedItems.includes(items._id)? true : false }
                />
                ))}
            </div>
        </div>
    );
}

export default Popular;
