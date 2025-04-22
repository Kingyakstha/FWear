import React, { useRef, useState } from 'react'
import Input from './Input'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
import { IoAddCircleOutline,IoRemoveCircleOutline } from "react-icons/io5";
import avatar_icon from "../Components/Assets/avatar icon.png" ;
import axios from 'axios';
import {useDispatch} from 'react-redux'

import authService from '../appwrite/auth';
import {login} from '../Context/authSlice'


function Signup() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [toggleicon,setToggleicon]=useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [image,setImg]=useState(false)
    

    const fileInputRef= useRef()

    // File handling
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    setSelectedImage(file);
    setImg(true);
    }
    console.log( "hi there",image)
    };


    const handleClick=()=>{
        fileInputRef.current.click();
        console.log("hello ji",image)
    }
    const toggle=()=>{
        setToggleicon(prev => !prev) 
        // console.log("toggled",type)
    }
    const {register,handleSubmit}=useForm()

    const signup=async(data)=>{
        console.log("the data is ",data)
        if (!selectedImage){
            console.log("image not selected"); 
            return;
        } 
        const formData = new FormData();
        formData.append('avatar', selectedImage);
        formData.append('fullname',data.name)
        formData.append('email',data.email)
        formData.append('password',data.password)

        try {
            console.log("hola")
            const response= await axios.post("http://localhost:8000/api/v1/users/register",formData,
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }}
            )
            console.log("response is :",response)
            dispatch(login());
            navigate('/')

            // const session=await authService.createAccount(data)
            // if (session)
            // {
            //     console.log('Session is ',session)
            // }
           
        } catch (error) {
            console.log("Error when signing up ",error)
        }
    }
  return (
    <div className='w-screen bg-fuchsia-100 flex justify-center select-none'>
        <div className='bg-white w-1/3 flex flex-col items-start mt-20 mb-20 p-10 space-y-6 border rounded-xl'>
            <div className='w-full flex flex-col items-center justify-center relative'>
            <div className='size-28 border-2 rounded-full overflow-hidden justify-center place-items-center'>
                <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                />
                {   image?
                    <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    :
                    <img src={avatar_icon} onClick={handleClick}/>
                }
            </div>
            { image?(<IoRemoveCircleOutline className='size-6 z-1 absolute -bottom-2 bg-white rounded-full ' onClick={()=>setImg(false)}/>):(<IoAddCircleOutline className='size-6 z-1 absolute -bottom-2 bg-white rounded-full ' onClick={handleClick}/>)}
            </div>
            <form onSubmit={handleSubmit(signup)} className='space-y-6 w-full'>
                <Input 
                label="Name "
                type="text"
                className='mt-1 border-2 w-full p-3 rounded-xl'
                placeholder="Full name"
                {...register("name",{
                    required:true
                })}
                />
                <Input 
                label='Email '
                type="email"
                className='mt-1 border-2 w-full p-3 rounded-xl'
                placeholder='Enter email'
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <div className='relative'>
                <Input
                id='password'
                label='Password '
                type={toggleicon?'text':'password'}
                // ref={passwordRef}
                className='mt-1 border-2 w-full p-3 rounded-xl'
                placeholder='Enter password'
                {...register('password',{
                    required:true
                })}
               
                />
                 {toggleicon?
                    <AiOutlineEye onClick={()=>toggle()} className='absolute  size-6 top-8 right-5 transform translate-y-1/2 text-gray-500 hover:text-gray-700'/> :
                    <AiOutlineEyeInvisible onClick={()=>toggle()} className='absolute size-6 top-8 right-5 transform translate-y-1/2 text-gray-500 hover:text-gray-700'/>
                }
                </div>
               
                <div>
                    <p className='text-left'>Wanna be a seller?</p>
                    <div className='flex gap-3'> 
                        <input type='checkbox' {...register('seller')}/> <p>Yes</p>
                    </div>
                </div>
                
                <button className='w-full py-4 bg-red-500 rounded-xl text-white cursor-pointer'>Create Account</button>
            </form>
            <p>Already have an account? <Link to='/login'><span className='text-red-500 cursor-pointer'>Login here</span></Link></p>
            <div className='flex gap-4'>
            <p>  <input type='checkbox' className='mr-2' /> By continuing, I agree to the terms of use & privacy policy</p>
            </div>
        </div>
    </div>
  )
}

export default Signup