import React from 'react'
import FWlogoPhotoroom from './Assets/FWlogoPhotoroom.jpg'
import instagram_icon from './Assets/instagram_icon.png'
import whatsapp_icon from './Assets/whatsapp_icon.png'
import pinterest_icon from './Assets/pinterest_icon.png'

function Footer() {
  return (
    <div className='mt-20 w-screen flex flex-col justify-center font-mono'>
        <div className='flex justify-center gap-8'>
            <img src={FWlogoPhotoroom} className='h-24 w-32'></img>
            <p className='text-7xl text-center pt-4'>FWears</p>
        </div>
        <ul className='mt-6 text-slate-800 flex justify-center gap-8'> 
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='mt-8 flex mx-auto gap-6'>
            <img className='shadow-sm p-2 bg-slate-100 rounded-xl' src={instagram_icon}></img>
            <img className='shadow-sm p-2 bg-slate-100 rounded-xl' src={whatsapp_icon}></img>
            <img className='shadow-sm p-2 bg-slate-100 rounded-xl' src={pinterest_icon}></img>
        </div>
        <hr className='mt-4 w-11/12 h-4 border-slate-800 mx-auto'></hr>
        <p className='self-center mb-6'>Copyright @2024 - All Right Reserved</p>
    </div>
  )
}

export default Footer