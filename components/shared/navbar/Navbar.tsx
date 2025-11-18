// components/Navbar.tsx
"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {ThemeButton} from "@/components/theme/ThemeSwitcher";
import MobileNav from "@/components/shared/navbar/MobileNav";
import GlobalSearchBar from "@/components/shared/search/GlobalSearch";

export default function Navbar() {
    return (
        <header className="flex flex-1 justify-between items-center p-4 gap-4 h-16 border-b border-gray-200 dark:border-gray-700">
            <Link href="/">
                <div className="flex items-center gap-2">
                    <img
                        src="/assets/images/site-logo.svg"
                        alt="TechTirth"
                        width={23}
                        height={23}
                    />
                    <p className="text-xl font-bold font-spaceGrotesk text-dark-500 dark:text-white max-sm:hidden">
                        Tech
                        <span className="text-orange-500">Tirth</span>
                    </p>
                </div>
            </Link>

            <div>
                 <GlobalSearchBar/>
            </div>

            <div className="flex items-center gap-4">
                <ThemeButton/>
                <SignedOut>
                    <SignInButton mode="modal" afterSignInUrl="/">
                        <button className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-transparent border-none">
                            Sign In
                        </button>
                    </SignInButton>

                    <SignUpButton mode="modal" afterSignUpUrl="/">
                        <button className="bg-[#6c47ff] hover:bg-[#5a3dd9] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer flex items-center justify-center transition-colors border-none">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
                <MobileNav/>
            </div>
        </header>
    );
}