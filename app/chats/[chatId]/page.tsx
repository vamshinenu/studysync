"use client";
import Messages from "@/app/components/Messages";
import Message from "@/app/components/Message";
import { useUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from "convex/react";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatTime } from "@/lib/dataTimeFormatter";


export default function Home(

    { params }: { params: { chatId: string } }
) {


    const updateUserOnlineStatus = useMutation(api.users.updateUserOnlineStatus);
    const joinGroup = useMutation(api.groups.joinGroup);
    const group = useQuery(api.groups.getGroup, { groupId: params.chatId });
    const getOnlineUsersForGroup = useQuery(api.groups.getOnlineUsersForGroup, { groupId: group?._id });
    const getMembersOfGroup = useQuery(api.groups.getMembersOfGroup, { groupId: group?._id });
    const { isLoaded, isSignedIn, user } = useUser();

    const updateStatusInRealTimeDB = (status: boolean) => {
        if (!user) return;
        updateUserOnlineStatus(
            {
                id: user.id,
                online: status
            }
        );
    };

    useEffect(() => {
        const handleUnload = () => updateStatusInRealTimeDB(false);
        window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    });

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    if (!user) {
        redirect('/sign-in');
    }

    if (group === null) {
        notFound();
    }

    if (!group?.users?.includes(user.id)) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{group?.groupName}</CardTitle>
                    <CardDescription>{group?.groupDescription}</CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <div className="gap-2 flex flex-row">
                        <HoverCard>
                            <HoverCardTrigger>
                                {getOnlineUsersForGroup?.length} Online
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <Card>
                                    hi
                                </Card>
                            </HoverCardContent>
                        </HoverCard>
                        <Badge variant='secondary' >{group?.users?.length} Members</Badge>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={() => {
                            if (group)
                                joinGroup(
                                    {
                                        groupId: group._id,
                                        userId: user.id
                                    }
                                )
                        }}
                    >
                        Join Group
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    updateStatusInRealTimeDB(true);

    return (
        <div className="flex flex-col w-full rounded-lg overflow-y-auto h-full px-2 md:px-4 max-w-screen-2xl">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-xl font-bold">
                    {group?.groupName}
                </h1>
                <div className="flex flex-row gap-2 items-center ">
                    <p className=" text-center text-white rounded-full w-8 h-8  bg-primary-500 px-1 py-1">{getOnlineUsersForGroup?.length}</p>
                    <HoverCard>
                        <HoverCardTrigger>
                            <Badge>{getOnlineUsersForGroup?.length} Online</Badge>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {
                                getOnlineUsersForGroup?.map((user) => {
                                    return (
                                        <div key={user?._id} className="flex flex-row gap-2 px-2 py-2 w-fit items-center">
                                            <Avatar >
                                                <AvatarImage src={user?.imageUrl} alt={user?.firstname} />
                                                <AvatarFallback>{user?.firstname.at(0)?.toUpperCase()}{user?.lastName.at(0)?.toUpperCase()}</AvatarFallback>
                                            </Avatar>

                                            <p className="leading-7">
                                                {user?.firstname} {user?.lastName}</p>
                                        </div>

                                    )
                                })
                            }
                        </HoverCardContent>
                    </HoverCard>

                    <HoverCard>
                        <HoverCardTrigger>
                            <Badge variant='secondary' >{group?.users?.length} Members</Badge>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {
                                getMembersOfGroup?.map((user) => {
                                    return (
                                        <div key={user?._id} className="flex flex-row gap-2 px-2 py-2 w-fit items-center">
                                            <Avatar >
                                                <AvatarImage src={user?.imageUrl} alt={user?.firstname} />
                                                <AvatarFallback>{user?.firstname.at(0)?.toUpperCase()}{user?.lastName.at(0)?.toUpperCase()}</AvatarFallback>
                                            </Avatar>

                                            <p className="leading-7">
                                                {user?.firstname} {user?.lastName}</p>
                                        </div>
                                    )
                                })
                            }
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
            <p className="text-slate-400 text-xs">{formatDate(group._creationTime)} {formatTime(group._creationTime)}</p>
            <p className="text-slate-400 text-sm">{group?.groupDescription}</p>
            <Separator className="my-2" />
            <Messages groupId={params.chatId} />
            <div className="h-2" />
            <Message groupId={params.chatId} />
            <div className="h-4" />
        </div>
    );
}
