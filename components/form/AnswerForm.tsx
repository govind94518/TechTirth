"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useState} from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

import {AnswerSchema} from "@/lib/validations";
import {createAnswer} from "@/lib/actions/answer.actions";
import {usePathname} from "next/navigation";

const AnswerForm = ({
                        questionId,
                        authorId,
                    }: {
    questionId: string;
    authorId: string|null;
}) => {
    const pathName = usePathname();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: {
            answer: "",
        },
    });

    // Submit handler
    const handleSubmitAnswer = async (values: z.infer<typeof AnswerSchema>) => {
        try {
            setIsSubmitting(true);

            await createAnswer({
                content: values.answer,
                author: authorId,
                question: questionId,
                path: pathName
            })
            form.reset()
        } catch (error) {
            console.error("Answer submit error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmitAnswer)}
                className="flex flex-col gap-6 mt-6"
            >
                {/* Answer Field */}
                <FormField
                    control={form.control}
                    name="answer"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Your Answer
                                <span className="text-primary">*</span>
                            </FormLabel>

                            <FormControl>
                                <Textarea
                                    {...field}
                                    rows={5}
                                    placeholder="Write your detailed answer..."
                                    className="no-focus paragraph-regular background-light900_dark300 text-dark300_light700 min-h-[120px] border"
                                />
                            </FormControl>

                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium
                     px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg
                     hover:from-orange-500 hover:to-orange-700
                     transition-all duration-200 w-fit min-h-[50px]"
                >
                    {isSubmitting ? "Posting..." : "Post Answer"}
                </Button>
            </form>
        </Form>
    );
};

export default AnswerForm;
