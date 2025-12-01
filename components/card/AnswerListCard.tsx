import AnswerCard from "@/components/card/AnswerCard";
import React from "react";
import { getAnswers } from "@/lib/actions/answer.actions";

// @ts-ignore
const AnswerListCard = async ({ question }) => {
    const result = await getAnswers({ questionId: question._id });

    // Always use array fallback
    const answers = result?.answer || [];

    return (
        <div className="mt-10">
            <h3 className="h3-semibold text-dark300_light700">Answers</h3>

            {answers.length > 0 ? (
                <div className="mt-4">
                    {answers.map((answer) => (
                        <AnswerCard key={answer._id} answer={answer} />
                    ))}
                </div>
            ) : (
                <p className="text-light-500 mt-2">No answers yet. Be the first!</p>
            )}
        </div>
    );
};

export default AnswerListCard;
