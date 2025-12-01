"use server"
import {connectToDatabase} from "@/lib/mongoose";
import User, {IUser} from "@/database/user.model";
import {
    CreateQuestionParams,
    DeleteUserParams,
    GetAllUserParams,
    UpdateQuestionParams
} from "@/lib/actions/shared.types";
import {revalidatePath} from "next/cache";

export async function getUserById(params: { userId: string }) {
    try {
        await connectToDatabase();

        const {userId} = params;

        if (!userId) return null;

        const user = await User.findOne({clerkId: userId});

        return user || null;
    } catch (error) {
        console.error("getUserById failed:", error);
        return null;              // NEVER THROW in Next.js SSR
    }
}

export async function getUserByUserId(params: { userId: string }) {
    try {
        await connectToDatabase();

        const {userId} = params;

        if (!userId) return null;

        const user = await User.findOne({_id: userId});

        return user || null;
    } catch (error) {
        console.error("getUserById failed:", error);
        return null;              // NEVER THROW in Next.js SSR
    }
}

export async function createUser(params: CreateQuestionParams) {
    try {
        await connectToDatabase();
        const newUser = await User.create(params);
        return newUser;
    } catch (err) {
        console.log("err I am printing.....");
        console.error(err);
        throw err;
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        await connectToDatabase();
        const {clerkId} = params;
        const mongoUser = await User.findOneAndDelete({clerkId});
        if (!mongoUser) {
            return new Error("User not found");
        }
        return mongoUser;
    } catch (err) {
        console.log("err I am printing.....");
        console.error(err);
        throw err;
    }
}

export async function updateUser(params: UpdateQuestionParams) {
    try {
        await connectToDatabase();
        const {clerkId, updateData, path} = params;
        const mongoUser = await User.findOneAndUpdate({clerkId}, updateData, {
            new: true,
        });
        revalidatePath(path)
        return mongoUser;
    } catch (err) {
        console.log("err I am printing.....");
        console.error(err);
    }
}

export async function  getAllUserParams(params: GetAllUserParams) {
    try {
          await connectToDatabase();
        // const { page=1,pageSize=20,filter,searchQuery } = params;
        const users:IUser[] = await User.find({})
            .sort({createdAt: -1});
        return {users}
    } catch (error) {
        console.log("err I am printing....");
        console.error(error);
    }
}