'use client';
import React, { useRef, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

import { usePaginatedQuery } from "convex/react";


const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


export default function Messages({ groupId = "1" }: { groupId?: string }) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef(null);

    const handleScroll = useCallback((e: any) => {
        const { scrollTop } = e.target;
        console.log("scrolling");

        if (scrollTop === 0) {
            loadMore(20);
        }
    }, []);


    useEffect(() => {
        const scrollDiv = scrollRef.current as any as HTMLDivElement;

        console.log("The ref is: ", scrollRef.current);

        if (scrollDiv) {
            scrollDiv.addEventListener('scroll', handleScroll);

            return () => {
                scrollDiv.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    const { results, status, loadMore } = usePaginatedQuery(
        api.messages.getMessages, // Your paginated query function
        { groupId: groupId }, // Additional args
        { initialNumItems: 20 }
    );

    useEffect(() => {
        if (messagesEndRef.current?.parentNode instanceof HTMLElement) {
            const parent = messagesEndRef.current.parentNode;
            parent.scrollTop = parent.scrollHeight;
        }
    }, [results]);

    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
        return null;
    }

    const getBorderRadiusClass = (isCurrentUser: any, isSameUserAsPrev: any, isSameUserAsNext: any, showTimestamp: any) => {
        if (isCurrentUser) {
            return `rounded-tl-lg rounded-bl-lg ${showTimestamp || !isSameUserAsPrev ? 'rounded-tr-lg' : 'rounded-tr-sm'} ${!isSameUserAsNext ? 'rounded-br-lg' : 'rounded-br-sm'}`;
        } else {
            return `rounded-tr-lg rounded-br-lg ${showTimestamp || !isSameUserAsPrev ? 'rounded-tl-lg' : 'rounded-tl-sm'} ${!isSameUserAsNext ? 'rounded-bl-lg' : 'rounded-bl-sm '}`;
        }
    };

    return (
        <div ref={scrollRef}
            onScroll={handleScroll}
            className="overflow-auto place-items-start bg-slate-100 px-4 py-4 rounded-xl h-full">

            <div className="text-center">
                <button onClick={() => loadMore(20)} className={`text-xs rounded-lg bg-slate-200 px-2 py-1 text-slate-500 ${results?.length < 20 ? 'hidden' : ''}`}>
                    Load More
                </button>
            </div>
            {
                results?.slice().reverse().map((item, index) => {
                    let _revResults = results?.slice().reverse();

                    const reversedTimeDifferences = results?.slice().reverse().map((item, index, reversedResults) => {
                        let prevMessageTime = index > 0 ? (reversedResults[index - 1] as any)._creationTime : null;
                        let currentMessageTime = item._creationTime;
                        return prevMessageTime ? (currentMessageTime - prevMessageTime) / (1000 * 60) : 0;
                    });

                    let prevMessageTime: number | null = null;
                    if (index > 0) {
                        prevMessageTime = (results![index - 1] as any)._creationTime; // Using type assertion as any
                    }

                    const isCurrentUser = item.userId === user!.id;
                    const timeDifference = reversedTimeDifferences[index];
                    const isSameUserAsPrev = index > 0 && item.userId === _revResults![index - 1].userId;
                    const showTimestamp = timeDifference > 5 || index === 0;
                    const showProfileImage = !isSameUserAsPrev || showTimestamp;
                    const isSameUserAsNext = index < _revResults!.length - 1 && item.userId === _revResults![index + 1].userId;
                    const borderRadiusClass = getBorderRadiusClass(isCurrentUser, isSameUserAsPrev, isSameUserAsNext, showTimestamp);

                    return (
                        <>
                            {
                                // Only display time if difference is greater than 5 minutes or if it's the first message
                                (timeDifference > 5 || index === 0) && (
                                    <div className="timestamp text-center text-xs text-slate-400 my-2">
                                        {
                                            (() => {
                                                const today = new Date();
                                                const yesterday = new Date(today);
                                                yesterday.setDate(today.getDate() - 1);
                                                const messageDate = new Date(item._creationTime);
                                                const timeString = messageDate.toLocaleString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                    timeZone: userTimeZone,
                                                });
                                                if (messageDate.toDateString() === today.toDateString()) {
                                                    return `Today, ${timeString}`;
                                                } else if (messageDate.toDateString() === yesterday.toDateString()) {
                                                    return `Yesterday, ${timeString}`;
                                                } else {
                                                    return messageDate.toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: true,
                                                        timeZone: userTimeZone,
                                                    });
                                                }
                                            })()
                                        }
                                    </div>
                                )
                            }
                            <div className={`${isSameUserAsPrev ? 'h-0.5' : 'h-2'}`}></div>
                            <div key={item._id} className={`flex flex-row items-start ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                {showProfileImage ? (
                                    <Image
                                        src={item.imgUrl}
                                        alt=''
                                        height={1000}
                                        width={1000}
                                        style={{ objectFit: "cover" }}
                                        className={`rounded-full h-6 w-6 ${isCurrentUser ? 'hidden' : 'flex mr-1'}`}></Image>
                                ) :
                                    (
                                        <div className={`h-6 w-6 ${isCurrentUser ? 'hidden' : 'flex mr-1'}`}></div>
                                    )
                                }
                                <div className={
                                    `px-2 py-1 ${isCurrentUser ? 'bg-emerald-400 text-white' : 'bg-slate-300 text-black'} ${borderRadiusClass} }`
                                }>
                                    <div className={`text-start text-xs text-slate-500 ${isCurrentUser ? 'hidden' : 'flex'} ${isSameUserAsPrev ? 'hidden' : 'flex'}`}>{isCurrentUser ? 'You' : item.name}
                                        <br />
                                    </div>
                                    <div className='text-sm'>{item.message}</div>
                                </div>
                                {showProfileImage ? (
                                    <Image
                                        src={item.imgUrl}
                                        alt=''
                                        height={1000}
                                        width={1000}
                                        style={{ objectFit: "cover" }}
                                        className={`rounded-full h-6 w-6 ${isCurrentUser ? 'flex ml-1' : 'hidden'}`}></Image>
                                ) : (
                                    <div className={`h-6 w-6 ${isCurrentUser ? 'flex ml-1' : 'hidden'}`}></div>
                                )
                                }
                            </div>
                        </>
                    )
                })
            }
            <div ref={messagesEndRef} />
        </div>
    )
}