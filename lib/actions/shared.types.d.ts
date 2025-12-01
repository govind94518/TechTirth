export interface GetQuestionParams {
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
}

export interface GetQuestionByIdParams {
    questionId: string;
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
    title?: string;
    tags?: string[];
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    bio?: string;
    picture?: string;
    location?: string;
    reputation?: string;
    explanation?: string;
    joinedAt?: Date;
    path?: string;
    author?: string;
}

export interface UpdateQuestionParams {
    clerkId: string;
    updateData: CreateQuestionParams;
    path: string
}

export interface GetSavedQuestionParams {
    clerkId: string;
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
}

export interface GetUserStatsParams {
    page?: number;
    pageSize?: number;
    userId: string;
}

export interface DeleteUserParams {
    clerkId: string;
}

export interface GetAllUserParams {
    page?: number;
    pageSize?: number;
    filter?: string;
    searchQuery?: string;
}

export interface GetTopInteractedParams {
    userId: string;
    limit?: number;
}

export interface GetAllTagsParams {
    page?: number;
    pageSize?: number;
    filter?: string;
    searchQuery?: string;
}

export interface GetAnswerParams {
    questionId: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
}