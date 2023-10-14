"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';



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
        }
        console.log("i am here");
        router.push("/")
        router.refresh()
    }


    return (
        <div data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className=" flex flex-col items-center justify-center right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Before you continue...
                        </h3>
                    </div>

                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 px-6 py-2">
                        <span className="font-bold text-primary-500">Hi there,</span> we need your first name and last name to complete your profile.
                    </p>
                    <div className="px-6  flex flex-col md:flex-row w-full h-fit gap-2">
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="first name" required />
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="last name" required />
                    </div>

                    <div className="px-6 py-2 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`At StudySync, we're all about creating a safe and friendly space. That means it's important for everyone to behave well. `}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`Remember to be cool to each other. No racism, bullying, or any nasty stuff like that. If you mess up, you'll be banned. No second chances.`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {` Heads up, we keep an eye on the chats for everyone's safety. So play nice, or you're out.`}
                        </p>
                        <p className="text-primary-500">- studysync</p>
                    </div>

                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={handleAccept}
                            data-modal-hide="staticModal" type="button" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">I accept</button>
                        <button
                            onClick={() => {
                                toast.error("You must accept the terms and conditions to continue")
                            }
                            }
                            data-modal-hide="staticModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    )
}