'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface FilterOption {
    name: string
    value: string
}

interface Props {
    filters: FilterOption[]
    otherClasses?: string
    containerClasses?: string
}

const Filter = ({ filters = [], otherClasses = "", containerClasses = "" }: Props) => {
    return (
        <div className={` relative ${containerClasses}`}>
            <Select>
                <SelectTrigger
                    className={`border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800
          text-gray-500 dark:text-gray-200 px-5 py-2.5 rounded-xl shadow-sm
          hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2  focus:ring-orange-400
          transition duration-200 ${otherClasses}`}
                >
                    <SelectValue placeholder="Select a Filter" />
                </SelectTrigger>

                <SelectContent
                    className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
          rounded-xl shadow-lg`}
                >
                    <SelectGroup className="text-gray-500 dark:text-gray-200">
                        {filters.map((filter) => (
                            <SelectItem
                                key={filter.value}
                                value={filter.value}
                                className="hover:bg-orange-50 dark:hover:bg-gray-800 cursor-pointer transition rounded-lg"
                            >
                                {filter.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Filter
