'use client';
import React, { useRef, useEffect } from 'react'
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { api } from '@/convex/_generated/api';
import useStore from '@/store';
import { useUser } from '@clerk/nextjs';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function Messages() {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // ? Zustand Store
    // @ts-ignore
    const candidate = useStore((state) => state.candidate);
    // @ts-ignore

    // ? Convex
    let messages = useQuery(api.messages.getMessages, { groupId: "1" });


    console.log('messagess', messages);

    const imgUrls: string[] = []

    function addToUniqueArray(arr: string[], value: string) {
        if (arr.indexOf(value) === -1) {
            arr.push(value);
        }
    }

    if (messages !== undefined) {
        for (let i = 0; i < messages.length; i++) {
            addToUniqueArray(imgUrls, messages[i].userId)
        }
    }

    // let userImgs = useQuery(api.users.getUsers, { userIds: imgUrls });
    // console.log('userImgs', userImgs);

    const images = 0;

    useEffect(() => {
        if (messagesEndRef.current?.parentNode instanceof HTMLElement) {
            const parent = messagesEndRef.current.parentNode;
            parent.scrollTop = parent.scrollHeight;
        }
    }, [messages]);
    console.log('messages', messages);


    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
        return null;
    }

    return (
        <div className="overflow-auto  place-items-start bg-slate-100 px-4 py-4 rounded-xl h-full">
            {
                messages?.map((item) => {
                    return (
                        // {(message.User.role).split('_').at(-1)?.toLocaleLowerCase()} 
                        <>
                            <div key={item._id} className={`flex flex-row items-start ${item.userId === user!.id ? 'justify-end' : 'justify-start'}`}>
                                <Image
                                    src={item.imgUrl}
                                    alt=''
                                    width={8}
                                    height={8}
                                    className={`rounded-full bg-yellow-300 ${item.userId === user!.id ? 'hidden' : 'flex mr-2 '}`}></Image>
                                <div className={`px-4 py-2 rounded-xl ${item.userId === user!.id ? 'bg-emerald-400 text-white' : 'bg-gray-300 text-black'}`}>
                                    <div className="text-start text-xs">{item.userId === user!.id ? 'You' : item.name}<br />
                                        <div className='text-sm'>{item.message}</div>
                                        <span className="text-xs text-zinc-600">{new Date(item._creationTime).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                            timeZone: userTimeZone,
                                        })}</span>
                                    </div>
                                </div>
                                <Image
                                    src={item.imgUrl}
                                    alt=''
                                    height={1000}
                                    width={1000}
                                    style={{ objectFit: "cover" }}
                                    className={`rounded-full h-8 w-8 ${item.userId === user!.id ? 'flex ml-2' : 'hidden'}`}></Image>
                            </div>
                            <div className="h-2"></div>
                        </>
                    )
                })
            }
            <div ref={messagesEndRef} />
        </div>
    )
}