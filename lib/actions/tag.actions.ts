import {GetAllUserParams, GetTopInteractedParams} from "@/lib/actions/shared.types";
import { connectToDatabase } from "@/lib/mongoose";
import User, {IUser} from "@/database/user.model";
import Tag from "@/database/tag.model";

const randomTagName = () => {
    const words = [
        "alpha", "delta", "nova", "spark", "pixel", "fusion", "orbit", "zen",
        "flare", "prime", "byte", "pulse", "shift", "echo", "wave", "logic"
    ];
    return words[Math.floor(Math.random() * words.length)];
};

export async function getTopInteractedTags(params: GetTopInteractedParams) {
    try {
        await connectToDatabase();
        const { userId, limit = 3 } = params;

        await User.findById(userId);

        return Array.from({ length: limit }).map((_, i) => ({
            _id: `${i + 1}`,
            name: randomTagName(),
        }));

    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function  getAllTags(params: GetAllUserParams) {
    try {
        await connectToDatabase();
        // const { page=1,pageSize=20,filter,searchQuery } = params;
        const tags:IUser[] = await Tag.find({})
            .sort({createdAt: -1});
        return {tags}
    } catch (error) {
        console.log("err I am printing....");
        console.error(error);
    }
}