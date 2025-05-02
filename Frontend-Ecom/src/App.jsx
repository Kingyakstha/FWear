import { useState, useEffect } from "react";
// import {Home} from './pages'
import { Footer, Navbar } from "./Components";
import { Outlet } from "react-router-dom";
import { login as authLogin } from "../src/Context/authSlice";
import { useDispatch } from "react-redux";
import { removeFromCart } from "./Context/shopSlice";
import { getCurrentUser } from "./appwrite/authentication";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(removeFromCart("Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse","S"));
    });
    useEffect(() => {
        // console.log("inside the app");
        async function fetchUser() {
            const userAuth = await getCurrentUser();
            // console.log("user auth is ", userAuth);
            if (userAuth) {
                dispatch(authLogin());
            }
        }
        fetchUser();
    }, []);
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
