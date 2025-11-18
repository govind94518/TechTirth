import mongoose, { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
    name: string;
    description: string;
    questions: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    created: Date;
}

const TagSchema = new Schema<ITag>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description:
            {
                type: String,
                required: true
            },
        questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
        followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        created: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
