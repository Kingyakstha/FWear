import React, { useState } from 'react'
import { addToCart } from '../Context/shopSlice'
import { useDispatch } from 'react-redux'
import dbService from '../appwrite/config'
import authService from '../appwrite/auth';
import Breadcrum from './Breadcrum'
import { FiStar } from 'react-icons/fi'
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import axios from 'axios'




function ProductDisplay(props) { 
  const dispatch=useDispatch()
  const {product}=props
  // console.log("Product ",product)

  const [quantity,setQuantity]=useState(0)
  const [size,setSize]=useState('')

  let item={
    // id:toString(product._id),
    name:product.productname, 
    price:product.price,
    quantity:quantity==0?1:quantity,
    size,
    image:product.image.image[0],
    // id:toString(product._id),
    // name:product.productname, 
    // category:product.category,
    // size,
    // price:product.price,
    // image:product.image.image[0],
    // quantity:quantity==0?1:quantity
  }

  const addCart=async()=>{
    const user=await axios.get("http://localhost:8000/api/v1/users/get-currentuser",{
      withCredentials: true
    })

    // const user=await authService.getCurrentUser()
    if(!user){
      console.log('User not found')
    }
    else{
    dispatch(addToCart(item))

    let cartItem={}
    // cartItem.product=product._id
    cartItem.size=item.size
    cartItem.quantity=item.quantity
    // cartItem.user=user.data._id
    console.log('Cart Item is :',cartItem)
    const response= await axios.post(`http://localhost:8000/api/v1/carts/add-cart/${product._id}`,cartItem,{
      withCredentials: true
    })
    console.log('The response is ',response)
 }
  }

  const numberOfIcons = 4;
  const numberOfImages=4;
  const noOfQ=4;
  const noOfR=3;
  const answer=true;
  const noOfstars=4;

  const [detailClicked,setDetailClicked]= useState(false);
  // const [materialClicked,setMaterialClicked]= useState(false);
  const [careClicked,setCareClicked]= useState(false);
  const [shippingClicked,setShippingClicked]= useState(false);

  const detailClick=()=>{
    setDetailClicked(!detailClicked);
  }
  // const materailClick=()=>{
  //   setMaterialClicked(!materialClicked);
  // }
  const careClick=()=>{
    setCareClicked(!careClicked);
  }
  const shippingClick=()=>{
    setShippingClicked(!shippingClicked);
  }


  return (
    <div className='w-screen'>
    <div className='mt-7 flex w-full justify-center gap-0 font-mono'>
      <div className='flex flex-wrap self-start w-6/12 gap-6 mt-10 '>
      {[...Array(numberOfImages)].map((_,index)=>(
     <div className='w-72 h-96 mb-3 shadow-xl rounded-xl p-4 flex items-center justify-center'>
        <img
          id={index}
          className='max-h-full max-w-full object-contain'
          src={product.image.image[0]}
          alt='product'
        />
      </div>
        ))}
      </div>


      <div className='flex flex-col text-left w-5/12 justify-items-start'> 
      <Breadcrum product={product}/> 
      <div className='flex items-center justify-between mt-4 '>
        <p className='font-semibold text-3xl'>{product.productname}</p>
        <div className='mt-4 flex gap-6 items-end'>
            <p className='text-[#8c8c8c] text-lg font-semibold line-through'>$ {product.price}</p>
            <p className=' text-lg text-red-500 font-semibold'>$ {product.price - (0.15*product.price)}</p>
          </div>
      </div>
        <div className='flex mt-1 gap-1 items-cente '>
          <p className='text-lg text-gray-600 mr-3'>4.00</p>
          <FiStar className='size-5 text-red-400' />
          <FiStar className='size-5 text-red-400' />
          <FiStar className='size-5 text-red-400' />
          <FiStar className='size-5 text-red-400' />
          <FiStar className='size-5 text-red-400' />
          <p className='text-[#8c8c8c] ml-3'>(122)</p>
        </div>
       
       <div className='mt-10 flex items-end gap-10'>
        <p className=''>Color: {product.image.color}</p>
        <p className=''>Material: {product.materials}</p>
       </div>

       <div className="flex gap-2 mt-2 mb-10">
      {[...Array(numberOfIcons)].map((_, index) => (
        <RiCheckboxBlankCircleFill key={index} className="size-7" />
      ))}
    </div>
    


        <p className='font-semibold text-lg'>Select Size</p>
        <ul className='flex gap-4 mt-6 text-center'>
        {product.availablesizes.includes('XS') &&  <li onClick={()=>setSize('XS') } className={`${size==='XS'?'bg-red-400 text-white':'bg-slate-100'} size-12 place-content-center cursor-pointer`}>XS</li>}
        {product.availablesizes.includes('S') && <li onClick={()=>setSize('S') } className={`${size==='S'?'bg-red-400 text-white':'bg-slate-100'} size-12 place-content-center cursor-pointer`}>S</li>}  
        {product.availablesizes.includes('M') && <li onClick={()=>setSize('M') }className={`${size==='M'?'bg-red-400 text-white':'bg-slate-100'} size-12 place-content-center cursor-pointer`}>M</li>}
        {product.availablesizes.includes('L') &&  <li onClick={()=> setSize('L') } className={`${size==='L'?'bg-red-400 text-white':'bg-slate-100'} size-12 place-content-center cursor-pointer`}>L</li>}
        {product.availablesizes.includes('XL') &&  <li onClick={()=>setSize('XL') } className={`${size==='XL'?'bg-red-400 text-white':'bg-slate-100'} size-12 place-content-center cursor-pointer`}>XL</li>}
        {product.availablesizes.includes('XXL') &&  <li onClick={()=>setSize('XXL') } className={`${size==='XXL'?'bg-red-400 text-white':'bg-slate-100'} size-12 place-content-center cursor-pointer`}>XXL</li>}

        </ul>
        <div className='flex items-end gap-4'>
          <div className='flex items-center justify-center gap-2 select-none'>
            <p onClick={()=>{if (quantity>0) setQuantity(quantity-1)}} className='bg-red-500 size-8 rounded-full pt-1 text-center cursor-pointer'>-</p>
            <p className='h-12 w-6 text-center pt-3'>{quantity}</p>
            <p onClick={()=>{if (quantity < 15 )setQuantity(quantity+1)} }className='bg-red-500 size-8 rounded-full pt-1 text-center cursor-pointer'>+</p>
          </div>
          <button onClick={()=>addCart()} className='mt-5 bg-red-500 place-content-center px-10 py-3 rounded-xl text-white cursor-pointer'>ADD TO CART</button>
        </div>

        <div className='mt-10 mb-2 font-poppins'>
          <p className='font-bold text-xl mb-2 '>The description</p>
          <p>{product.description}</p>
          <ul className='mt-10 font-mono space-y-4 cursor-pointer'>
            
              <li className='' onClick={()=>detailClick()}>
                <div className='flex justify-between'>
                  <p>Details</p> {detailClicked?<p>-</p>:<p>+</p>} 
                </div>
                  { detailClicked? 
                    <p className='mt-3 ml-2 text-sm'>
                    A hoodie is a versatile, cozy piece of clothing designed with a hood and typically a kangaroo pocket. 
                    Crafted from soft fabrics like cotton or fleece, it’s ideal for staying warm, casual outings, or athletic activities, 
                    blending comfort with effortless style.
                    </p>
                    :"" }
               
              </li>

              {/* <li className='' onClick={()=>materailClick()}>
                <div className='flex justify-between'>
                  <p>Materials</p> {materialClicked?<p>-</p>:<p>+</p>} 
                </div>
                  { materialClicked? 
                    <p className='mt-3 ml-2 text-sm'>
                    {product.materials}
                    </p>
                    :"" }
               
              </li> */}

              <li className='' onClick={()=>careClick()}>
                <div className='flex justify-between'>
                  <p>Care & Instructions</p> {careClicked?<p>-</p>:<p>+</p>} 
                </div>
                  { careClicked? 
                    <p className='mt-3 ml-2 text-sm'>
                    Take proper care based on the materials of the product
                    </p>
                    :"" }
               
              </li>

              <li className='' onClick={()=>shippingClick()}>
                <div className='flex justify-between'>
                  <p>Shipping & Returns</p> {shippingClicked?<p>-</p>:<p>+</p>} 
                </div>
                  { shippingClicked? 
                    <p className='mt-3 ml-2 text-sm'>
                      Shipping inside the valley is free. Shipping outside the valley cost extra charge of Rs. 200
                    </p>
                    :"" }
               
              </li>


          </ul>
        </div>

      </div>

</div>


<div className='w-full mt-10 justify-start '>
  <div className='text-2xl w-full text-left '>
    <div className='flex w-full justify-between items-end px-10'>
    <p> Questions & Answers   </p>
    <p className='w-44 text-lg border-2 rounded-lg py-2 px-6 bg-blue-500 text-white cursor-pointer' >Ask Question</p>
    </div>
    
    <hr className='w-full mt-2 mb-6'></hr>
  </div>
  <div className='ml-10 justify-items-start' >
    {[...Array(noOfQ)].map((_,index)=>(
      <div className={`w-2/3 bg-white shadow-sm p-6 mb-4 rounded-lg border-l-2 ${answer? `border-green-400`: `border-gray-400`}`}>
        <div  className='flex items-center justify-start '>
          <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-300">
              <img
              src={product.image}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
        </div>
        <div className='ml-4 text-sm text-gray-400'>User 1</div>
        <div className='ml-4 text-sm text-gray-400'> Asked: Aug 23, 2023</div>
      </div>
  

      

      <div className='mt-4 mb-4'>
          
        <div className='flex items-center'>
         <p  className='font-extrabold text-xl'>This is the most excrueting question that I have been thinking of asking?</p>
        </div>
   
          <div className='mt-4 mb-4 flex'>
          <p className='text-gray-600 text-sm'>I think this is the appropriate answer</p>
          </div>


          </div>
          <hr className='w-full mb-3'></hr>

        <div className='flex w-10 h-10 rounded-full border-2 justify-center items-center border-gray-300'>
        <AiFillLike  className='text-gray-400 '/>
        </div>
       
      </div>
    ))}

  </div>
</div>

<div className='w-full mt-10 justify-start px-10'>
  <div className='text-2xl w-full text-left '>
    Reviews
    <hr className='w-full mt-2'></hr>
  </div>

  <div className='w-3/4 py-8 mb-3 flex justify-between  '>
    <div className='text-left'>
      <p className='text-xl'>Overall rating</p>
      <div className='flex gap-1 items-center '>
      <p className='text-2xl font-extrabold'> 4.8</p><FaStar className='ml-4 size-6 text-yellow-400' /><FaStar className=' size-6 text-yellow-400' /> <FaStar className='text-yellow-400 size-6' /> <FaStar className='text-yellow-400 size-6' /><FaStar className='text-yellow-400 size-6' />
      <p className='text-gray-300 text-xs ml-2'>2,103 reviews</p>
      </div>
    </div>

    <div>
      <p className='border-2 rounded-lg py-2 px-6 bg-blue-500 text-white cursor-pointer'>Add review</p>
    </div>
  </div>

  <div>
    {[...Array(noOfR)].map((_,index)=>(
      <div className='flex flex-col justify-start '>
        <div className='flex items-center '>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
              <img
              src={product.image}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
        </div>

        <div className='text-left'>
          <div className='ml-4 text-base  font-bold'>User 1</div>
          <div className='ml-4 text-xs text-gray-400'> 3 days ago</div>
        </div>
      

        </div>
       

      <div className='ml-14'>

        <div className='flex mt-6 mb-2 gap-1 '>
              {[...Array(noOfstars)].map((_,index)=>(
                <FaStar className='text-yellow-400' id={index}/>
              ))}
          </div>


          <div className='mb-10 text-left'>
              <p>This is the review !!!</p>
          </div>

      </div>
      
       
      </div>
    ))}
  </div>

</div>

<div className='w-full mt-10 justify-start'>
  <div className='text-xl w-full text-center '>
    You may also like
    <hr className='w-full mt-2 '></hr>
  </div>
      </div>
      
      </div>
  )
}

export default ProductDisplay