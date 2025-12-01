import Question from "@/components/form/question";
import {getUserById} from "@/lib/actions/user.action";
import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs/server";

const Page =  async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // const  userId="clerk_12345";

    const mongoUser = await getUserById({userId})
    if (!mongoUser) return redirect("/login");

    return (
        <div className="">
            <h1 className={`font-spaceGrotesk h1-bold`}>Ask a question</h1>
            <Question mongoUserId={JSON.stringify(mongoUser._id)} />
        </div>
    )

}
export default Page;