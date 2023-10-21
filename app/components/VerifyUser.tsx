"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";



export default function VerifyUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { isSignedIn, user, isLoaded } = useUser();
    const createUser = useMutation(api.users.createUser);
    const router = useRouter()



    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        redirect('/sign-in');
    }


    const userId = user!.id;


    async function handleAccept(e: { preventDefault: () => void; }) {
        e.preventDefault();

        if (!firstName || !lastName) {
            toast.error("You must enter your first and last name to continue 🥸")
        }
        else {
            const params = {
                firstName: firstName,
                lastName: lastName,
            }

            const promise = fetch('/api/update-user', {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const convexPromise = createUser({
                firstname: firstName,
                lastName: lastName,
                userId: userId,
                imageUrl: user!.imageUrl,
            })
            convexPromise.then((res) => {
                console.log(res);
            });

            toast.promise(Promise.all([promise, convexPromise]), {
                loading: 'Updating...',
                success: (data) => {
                    return 'We are happy to have you here 🥳';
                },
                error: 'Something went wrong 😢'
            }
            )
            router.push("/")
            router.refresh()
        }
    }


    return (
        <section className=" w-full h-full items-center flex flex-col justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>
                        Welcome to StudySync!
                    </CardTitle>
                    <CardDescription>
                        we need your first name and last name to complete your profile.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row w-full h-fit gap-2">
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="first name" required />
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="last name" required />
                    </div>
                    <div className="py-2 space-y-2 text-justify">
                        <p >
                            {`At StudySync, we're all about creating a safe and friendly space. That means it's important for everyone to behave well. `}
                        </p>
                        <p >
                            Remember to be cool to each other.
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                No racism, bullying, or harassment
                            </code>
                            or any nasty stuff like that. If you mess up, {`you'll`} be banned. No second chances.
                        </p>
                        <p >
                            {` Heads up, we keep an eye on the chats for everyone's safety. So play nice, or you're out.`}
                        </p>
                        <p className="text-primary-500">- studysync team</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row gap-2">
                    <Button onClick={handleAccept}>I accept</Button>
                    <Button variant="destructive" onClick={() => {
                        toast.error("You must accept the terms and conditions to continue")
                    }}>Decline</Button>
                </CardFooter>
            </Card>
        </section>
    )
}