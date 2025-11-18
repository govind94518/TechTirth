"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import NavContent from "@/components/shared/navbar/NavContent";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
    return (
        <div>
            <Sheet>
                {/* Hamburger icon trigger */}
                <SheetTrigger asChild>
                    <Image
                        src="/assets/icons/hamburger.svg"
                        alt="Menu"
                        width={32}
                        height={32}
                        className="invert-colors sm:hidden cursor-pointer"
                    />
                </SheetTrigger>

                {/* Sidebar Sheet */}
                <SheetContent
                    side="left"
                    className="background-light800_dark300 flex flex-col justify-between p-4"
                >
                    {/* --- Header (Logo) --- */}
                    <div>
                        <Link href="/">
                            <div className="flex items-center gap-2 mb-6">
                                <img
                                    src="/assets/images/site-logo.svg"
                                    alt="TechTirth"
                                    width={23}
                                    height={23}
                                />
                                <p className="h2-bold">
                                     Tech
                                    <span className="text-orange-500">Tirth</span>
                                </p>
                            </div>
                        </Link>

                        {/* --- Navigation Links --- */}
                        <div className="flex flex-col gap-y-2 mt-2 overflow-y-auto">
                            <NavContent />
                        </div>
                    </div>

                    {/* --- Footer (Sign In / Sign Up Buttons) --- */}
                    <SignedOut>
                        <div className="flex flex-col gap-3 mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
                            {/* --- Sign In Button --- */}
                            <SheetClose asChild>
                                <Link href="/sign-in">
                                    <Button
                                        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium
                    shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 min-h-[45px]"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            </SheetClose>

                            {/* --- Sign Up Button --- */}
                            <SheetClose asChild>
                                <Link href="/sign-up">
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-xl border-2 border-orange-400 text-orange-500 font-medium
                    hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all duration-300 min-h-[45px]"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </SignedOut>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileNav;
