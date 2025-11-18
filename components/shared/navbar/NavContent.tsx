"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";

const NavContent = () => {
    const pathname = usePathname();

    return (
        <section className="flex h-full flex-col gap-6 pt-10">
            {
                sidebarLinks.map((link, index) => {
                // ✅ Mark as active if pathname starts with link.route
                const isActive =
                    pathname === link.route ||
                    pathname.startsWith(`${link.route}/`);

                return (
                    <SheetClose asChild key={index}>
                        <Link
                            href={link.route}
                            className={`group flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 
                ${
                                isActive
                                    ? "bg-orange-500 text-white shadow-md"
                                    : "text-dark300_light900"
                            }`}
                        >
                            <div className="flex items-center justify-center w-6 h-6">
                                <Image
                                    src={link.imgURL}
                                    alt={link.label}
                                    width={20}
                                    height={20}
                                    className={`object-contain transition-all duration-300 ${
                                        isActive ? "" : "invert-colors  "
                                    }`}
                                />
                            </div>
                            <span
                                className={`text-sm font-medium ${
                                    isActive
                                        ? "text-white"
                                        : "group-hover:text-orange-600 dark:group-hover:text-orange-400"
                                }`}
                            >
                {link.label}
              </span>
                        </Link>
                    </SheetClose>
                );
            })}
        </section>
    );
};

export default NavContent;
