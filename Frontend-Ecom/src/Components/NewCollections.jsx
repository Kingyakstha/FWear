import React from "react";
import Items from "./Items";
import new_collection from "./Assets/new_collections";

function NewCollections() {
    return (
        <div className="w-screen flex flex-col items-center gap-2 px-36">
            <h1 className="text-[#171717] text-2xl font-mono">
                New Collection
            </h1>
            <hr className="w-52 h-2 bg-[#252525] rounded-full"></hr>
            <div className="flex flex-row flex-wrap gap-8 justify-evenly">
                {new_collection.map((items, i) => (
                    <Items
                        key={i}
                        id={items.id}
                        name={items.name}
                        image={items.image}
                        new_price={items.new_price}
                        old_price={items.old_price}
                    />
                ))}
            </div>
        </div>
    );
}

export default NewCollections;
