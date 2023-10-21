"use client";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useStore from "@/store";
import { formatDate, formatTime } from "@/lib/dataTimeFormatter";



export default function Home() {
    const setLongitude = useStore((state: any) => state.setLongitude);
    const setLatitude = useStore((state: any) => state.setLatitude);

    const latitude = useStore((state: any) => state.latitude);
    const longitude = useStore((state: any) => state.longitude);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const roundedLatitude = parseFloat(position.coords.latitude.toFixed(1));
                    const roundedLongitude = parseFloat(position.coords.longitude.toFixed(1));
                    setLatitude(roundedLatitude);
                    setLongitude(roundedLongitude);
                },
                (error) => {
                    if (error.code === 1) {
                        toast.error('Unable to get your location 😕. Please reset the location preferences.');
                        return;
                    }
                    console.log('Error:', error);
                }
            );
        } else {
            toast.error('Oops, Location is not supported by this browser.');
            console.log('Geolocation is not supported by this browser.');
        }
    });



    const groups = useQuery(api.groups.getGroups, { latitude, longitude });
    console.log(groups);

    return (
        <>
            <div className="flex flex-col w-full h-full max-w-screen-2xl items-center px-2 lg:px-8">
                <div className=" grid w-full gap-2 pb-4 overflow-y-scroll auto-rows-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {
                        groups?.map((group) => {
                            return (
                                <Link key={group._id}
                                    href={`/chats/${group._id}`}
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                {group.groupName}
                                            </CardTitle>
                                            <CardDescription >
                                                {group.groupDescription}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="gap-2 flex flex-row">
                                                <Badge variant='secondary' >{group.users!.length} Members</Badge>
                                                <Separator orientation="vertical" />
                                                <Badge variant='secondary' >{formatDate(group._creationTime)} {formatTime(group._creationTime)}</Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })
                    }
                </div>
            </div></>
    );
}
