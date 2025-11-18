"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Question from "@/database/question.models";
import Tag from "@/database/tag.model";
import {CreateQuestionParams, GetQuestionParams} from "@/lib/actions/shared.types";
import User from "@/database/user.model";
import {revalidatePath} from "next/cache";


export async function getQuestions(params:GetQuestionParams){
    try{
       await connectToDatabase();
        const questions = await Question.find({})
            .select("title tags author upvotes views answer createdAt")
            .populate({ path: "tags", model: Tag, select: "name" })
            .populate({ path: "author", model: User, select: "name" })
            .lean();

        return {
            questions: JSON.parse(JSON.stringify(questions)), // ✅ ensure serializable
        };

    }catch (error){
        console.log(error)
    }
}



export async function createQuestion(params: CreateQuestionParams) {
    try {
        // ✅ Always await connection
        await connectToDatabase();

        const {title, explanation, tags, author, path} = params;
        const question = await Question.create({ title, explanation, author})

        const tagDocuments: string[] = [];

        // ✅ Loop through tags
        for (const tag of tags) {
            // Find or create tag
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                {
                    $setOnInsert: { name: tag },
                    $push: { questions: question._id }, // 👈 relates tag to question
                },
                { upsert: true, new: true }
            );

            tagDocuments.push(existingTag._id);
        }

        // ✅ Update question with tag references
        await Question.findByIdAndUpdate(question._id, {
            $push: {
                tags: { $each: tagDocuments },
            },
        });
        revalidatePath(path)
        console.log("✅ Question created successfully:",  { question });
        return { question };
    } catch (err) {
        console.error("❌ Error creating question:", err);
        throw err;
    }
}
