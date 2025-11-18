'use client'
import {sidebarLinks} from "@/constants";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";

const LeftSidebar = () => {
    const pathname = usePathname();
    return (
        <section className="flex h-screen   w-auto  custom-scrollbar sticky left-0 top-0 flex-col gap-8 pt-10 shadow-2xl dark:shadow-none overflow-y-auto background-light900_dark200 max-sm:hidden shadow-light-900">
            {
                sidebarLinks.map((link, index) => {
                    const isActive =
                        pathname === link.route ||
                        pathname.startsWith(`${link.route}/`);

                    return (
                        <div key={index} className="flex flex-col gap-y-2">
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
                                    } max-lg:hidden
                                    `}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        </div>
                    );
                })}
        </section>
    )
}
export default LeftSidebar;