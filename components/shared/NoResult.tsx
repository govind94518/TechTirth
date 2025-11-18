import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";

interface NoResultProps {
    title: string;
    description: string;
    link: string;
    linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: NoResultProps) => {
    return (
        <div className=" flex flex-col items-center justify-center w-full text-center gap-4">
            {/* Light mode illustration */}
            <Image
                src="/assets/images/light-illustration.png"
                alt="No result illustration"
                width={270}
                height={200}
                className="block object-contain dark:hidden"
                priority
            />

            {/* Dark mode illustration */}
            <Image
                src="/assets/images/dark-illustration.png"
                alt="No result illustration"
                width={270}
                height={200}
                className="hidden object-contain dark:block"
                priority
            />

            <p className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
                {title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                {description}
            </p>

            <Link
                href="/ask-question"
                className="flex    justify-end w-full sm:w-auto"
            >
                <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 rounded-lg sm:w-auto">
                    Ask a Question
                </Button>
            </Link>
        </div>
    );
};

export default NoResult;
