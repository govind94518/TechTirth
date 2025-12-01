"use server";

import {connectToDatabase} from "@/lib/mongoose";
import Question, {IQuestion} from "@/database/question.models";
import Tag from "@/database/tag.model";
import {CreateQuestionParams, GetQuestionByIdParams, GetQuestionParams} from "@/lib/actions/shared.types";
import User from "@/database/user.model";
import {revalidatePath} from "next/cache";
import Answer from "@/database/answer.model";


export async function getQuestions(params: GetQuestionParams) {
    try {
        await connectToDatabase();
        const questions = await Question.find({})
            .select("title tags author upvotes views answer createdAt")
            .populate({path: "tags", model: Tag, select: "name"})
            .populate({path: "author", model: User, select: "name"})
            .lean();

        return {
            questions: JSON.parse(JSON.stringify(questions)),
        };

    } catch (error) {
        console.log(error)
    }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
    try {

        await connectToDatabase();
        const {questionId} = params;
        const question = await Question.findById(questionId)
            .populate({path: "tags", model: Tag, select: "_id name"})
            .populate({path: "author", model: User, select: "_id clerkId name picture"})

        return question

    } catch (error) {
        console.log(error)
    }
}


export async function createQuestion(params: CreateQuestionParams) {
    try {
        // ✅ Always await connection
        await connectToDatabase();

        // @ts-ignore
        const {title, explanation, tags, author, path} = params;
        const question = await Question.create({title, explanation, author})

        const tagDocuments: string[] = [];

        // @ts-ignore
        for (const tag of tags) {
            // Find or create tag
            const existingTag = await Tag.findOneAndUpdate(
                {name: {$regex: new RegExp(`^${tag}$`, "i")}},
                {
                    $setOnInsert: {name: tag},
                    $push: {questions: question._id}, // 👈 relates tag to question
                },
                {upsert: true, new: true}
            );

            tagDocuments.push(existingTag._id);
        }

        // ✅ Update question with tag references
        await Question.findByIdAndUpdate(question._id, {
            $push: {
                tags: {$each: tagDocuments},
            },
        });
        if (path != null) {
            revalidatePath(path)
        }
        // console.log("✅ Question created successfully:",  { question });
        return {question};
    } catch (err) {
        console.error("❌ Error creating question:", err);
        throw err;
    }
}
