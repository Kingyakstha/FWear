import React from "react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

function LoginSignup(props) {
    let login;
    console.log(props.category);
    if (props.category === "login") {
        login = true;
    }
    return (
        <div>
            {login && <Login />}
            {!login && <Signup />}
        </div>
    );
}

export default LoginSignup;
