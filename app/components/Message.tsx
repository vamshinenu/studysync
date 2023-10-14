'use client';

import { X } from 'lucide-react';
import React from 'react'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { useUser } from "@clerk/nextjs";
import { toast } from 'sonner';

export default function Message() {

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
                groupId: "1",
            }
        ).then((res) => {
            setMessage('');
        }).catch((err) => {
            toast.error('Unable to send message at the moment');
            return;
        })
    }

    return (

        <form className="flex flex-row items-center w-full"
            onSubmit={
                handleSubmit
            }
        >
            <input
                id="message"
                name="message"
                type="text"
                placeholder="Send Message"
                className={`w-full px-3 py-2 text-lg rounded-xl bg-slate-200 placeholder-slate-300 disabled:text-slate-700 focus:ring-primary-500 ring-1 ring-transparent border-none `}
                onChange={
                    (e) => setMessage(e.target.value)
                }
                value={message}
            />
        </form>

    )
}
