import React, { useEffect, useState } from "react";
import { addToCart } from "../Context/shopSlice";
import { useDispatch } from "react-redux";
import Breadcrum from "./Breadcrum";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import { FiStar } from "react-icons/fi";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { BiMessageAdd } from "react-icons/bi";
import { RiQuestionnaireFill } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

import { addtoCart } from "../appwrite/cartConfig";
import { getCurrentUser } from "../appwrite/authentication";
import { addQuestion, getQnas, removeQuestion } from "../appwrite/qnaConfig";
import { getReview } from "../appwrite/reviewConfig";
import ReviewForm from "./ReviewForm";
import QuestionForm from "./QuestionForm";
import { addRating } from "../appwrite/ratingConfig";
import { addReview } from "../appwrite/reviewConfig";
import { changeQuestion as ChangeQuestion } from "../appwrite/qnaConfig";
import Toast from "./Toast";

// import dbService from '../appwrite/config'
// import authService from '../appwrite/auth';
// import { AiFillLike } from "react-icons/ai";

function ProductDisplay({ product }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const [size, setSize] = useState("");
    const [currentUserName, setUserName] = useState();
    const [currentImage, setCurrentImage] = useState(product.image[0].image[0]);
    const [currentColor, setCurrentColor] = useState(0);

    // console.log("Props value is ", product);
    function upperCase(str) {
        if (typeof str !== "string" || str.length == 0) {
            return null;
        } else {
            return str.charAt(0).toUpperCase() + str.substring(1);
        }
    }

    const colorClasses = {
        red: "bg-red-400",
        blue: "bg-blue-400",
        green: "bg-green-400",
        yellow: "bg-yellow-400",
        purple: "bg-purple-400",
        pink: "bg-pink-400",
        black: "bg-black",
        brown:"bg-[#644903]",
        golden:"bg-[#dba40c]",
        coffee:"bg-[#AF8D61]",
        greenish:"bg-[#91AA2D]",
        cyanish_green:"bg-[#C7DAB9]",
        cream:"bg-[#FCECB3]",
        redwine:"bg-[#82030F",
        orange:"bg-orange-400",
        light_blue: "bg-[#37b5e3]",
        light_green :"bg-[#3fe8b6]",
        light_red : "bg-[#e88282]",
        light_orange : "bg-[#f89668]",
        light_cyan:"bg-[#acfffc]",
        light_purple:"bg-[#B7C9E2]",
        light_brownish_green:"bg-[#645918]",
        dark_brownish_green:"bg-[#3d3403]",
        dark_blue :"bg-[#010756]",
        dark_green : "bg-[#01560c]",
        dark_red:"bg-[#8f0404]",
        dark_brown:"bg-[#412e1d]",
        dark_cyan:"bg-[#00B3B3"
        // Add any other allowed colors here
    };

    let item = {
        name: product.productname,
        price: product.price,
        quantity: quantity == 0 ? 1 : quantity,
        size,
        image: product.image[0].image[0],
    };

    useEffect(() => {
        async function fetchuser() {
            try {
                const user = await getCurrentUser();

                if (!user) {
                    console.log("User not found");
                } else {
                    // console.log("User ::", user);
                    setUserName(user);
                }
            } catch (error) {
                console.log("Error while getting current user ::", error);
            }
        }
        fetchuser();
    }, []);

    const addCart = async () => {
        try {
            if (!currentUserName) {
                console.log("Please login");
                alert("Please login")
            } else {
                dispatch(addToCart(item));

                let cartItem = {};
                cartItem.size = item.size;
                cartItem.quantity = item.quantity;
                // console.log("Cart Item is :", cartItem);

                const response = await addtoCart(product._id, cartItem);
                // console.log("The response is ", response);
            }
        } catch (error) {
            console.log("Add to cart error ", error);
        }
    };

    const numberOfIcons = 4;
    const numberOfImages = 4;

    const noOfQ = 4;
    const noOfR = 3;
    const answer = true;
    const noOfstars = 4;

    const [detailClicked, setDetailClicked] = useState(false);
    // const [materialClicked,setMaterialClicked]= useState(false);
    const [careClicked, setCareClicked] = useState(false);
    const [shippingClicked, setShippingClicked] = useState(false);

    const detailClick = () => {
        setDetailClicked(!detailClicked);
    };
    // const materailClick=()=>{
    //   setMaterialClicked(!materialClicked);
    // }
    const careClick = () => {
        setCareClicked(!careClicked);
    };
    const shippingClick = () => {
        setShippingClicked(!shippingClicked);
    };

    const [QnA, setQna] = useState();
    const [Reviews, setReviews] = useState();
    const [stars, setStars] = useState(0);

    const [reviewForm, setReviewForm] = useState(false);
    const [questionForm, setQuestionForm] = useState(false);

    const [QRadded, setQR] = useState(false);
    const [questionAdded, setQuestionAdded]= useState(false)
    const [reviewAdded, setReviewAdded]= useState(false)
    const [questionRemoved, setQuestionRemoved]= useState(false)
    const [changeQuestion, setChangeQuestion] = useState(null);
    const [questionText, setQuestionText] = useState();

    useEffect(() => {
        async function fetchQna() {
            try {
                const reviews = await getReview(product._id);
                const qna = await getQnas(product._id);
                if (qna) setQna(qna);
                if (reviews) {
                    console.log("Got the reviews")
                    setReviews(reviews);
                    let star = 0;
                    reviews.map((items) => (star += items.star));
                    let avgStar = star / reviews.length;
                    setStars(avgStar);
                }
                
            } catch (error) {
                console.log("Error while fetching ", error);
            }
        }

        fetchQna();
    }, [QRadded, changeQuestion]);

    async function handleQuestionSubmit(e) {

        // console.log("Question Submit", e.text);
        try {
            const response = await addQuestion(product._id, {
                question: e.text,
            });
            if (response) {
                console.log("Success");
                setQR((prev) => !prev);
                setQuestionAdded(true)
            }
        } catch (error) {
            console.log("Error while adding question", error);
        }
    }

    async function handleReviewSubmit(e) {
        // console.log("Review Submit", e.text);
        try {
            const addStar = await addRating(product._id, {
                stars: Number(e.rating),
            });
            if (addStar) {
                console.log("Review is about to be added")
                const response = await addReview(product._id, {
                    review: e.text,
                });
                // console.log("response is",response)
                if (response) {
                    console.log("Success");
                    setQR((prev) => !prev);
                    setReviewAdded(true)
                }
            }
        } catch (error) {
            console.log("Error while adding review", error);
        }
    }

    const handleQuestionEdit = (questionid, prevText, name) => {
        // console.log("question id is", questionid);
        if (currentUserName.fullname == name) {
            setChangeQuestion(questionid);
            setQuestionText(prevText);
        } else
            console.log(
                "Cannot edit other's question ",
                currentUserName.fullname
            );
    };

    async function handleQuestionChange() {
        // console.log("Question text is ", questionText);
        try {
            const changeQ = await ChangeQuestion(changeQuestion, questionText);
            if (changeQ) {
                setChangeQuestion(null);
                setQuestionText(null);
                console.log("success");
            }
        } catch (error) {
            console.log("error while changing question", error);
        }
    }

    async function deleteQuestion(questionid, name) {
        if (currentUserName.fullname == name) {
            try {
                const response = await removeQuestion(questionid);
                if (response) {
                    console.log("success");
                    setQR((prev) => !prev);
                }
            } catch (error) {
                console.log("Error while deleting question ::", error);
            }
        }
    }

    return (
        <div className="w-screen">
{/* {||||||||||||||||||||||||||||||||||||||||||||***** Left section ( images ) *****|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||} */}

            <div className="mt-10 flex w-full justify-center gap-0 font-mono">
                <div className="flex self-start w-5/12 gap-6 mt-10 ">
                    <div className="flex flex-col w-1/4 h-auto justify-start gap-3 ">
                        {/* {console.log("Images in the product are :",product.image[1].image[0])} */}
                        {[...Array(product.image.length)].map((_, index) => (
                            <div
                                key={index}
                                className="size-24 mb-3 shadow-xl rounded-sm overflow-hidden flex items-center justify-center cursor-pointer"
                                onClick={() =>
                                    setCurrentImage(
                                        product?.image[index].image[0]
                                    )
                                }
                            >
                                <img
                                    id={index}
                                    className="max-h-full w-full object-cover"
                                    src={product?.image[index].image[0]}
                                    alt="product"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="w-2/4 shadow-xl rounded-lg overflow-hidden flex items-center justify-center">
                        {currentImage && (
                            <img
                                className="max-h-full w-full object-cover"
                                src={currentImage}
                                alt="product"
                            />
                        )}
                    </div>
                </div>

{/* {||||||||||||||||||||||||||||||||||||||||||||***** Right section ( Product information) *****|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||} */}

                <div className="flex flex-col text-left w-5/12 justify-items-start">
{/* {****************************  Breadcrum  ****************************} */}

                    <Breadcrum product={product} />

{/* {****************************  Detail Information  ****************************} */}

                    <div className="flex items-center gap-14 mt-4 ">
                        <p className="font-semibold text-3xl">
                            {upperCase(product.productname)}
                        </p>
                        <div className=" flex gap-6 items-baseline">
                            <p className="text-[#8c8c8c] text-sm font-semibold line-through">
                                $ {product.price}
                            </p>
                            <p className=" text-2xl text-red-500 font-semibold">
                                $ {(product.price - 0.15 * product.price).toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className="flex mt-3 items-center ">

                        {/* <FiStar className="size-5 text-red-400" />
                        <FiStar className="size-5 text-red-400" />
                        <FiStar className="size-5 text-red-400" />
                        <FiStar className="size-5 text-red-400" />
                        <FiStar className="size-5 text-red-400" /> */}
                        { [...Array(5)].map((_,indx)=>{
                                if (indx<stars) return <AiFillStar key={indx} className="size-5 text-red-400" />
                                else return <AiOutlineStar key={indx} className="size-5 text-red-400" />
                        })}
{/*                         
                        <p className="text-lg text-gray-600 mr-3">
                            {stars || 0}
                        </p> */}
                        <p className="text-[#8c8c8c] ml-5">
                            {Reviews && Reviews.length}  reviews
                        </p>
                    </div>

                    <div className="mt-8 flex items-start ">
                        {/* {console.log("Colors are :", product.image[0].color)} */}
                        <p className="w-3/5 pr-5 ">
                            Color:{" "}
                            {product.image.map((items, indx) =>
                                indx == 0 ? items.color.replace(/_/g," ") : ", " + items.color.replace(/_/g," ")
                            )}
                        </p>
                        <p className="w-2/5 ">Material: {product.materials}</p>
                    </div>

                    <div className="flex gap-2 mt-2 mb-10">
                        {[...Array(product.image.length)].map((_, index) => (
                            <div
                                key={index}
                                className={`size-7 rounded-full  shadow-3xl cursor-pointer ${colorClasses[product.image[index].color]} ${currentColor == index ? "border-2 border-gray-600" : ""}`}
                                onClick={() => {
                                    setCurrentImage(
                                        product.image[index].image[0]
                                    );
                                    setCurrentColor(index);
                                }}
                            />
                        ))}
                    </div>

{/* {****************************  Selecting Size  ****************************} */}

                    <p className="font-semibold text-lg">Select Size</p>
                    <ul className="flex gap-4 mt-6 text-center select-none">
                        {product.availablesizes.includes("XS") && (
                            <li
                                onClick={() => size==="XS"?setSize(""):setSize("XS")}
                                className={`${size === "XS" ? "bg-red-400 text-white rounded-lg " : "bg-slate-100"} size-12 place-content-center cursor-pointer`}
                            >
                                XS
                            </li>
                        )}
                        {product.availablesizes.includes("S") && (
                            <li
                                onClick={() => size==="S"?setSize(""):setSize("S")}
                                className={`${size === "S" ? "bg-red-400 text-white rounded-lg" : "bg-slate-100"} size-12  place-content-center cursor-pointer`}
                            >
                                S
                            </li>
                        )}
                        {product.availablesizes.includes("M") && (
                            <li
                                onClick={() => size==="M"?setSize(""):setSize("M")}
                                className={`${size === "M" ? "bg-red-400 text-white rounded-lg " : "bg-slate-100"} size-12 place-content-center cursor-pointer`}
                            >
                                M
                            </li>
                        )}
                        {product.availablesizes.includes("L") && (
                            <li
                                onClick={() => size==="L"?setSize(""):setSize("L")}
                                className={`${size === "L" ? "bg-red-400 text-white rounded-lg " : "bg-slate-100"} size-12 place-content-center cursor-pointer`}
                            >
                                L
                            </li>
                        )}
                        {product.availablesizes.includes("XL") && (
                            <li
                                onClick={() => size==="XL"?setSize(""):setSize("XL")}
                                className={`${size === "XL" ? "bg-red-400 text-white rounded-lg " : "bg-slate-100"} size-12 place-content-center cursor-pointer`}
                            >
                                XL
                            </li>
                        )}
                        {product.availablesizes.includes("XXL") && (
                            <li
                                onClick={() => size==="XXL"?setSize(""):setSize("XXL")}
                                className={`${size === "XXL" ? "bg-red-400 text-white rounded-lg " : "bg-slate-100"} size-12 place-content-center cursor-pointer`}
                            >
                                XXL
                            </li>
                        )}
                    </ul>

{/* {****************************  Adding to Cart  ****************************} */}

                    <div className="flex items-end gap-4">
                        <div className="flex items-center justify-center gap-2 select-none">
                            <p
                                onClick={() => {
                                    if (quantity > 0) setQuantity(quantity - 1);
                                }}
                                className="bg-red-500 text-white size-8 rounded-full pt-1 text-center cursor-pointer"
                            >
                                -
                            </p>
                            <p className="h-12 w-6 text-center pt-3">
                                {quantity}
                            </p>
                            <p
                                onClick={() => {
                                    if (quantity < 15)
                                        setQuantity(quantity + 1);
                                }}
                                className="bg-red-500 text-white size-8 rounded-full pt-1 text-center cursor-pointer"
                            >
                                +
                            </p>
                        </div>
                        <button
                            onClick={() => addCart()}
                            className="mt-5 bg-red-500 place-content-center px-10 py-3 rounded-xl text-white cursor-pointer"
                        >
                            ADD TO CART
                        </button>
                    </div>

{/* {****************************  Basic Informations  ****************************} */}

                    <div className="mt-10 mb-2 font-poppins">
                        <p className="font-bold text-xl mb-2 ">
                            The description
                        </p>
                        <p>{product.description}</p>
                        <ul className="mt-10 font-mono space-y-4 cursor-pointer">
                            <li className="" onClick={() => detailClick()}>
                                <div className="flex justify-between">
                                    <p className="text-lg">Details</p>{" "}
                                    {detailClicked ? <p>-</p> : <p>+</p>}
                                </div>
                                {detailClicked ? (
                                    product.detail?(<p className="mt-3 ml-2 text-sm">{product.detail}</p>):(<p className="mt-3 ml-2 text-sm">
                                        A hoodie is a versatile, cozy piece of
                                        clothing designed with a hood and
                                        typically a kangaroo pocket. Crafted
                                        from soft fabrics like cotton or fleece,
                                        it’s ideal for staying warm, casual
                                        outings, or athletic activities,
                                        blending comfort with effortless style.
                                    </p>)
                                ) : (
                                    ""
                                )}
                            </li>

                            <li className="" onClick={() => careClick()}>
                                <div className="flex justify-between">
                                    <p className="text-lg">Care & Instructions</p>{" "}
                                    {careClicked ? <p>-</p> : <p>+</p>}
                                </div>
                                {careClicked ? (
                                    <p className="mt-3 ml-2 text-sm">
                                        Take proper care based on the materials
                                        of the product
                                    </p>
                                ) : (
                                    ""
                                )}
                            </li>

                            <li className="" onClick={() => shippingClick()}>
                                <div className="flex justify-between">
                                    <p className="text-lg">Shipping & Returns</p>{" "}
                                    {shippingClicked ? <p>-</p> : <p>+</p>}
                                </div>
                                {shippingClicked ? (
                                    <p className="mt-3 ml-2 text-sm">
                                        Shipping inside the valley is free.
                                        Shipping outside the valley cost extra
                                        charge of $ 1.99
                                    </p>
                                ) : (
                                    ""
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

{/* {||||||||||||||||||||||||||||||||||||||||||||***** Bottom section ( Question and Answers ) *****||||||||||||||||||||||||||||||||||||||||||||||||||||||||} */}

            <div className="w-full mt-10 justify-start ">
                <div className="text-2xl w-full text-left ">
                    <div className="flex w-full justify-between items-end px-10">
                        <p> Questions & Answers </p>
                        <div onClick={() => setQuestionForm(true)}>
                            <p
                                className="flex text-lg bg-blue-600 text-white px-4 py-2 rounded-lg 
                            hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg 
                            transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            >
                                <RiQuestionnaireFill className="mr-2 mt-1 size-5" />
                                Ask Question
                            </p>
                        </div>
                    </div>

                    <hr className="w-full mt-2 mb-6"></hr>
                </div>
                <QuestionForm
                    isOpen={questionForm}
                    onClose={() => setQuestionForm(false)}
                    onSubmit={handleQuestionSubmit}
                />
                <div className="ml-10 justify-items-start">
{/* {****************************  QnAs ****************************} */}

                    {/* {[...Array(noOfQ)].map((_,index)=>( */}
                    {QnA &&
                        QnA.map((items) => (
                            <div
                                key={items._id}
                                className={`w-2/3  shadow-sm py-2 px-4 mb-4 rounded-lg border-l-4 select-none ${items.answer ? `border-green-500 bg-[#dcf6e8]` : `border-gray-500 bg-[#f1f5f5]`}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-start ">
                                        <div className="size-8 rounded-full overflow-hidden border-2 border-gray-300">
                                            <img
                                                src={items.avatar}
                                                alt="User Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="ml-4 text-sm text-gray-400">
                                            {items.name}
                                        </div>
                                        <div className="ml-4 text-sm text-gray-400">
                                            {" "}
                                            Aug 23, 2023
                                        </div>
                                    </div>

                                    {currentUserName &&
                                        currentUserName.fullname ==
                                            items.name &&
                                        (changeQuestion !== items._id ? (
                                            <div className="flex gap-2">
                                                <AiOutlineEdit
                                                    className="size-5 cursor-pointer"
                                                    onClick={() =>
                                                        handleQuestionEdit(
                                                            items._id,
                                                            items.question,
                                                            items.name
                                                        )
                                                    }
                                                />
                                                <MdDelete
                                                    className="size-5 cursor-pointer"
                                                    onClick={() =>{
                                                        setQuestionRemoved(true)
                                                        deleteQuestion(
                                                            items._id,
                                                            items.name
                                                        )
                                                        }
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                <IoCheckmarkCircleOutline
                                                    className="size-5 cursor-pointer"
                                                    onClick={
                                                        handleQuestionChange
                                                    }
                                                />
                                                <IoIosCloseCircleOutline
                                                    className="size-5 cursor-pointer"
                                                    onClick={() =>
                                                        setChangeQuestion(null)
                                                    }
                                                />
                                            </div>
                                        ))}
                                </div>

{/* {****************************  Editing Questions  ****************************} */}

                                <div className="mt-4 mb-4">
                                    <div className="flex items-center">
                                        {changeQuestion &&
                                        changeQuestion === items._id ? (
                                            <textarea
                                                rows={2}
                                                value={questionText}
                                                onChange={(e) =>
                                                    setQuestionText(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full text-xl border-0 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="font-extrabold text-xl">
                                                {items.question}
                                            </p>
                                        )}
                                    </div>
                                    {items.answer && (
                                        <div className="mt-4 flex">
                                            <p className="text-gray-600 text-sm">
                                                {items.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

{/* {||||||||||||||||||||||||||||||||||||||||||||***** Bottom section ( Rating and Reviews ) *****||||||||||||||||||||||||||||||||||||||||||||||||||||||||} */}

            <div className="w-full mt-10 justify-start px-10">
                <div className="text-2xl w-full text-left ">
                    Reviews
                    <hr className="w-full mt-2"></hr>
                </div>

                <div className="w-3/4 py-8 mb-3 flex justify-between  ">
                    <div className="text-left">
                        <p className="text-xl">Overall rating</p>
                        <div className="flex gap-1 items-center ">
                            <p className="text-2xl font-extrabold mr-4">
                                {stars || 0}
                            </p>
                            {[...Array(5)].map((_,indx) => (
                                <FaStar key={indx} className=" size-6 text-yellow-400" />
                            ))}
                            <p className="text-gray-300 text-xs ml-2">
                                {Reviews?.length} reviews
                            </p>
                        </div>
                    </div>

                    <div className="relative group w-fit">
                        <button
                            onClick={() => setReviewForm(true)}
                            disabled={
                                Reviews &&
                                Reviews.map((item) => item.username).includes(
                                    currentUserName?.username
                                )
                            }
                            className={`flex bg-blue-600 text-white px-4 py-2 rounded-lg
                        transition-all duration-300 shadow-md
                        transform active:translate-y-0
                        ${
                            Reviews &&
                            Reviews.map((item) => item.username).includes(
                                currentUserName?.username
                            )
                                ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                                : "hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
                        }`}
                        >
                            <BiMessageAdd className="mr-2 mt-1 size-5" />
                            Add review
                        </button>

                        {Reviews &&
                            Reviews.map((item) => item.username).includes(
                                currentUserName?.username
                            ) && (
                                <div className="absolute left-0 -bottom-8 bg-red-400 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    You've already submitted a review
                                </div>
                            )}
                    </div>
                    <ReviewForm
                        isOpen={reviewForm}
                        onClose={() => setReviewForm(false)}
                        onSubmit={(e) => handleReviewSubmit(e)}
                    />
                </div>
                {Reviews?.length==0 && (<div className="w-full flex flex-col items-center">
                <div className="w-1/2 flex flex-col items-center py-4  gap-4 shadow-xl bg-gray-50 rounded-xl">
                <div className="rounded-full bg-blue-100 p-3">
                <BiMessageAdd className="size-10  text-blue-500 hover:rotate-4" />
                </div>
                    <p className="text-2xl text-gray-800 mt-4">No Review yet...</p>
                    <p className="text-lg text-gray-500 mb-4">Be the first to review this product</p>
                </div>
                </div> )}
             

                <div>
{/* {****************************  Reviews  ****************************} */}

                    {/* {[...Array(noOfR)].map((_,index)=>( */}
                    {Reviews &&
                        Reviews.map((items, idx) => (
                            <div
                                className={`flex py-6 w-sm ml-6 mb-4 justify-center items-center bg-neutral-100 border-1 rounded-xl relative select-none  ${idx % 2 == 0 ? "-right-5" : "-left-5"}`}
                            >
                                <div
                                    className={`size-20 rounded-full overflow-hidden border-2  absolute ${idx % 2 == 0 ? "-left-10" : "-right-10"}`}
                                >
                                    <img
                                        src={items.avatar}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover "
                                    />
                                </div>

                                <div
                                    className={`w-full ${idx % 2 == 0 ? "ml-12 pr-4" : "mr-12 pl-4"} space-y-2`}
                                >
                                    <div
                                        className={`flex items-center justify-between `}
                                    >
                                        <div className=" text-2xl underline underline-offset-1">
                                            {items.username}
                                        </div>
                                        <div className="flex ">
                                            {[...Array(Number(items.star))].map(
                                                (_, index) => (
                                                    <FaStar
                                                        className="text-yellow-400 size-5 mr-1"
                                                        id={index}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-4 text-left text-gray-500">
                                        <p>{items.review}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="w-full mt-10 justify-start">
                <div className="text-xl w-full text-center ">
                    You may also like
                    <hr className="w-full mt-2 "></hr>
                </div>
            </div>
            {questionAdded &&(
                <Toast
                message="Question added successfully !!!"
                onClose={() => setQuestionAdded(false)} 
                />) }
            { questionRemoved &&
                (<Toast
                message=" Question removed successfully !!!"
                onClose={() => setQuestionRemoved(false)} 
                />) 
            }
            { reviewAdded &&
                (<Toast
                message=" Review added successfylly"
                onClose={() => setReviewAdded(false)} 
                />) 

            }
        </div>
    );
}

export default ProductDisplay;
