import Link from "next/link";
import Image from "next/image";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import {Badge} from "@/components/ui/badge";

interface Props {
    user: {
        _id: string;
        clerkId: string;
        picture: string;
        name: string;
        userName: string;
    };
}

const UserCard = async ({ user }: Props) => {
    const interactedTags = await getTopInteractedTags({ userId: user._id });

    return (
        <Link
            href={`/profile/${user.clerkId}`}
            className="shadow-light100_darknone w-full max-sm:min-w-full xs:w-[260px] mx-auto block"
        >
            <article className="rounded-xl overflow-hidden bg-white/5 p-3 flex flex-col gap-3">
                <div className="w-full h-40 relative">
                    <Image
                        src={user.picture}
                        alt={user.name || "user image"}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold text-lg">@{user.name}</span>
                </div>

                <div className="flex flex-row flex-wrap gap-2 mt-2">
                    {interactedTags.length > 0 ? (
                        interactedTags.map((tag) => (
                        <Badge  key={tag._id} className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                            {tag.name}
                        </Badge>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400">No tags</span>
                    )}
                </div>
            </article>
        </Link>
    );
};

export default UserCard;
