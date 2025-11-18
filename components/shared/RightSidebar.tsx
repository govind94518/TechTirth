import Link from "next/link";
import Image from "next/image";
import RenderTag from "@/components/shared/RenderTag";

const RightSidebar = () => {
    const hotQuestions = [
        {
            _id: 1,
            title: "How does React’s virtual DOM improve performance?",
        },
        {
            _id: 2,
            title: "What’s the difference between useEffect and useLayoutEffect in React?",
        },
        {
            _id: 3,
            title: "How do you optimize Next.js apps for better SEO?",
        },
        {
            _id: 4,
            title: "What are the key benefits of using TypeScript in large-scale projects?",
        },
        {
            _id: 5,
            title: "How does Redux Toolkit simplify state management compared to Redux?",
        },
    ];
    const popularTags = [
        {
            _id: 1,
            title: "React",
            totalQuestions: 120,
        },
        {
            _id: 2,
            title: "JavaScript",
            totalQuestions: 150,
        },
        {
            _id: 3,
            title: "Next.js",
            totalQuestions: 95,
        },
        {
            _id: 4,
            title: "TypeScript",
            totalQuestions: 80,
        },
        {
            _id: 5,
            title: "Tailwind CSS",
            totalQuestions: 60,
        },
    ];




    return (
        <section
            className="sticky right-0 top-0 h-screen w-[350px] flex flex-col bg-light-900 dark:bg-dark-200
             p-6   shadow-lg border-l border-gray-200 dark:border-gray-700
             overflow-y-auto max-xl:hidden transition-all duration-300"
        >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                🔥 Top Questions
            </h3>

            <div className="flex flex-col gap-5">
                {hotQuestions.map((question) => (
                    <Link
                        key={question._id}
                        href={`/questions/${question._id}`}
                        className=" flex items-center justify-between p-3  rounded-xl
                   bg-gray-50 dark:bg-dark-300 hover:bg-orange-50 dark:hover:bg-orange-900/30
                   transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <p
                            className="text-gray-700 dark:text-gray-200 group-hover:text-orange-500
                     font-medium leading-snug"
                        >
                            {question.title}
                        </p>
                        <Image
                            src="/assets/icons/chevron-right.svg"
                            alt={question.title}
                            width={20}
                            height={20}
                            className="invert-colors opacity-70 group-hover:opacity-100 transition-all"
                        />
                    </Link>
                ))}
            </div>

            <div className="mt-16">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Popular Tags
                </h3>
                <div className="flex flex-col gap-5">
                    {
                        popularTags.map((tag) => (
                        <RenderTag
                            key={tag._id}
                            _id={tag._id}
                            name={tag.title}
                        totalQuestions={tag.totalQuestions}
                            showCount
                        />
                    ))}
                </div>

            </div>

        </section>

    )
}
export default RightSidebar;