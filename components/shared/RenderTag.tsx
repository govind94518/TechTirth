interface Props {
    _id: number;
    name: string;
    totalQuestions?: number;
    showCount?: boolean;
}

const RenderTag = ({_id, name, totalQuestions, showCount}: Props) => {
    return (
        <div
            key={_id}
            className="flex items-center justify-between bg-orange-50 dark:bg-dark-300
                 px-4 py-2 rounded-xl shadow-sm hover:bg-orange-100
                 dark:hover:bg-orange-400/20 transition-all duration-300"
        >
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {name}
            </p>

            {
                showCount
                && (
                    <span className="text-xs text-gray-600 dark:text-gray-300">
          {totalQuestions}
        </span>
                )}
        </div>
    );
};

export default RenderTag;
