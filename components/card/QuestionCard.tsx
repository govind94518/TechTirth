import Link from "next/link";
import React from "react";
import Tag from "@/components/shared/Tag";
import Metric from "@/components/shared/Metric";
import {getTimestamp} from "@/lib/utils";
import {redirect} from "next/navigation";
import {getUserById, getUserByUserId} from "@/lib/actions/user.action";
import {auth} from "@clerk/nextjs/server";


interface Question {
    _id: number;
    title: string;
    tags: {
        _id: string;
        name: string;
    }[];
    author: string;
    upVotes: number;
    views: number;
    answer: number;
    createdAt: Date;
    picture?: string;
}

interface QuestionCardProps {
    question: Question;
}


const QuestionCard = async({question}: QuestionCardProps) => {
    const author = await getUserByUserId({userId:question.author})
    if (!author) return redirect("/sign-in");
    console.log("Author: ", author);


    return (
        <div className="card-wrapper  rounded-[10px] p-9 sm:px-11 gap-5">

            <div className={'flex flex-col-reverse items-start justify-between sm:flex-row'}>
                <div>
                    <span className={'subtle-regular text-dark200_light800 line-clamp-1 sm:hidden'}>
                          {getTimestamp(question.createdAt)}
                    </span>
                    <Link href={`/question/${question._id}`}>
                        <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                            {question.title}
                        </h3>
                    </Link>
                </div>

            </div>
            <div className="flex  flex-wrap gap-5 mt-5">
                {question.tags.map((tag) => (
                    <Tag _id={tag._id} name={tag.name} totalQuestions={0} showCount={false} key={tag._id}/>
                ))}
            </div>
            <div className="mt-5 flex flex-row gap-5 flex-between ">

                <Metric
                    iconSrc={author?.picture ||'/assets/icons/avatar.svg'}
                    alt='name'
                    value={author.name||""}
                    title={""}
                    textStyle="small-medium  text-light-400 dark:text-light-500 "
                    href={`/question/${question._id}`}
                    createdAt={question.createdAt}
                />

                <div className="flex flex-row gap-5">
                    <Metric
                        iconSrc='/assets/icons/like.svg'
                        alt='upvote'
                        value={question.upVotes}
                        title={"Votes"}
                        height={16}
                        width={16}
                        textStyle="small-medium  text-light-400 dark:text-light-500"
                    />
                    <Metric
                        iconSrc='/assets/icons/message.svg'
                        alt='Answers'
                        value={question.answer}
                        title={"Answers"}
                        textStyle="small-medium  text-light-400 dark:text-light-500"
                    />
                    <Metric
                        iconSrc='/assets/icons/eye.svg'
                        alt='Views'
                        value={question.views}
                        title={"Views"}
                        textStyle="small-medium  text-light-400 dark:text-light-500"
                    />
                </div>
            </div>


        </div>
    )
}
export default QuestionCard;