'use client';

import { Image, Send, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useUser } from "@clerk/nextjs";
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';


export default function Message({ groupId = "1" }: { groupId?: string }) {

    const [message, setMessage] = React.useState('');
    const { isSignedIn, user, isLoaded } = useUser();
    const createMessage = useMutation(api.messages.createMessage);
    const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
    const imageInput = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [storageId, setStorageId] = useState<string | undefined>("")
    const generateImageUrl = useQuery(api.messages.generateImageUrl, { storageId: storageId });

    useEffect(() => {
        if (!storageId) return;
        if (!generateImageUrl) return;

        createMessage({
            userId: _currentUser!.id,
            name: userName,
            message: generateImageUrl || "",
            groupId: groupId,
            imgUrl: _currentUser!.imageUrl,
            format: 'image'
        }).catch((err) => {
            toast.error('Unable to send message at the moment');
            return;
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageId, generateImageUrl]);

    async function handleImageUpload(image: File | null) {

        if (!image) return;

        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": image.type },
            body: image,
        });
        const _result = await result.json();
        setStorageId(_result.storageId);
        setSelectedImage(null);
    }

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        redirect('/sign-in');
    }

    const _currentUser = user;
    const userName = _currentUser!.firstName || "Anonymous";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setStorageId(undefined);

        e.preventDefault();
        const message = (e.currentTarget.elements[0] as HTMLInputElement).value;

        createMessage(
            {
                userId: _currentUser!.id,
                name: userName,
                message: message,
                groupId: groupId,
                imgUrl: _currentUser!.imageUrl,
                format: 'text'
            }
        ).then((res) => {
            setMessage('');
        }).catch((err) => {
            toast.error('Unable to send message at the moment');
            return;
        })
    }

    return (
        <div className="flex flex-row items-center w-full gap-2">
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
                <Button type="submit"
                    disabled={message.length === 0}
                >
                    <Send size={20} />
                </Button>
            </form>
            <Dialog>
                <DialogTrigger >
                    <Button variant={'secondary'} >
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image size={20} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Upload Image</DialogTitle>
                    </DialogHeader>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input id="picture" type="file"
                            ref={imageInput}
                            onChange={(event) => {
                                const file = event.target.files![0];
                                if (!file) {
                                    return;
                                }

                                const fileSize = file.size / 1024 / 1024; // in MB
                                if (fileSize > 3) {
                                    toast.error('Oops, Image size exceeds 3 MB');
                                    return;
                                }

                                setSelectedImage(file);
                                console.log(file);
                                console.log(selectedImage);
                            }}
                            disabled={selectedImage !== null}
                            accept="image/png, image/jpeg"  // Allow only PNG and JPEG images
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={() => handleImageUpload(selectedImage)} disabled={selectedImage === null}>
                                <Send size={20} />
                            </Button>
                        </DialogClose>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>


    )
}
