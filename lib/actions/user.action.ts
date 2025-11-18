"use server"
import {connectToDatabase} from "@/lib/mongoose";
import User from "@/database/user.model";
import {CreateQuestionParams, DeleteUserParams, UpdateQuestionParams} from "@/lib/actions/shared.types";
import {revalidatePath} from "next/cache";

export async function getUserById(params: { userId: string }) {
    try {
        await connectToDatabase();

        const { userId } = params;

        if (!userId) throw new Error("Missing userId");

        const user = await User.findOne({ clerkId: userId });

        if (!user) throw new Error("User not found");

        return user;
    } catch (error) {
        console.error("getUserById failed:", error);
        throw error;
    }
}

export async function createUser(params:CreateQuestionParams){
    try{
        await connectToDatabase();
        const newUser = await User.create(params);
        return newUser;
    }
    catch(err){
        console.log("err I am printing.....");
        console.error(err);
        throw  err;
    }
}

export async function deleteUser(params:DeleteUserParams){
    try{
        await connectToDatabase();
        const { clerkId} = params;
         const mongoUser = await User.findOneAndDelete({clerkId});
         if(!mongoUser){
             return new Error("User not found");
         }
        return mongoUser;
    }
    catch(err){
        console.log("err I am printing.....");
        console.error(err);
        throw  err;
    }
}
export async function updateUser(params:UpdateQuestionParams){
    try{
        await connectToDatabase();
        const { clerkId,updateData,path} = params;
        const mongoUser = await User.findOneAndUpdate({clerkId},updateData,{
            new: true,
        });
        revalidatePath(path)
        return mongoUser;
    }
    catch(err){
        console.log("err I am printing.....");
        console.error(err);
    }
}