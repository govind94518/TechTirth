'use client'

import {Button} from "@/components/ui/button";

interface Filter {
    value: string
    name: string
}

interface HomeFiltersProps {
    filters: Filter[]
}

const HomeFilters = ({filters = []}: HomeFiltersProps) => {
    const activeLabel = "newest"

    return (
        <div className="hidden md:flex gap-6 flex-wrap">
            {filters.map((filter) => (
                <Button
                    key={filter.value}
                    className={`mt-10 rounded-lg transition-colors duration-200
            ${
                        activeLabel === filter.value
                            ? "primary-gradient text-white"
                            : "bg-gray-200 text-dark-500    hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                    }`}
                >
                    {filter.name}
                </Button>
            ))}
        </div>
    )
}

export default HomeFilters
