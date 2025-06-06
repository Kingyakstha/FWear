import React, { useState } from "react";
import { FiPlusCircle, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout as authLogout } from "../Context/authSlice";
import { userLogout } from "../appwrite/authentication";
import { IoLogOutOutline,IoLogInOutline } from "react-icons/io5";


function Navbar() {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState("");
    const prod_arr = useSelector((state) => state.shop.cart);
    const status = useSelector((state) => state.auth.status);
    console.log("auth status is", status);

    const [isInputVisible, setInputVisible] = useState(false);

    const handleSearchClick = () => {
        setInputVisible(!isInputVisible);
    };

    return (
        <div className="fixed top-0 left-0 z-10 w-screen h-14 flex flex-wrap justify-around px-6 shadow-sm font-mono bg-white">
            <ul className="w-1/3 flex gap-9 text-[#626262] text-base font-medium items-center cursor-pointer">
                <li
                    onClick={() => {
                        setMenu("shop");
                    }}
                    className=""
                >
                    <Link to="/">
                        Shop{" "}
                        {menu === "shop" ? (
                            <hr className="border-b-4 border-rose-600 mt-2"></hr>
                        ) : null}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        setMenu("men");
                    }}
                >
                    <Link to="/men">
                        Men{" "}
                        {menu === "men" ? (
                            <hr className="border-b-4 border-rose-600 mt-2"></hr>
                        ) : null}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        setMenu("women");
                    }}
                >
                    <Link to="/women">
                        Women{" "}
                        {menu === "women" ? (
                            <hr className="border-b-4 border-rose-600 mt-2"></hr>
                        ) : null}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        setMenu("kids");
                    }}
                >
                    <Link to="kids">
                        Kids{" "}
                        {menu === "kids" ? (
                            <hr className="border-b-4 border-rose-600 mt-2"></hr>
                        ) : null}
                    </Link>
                </li>
            </ul>
            <div className="w-1/3 flex items-center justify-center gap-2">
                <p className="text-2xl font-medium text-[#171717]">
                    <span className="text-[#d30b2d] font-Playwrite font-bold">Fashion</span><span className="font-Kanchenjunga">Wears</span>
                </p>
            </div>

            <div className="flex justify-end items-center gap-4 w-1/3">
                <div className="flex items-center p-2">
                    <div
                        className={`transition-transform duration-300 ${isInputVisible ? "transform -translate-x-2" : ""}`}
                    >
                        <FiSearch
                            className="w-12 h-6 cursor-pointer"
                            onClick={handleSearchClick}
                        />
                    </div>
                    {isInputVisible && (
                        <input
                            type="text"
                            className="ml-2 outline-none border-b-2 border-black bg-transparent"
                            placeholder="Search..."
                            autoFocus
                        />
                    )}
                </div>
                {status === false ? (
                    <Link to="/login">
                        <button
                                className="flex items-center pl-2 gap-1 bg-white w-24 h-8 border-[#717171] rounded-lg border text-[#515151] hover:bg-red-500 hover:text-white  cursor-pointer text-base font-medium"
                        >
                            <IoLogInOutline className="size-5" />

                            Login
                        </button>
                    </Link>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/cart">
                            <FiShoppingCart className="w-12 h-6 cursor-pointer" />
                        </Link>
                        {/* <div className='size-6 content-center items-center -mt-[35px] -ml-[60px] bg-red-600 text-white rounded-2xl text-sm'>{prod_arr.length}</div> */}
                        <Link to={"/addproduct"}>
                            <FiPlusCircle className="w-12 h-6 cursor-pointer" />
                        </Link>
                        <Link to="/">
                            <button
                                className="flex items-center pl-2 gap-1 bg-white w-24 h-8 border-[#717171] rounded-lg border text-[#515151] hover:bg-red-500 hover:text-white  cursor-pointer text-base font-medium"
                                onClick={async () => {
                                    const response = await userLogout();
                                    if (response) dispatch(authLogout());
                                }}
                            >
                                <IoLogOutOutline className="size-5"/>

                                Logout
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
