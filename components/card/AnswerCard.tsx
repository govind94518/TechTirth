import React from "react";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import AnswerDeleteButton from "./AnswerDeleteButton";
import { auth } from "@clerk/nextjs/server";

// @ts-ignore
const AnswerCard = async ({ answer }) => {
    const { userId } = await auth();

    // Ensure we check safely (in case auth is null)
    const currentUserId = userId;

    return (
        <div
            // 1. ADD 'group' HERE
            className="group border border-light-800 dark:border-dark-300 p-4 rounded-lg mt-4 w-full"
        >
            {/* Author Section */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <img
                        src={answer?.author?.picture}
                        alt="user"
                        width={28}
                        height={28}
                        className="rounded-full object-cover aspect-square"
                    />

                    <div>
                        <Link
                            href={`/profile/${answer?.author?.clerkId}`}
                            className="font-medium text-dark300_light700"
                        >
                            {answer?.author?.name}
                        </Link>

                        <p className="text-light-500 text-xs">
                            {getTimestamp(answer.createdAt)}
                        </p>
                    </div>
                </div>

                {/* DELETE BUTTON */}
                {/* Only render if user owns the answer */}
                {currentUserId === answer?.author?.clerkId && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        {/* Pass the answer ID as a plain string to avoid serialization issues */}
                        <AnswerDeleteButton answerId={JSON.parse(JSON.stringify(answer._id))} />
                    </div>
                )}
            </div>

            {/* Answer Content */}
            <p className="text-dark300_light700 leading-6 mt-2">
                {answer.content}
            </p>
        </div>
    );
};

export default AnswerCard;