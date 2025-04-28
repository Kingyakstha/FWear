import React, { useEffect, useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { RxCross2, RxPlus } from "react-icons/rx";

function Filter({ filters, onFilterChange }) {
    const [category, setCategory] = useState(true);
    const [size, setSize] = useState(true);
    const [color, setColor] = useState(true);
    const [price, setPrice] = useState(true);

    const clearFilter = () => {
        onFilterChange({
            categoryFilter: [],
            sizeFilter: [],
            colorFilter: [],
            priceFilter: [],
        });
        console.log("All cleared !!!");
    };

    const handleCategoryCheckbox = (e) => {
        const value = e.target.value;
        let newCategoryFilter = [];
        if (e.target.checked) {
            newCategoryFilter = [...filters.categoryFilter, value];
        } else {
            newCategoryFilter = filters.categoryFilter.filter(
                (item) => item !== value
            );
        }
        onFilterChange({ ...filters, categoryFilter: newCategoryFilter });
    };

    const handleSizeCheckbox = (e) => {
        const value = e.target.value;
        let newSizeFilter = [];
        if (e.target.checked) {
            newSizeFilter = [...filters.sizeFilter, value];
        } else {
            newSizeFilter = filters.sizeFilter.filter((item) => item !== value);
        }
        onFilterChange({ ...filters, sizeFilter: newSizeFilter });
    };

    const handleColorCheckbox = (e) => {
        const value = e.target.value;
        let newCategoryFilter = [];
        if (e.target.checked) {
            newCategoryFilter = [...filters.colorFilter, value];
        } else {
            newCategoryFilter = filters.colorFilter.filter(
                (item) => item !== value
            );
        }
        onFilterChange({ ...filters, colorFilter: newCategoryFilter });
    };

    const handlePriceCheckbox = (e) => {
        const value = e.target.value;
        let newSizeFilter = [];
        if (e.target.checked) {
            newSizeFilter = [...filters.priceFilter, value];
        } else {
            newSizeFilter = filters.priceFilter.filter(
                (item) => item !== value
            );
        }
        onFilterChange({ ...filters, priceFilter: newSizeFilter });
    };

    return (
        <div className="w-full ml-5 p-4 space-y-6 flex flex-col items-center rounded-2xl border-2 select-none ">
            <p className="text-left w-full text-2xl font-semibold">Filter</p>

            <div className="w-full ">
                <div className="flex justify-between mb-2 text-lg font-semibold">
                    <p>Category</p>
                    <p
                        onClick={() => {
                            setCategory((prev) => !prev);
                            console.log("Hi", category);
                        }}
                        className="cursor-pointer"
                    >
                        {" "}
                        {category ? (
                            <IoIosArrowDropup className="size-5" />
                        ) : (
                            <IoIosArrowDropdown className="size-5" />
                        )}
                    </p>
                </div>
                {category &&
                    ["Shirt", "Pants", "Dress", "Jackets"].map(
                        (items, indx) => {
                            return (
                                <div
                                    key={items + indx}
                                    className="flex gap-2 items-center"
                                >
                                    <input
                                        type="checkbox"
                                        className="size-4"
                                        value={items}
                                        checked={filters.categoryFilter.includes(
                                            items
                                        )}
                                        onChange={handleCategoryCheckbox}
                                    />
                                    <p>{items}</p>
                                </div>
                            );
                        }
                    )}

                <hr className="mt-4"></hr>
            </div>

            <div className="w-full">
                <div className="flex justify-between mb-2 text-lg font-semibold">
                    <p>Sizes</p>
                    <p
                        onClick={() => setSize((prev) => !prev)}
                        className="cursor-pointer"
                    >
                        {size ? (
                            <IoIosArrowDropup className="size-5" />
                        ) : (
                            <IoIosArrowDropdown className="size-5" />
                        )}
                    </p>
                </div>
                {size &&
                    ["XS", "S", "L", "XL"].map((items, indx) => {
                        return (
                            <div
                                key={items + indx}
                                className="flex gap-2 items-center"
                            >
                                <input
                                    type="checkbox"
                                    className="size-4"
                                    value={items}
                                    checked={filters.sizeFilter.includes(items)}
                                    onChange={handleSizeCheckbox}
                                />
                                <p>{items}</p>
                            </div>
                        );
                    })}
                <hr className="mt-4"></hr>
            </div>

            <div className="w-full">
                <div className="flex justify-between mb-2 text-lg font-semibold">
                    <p>Color</p>
                    <p
                        onClick={() => setColor((prev) => !prev)}
                        className="cursor-pointer"
                    >
                        {color ? (
                            <IoIosArrowDropup className="size-5" />
                        ) : (
                            <IoIosArrowDropdown className="size-5" />
                        )}
                    </p>
                </div>
                {color &&
                    ["Black", "Blue", "Red", "White"].map((items, indx) => {
                        return (
                            <div
                                key={items + indx}
                                className="flex gap-2 items-center"
                            >
                                <input
                                    type="checkbox"
                                    className="size-4"
                                    value={items}
                                    checked={filters.colorFilter.includes(
                                        items
                                    )}
                                    onChange={handleColorCheckbox}
                                />
                                <p>{items}</p>
                            </div>
                        );
                    })}
                <hr className="mt-4"></hr>
            </div>

            <div className="w-full">
                <div className="flex justify-between mb-2 text-lg font-semibold">
                    <p>Price</p>
                    <p
                        onClick={() => setPrice((prev) => !prev)}
                        className="cursor-pointer"
                    >
                        {price ? (
                            <IoIosArrowDropup className="size-5" />
                        ) : (
                            <IoIosArrowDropdown className="size-5" />
                        )}
                    </p>
                </div>
                {price &&
                    ["Under $25", "$25 - $50", "$50 - $100", "Over $100"].map(
                        (items, indx) => {
                            return (
                                <div
                                    key={items + indx}
                                    className="flex gap-2 items-center"
                                >
                                    <input
                                        type="checkbox"
                                        className="size-4"
                                        value={items}
                                        checked={filters.priceFilter.includes(
                                            items
                                        )}
                                        onChange={handlePriceCheckbox}
                                    />
                                    <p>{items}</p>
                                </div>
                            );
                        }
                    )}
                <hr className="mt-4"></hr>
            </div>

            {(filters.categoryFilter.length != 0 ||
                filters.sizeFilter.length != 0 ||
                filters.priceFilter.length != 0 ||
                filters.colorFilter.length != 0) && (
                <div className="w-3/4 flex justify-center rounded-xl hover:bg-blue-300 duration-300">
                    <p className="py-2" onClick={clearFilter}>
                        Clear Filter
                    </p>
                </div>
            )}
        </div>
    );
}

export default Filter;
