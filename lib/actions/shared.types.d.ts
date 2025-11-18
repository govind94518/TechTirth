
export interface GetQuestionParams{
    page?:number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
}
// export interface CreateQuestionParams {
//     title: string;
//     explanation: string;
//     tags: string[];
//     author:  Schema.types.ObjectId|IUser;
//     path?: string;
// }
export interface CreateQuestionParams {
    clerkId?: string;
    name: string;
    email: string;
    username: string;
    password?: string;
    bio?: string;
    picture?: string;
    location?: string;
    reputation?: string;
    joinedAt?: Date;
}
export interface UpdateQuestionParams {
    clerkId: string;
    updateData:CreateQuestionParams;
    path:string
}

export interface GetSavedQuestionParams{
    clerkId: string;
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
}

export interface GetUserStatsParams{
    page?: number;
    pageSize?: number;
    userId: string;
}
export interface DeleteUserParams{
    clerkId: string;
}