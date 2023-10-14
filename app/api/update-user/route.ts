import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { firstName, lastName } = await req.json();

    if (!firstName || !lastName)
        return NextResponse.json({ error: "Please provide a first and last name" }, { status: 400 });
    const { userId } = getAuth(req);

    if (!userId) return NextResponse.redirect('/sign-in');

    const updatedUser = await clerkClient.users.updateUser(userId, {
        firstName,
        lastName,
    });

    return NextResponse.json(updatedUser);
}