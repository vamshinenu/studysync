'use client';
import React, { useRef, useEffect } from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import useStore from '@/store';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/dist/server/api-utils';

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

    useEffect(() => {
        if (messagesEndRef.current?.parentNode instanceof HTMLElement) {
            const parent = messagesEndRef.current.parentNode;
            parent.scrollTop = parent.scrollHeight;
        }
    }, [messages]);

    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
        return null;
    }

    return (
        <div className="overflow-auto  place-items-start bg-slate-100 px-4 py-4 rounded-xl h-full">
            {
                messages?.map((item: { _id: React.Key | null | undefined; userId: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; _creationTime: string | number | Date; }) => {
                    return (
                        // {(message.User.role).split('_').at(-1)?.toLocaleLowerCase()} 
                        <>
                            <div key={item._id} className={`flex flex-row items-start ${item.userId === user!.id ? 'justify-end' : 'justify-start'}`}>
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