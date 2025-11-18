"use client";

import { useState } from "react";
import Image from "next/image";
import searchIcon from "/public/assets/icons/search.svg";

const GlobalSearchBar = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2 w-full shadow-sm max-lg:hidden">
            {/* Search Icon */}
            <div className="w-5 h-5 relative flex-shrink-0">
                <Image src={searchIcon} alt="Search" fill className="object-contain" />
            </div>

            {/* Input */}
            <input
                type="text"
                placeholder="Search Globally..."
                className="bg-transparent flex-1 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 w-full"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    );
};

export default GlobalSearchBar;
