import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import dbService from '../appwrite/config'
import { FaHeart } from "react-icons/fa";


function Items(props) {
  const [save,setSave]= useState(false)

  const saveThis=()=>{
    setSave(!save)
  }

  function upperCase(str){
    if(typeof str !== 'string' || str.length == 0){
      return null
    }
    else
    {
      return str.charAt(0).toUpperCase()+ str.substring(1)
    }
  }
  return (

    <div className='w-60  mt-4 shadow-lg rounded-2xl overflow-hidden relative'>
    <Link to={`/product/${props._id || props.id}`}>
      {/* Image Container with Label */}
      <div className='relative'>
        <img
          className='rounded-2xl w-full h-60 object-cover hover:scale-105 transition-transform duration-300'
          alt={props.title}
          src={
            props.image.includes('/')
              ? props.image
              : dbService.getFilePreview(props.image)
          }
        />
        {/* Label */}
        <div className='absolute top-0 left-0 bg-lime-600 text-white text-sm font-semibold px-3 py-1 rounded-tl-lg'>
          {props.label || "New"} {/* Use dynamic label from props */}
        </div>
      </div>

      </Link>

      {/* Product Details */}

      <div className='flex flex-col mt-2 mb-4 justify-between'>
        <div className='w-full flex text-left mx-2 my-0'>
          <p className='w-5/6 font-mono font-extrabold text-lg'>{upperCase(props.name) || "The model"}</p>
          <FaHeart className={`w-1/6 h-6 mr-1 cursor-pointer  ${save?'fill-red-300 text-red-500':'text-gray-200'}`} onClick={()=>saveThis()} />
          </div>
          {
          <p className='text-gray-600 text-sm px-1 py-1'>{props?.description?.split(/(?<=[.!?])\s/)[0]|| "This is a short description of this model."}</p>
          }
          <p class="font-mono ml-1"> $ {props.new_price}</p>
        </div>
  
   
  </div>
  )
}
    
export default Items