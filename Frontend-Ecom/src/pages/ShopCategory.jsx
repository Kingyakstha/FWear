import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Items } from "../Components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RxCross2, RxPlus } from "react-icons/rx";

// import dbService from '../appwrite/config'
// import {Query} from 'appwrite'
// import { IoIosArrowDown } from "react-icons/io";
import { getSavedProduct } from "../appwrite/saveConfig";
import { getGenderBasedProduct } from "../appwrite/productConfig";
import { getImages } from "../appwrite/imagencolorConfig";
import Filter from "../Components/Filter";

function ShopCategory(props) {
    const [page, setPage] = useState(0);
    const [totalProduct, setTotal] = useState();
    const [limit, setLimit] = useState(8);
    const availablePages = totalProduct / limit - 1;

    // const product=useSelector(state=>state.shop.product)
    // console.log('all products are',product['all_product'])
    const [prod_item, setProd_item] = useState([]);
    const [filteredItems,setFilteredItems] = useState([])
    const [allFilteredItems,setAllFilteredItems]=useState([])
    const [savedItems, setSavedItems] = useState([]);
    const [sortClicked, setSortClicked] = useState(false);
    const [sortType, setSort] = useState();

    const status = useSelector((state) => state.auth.status);


    // All the filter category and their state in array 
    const [filterData, setFilters] = useState({
        categoryFilter: [],
        sizeFilter: [],
        colorFilter: [],
        priceFilter: [],
    });

// Receives the changes sent by child and updates the "filterData"
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };


// Get all the products and their images

    const item = useSelector(state=>{
        if(props.category=="men") return state.product.menProduct;
        else if (props.category=="women") return state.product.womenProduct;
        else if (props.category=="kids") return state.product.kidsProduct;
    })

    // const item =useSelector((state)=> state.product.menProduct)
    useEffect(()=>{
        setProd_item(item);
    },[item])
   


//     useEffect(() => {
//         async function fetchProduct() {
//             setPage(0);
//             try {
//                 const products = await getGenderBasedProduct(props.category);
//                 // const response= await axios.get(`http://localhost:8000/api/v1/products/get-product-gender/${props.category}`)
//                 const productWithImage = await Promise.all(
//                     products.map(async (prod) => {
//                         try {
//                             const response = await getImages(prod._id);
//                             // const response= await axios.get(`http://localhost:8000/api/v1/images/getImages/${prod._id}`)
                            
//                             // console.log( "Response for the image is ", response[0].color );
//                             //correction needed (done)
//                             if (response[0].color) {
//                                 const image = response[0].color;
//                                 if (image) {
//                                     return {
//                                         ...prod,
//                                         // image:response.data.data[0].color[0].image[0]
//                                         image: image,
//                                     };
//                                 }
//                                 return null;
//                             }
//                         } catch (error) {
//                             console.log( "Error occured while fetching the images or image doesn't exist",error);
//                             return null;
//                         }
//                     })
//                 );

// //Products which contains image/s
//                 const validProduct = productWithImage.filter(
//                     (items) => items !== null);
//                 setProd_item(validProduct);
//                 // console.log("Valid product :",validProduct," product with image :",productWithImage)
//             } catch (error) {
//                 console.log("Error occured while fetching", error);
//             }
//         }
//         fetchProduct();
//     }, [props]);


