import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import React from "react";
import NoResult from "@/components/shared/NoResult";
import { getAllTags } from "@/lib/actions/tag.actions";
import Link from "next/link";

const page = async () => {
    const result = await getAllTags({}) || { tags: [] };

    return (
        <>
            <div className="flex w-full flex-col-reverse sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="h1-bold text-dark100_light900 whitespace-nowrap sm:text-left">
                    All Tags
                </h1>
            </div>

            <div className="mt-11 flex flex-1 justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchBar
                    route="/tags"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for tags"
                    otherClasses="flex-1"
                />

                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>

            <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {result.tags.length > 0 ? (
                    result.tags.map((tag: any) => (
                        <Link
                            href={`/tags/${tag._id}`}
                            key={tag._id}
                            className="block p-5 rounded-xl bg-gray-100 dark:bg-gray-900
             shadow-[5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.05)]
             hover:shadow-[2px_2px_5px_rgba(0,0,0,0.4)] transition"
                        >
                            <h3 className="text-lg font-semibold">#{tag.name}</h3>
                            <p className="text-sm text-gray-500">{tag.count ?? 0} Questions</p>
                        </Link>

                    ))
                ) : (
                    <NoResult
                        title="There's no Tags to show"
                        description="Be the first to break the silence!"
                        link="/ask-question"
                        linkTitle="Ask a Question"
                    />
                )}
            </section>

        </>
    );
};

export default page;
