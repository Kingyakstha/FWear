import React from 'react'
import hand_icon from './Assets/hand_icon.png'
import arrow_icon from './Assets/arrow.png'
import hero_image from './Assets/hero_image.png'

function Hero() {
  return (
        <div className='w-screen aspect-[2/1] mt-5 py-5 bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] flex justify-normal gap-64'>
                <div className='flex flex-col justify-normal mt-10 gap-6 pl-36 text-left '>
                    <h2 className='text-xl font-mono text-[#090909]'>NEW ARRIVALS ONLY</h2>
                    <div className='text-[#171717] text-6xl font-bold'>
                        <div className='flex items-center gap-5'>
                            <p className=''>new</p>
                            <img className='w-24' src={hand_icon}></img>
                        </div>
                        <p>collections</p>
                        <p>for everyone</p>
                    </div>
                    <div className='flex items-center justify-center gap-4 w-2/3 h-12 rounded-full bg-[#ff4141] text-white text-xl font-medium mt-7'>
                        <div className='cursor-pointer'>Latest Collection</div>
                        <img src={arrow_icon}></img>
                    </div>
                </div>
                {/* <div>
                <img src={hero_image}></img>
                </div> */}
                <div className='flex flex-col items-center'>
                    <img className='h-4/5 w-auto' src={hero_image}></img>
                </div>
            </div>
    
  )
}

export default Hero