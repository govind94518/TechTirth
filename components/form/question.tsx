"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useRouter, usePathname} from "next/navigation";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {questionSchema} from "@/lib/validations";
import React from "react";
import Image from "next/image";
import {createQuestion} from "@/lib/actions/question.action";

const type: any = "create"

interface props {
    mongoUserId: string
}

const Question = ({mongoUserId}: props) => {

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const router = useRouter();
    const pathName = usePathname();

    const form = useForm<z.infer<typeof questionSchema>>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            title: "",
            explanation: "",
            tags: [],
        },
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const tagValue = e.currentTarget.value.trim();
            if (!tagValue) return;

            if (tagValue.length > 15) {
                return form.setError("tags", {
                    type: "manual",
                    message: "Tags must be less than 15 characters",
                });
            }

            if (!field.value.includes(tagValue)) {
                form.setValue("tags", [...field.value, tagValue]);
                e.currentTarget.value = "";
                form.clearErrors("tags");
            } else {
                form.trigger();
            }
        }
    };

    async function onSubmit(values: z.infer<typeof questionSchema>) {
        console.log(values);
        setIsSubmitting(true);
        try {
            await createQuestion({
                title: values.title,
                explanation: values.explanation,
                tags: values.tags,
                author: JSON.parse(mongoUserId),
                path:"/"
            });
            router.push("/");

        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col mt-10 space-y-10"
            >
                {/* Question Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="paragraph-semibold text-dark400_light800 mt-3.5">
                                Question Title
                                <span className="primary-text-gradient">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="no-focus paragraph-regular background-light900_dark300 text-dark300_light700 min-h-[56px] border"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-light400_light500">
                                Be specific and imagine you&apos;re asking a question to another person
                            </FormDescription>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />

                {/* Explanation */}
                <FormField
                    control={form.control}
                    name="explanation"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Detailed explanation of your problem
                                <span className="primary-text-gradient">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Add description here..."
                                    className="no-focus paragraph-regular background-light900_dark300 text-dark300_light700 min-h-[56px] border"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Introduce the problem and expand on what you put in the title.
                                Minimum 20 characters.
                            </FormDescription>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />

                {/* Tags */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Tags
                                <span className="primary-text-gradient">*</span>
                            </FormLabel>
                            <FormControl>
                                <>
                                    <Input
                                        placeholder="Add tags..."
                                        className="no-focus paragraph-regular background-light900_dark300 text-dark300_light700 min-h-[56px] border"
                                        onKeyDown={(e) => handleKeyDown(e, field)}
                                    />
                                    {
                                        field.value.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2.5">
                                                {
                                                    field.value.map((tag: string) => (
                                                        <div
                                                            key={tag}
                                                            className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full"
                                                        >
                                                            <span className="text-sm font-medium">{tag}</span>
                                                            <Image
                                                                src="/assets/icons/close.svg"
                                                                alt="close"
                                                                width={12}
                                                                height={12}
                                                                className="cursor-pointer object-contain"
                                                                onClick={
                                                                    () =>
                                                                        form.setValue(
                                                                            "tags",
                                                                            field.value.filter((t: string) => t !== tag)
                                                                        )
                                                                }
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </>
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Add up to 3 tags to describe what your question is about. Start
                                typing to see suggestions.
                            </FormDescription>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />

                {
                    /* Submit Button */}
                <Button
                    type="submit"
                    className=" flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium
                                    px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg
                                    hover:from-orange-500 hover:to-orange-700
                                    transition-all duration-200 w-fit min-h-[50px]"
                    disabled={isSubmitting}
                >
                    {
                        isSubmitting ? (
                            <>
                                {
                                    type === "edit" ? "Editing..." : "Posting..."
                                }
                            </>
                        ) : (
                            <>
                                {
                                    type === "edit" ? "Edit Question" : "Ask a Question"
                                }
                            </>
                        )
                    }
                </Button>
            </form>
        </Form>
    );
};

export default Question;
