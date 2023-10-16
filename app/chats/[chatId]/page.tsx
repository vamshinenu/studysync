"use client";
import Messages from "@/app/components/Messages";
import Message from "@/app/components/Message";
import { useUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import VerifyUser from "@/app/components/VerifyUser";
import { v } from "convex/values";


import { api } from '@/convex/_generated/api';
import { useQuery } from "convex/react";
import { useEffect } from "react";


export default function Home(

    { params }: { params: { chatId: string } }
) {



    const { isLoaded, isSignedIn, user } = useUser();

    const group = useQuery(api.groups.getGroup, { groupId: params.chatId });

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    if (!user) {
        redirect('/sign-in');
    }

    if (!user.firstName || !user.lastName) {
        return (
            <VerifyUser />
        );
    }

    if (group === null) {
        notFound();
    }

    return (
        <div className="flex flex-col w-full rounded-lg bg-zinc-50 overflow-y-auto h-full px-2 md-px-4 max-w-screen-2xl">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-xl font-bold">
                    {group?.groupName}
                </h1>
                <div className="flex flex-row gap-2 items-center ">
                    <p className=" text-center text-white rounded-full w-8 h-8  bg-primary-500 px-1 py-1">2</p>
                    <p className=" text-center text-white rounded-full w-8 h-8 bg-slate-500 px-1 py-1">10</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-start">
                <p className="text-slate-400 text-sm">{group?.groupDescription}</p>
                <p className="text-slate-400 text-sm">started on: Apr, 21 2023</p>
            </div>
            <div className="h-4" />
            <Messages groupId={params.chatId} />
            <div className="h-4" />
            <Message groupId={params.chatId} />
            <div className="h-4" />
        </div>
    );
}
