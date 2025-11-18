import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { HomePageFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/card/question/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";

export default async function HomePage() {
    // Fetch questions safely and add fallback to prevent undefined access
    const result = (await getQuestions({})) || { questions: [] };

    console.log("result::", result);

    return (
        <>
            <div className="flex w-full flex-col-reverse sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="h1-bold text-dark100_light900 whitespace-nowrap sm:text-left max-sm:justify-start">
                    All Questions
                </h1>

                <Link
                    href="/ask-question"
                    className="flex justify-end w-full sm:w-auto"
                >
                    <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 rounded-lg sm:w-auto">
                        Ask a Question
                    </Button>
                </Link>
            </div>

            <div className="mt-11 flex flex-1 justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchBar
                    route="/ask-question"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for a Questions"
                    otherClasses="flex-1"
                />

                <Filter
                    filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                    containerClasses="hidden max-md:flex"
                />
            </div>

            <HomeFilters filters={HomePageFilters} />

            <div className="mt-9 py-2.5">
                {result.questions.length > 0 ? (
                    result.questions.map((question: any) => (
                        <QuestionCard key={question._id} question={question} />
                    ))
                ) : (
                    <NoResult
                        title="There's no question to show"
                        description="Be the first to break the silence! 🚀 Ask a question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
                        link="/ask-question"
                        linkTitle="Ask a Question"
                    />
                )}
            </div>
        </>
    );
}
