import { getQuestionById } from "@/lib/actions/question.action";
import Link from "next/link";
import Metric from "@/components/shared/Metric";
import React from "react";
import { getTimestamp } from "@/lib/utils";
import AnswerForm from "@/components/form/AnswerForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import AnswerListCard from "@/components/card/AnswerListCard";

const Page = async ({ params }) => {
    const { id } = await params;

    // Fetch question using correct key
    const question = await getQuestionById({ questionId: id });

    // If not found, show error before returning JSX
    if (!question) {
        return (
            <div className="mt-10 text-red-500">
                Question not found or has been deleted.
            </div>
        );
    }

    // Get logged-in user
    const { userId } = await auth();
    let user = null;

    if (userId) {
        user = await getUserById({ userId });
    }

    return (
        <div className="">
            {/* Top Section */}
            <div className="flex w-full justify-between items-center gap-5 sm:flex-row sm:gap-2">
                <Link
                    href={`/profile/${question?.author?.clerkId}`}
                    className="flex items-center justify-start gap-1"
                >
                    <div className="flex items-center gap-2">
                        <img
                            src={question?.author?.picture}
                            alt="profile"
                            width={22}
                            height={22}
                            className="rounded-full object-cover aspect-square"
                        />
                        <p className="paragraph-semibold text-dark300_light700">
                            {question?.author?.name}
                        </p>
                    </div>
                </Link>

                <div className="flex justify-end">VOTING</div>
            </div>

            {/* Title */}
            <h2 className="h2-semibold mt-3.5 text-dark300_light700 w-full text-left">
                {question.title}
            </h2>

            {/* Metrics */}
            <div className="flex flex-row gap-5 mt-4">
                <Metric
                    iconSrc="/assets/icons/clock.svg"
                    alt="clock icon"
                    value={getTimestamp(question.createdAt)}
                    title="Asked "
                    height={16}
                    width={16}
                    textStyle="small-medium text-light-400 dark:text-light-500"
                />

                <Metric
                    iconSrc="/assets/icons/message.svg"
                    alt="Answers"
                    value={question.answers?.length || 0}
                    title="Answers"
                    textStyle="small-medium text-light-400 dark:text-light-500"
                />

                <Metric
                    iconSrc="/assets/icons/eye.svg"
                    alt="Views"
                    value={question.views || 0}
                    title="Views"
                    textStyle="small-medium text-light-400 dark:text-light-500"
                />
            </div>

            {/* ANSWER LIST */}
            <AnswerListCard question={question} />

            {/* ANSWER FORM */}
            <h3 className="h3-semibold mt-10 text-dark300_light700">Your Answer</h3>
            <AnswerForm questionId={question._id} authorId={user?._id} />
        </div>
    );
};

export default Page;
