import React, { useState } from "react";

function NewsLetter() {
    // const [email,setEmail]=useState('')
    return (
        <div className="w-screen flex flex-col items-center gap-2 ">
            <div className="py-20 w-3/5 mt-20 flex flex-col justify-center rounded-2xl bg-gradient-to-b  from-[#fde1ff] to-[#e1ffea22] gap-10">
                <div className="space-y-5 text-center">
                    <p className="text-5xl ">
                        Get Exclusive Offers On Your Email
                    </p>
                    <p> Subscribe to our newsletter and stay updated</p>
                    <div className="flex flex-col justify-center items-center font-mono">
                        <input
                            className="rounded-xl w-3/5 h-12 px-4 border-2 border-black"
                            type="email"
                            placeholder="Your email"
                            // value={email}
                        />
                        <p className="w-36 h-12 mt-2 py-2.5 px-0 rounded-xl bg-black text-white cursor-pointer">
                            Subscribe
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsLetter;
