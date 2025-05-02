import React,{useState,useEffect} from "react";
import Items from "./Items";
import new_collection from "./Assets/new_collections";
import { getGenderBasedProduct } from "../appwrite/productConfig";
import { getImages } from "../appwrite/imagencolorConfig";

function NewCollections() {

    const [product, setProduct]=useState()

    useEffect(() => {
        async function fetchProduct() {
            try {
                const menProduct = await getGenderBasedProduct('men');
                const womenProduct = await getGenderBasedProduct('women');
                const kidsProduct = await getGenderBasedProduct('kids');

                if (menProduct && womenProduct && kidsProduct){
                    let products=[menProduct,womenProduct,kidsProduct].flat()
                    // console.log("all the products are ",products)

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

                    const validProduct = productWithImage.filter((items) => items !== null);
                    // console.log("all the valid products are ",validProduct)
                    const shuffled =validProduct.sort(() => 0.5 - Math.random());
                    setProduct(shuffled.length<8?shuffled.slice(0,shuffled.length):shuffled.slice(0,8));
                }

               

//Products which contains image/s
               
                // console.log("Valid product :",validProduct," product with image :",productWithImage)
            } catch (error) {
                console.log("Error occured while fetching", error);
            }
        }
        fetchProduct();
    }, []);

    return (
        <div className="w-screen flex flex-col items-center gap-2 px-36">
            <h1 className="text-[#171717] text-2xl font-mono">
                New Collection
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
                    label="New"
                    // saved={ savedItems.includes(items._id)? true : false }
                />
                ))}
            </div>
        </div>
    );
}

export default NewCollections;
