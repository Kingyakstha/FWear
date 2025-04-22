import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import axios from 'axios';
import { Items } from '../Components'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";


import dbService from '../appwrite/config'
import {Query} from 'appwrite'
import { IoIosArrowDown } from "react-icons/io";



function ShopCategory(props) {
  const [page, setPage]=useState(0)
  const [ totalProduct, setTotal]= useState()
  const [ limit, setLimit ] =useState(4)
  const availablePages = (totalProduct/limit)-1

  // const product=useSelector(state=>state.shop.product)
  // console.log('all products are',product['all_product'])
  const [prod_item,setProd_item]=useState([])
  const [limitedItems, setLimitedItems]=useState([])
  
  useEffect(()=>{
    async function fetchProduct(){
      setPage(0)
      try {
      
        const response= await axios.get(`http://localhost:8000/api/v1/products/get-product-gender/${props.category}`)
        const products = response.data.data;

        const productWithImage= await Promise.all(
          products.map(async(prod)=>{
            try {
              const response= await axios.get(`http://localhost:8000/api/v1/images/getImages/${prod._id}`)
              console.log("Response for the image is ", response.data.data[0].color[0].image[0])
              const image=response.data?.data[0].color[0].image[0]
              if(image)
              {
                return {
                  ...prod,
                  image:response.data.data[0].color[0].image[0]
                }
              }
              return null;
             
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
    setTotal(prod_item.length)
    console.log("The length of prod_item:",totalProduct);

    const items=prod_item.slice(page*limit, limit*(page+1))
    setLimitedItems(items)
    console.log("Limited items are ",limitedItems)

  },[page,prod_item])
 
  const sortOptions=["Recommended","New","Best Seller","Price"]
  console.log('hi',prod_item)
  return (
    // (props.category==='men'?
      <div className='w-screen flex flex-col items-center mt-4'>
      <div className='flex'>
      <img className='mt-9' src={props.banner}></img>
      </div>
      <div className='w-4/5 mt-10 flex justify-between  items-center'>
        <p>Showing {limitedItems.length} out of {Number(totalProduct)} products</p>
        <div className='w-28 py-2 gap-2 flex rounded-full border border-black justify-center '>
          Sort by<img className='h-2 w-3 my-auto' src={dropdown_icon}></img>
        </div>
      </div>
      <div className='mt-6 ml-7 flex flex-wrap gap-x-20 gap-y-2 mx-auto px-20'>
      {limitedItems.map((items,i)=>{
          if (props.category===items.gender)
          {
          console.log('Item in it are ', items)
          return <Items key={i} id={items._id} name={items.productname} description={items.description} image={items.image} new_price={items.price - 0.15* items.price} old_price={items.price} />
          }
        })}
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