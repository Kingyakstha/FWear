import React, { useState } from 'react'
import Input from './Input'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import {login as authLogin} from '../Context/authSlice'

function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [toggleicon,setToggleicon]=useState('invisible');
    const toggle=()=>{
        const pass=document.querySelector('#password')
        const type=pass.getAttribute('type')==='password'?'text':'password'
        type==='text'?setToggleicon('visible'):setToggleicon('invisible') 
        pass.setAttribute('type',type)
        console.log(type)
    }

    const  login=async (data)=>{
        try {
            const session=await authService.userLogin(data)
            if (session)
            {
                console.log('Login session is ',session)
                const userData=await authService.getCurrentUser()
                dispatch(authLogin(userData));
                navigate('/')
            }
            else 
            {console.log('no login')}
        } catch (error) {
            console.log('Login error :: ',error)
        }
    }
    
  return (
    <div className='w-screen bg-fuchsia-100 flex justify-center'>
        <div className='bg-white w-1/3 flex flex-col items-start mt-20 mb-20 p-10 space-y-6 border rounded-xl'>
            <h1 className='text-4xl '> Log In</h1>
            <form onSubmit={handleSubmit(login)} className=' space-y-6 w-full'>
                <Input 
                label='Email '
                type='email'
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
                className='mt-1 border-2 w-full p-3 rounded-xl '
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
                
                <button className='w-full py-4 bg-red-500 rounded-xl text-white' onClick={()=>{  const userAuth=authService.getCurrentUser()
    console.log(userAuth)}}>Login</button>
            </form>
            <p onClick={()=>{authService.userLogout()}}>Don't have an account? <Link to='/signup'><span className='text-red-500'>Signup</span></Link></p>
        </div>
    </div>
  )
}

export default Login


{/* <div>
<form onSubmit={handleSubmittion()}>
<Input 
label='Email: '
type="email"
placeholder='Enter email'
{...register("email", {
    required: true,
    validate: {
        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Email address must be a valid address",
    }
})}
/>
<Input
label='Password: '
type='text'
placeholder='Enter password'
{...register('password',{
    required:true
})}
/>
</form> */}