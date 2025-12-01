import {Schema, models, model, Document} from "mongoose";

export interface IAnswer extends Document {

    author: Schema.Types.ObjectId;
    question: Schema.Types.ObjectId;
    content: string;
    upVotes: Schema.Types.ObjectId[];
    downVotes: Schema.Types.ObjectId[];
    createdAt: Date;
}

const QuestionSchema = new Schema<IAnswer>(
    {
        upVotes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        downVotes: [
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
        question: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
         content: {
            type: String,
             required: true,
         },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {timestamps: true}
);


const Answer =
    models.Answer || model<IAnswer>("Answer", QuestionSchema);

export default Answer;
