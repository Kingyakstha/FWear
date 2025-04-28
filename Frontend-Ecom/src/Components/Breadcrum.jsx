import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function Breadcrum(props) {
    const { product } = props;
    console.log(product);
    return (
        <div className="flex items-center gap-1 mt-10 ">
            HOME <IoIosArrowForward /> <Link to="/">SHOP </Link>
            <IoIosArrowForward />
            <Link to={`/${product.gender}`}>{product.gender} </Link>
            <IoIosArrowForward /> {product.productname}
        </div>
    );
}

export default Breadcrum;
