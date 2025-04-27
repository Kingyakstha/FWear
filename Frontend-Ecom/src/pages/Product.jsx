import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Breadcrum from '../Components/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay'
import axios from 'axios'
import { getProduct } from '../appwrite/productConfig'
import { getImages } from '../appwrite/imagencolorConfig'

function Product() {
  // const all_product=useSelector((state)=>state.shop.product["all_product"])
  const [product, setProduct]= useState()
  const {id}=useParams()
  console.log("ID is ", id)

  useEffect(()=>{
    async function fetchProduct() {
      try {
        const response = await getProduct(id)
        const imgResponse =await getImages(id)
        // const response= await axios.get(`http://localhost:8000/api/v1/products/get-product/${id}`)
        // const imgResponse= await axios.get(`http://localhost:8000/api/v1/images/getImages/${id}`)
        const product=response.data
        const image=imgResponse[0].color
        // if (imgResponse) console.log("Response from fetching product is ",product)
        setProduct({...product,image:image})
      } catch (error) {
        console.log("Error occured while fetching the product",error)
      }
    }
    fetchProduct()
  },[])
  // const product=all_product.find((e)=>e.id===Number(id))
  // console.log("product is ",product)
  return (
    <div>
      {product && <ProductDisplay product={product}/>}
    </div>
  )
}

export default Product