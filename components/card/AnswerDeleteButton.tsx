"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {Trash2, Loader2} from "lucide-react";
import {deleteAnswerById} from "@/lib/actions/answer.actions";

// @ts-ignore
const AnswerDeleteButton = ({answerId}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(false);

    const handleDelete = async () => {

        try {
            setLoading(true);
            await deleteAnswerById({answerId});
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg
        text-gray-600 hover:text-red-600 hover:bg-red-50
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin"/>
            ) : (
                <Trash2 className="w-4 h-4"/>
            )}
            <span
                className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    hover ? "max-w-20 opacity-100" : "max-w-0 opacity-0"
                }`}
            >
        Delete
      </span>
        </button>
    );
};

export default AnswerDeleteButton;