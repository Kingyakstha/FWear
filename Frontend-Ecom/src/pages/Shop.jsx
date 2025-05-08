import React, { useEffect, useState } from "react";
import {
    Hero,
    Popular,
    Offers,
    NewCollections,
    NewsLetter,
} from "../Components/index";
import { useDispatch, useSelector } from "react-redux";
import { getGenderBasedProduct } from "../appwrite/productConfig";
import { getImages } from "../appwrite/imagencolorConfig";
import { addMenProduct,addWomenProduct,addKidsProduct, addSavedProduct } from "../Context/productSlice";
import { getSavedProduct } from "../appwrite/saveConfig";

function Shop() {
    const dispatch= useDispatch();
    const needProduct= useSelector((state)=> state.product.product)
    console.log("The value of product in slice is ", needProduct)

     
        useEffect(()=>{
            async function fetchAllProduct(){
                console.log("check point",0)

                try {
                
                    const womenProduct= await getGenderBasedProduct('women');
                    const womenWithImage= await fetchImages(womenProduct);
                    const validWomenProduct = womenWithImage.filter((items) => items !== null);
                    dispatch(addWomenProduct(validWomenProduct))

                  

                    const menProduct= await getGenderBasedProduct('men');
                    const menWithImage= await fetchImages(menProduct);
                    const validMenProduct = menWithImage.filter((items) => items !== null);
                    dispatch(addMenProduct(validMenProduct))
                    
                    const kidsProduct= await getGenderBasedProduct('kids');
                    const kidsWithImage= await fetchImages(kidsProduct);
                    const validKidsProduct = kidsWithImage.filter((items) => items !== null);
                    dispatch(addKidsProduct(validKidsProduct))


                    const saved= await getSavedProduct()
                    dispatch(addSavedProduct(saved));

                } catch (error) {
                    console.log("error ",error)
                }
            }

            async function fetchImages(products) {
                // console.log("Products for images are", products)
                const productWithImage = await Promise.all(
                    products.map(async (prod) => {
                        try {
                            const response = await getImages(prod._id);
                            //correction needed (done)
                            if (response[0].color) {
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
                // console.log("Product with image ",productWithImage)
                return productWithImage;
            }

            if (needProduct=="none") fetchAllProduct();

         
        },[needProduct,dispatch])

    return (
        <>
            <Hero />
            <Popular />
            <Offers />
            <NewCollections />
            <NewsLetter />
        </>
    );
}

export default Shop;
