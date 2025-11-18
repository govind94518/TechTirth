import   { Schema, models, model, Document } from "mongoose";

export interface IQuestion extends Document {
    title: string;
    explanation: string;
    tags: Schema.Types.ObjectId[];
    views: number;
    upVoted: Schema.Types.ObjectId[];
    downVoted: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId;
    answers: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
    {
        title: {
            type: String,
            required: true,
        },
        explanation: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
        views: {
            type: Number,
            default: 0,
        },
        upVoted: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        downVoted: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        answers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Answer",
            },
        ],
    },
    { timestamps: true }
);


const Question =
    models.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
