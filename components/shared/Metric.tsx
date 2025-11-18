import Image from "next/image";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";

interface MetricProps {
    iconSrc: string;
    alt: string;
    value: string | number;
    title: string;
    textStyle?: string;
    isAuthor?: boolean;
    href?: string;
    createdAt?: Date;
}

const Metric = ({
                    iconSrc,
                    alt,
                    value,
                    title,
                    textStyle,
                    createdAt,
                    href,
                }: MetricProps) => {
    const metricContent = (
        <div className={`flex-center flex-wrap gap-1 ${textStyle || ""}`}>
            <Image
                src={iconSrc}
                width={16}
                height={16}
                alt={alt || "icon"}
                className={`object-contain ${href ? "rounded-full" : ""}`}
            />

            <span>{value}</span>

            {createdAt && (
                <div className="hidden sm:block">
                    <span>- asked {getTimestamp(createdAt)}</span>
                </div>
            )}

            <span>{title}</span>
        </div>
    );

    // ✅ Fix: Return the <Link> when href exists
    if (href) {
        return (
            <Link href={href} className="flex-center gap-1">
                {metricContent}
            </Link>
        );
    }

    return (
        <div className={`flex-center flex-wrap gap-1 ${textStyle || ""}`}>
            {metricContent}
        </div>
    );
};

export default Metric;
