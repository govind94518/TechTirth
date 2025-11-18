'use client';
import { useState } from "react";
import Image from "next/image";

interface CustomInputProps {
    route: string;
    iconPosition: "left" | "right";
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
}

const LocalSearchBar = ({
                            route,
                            iconPosition,
                            imgSrc,
                            placeholder,
                            otherClasses = "",
                        }: CustomInputProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div
            className={`background-light800_dark400 flex min-h-[56px] grow items-center rounded-lg gap-4 px-4 ${otherClasses}`}
        >
            {iconPosition === "left" && (
                <Image src={imgSrc} alt="search icon" width={24} height={24} />
            )}

            <input
                type="text"
                placeholder={placeholder}
                className="bg-transparent flex-1 outline-none no-focus text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {iconPosition === "right" && (
                <Image src={imgSrc} alt="search icon" width={24} height={24} />
            )}
        </div>
    );
};

export default LocalSearchBar;
