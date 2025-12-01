import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import {createUser, updateUser} from "@/lib/actions/user.action";
import {NextResponse} from "next/server";
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const body = await req.text();
    const headerList = await headers();

    const svixId = headerList.get("svix-id");
    const svixTimestamp = headerList.get("svix-timestamp");
    const svixSignature = headerList.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response("Missing Svix headers", { status: 400 });
    }

    let evt: WebhookEvent;
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    try {
        evt = wh.verify(body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        }) as WebhookEvent;
    } catch (err) {
        console.log("❌ Verification error:", err);
        return new Response("Invalid signature", { status: 400 });
    }

    const { type, data } = evt;

    // console.log("🔔 Event:", type);
    // console.log("📦 Data:", data);

    switch (type) {
        case "user.created": {
            const {
                id,
                // eslint-disable-next-line camelcase
                email_addresses,
                // eslint-disable-next-line camelcase
                // eslint-disable-next-line camelcase
                first_name,
                // eslint-disable-next-line camelcase
                last_name,
                // eslint-disable-next-line camelcase
                image_url
            } = data;

            // eslint-disable-next-line camelcase
            const email = email_addresses?.[0]?.email_address ?? "";
            // eslint-disable-next-line camelcase
            const fullName = `${first_name ?? ""} ${last_name ?? ""}`.trim();

            // console.log("New User:", id, email);

            const  mongoUser = await  createUser({
                clerkId: id,
                name: fullName,
                username: email,
                email: email,
                // eslint-disable-next-line camelcase
                picture:image_url
            });
            return NextResponse.json({message:"OK", status: 201,user: mongoUser});


        }

        case "user.updated": {
            // console.log("User updated:", data.id);
            const {
                id,
                // eslint-disable-next-line camelcase
                email_addresses,
                // eslint-disable-next-line camelcase
                first_name,
                // eslint-disable-next-line camelcase
                last_name,
                // eslint-disable-next-line camelcase
                image_url
            } = data;

            // eslint-disable-next-line camelcase
            const email = email_addresses?.[0]?.email_address ?? "";
            // eslint-disable-next-line camelcase
            const fullName = `${first_name ?? ""} ${last_name ?? ""}`.trim();

            // console.log("New User:", id, email);

            const  mongoUser = await   updateUser({
                clerkId: id,
                updateData:{
                    name: fullName,
                    username: email,
                    email: email,
                    // eslint-disable-next-line camelcase
                    picture:image_url
                },
                path:`/profile/${id}`
            });
            return NextResponse.json({message:"OK", status: 200 ,user: mongoUser});
        }

        case "user.deleted": {
            console.log("User deleted:", data.id);
            // TODO: remove user from DB
            break;
        }
    }

    return new Response("OK", { status: 200 });
}
