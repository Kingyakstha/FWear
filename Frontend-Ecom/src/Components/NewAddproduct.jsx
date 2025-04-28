import React, { useState, useRef } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { RiCheckboxCircleFill } from "react-icons/ri";

function NewAddproduct() {
    const [sizeXXL, setSizeXXL] = useState(false);
    const [sizeS, setSizeS] = useState(false);
    const [sizeM, setSizeM] = useState(false);
    const [sizeL, setSizeL] = useState(false);
    const [sizeXL, setSizeXL] = useState(false);

    const [sex, setSex] = useState("");

    const [preview, setPreview] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const noOfImg = 4;

    const [materialInput, setMaterialInput] = useState("");
    const [tags, setTags] = useState([]);

    const handleKeyDown = (e) => {
        if (
            (e.key === "Enter" || e.key === ",") &&
            materialInput.trim() !== ""
        ) {
            e.preventDefault(); // Prevent newline or form submit
            addTag(materialInput.trim());
        }
    };

    const addTag = (value) => {
        if (!tags.includes(value)) {
            setTags([...tags, value]);
        }
        setMaterialInput(""); // Clear input
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const previewSelected = (file) => {
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("image wala clicked", file);
            setSelectedImage(file);
            setPreview((prev) => [...prev, file]);
        }
        console.log("In previews ", preview);
    };
    return (
        <div className="w-screen mt-14 py-6 px-20 ">
            <div className="flex  justify-between px-24 select-none">
                <div className="text-2xl font-medium ">Add New Product</div>
                <div className="flex gap-6">
                    <div className="border-2 rounded-full px-6 py-2 cursor-pointer">
                        Save draft
                    </div>
                    <div className=" rounded-full px-6 py-2 bg-green-300 cursor-pointer">
                        Add Product
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-5 gap-4 ">
                <div className="w-2xl h-full ">
                    <div className="bg-neutral-100 p-4 rounded-xl">
                        <p className="text-xl font-medium select-none">
                            General Information
                        </p>
                        <p className="text-sm mt-3 select-none">Name Product</p>
                        <input
                            label="Name"
                            type="text"
                            className="mt-1 w-full p-3 text-sm rounded-xl bg-neutral-200"
                            placeholder="Product name"
                        />
                        <p className="text-sm mt-3 select-none">
                            Product Description
                        </p>
                        <textarea
                            label="Description"
                            type="text"
                            className="mt-1 w-full h-56 p-3  text-sm rounded-xl bg-neutral-200 align-text-top"
                            placeholder="Description"
                        />
                        <div className="flex justify-between mt-3 select-none">
                            <div className="w-1/2 ">
                                <p className="text-sm">Size</p>
                                <p className="text-xs text-neutral-400">
                                    Pick available size
                                </p>
                                <ul className="flex gap-2 mt-1 text-center">
                                    <li
                                        onClick={() => setSizeS(!sizeS)}
                                        className={`${sizeS ? "bg-green-300" : "bg-neutral-200"} size-12 place-content-center rounded-sm cursor-pointer `}
                                    >
                                        S
                                    </li>
                                    <li
                                        onClick={() => setSizeM(!sizeM)}
                                        className={`${sizeM ? "bg-green-300" : "bg-neutral-200"} size-12 place-content-center rounded-sm cursor-pointer `}
                                    >
                                        M
                                    </li>
                                    <li
                                        onClick={() => setSizeL(!sizeL)}
                                        className={`${sizeL ? "bg-green-300" : "bg-neutral-200"} size-12 place-content-center rounded-sm cursor-pointer `}
                                    >
                                        L
                                    </li>
                                    <li
                                        onClick={() => setSizeXL(!sizeXL)}
                                        className={`${sizeXL ? "bg-green-300" : "bg-neutral-200"} size-12 place-content-center rounded-sm cursor-pointer `}
                                    >
                                        XL
                                    </li>
                                    <li
                                        onClick={() => setSizeXXL(!sizeXXL)}
                                        className={`${sizeXXL ? "bg-green-300" : "bg-neutral-200"} size-12 place-content-center rounded-sm cursor-pointer `}
                                    >
                                        XXL
                                    </li>
                                </ul>
                            </div>
                            <div className="w-1/2 px-4">
                                <p className="text-sm">Gender</p>
                                <p className="text-xs text-neutral-400">
                                    Pick available gender
                                </p>
                                <ul className="flex mt-1 pr-4 items-center h-12 w-full justify-between ">
                                    <li className="flex gap-1 items-center cursor-pointer">
                                        <RiCheckboxCircleFill
                                            className={`${sex == "m" ? "text-green-400" : "text-black"}`}
                                            onClick={() => setSex("m")}
                                        />{" "}
                                        Male
                                    </li>
                                    <li className="flex gap-1 items-center cursor-pointer">
                                        <RiCheckboxCircleFill
                                            className={`${sex == "f" ? "text-green-400" : "text-black"}`}
                                            onClick={() => setSex("f")}
                                        />{" "}
                                        Female
                                    </li>
                                    <li className="flex gap-1 items-center cursor-pointer">
                                        <RiCheckboxCircleFill
                                            className={`${sex == "u" ? "text-green-400" : "text-black"}`}
                                            onClick={() => setSex("u")}
                                        />{" "}
                                        Unisex
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col p-4 mt-6 bg-neutral-100 rounded-xl text-sm select-none">
                        <p className="text-lg font-medium">Pricing & Stockes</p>
                        <div className="flex justify-between gap-2 mt-4 text-sm">
                            <div className="w-1/2">
                                <p>Base Pricing</p>
                                <input
                                    label="price"
                                    type="number"
                                    className="mt-1 w-full h-10 p-3 rounded-lg bg-neutral-200"
                                />

                                <div className="">
                                    <p className="mt-3">Materials</p>
                                    <input
                                        type="text"
                                        value={materialInput}
                                        placeholder="Type a material and press Enter or comma"
                                        onChange={(e) =>
                                            setMaterialInput(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        className="mt-1 w-full h-10 p-3 rounded-lg bg-neutral-200"
                                    />
                                    <div className="mt-4">
                                        {tags.map((tag, id) => (
                                            <span
                                                key={id}
                                                className="h-8 inline-flex items-center text-lg bg-white pl-2 py-1 rounded-sm mr-2 mt-2 shadow-2xl"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() =>
                                                        removeTag(id)
                                                    }
                                                    className="bg-green-400 rounded-r-sm ml-1 px-2 cursor-pointer"
                                                >
                                                    X
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/2 ">
                                <p>Stock</p>
                                <input
                                    label="stock"
                                    type="number"
                                    className="mt-1 w-full h-10 p-3 rounded-lg bg-neutral-200"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-sm h-full">
                    <div className="bg-neutral-100 rounded-xl p-4">
                        <p className="text-xl font-medium">Upload Image</p>
                        {selectedImage ? (
                            <div className="flex h-80 w-full bg-neutral-200 justify-center rounded-2xl mt-3">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="preview"
                                    className=" max-h-80 self-center"
                                />
                            </div>
                        ) : (
                            <div className="flex w-full h-80 bg-neutral-200 rounded-2xl mt-2 justify-center items-center cursor-pointer">
                                <p className="text-center text-3xl">Image</p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 mt-3 cursor-pointer">
                            {preview.map((image) => (
                                <div
                                    className="w-14 h-14 rounded-lg flex justify-center items-center border-2 border-dashed border-neutral-300"
                                    onClick={() => previewSelected(image)}
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="preview"
                                        className=" max-h-14 self-center"
                                    />
                                </div>
                            ))}

                            <div
                                className="w-14 h-14 rounded-lg flex justify-center items-center border-2 border-dashed border-neutral-300"
                                onClick={() => handleClick()}
                            >
                                <IoAddCircleSharp className="h-6 w-6 text-center  text-xl text-green-300 rounded-full " />
                                <input
                                    type="file"
                                    onChange={handleFile} // {()=>handlefile not working} ??
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                            </div>
                        </div>
                        {/* <div className='w-full h-10 bg-emerald-100'> add images</div> */}
                    </div>

                    <div className="bg-neutral-100 rounded-xl p-4 mt-4">
                        <p className="text-xl font-medium">Category</p>
                        <p className="text-sm mt-2">Product category</p>
                        <select className="mt-1 w-full px-2 h-10 rounded-lg bg-neutral-200">
                            <option>Clothes</option>
                            <option>Shoes</option>
                            <option>Bags</option>
                            <option>Accessories</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewAddproduct;