// Get all the saved products by the user and select products for paination
    const saved= useSelector(state=>state.product.savedProduct)
    useEffect(()=>{
        setSavedItems(saved);
    },[saved])
    
    useEffect(() => {
        async function fetchSavedProducts() {
            

            // console.log("The length of prod_item:", totalProduct);

// Paginated products adding in "filteredItems"
            if ((filterData.categoryFilter.length + filterData.colorFilter.length + filterData.sizeFilter.length +filterData.priceFilter.length)==0){
                setTotal(prod_item.length);
                const items = prod_item.slice(page * limit, limit * (page + 1));
                setFilteredItems(items)
            }
            else{
                setTotal(allFilteredItems.length);
                const items = allFilteredItems.slice(page * limit, limit * (page + 1));
                setFilteredItems(items)
            }
           
            // console.log("Limited items are ", filteredItems);
            // console.log( `Status is ${status} and limited products are `, filteredItems );

//             if (status) {
//                 const saved = await getSavedProduct();
//                 console.log("saved in cat is :", saved);
//                 const savedArray = saved.map((items) => {
//                     return items.productid;
//                 });
//                 console.log("saved array is :", savedArray);
// // Add all the id of product which is saved by user
//                 setSavedItems(savedArray);
//             }
        }
        fetchSavedProducts();
        // setChangePage(prev=> prev+=1);
    }, [page, prod_item,allFilteredItems]);



    useEffect(()=>{
        // console.log("All the limited items are  ::",filteredItems)
        // console.log("Filtered data are ",filterData)

        let categoryFilterProduct = filterData.categoryFilter.length!==0 ? filterData.categoryFilter.flatMap(category=>{        
            return  prod_item?.map((product)=>{
                    // console.log("category in the product",product.productname," is ",product.category,' and color is',category)
                    if (product.category ==category) return product
                    else return null
                })
            }):[]
        let categoryFilteredItems=[...new Set(categoryFilterProduct?.filter((items)=> items !==null))]
        // console.log("colored filter",categoryFilteredItems)


        let colorFilterProduct = filterData.colorFilter.length!==0 ? filterData.colorFilter.flatMap(color=>{        
            return  prod_item?.map((product)=>{
                    let colorList=product.image.map(item=>item.color)
                    // console.log("Color in the product",product.productname," are ",colorList,' and color is',color)
                    if (colorList.includes(color)) return product
                    else return null
                })
            }):[]
        let colorFilteredItems=[...new Set(colorFilterProduct?.filter((items)=> items !==null))]
        // console.log("colored filter",colorFilteredItems)

        let sizeFilterProduct = filterData.sizeFilter.length !==0 ? filterData.sizeFilter.flatMap(size=>{        
            return  prod_item?.map((product)=>{
                    // let colorList=product.image.map(item=>item.color)
                    // console.log("Size in the product",product.productname," are ",product.availablesizes,' and size is',size)
                    if (product.availablesizes.includes(size)) return product
                    else return null
                })
            }):[]
            let sizeFilteredItems=[...new Set(sizeFilterProduct?.filter((items)=> items !==null))]
            // console.log("size filter",sizeFilteredItems)
        

        // "Under $25", "$25 - $50", "$50 - $100", "Over $100"
        const priceChart={
            "Under $25":25, 
            "$25 - $50":50,
            "$50 - $100":100,
            "Over $100":101
        }

        let priceFilterProduct = filterData.priceFilter.length !==0 ? filterData.priceFilter.flatMap(price=>{        
            return  prod_item?.map((product)=>{
                    console.log("Price in the product",product.productname," are ",product.price,' and price is',priceChart[price])
                    let actualPrice=Number(product.price)- (Number(product.price)* 0.15)

                    if(priceChart[price]<=100){
                        if(priceChart[price]==25){
                            if ( actualPrice < 25 && actualPrice > 0) return product
                            else return null
                        }
                        else if(priceChart[price]==50){
                            if ( actualPrice < 50 && actualPrice > 25) return product
                            else return null
                        }
                        else{
                            if ( actualPrice < 100 && actualPrice > 50) return product
                            else return null
                        }
                    }
                    else {
                        if ( actualPrice > 100 ) return product
                            else return null
                    }
                })
            }):[]
            let priceFilteredItems=[...new Set(priceFilterProduct?.filter((items)=> items !==null))]
            // console.log("price filter",priceFilteredItems)
        

            // let total=[...new Set([sizeFilteredItems,colorFilteredItems].flat())]
            let total=prod_item?.filter(
                items=>
                    // shall be added when the dataset is changed to incorporate the categories like shirt, pant, tshirt etc
                    (filterData.categoryFilter.length >0?categoryFilteredItems.includes(items):true) &&  
                    (filterData.sizeFilter.length >0?sizeFilteredItems.includes(items):true) && 
                    (filterData.colorFilter.length >0?colorFilteredItems.includes(items):true) && 
                    (filterData.priceFilter.length >0?priceFilteredItems.includes(items):true))

            // console.log('total are ',total)
            setAllFilteredItems(total)

    },[filterData])


    useEffect(()=>{
        // console.log( "hello sort changed",sortType)
        const sortedProducts = [...filteredItems].sort((a, b) => {
            switch (sortType) {
                case 'low_to_high':
                    return a.price - b.price;
                case 'high_to_low':
                    return b.price - a.price;
                case 'new':
                    return new Date(a.updatedAt) - new Date(b.updatedAt);
                // case 'popular':
                //     return b.sold - a.sold; 
                // case 'limited':
                //     return a.stock -b.stock;
                default:
                return 0; // no sorting or based on internal score
            }
          });
        
        // console.log("Sorted products are", sortedProducts)
        setFilteredItems(sortedProducts)
    },[sortType])

    // const sortOptions = ["high","low", "new", "popular", "limited"];

    // useEffect(()=>{
    //   console.log("Received filter data is :",filterData?.colorFilter.length !==0 && 6)
    // },[filterData])



    return (
        <div className="w-screen flex flex-col items-center mt-4">

{/* {*******************************************************  Banner  *******************************************************} */}

            <div className="flex">
                <img className="mt-9" src={props.banner}></img>
            </div>

            <div className="w-full flex">

{/* {*******************************************************  Filter SideBar  *******************************************************} */}

                <div className="w-1/5 mt-4 mr-10">
                    <Filter
                        filters={filterData}
                        onFilterChange={handleFilterChange}
                    />
                </div>
                <div className="w-4/5">

{/* {*******************************************************  Filter and Sort  *******************************************************} */}

                    <div className="w-full h-min mt-4 flex justify-between">

{/* {***************************************  Filter  ******************************************} */}

                        <div className="flex space-x-2 h-min">
                            <div className="py-1 px-3 h-min rounded-lg border-2 flex items-center bg-black text-white">
                                FILTERS
                            </div>
                            <p className="border-l-2 py-1 h-8 mr-4 ml-2 "> </p>
                            <div className="flex flex-wrap gap-2">
                                {filterData?.categoryFilter.length !== 0 &&
                                    filterData?.categoryFilter.map((items) => {
                                        return (
                                            <div
                                                key={items}
                                                className="py-1 px-3 h-min rounded-lg border-2 flex items-center"
                                            >
                                                {items}
                                                <RxCross2
                                                    className="ml-2"
                                                    onClick={() => {
                                                        let newCategoryFilter = filterData.categoryFilter.filter((item) => item !=items );
                                                        setFilters({
                                                            ...filterData,
                                                            categoryFilter:newCategoryFilter,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                {filterData?.sizeFilter.length !== 0 &&
                                    filterData?.sizeFilter.map((items) => {
                                        return (
                                            <div
                                                key={items}
                                                className="py-1 px-3 h-min rounded-lg border-2 flex items-center"
                                            >
                                                {items}
                                                <RxCross2
                                                    className="ml-2"
                                                    onClick={() => {
                                                        let newCategoryFilter = filterData.sizeFilter.filter((item) => item !=items);
                                                        setFilters({
                                                            ...filterData,
                                                            sizeFilter:
                                                                newCategoryFilter,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                {filterData?.colorFilter.length !== 0 &&
                                    filterData?.colorFilter.map((items) => {
                                        return (
                                            <div
                                                key={items}
                                                className="py-1 px-3 h-min rounded-lg border-2 flex items-center"
                                            >
                                                {items}
                                                <RxCross2
                                                    className="ml-2"
                                                    onClick={() => {
                                                        let newCategoryFilter = filterData.colorFilter.filter((item) => item !=items);
                                                        setFilters({
                                                            ...filterData,
                                                            colorFilter:newCategoryFilter,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

{/* {****************************************  Sort *********************************************} */}

                        <div
                            className="py-1 ml-24 mr-5 px-3 h-min relative cursor-pointer select-none"
                            onClick={() => setSortClicked((prev) => !prev)}
                        >
                            <div className="rounded-lg border-2 flex items-center px-3 py-1">
                                <p className="whitespace-nowrap">SORT BY</p>
                                <RxPlus className=" ml-2" />
                            </div>

                            {sortClicked && (
                                <div className="absolute w-52 mt-2 -left-20 z-20 py-2 shadow-xl border-1 rounded-lg bg-white text-gray-600 select-none">
                                    <p
                                        className={`whitespace-nowrap flex items-center w-full px-3 py-1 ${sortType && sortType=='limited'?'bg-blue-300':'hover:bg-gray-200'} `}
                                        onClick={() => setSort("limited")}
                                    >
                                        Limited edition
                                    </p>
                                    <p
                                        className={`whitespace-nowrap flex items-center w-full px-3 py-1 ${sortType && sortType=='popular'?'bg-blue-300':'hover:bg-gray-200'} `}
                                        onClick={() => setSort("popular")}
                                    >
                                        Popularity
                                    </p>
                                    <p
                                        className={`whitespace-nowrap flex items-center w-full px-3 py-1 ${sortType && sortType=='high_to_low'?'bg-blue-300':'hover:bg-gray-200'} `}
                                        onClick={() => setSort("high_to_low")}
                                    >
                                        Price High to Low
                                    </p>
                                    <p
                                        className={`whitespace-nowrap flex items-center w-full px-3 py-1 ${sortType && sortType=='low_to_high'?'bg-blue-300':'hover:bg-gray-200'} `}
                                        onClick={() => setSort("low_to_high")}
                                    >
                                        Price Low to High
                                    </p>
                                    <p
                                        className={`whitespace-nowrap flex items-center w-full px-3 py-1 ${sortType && sortType=='new'?'bg-blue-300':'hover:bg-gray-200'} `}
                                        onClick={() => setSort("new")}
                                    >
                                        New
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

{/* {****************************************  Showing  *********************************************} */}

                    <div className="w-full mt-5 flex justify-between  items-center">
                        <p>
                            {/* Showing {filteredItems.length} out of{" "} */}
                            Showing {filteredItems.length} out of{" "}

                            {Number(totalProduct)} products
                        </p>
                    </div>

{/* {*******************************************************  Products  *******************************************************} */}

                    <div className="mt-6 flex flex-wrap justify-normal gap-x-8 gap-y-2 mx-auto px-6">
                        {/* {filteredItems &&
                            filteredItems.map((items, i) => { */}
                        {filteredItems &&
                            filteredItems.map((items, i) => {
                                // console.log("Prop cat ",props.category," and items is ",items)
                                if (items && props.category === items?.gender) {
                                    // console.log("inside items is ::", savedItems.includes(items._id));
                                    //unique key is needed to solve the issue of haveing both page having same saved
                                    return (
                                        <Items
                                            key={items.productname}
                                            id={items._id}
                                            name={items.productname}
                                            description={items.description}
                                            image={items.image}
                                            new_price={ items.price - 0.15 * items.price }
                                            old_price={items.price}
                                            saved={ savedItems.includes(items._id)}
                                        />
                                    );
                                }
                            })}
                    </div>
                </div>
            </div>

            {/* <div className='mt-20 px-8 py-3 rounded-full bg-slate-300'>
        Explore more
      </div> */}

{/* {*******************************************************  Pagination  *******************************************************} */}

            <div className="flex justify-items-center space-x-3 mt-4">
                <IoIosArrowBack
                    className="rounded-lg  bg-white border-1 border-neutral-300 size-8 p-2 cursor-pointer"
                    onClick={() => {
                        if (page > 0) setPage(page - 1);
                    }}
                />
                <div className="rounded-lg bg-neutral-300 border-1  border-neutral-300  size-8 text-center text-lg py-0.5 select-none">
                    {page + 1}
                </div>
                <IoIosArrowForward
                    className="rounded-lg bg-white border-1  border-neutral-300   size-8 p-2 cursor-pointer"
                    onClick={() => {
                        if (page < availablePages) setPage(page + 1);
                    }}
                />
            </div>
        </div>
    );
}

export default ShopCategory;


        //for testing purpose
        // :
        // <div className='w-screen flex flex-col items-center mt-5'>

        //     <div className='flex justify-end '>
        //       <img className='mt-9' src={props.banner}></img>
        //     </div>

        //     <div className='w-4/5 mt-10 flex justify-between  items-center'>

        //       <div className='w-60 gap-2 flex justify-center'>
        //         Sort by :
        //           <select>
        //           {sortOptions.map((options)=>(
        //                   <option>
        //                   {options}
        //                   </option>
        //                 ))}
        //           </select>
        //           {/* <IoIosArrowDown  className='h-5 w-5 my-auto' /> */}
        //       </div>

        //       <p class='text-lg font-stretch-extra-expanded'>12 Results</p>
        //     </div>
        //     <div className='mt-6 flex flex-wrap gap-6 justify-evenly mx-auto px-20'>
        //       {product['all_product'].map((items,i)=>{
        //         if (props.category===items.category)
        //         {
        //           return <Items key={i} id={items.id} name={items.name} image={items.image} new_price={items.new_price} old_price={items.old_price} />
        //         }
        //       })}
        //     </div>
        //     <div className='mt-20 px-8 py-3 rounded-full bg-slate-300'>
        //       Show more
        //     </div>
        // 0     1     2
        // </div>)   0-2   2-4  4-6 ....