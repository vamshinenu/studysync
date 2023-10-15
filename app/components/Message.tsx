'use client';

import { Send, X } from 'lucide-react';
import React from 'react'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { useUser } from "@clerk/nextjs";
import { toast } from 'sonner';

export default function Message({ groupId = "1" }: { groupId?: string }) {

    const [message, setMessage] = React.useState('');
    const { isSignedIn, user, isLoaded } = useUser();
    const createMessage = useMutation(api.messages.createMessage);


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        const message = (e.currentTarget.elements[0] as HTMLInputElement).value;
        console.log('message', message);
        console.log('user', user);

        const _currentUser = user;
        const userName = _currentUser!.firstName || "Anonymous";

        createMessage(
            {
                userId: _currentUser!.id,
                name: userName,
                message: message,
                groupId: groupId,
                imgUrl: _currentUser!.imageUrl,
            }
        ).then((res) => {
            setMessage('');
        }).catch((err) => {
            toast.error('Unable to send message at the moment');
            return;
        })
    }

    return (

        <form className="flex flex-row items-center w-full gap-2"
            onSubmit={
                handleSubmit
            }
        >
            <input
                id="message"
                name="message"
                type="text"
                placeholder="type something cool..."
                className={`w-full px-3 py-2 rounded-xl bg-slate-200 placeholder-slate-400  disabled:text-slate-700 focus:ring-primary-500 ring-1 ring-transparent border-none `}
                onChange={
                    (e) => setMessage(e.target.value)
                }
                value={message}
            />
            <button type="submit" className={`flex flex-row items-center justify-center px-3 py-2 rounded-xl bg-primary-500 disabled:bg-slate-200 disabled:text-slate-400  disabled:cursor-not-allowed text-white disabled:opacity-50 h-full duration-300`}
                disabled={message.length === 0}
            >
                <Send size={20} className="" />
            </button>
        </form>

    )
}
