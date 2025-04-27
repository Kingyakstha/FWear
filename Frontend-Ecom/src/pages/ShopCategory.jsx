import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { Items } from '../Components'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { RxCross2 ,RxPlus} from "react-icons/rx";


// import dbService from '../appwrite/config'
// import {Query} from 'appwrite'
import { IoIosArrowDown } from "react-icons/io";
import { getSavedProduct } from '../appwrite/saveConfig';
import { getGenderBasedProduct } from '../appwrite/productConfig';
import {getImages} from "../appwrite/imagencolorConfig"
import Filter from '../Components/Filter';



function ShopCategory(props) {
  const [page, setPage]=useState(0)
  const [ totalProduct, setTotal]= useState()
  const [ limit, setLimit ] =useState(4)
  const availablePages = (totalProduct/limit)-1

  // const product=useSelector(state=>state.shop.product)
  // console.log('all products are',product['all_product'])
  const [prod_item,setProd_item]=useState([])
  const [limitedItems, setLimitedItems]=useState([])
  const [savedItems,setSavedItems]= useState([])

  const status=useSelector(state=>state.auth.status)
  
  useEffect(()=>{
    async function fetchProduct(){
      setPage(0)
      try {
      
        const products=await getGenderBasedProduct(props.category)
        // const response= await axios.get(`http://localhost:8000/api/v1/products/get-product-gender/${props.category}`)


        const productWithImage= await Promise.all(
          products.map(async(prod)=>{
            try {

              const response=await getImages(prod._id)
              // const response= await axios.get(`http://localhost:8000/api/v1/images/getImages/${prod._id}`)
              console.log("Response for the image is ", response[0].color)
              //correction needed
              if( response ){
                const image=response[0].color;
                if(image)
                {
                  return {
                    ...prod,
                    // image:response.data.data[0].color[0].image[0]
                    image:image
  
                  }
                }
                return null;
              }
             
             
            } catch (error) {
              console.log("Error occured while fetching the images or image doesn't exist", error)
              return null;
            }
          })

        )
        const validProduct = productWithImage.filter(items=>items !== null)
        setProd_item(validProduct);
      } catch (error) {
        console.log("Error occured while fetching", error)
      }
    }
    fetchProduct()
    
  },[props])


  useEffect(()=>{
    async function fetchSavedProducts() {
      setTotal(prod_item.length)

      console.log("The length of prod_item:",totalProduct);
  
      const items=prod_item.slice(page*limit, limit*(page+1))
      setLimitedItems(items)
      console.log("Limited items are ",limitedItems)
  
      console.log(`Status is ${status} and limited products are `,limitedItems)
      
      if(status){
        const saved= await getSavedProduct()
        console.log("saved is :",saved)
        const savedArray= saved.data.map((items)=> {return items.productid})
        console.log("saved array is :",savedArray)
        setSavedItems(savedArray)
      }
    }
    fetchSavedProducts()
  

  },[page,prod_item])
 
  const sortOptions=["Recommended","New","Best Seller","Price"]

  const [filterData, setFilters] = useState({
    categoryFilter: [],
    sizeFilter: [],
    colorFilter: [],
    priceFilter: [],
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // useEffect(()=>{
  //   console.log("Received filter data is :",filterData?.colorFilter.length !==0 && 6)
  // },[filterData])

  return (
    // (props.category==='men'?
      <div className='w-screen flex flex-col items-center mt-4'>
      <div className='flex'>
      <img className='mt-9' src={props.banner}></img>
      </div>

      <div className='w-full flex'>
        <div className='w-1/5 mt-4 mr-10'>
          <Filter filters={filterData} onFilterChange={handleFilterChange}/>
        </div>
        <div className='w-4/5'>

        <div className='w-full h-min mt-4 flex justify-between'>
            <div className='flex space-x-2 h-min'>
                <div className='py-1 px-3 h-min rounded-lg border-2 flex items-center bg-black text-white'>FILTERS</div>
                <p className='border-l-2 py-1 h-8 mr-4 ml-2 '> </p>
                <div className='flex flex-wrap gap-2'>
                { filterData?.categoryFilter.length !==0 && (filterData?.categoryFilter.map((items)=>{
                    return(
                        <div key={items} className='py-1 px-3 h-min rounded-lg border-2 flex items-center'>
                            {items} 
                            <RxCross2 className='ml-2' onClick={()=>{
                                let newCategoryFilter=filterData.categoryFilter.filter(item=>item !=items)
                                setFilters({...filterData,categoryFilter : newCategoryFilter})
                              }
                              }/>
                        </div>
                    )
                }))}
                { filterData?.sizeFilter.length !==0 && (filterData?.sizeFilter.map((items)=>{
                    return(
                        <div key={items} className='py-1 px-3 h-min rounded-lg border-2 flex items-center'>
                            {items} 
                            <RxCross2 className='ml-2' onClick={()=>{
                                let newCategoryFilter=filterData.sizeFilter.filter(item=>item !=items)
                                setFilters({...filterData,sizeFilter : newCategoryFilter})
                              }
                              }/>                        
                        </div>
                    )
                }))}
                  { filterData?.colorFilter.length !==0 && (filterData?.colorFilter.map((items)=>{
                    return(
                        <div key={items} className='py-1 px-3 h-min rounded-lg border-2 flex items-center'>
                            {items} 
                            <RxCross2 className='ml-2' onClick={()=>{
                                let newCategoryFilter=filterData.colorFilter.filter(item=>item !=items)
                                setFilters({...filterData,colorFilter : newCategoryFilter})
                              }
                              }/>
                        </div>
                    )
                }))}
                </div>
              
            </div>
            <div className='py-1 ml-5 mr-5 px-3 h-min rounded-lg border-2 flex items-center'><p className='whitespace-nowrap'>SORT BY</p><RxPlus className=' ml-2'/>
            </div>
        </div>

          <div className='w-full mt-5 flex justify-between  items-center'>
              <p>Showing {limitedItems.length} out of {Number(totalProduct)} products</p>
          </div>

          <div className='mt-6 flex flex-wrap justify-normal gap-x-8 gap-y-2 mx-auto px-6'>
          {limitedItems && limitedItems.map((items,i)=>{
              if (props.category===items.gender)
              {
                console.log("items is ::",items)
              //unique key is needed to solve the issue of haveing both page having same saved
              return <Items key={items.productname} id={items._id} name={items.productname} description={items.description} image={items.image} new_price={items.price - 0.15* items.price} old_price={items.price} saved={savedItems.includes(items._id)?true:false} />
              }
            })}
          </div>
        </div>
      </div>

      <div className='mt-20 px-8 py-3 rounded-full bg-slate-300'>
        Explore more
      </div>
      <div className='flex justify-items-center space-x-3 mt-2'>
        <IoIosArrowBack className='rounded-lg  bg-white border-1 border-neutral-300 size-8 p-2 cursor-pointer' onClick={()=>{if  (page > 0) setPage(page-1)}}/>
        <div className='rounded-lg bg-neutral-300 border-1  border-neutral-300  size-8 text-center text-lg py-0.5 select-none' >{page+1}</div>
        <IoIosArrowForward className='rounded-lg bg-white border-1  border-neutral-300   size-8 p-2 cursor-pointer' onClick={()=>{if  (page< availablePages) setPage(page+1)}} />

      </div>
    </div>

    
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


  )
}

export default ShopCategory