import React, { useState } from 'react'
import Input from './Input'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth';
import {login} from '../Context/authSlice'


function Signup() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [toggleicon,setToggleicon]=useState('invisible')
    const toggle=()=>{
        const pass=document.querySelector('#password')
        const type=pass.getAttribute('type')==='password'?'text':'password'
        type==='text'?setToggleicon('visible'):setToggleicon('invisible') 
        pass.setAttribute('type',type)
        console.log(type)
    }
    const {register,handleSubmit}=useForm()

    const signup=async(data)=>{
        try {
            const session=await authService.createAccount(data)
            if (session)
            {
                console.log('Session is ',session)
                dispatch(login())
                navigate('/')
            }
           
        } catch (error) {
            console.log("Error when signing up ",error)
        }
    }
  return (
    <div className='w-screen bg-fuchsia-100 flex justify-center'>
        <div className='bg-white w-1/3 flex flex-col items-start mt-20 mb-20 p-10 space-y-6 border rounded-xl'>
            <h1 className='text-4xl '> Sign Up</h1>
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
                type='password'
                className='mt-1 border-2 w-full p-3 rounded-xl'
                placeholder='Enter password'
                {...register('password',{
                    required:true
                })}
               
                />
                 {toggleicon==='visible'?
                    <AiOutlineEye onClick={()=>toggle()} className='absolute top-9 right-5 transform translate-y-1/2 text-gray-500 hover:text-gray-700'/> :
                    <AiOutlineEyeInvisible onClick={()=>toggle()} className='absolute top-9 right-5 transform translate-y-1/2 text-gray-500 hover:text-gray-700'/>
                }
                </div>
               
                <div>
                    <p className='text-left'>Wanna be a seller?</p>
                    <div className='flex gap-3'> 
                        <input type='checkbox' /> <p>Yes</p>
                    </div>
                </div>
                
                <button className='w-full py-4 bg-red-500 rounded-xl text-white'>Create Account</button>
            </form>
            <p>Already have an account? <Link to='/login'><span className='text-red-500'>Login here</span></Link></p>
            <div className='flex gap-4'>
            <input type='checkbox' />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
        </div>
    </div>
  )
}

export default Signup