import React from "react";
import exclusive_image from "./Assets/exclusive_image.png";

function Offers() {
    return (
        //  <div className='w-screen flex justify-center'>
        <div className="w-screen aspect-[2/1] mt-5 py-5 bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] flex justify-normal ">
            <div className="w-3/5 flex flex-col justify-center text-left ml-40 text-[#171717] gap-8">
                <p className="text-7xl font-medium ">Exclusive</p>
                <p className="text-7xl font-medium">Offer For You</p>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button className="w-52 h-12 font-medium rounded-full hover:bg-red-500 hover:text-white border-2 border-red-500 transition-all duration-200">
                    Click Now
                </button>
            </div>

            <div className="">
                <img className="" src={exclusive_image}></img>
            </div>
        </div>
    );
}

export default Offers;
