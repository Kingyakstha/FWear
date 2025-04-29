import React from "react";
import FWlogoPhotoroom from "./Assets/FWlogoPhotoroom.jpg";
import instagram_icon from "./Assets/instagram_icon.png";
import whatsapp_icon from "./Assets/whatsapp_icon.png";
import pinterest_icon from "./Assets/pinterest_icon.png";


import { FaSquareFacebook,FaInstagram,FaYoutube } from "react-icons/fa6";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTwitter as faXTwitter } from '@fortawesome/free-brands-svg-icons';




function Footer() {
    return (
        <div className="mt-20 w-full h-full flex flex-col justify-center font-mono bg-black">
            <div className="flex w-full mt-4 items-start mb-10">
                <div className="flex flex-col w-1/4 items-center justify-center gap-8 ">
                    {/* <img src={FWlogoPhotoroom} className="h-24 w-32"></img> */}
                    <p className="text-7xl justify-center pt-4">
                        <span className="text-[#b42039] font-Playwrite font-bold  -mr-9">F</span> <span className="font-Kanchenjunga text-gray-200">Wears</span>
                    </p>
                    <p className="ml-10 text-gray-400 text-sm">This is the short description which is like a tag line for the brand. I think it needs a bit more of the text.</p>
                </div>
                <ul className=" w-9/16 text-gray-200 flex justify-between px-2 gap-4 ">
                    <li>
                        Company
                        <ul className="text-left text-gray-400 text-xs mt-4 space-y-2">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press & Media</li>
                            <li>Investor Relations</li>
                            <li>Sustainability Initiatives</li>
                        </ul>
                    </li>
                    <li>
                        Products
                        <ul className="text-left text-gray-400 text-xs mt-4 space-y-1">
                            <li>New Arrivals</li>
                            <li>Best Sellers</li>
                            <li>Fashionwear</li>
                            <li>Accessories</li>
                            <li>Sale & Offers</li>
                            <li>Gift Cards</li>
                        </ul>

                    </li>
                    <li>
                        Offices
                        <ul className="text-left text-gray-400 text-xs mt-4 space-y-1">
                            <li>123 Fashion Street, New York, NY 10001, USA</li>
                            <li>Working Hours: Mon-Fri: 9AM - 6PM</li>
                            <li>Support: +1 (555) 123-4567</li>
                            <li>Email: support@yourstore.com</li>
                        </ul>

                    </li>
                    <li>
                        About
                        <ul className="text-left text-gray-400 text-xs mt-4 space-y-1">
                            <li>Our Story</li>
                            <li>Sustainability & Values</li>
                            <li>Community Initiatives</li>
                            <li>Customer Reviews</li>
                            <li>Blog & News</li>
                        </ul>

                    </li>
                    <li>
                        Contact
                        <ul className="text-left text-gray-400 text-xs mt-4 space-y-1">
                            <li>Contact Us</li>
                            <li>Help Center / FAQ</li>
                            <li>Return & Refund Policy</li>
                            <li>Shipping Information</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                        </ul>

                    </li>
                </ul>
                <div className="w-3/16 flex justify-start mx-4 gap-6">
                <FaInstagram className="text-gray-200 size-7"/>

                <FaSquareFacebook className="text-gray-200 size-7" />

                <FaYoutube className="text-gray-200 size-7"/>

                </div>
            </div>

            <hr className="mt-4 w-11/12 h-4 border-gray-400 mx-auto"></hr>
            <p className="self-center mb-6 text-gray-200">
                Copyright @2024 - All Right Reserved
            </p>
        </div>
    );
}

export default Footer;
