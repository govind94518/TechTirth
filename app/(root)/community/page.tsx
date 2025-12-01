import Link from "next/link";
import {Button} from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import { UserFilters} from "@/constants/filters";
import React from "react";
import {getAllUserParams} from "@/lib/actions/user.action";
import NoResult from "@/components/shared/NoResult";
import UserCard from "@/components/card/UserCard";

const page = async () => {
    const  result = await getAllUserParams({})|| { users: [] }
    return (
        <>
            <div className="flex w-full flex-col-reverse sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="h1-bold text-dark100_light900 whitespace-nowrap sm:text-left max-sm:justify-start">
                   All Users
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
                    placeholder="Search for amazing minds"
                    otherClasses="flex-1"
                />

                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>
            <section className={` mt-12 flex flex-wrap gap-4 ` }>
                {result.users.length > 0 ? (
                    result.users.map((user: any) => (
                       <div className={'dark:'} key={user._id}>
                           <UserCard key={user._id} user={user} />
                       </div>
                    ))
                ) : (
                    <NoResult
                        title="There's no question to show"
                        description="Be the first to break the silence! 🚀 Ask a question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
                        link="/ask-question"
                        linkTitle="Ask a Question"
                    />
                )}
            </section>
        </>
    )
}
export default page;