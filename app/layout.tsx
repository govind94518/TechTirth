import {type Metadata} from "next";
import {
    ClerkProvider,
} from "@clerk/nextjs";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import StoreProvider from "@/app/StoreProvider";
import Navbar from "@/components/shared/navbar/Navbar";
import ThemeProvider from "@/components/theme/ThemeProvider";
// ✅ your new Navbar

// ✅ font setup
const inter = Inter({
    subsets: ["latin"],
    weight: [
        "100", "200", "300", "400", "500", "600", "700", "800", "900",
    ],
    variable: "--font-spaceGrotesk",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TechTirth - India's Developer Q&A and Coding Knowledge Community",
    description:
        "TechTirth is India’s developer Q&A platform where programmers, coders, and tech enthusiasts ask questions, share solutions, and grow their skills in coding, debugging, and technology.",
    icons: ["/assets/images/site-logo.svg"],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body
            className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-bold bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
        >
        <ClerkProvider>
            <StoreProvider>
                <ThemeProvider>
                    <Navbar/>
                    {children}
                </ThemeProvider>
            </StoreProvider>
        </ClerkProvider>
        </body>
        </html>
    );
}
