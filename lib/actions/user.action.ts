"use server"
import {connectToDatabase} from "@/lib/mongoose";
import User from "@/database/user.model";
import {CreateQuestionParams, DeleteUserParams, UpdateQuestionParams} from "@/lib/actions/shared.types";
import {revalidatePath} from "next/cache";

export async function getUserById(params:any){
    try{
        connectToDatabase();
        const {userId} = params;
        console.log("clerk userId::", userId);
        const user = await User.findOne({clerkId: userId});
        return user;
    }
    catch(err){
        console.log("err I am printing.....");
        console.error(err);
        throw  err;
    }
}

export async function createUser(params:CreateQuestionParams){
    try{
        connectToDatabase();
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
        connectToDatabase();
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
        connectToDatabase();
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
        throw  err;
    }
}