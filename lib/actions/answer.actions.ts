"use server"
import {connectToDatabase} from "@/lib/mongoose";
import Answer from "@/database/answer.model";
import Question from "@/database/question.models";
import {revalidatePath} from "next/cache";
import {GetAnswerParams} from "@/lib/actions/shared.types";
import User from "@/database/user.model";

export async function createAnswer(params: { content: any; author: any; question: any; path: any; }) {
    try {
        await connectToDatabase()
        const {content, author, question, path} = params;
        const newAnswer =  await Answer.create({content, author, question});
        await Question.findByIdAndUpdate(question, {
            $push: {answer: newAnswer._id}
        })
        revalidatePath(path)
    } catch (err) {
        console.log(err);
    }

}



export async function getAnswers(params: GetAnswerParams) {
    try {
        await connectToDatabase();

        const { questionId } = params;

        const answer = await Answer.find({ question: questionId })
            .populate({
                path: "author",
                model: User,
                select: "_id clerkId name picture"
            })
            .sort({ createdAt: -1 });

        return { answer };

    } catch (err) {
        console.log(err);
    }
}

export async function deleteAnswerById(params: { answerId: any; }) {
    try {
        await connectToDatabase();

        const { answerId} = params;

        const answer = await Answer.findByIdAndDelete({ _id: answerId })

        return { answer };

    } catch (err) {
        console.log(err);
    }
}