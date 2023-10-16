import { UserButton } from "@clerk/nextjs";
import { Users2 } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="flex flex-col w-full h-screen items-center">
                <div className="flex flex-col w-full h-full gap-2 items-center">
                    <div className=" w-full flex-col flex items-center backdrop-blur-lg bg-slate-100 py-2">
                        <div className="w-full  px-2 lg:px-8 flex flex-row justify-between max-w-screen-2xl">
                            <Link
                                href={'/'}
                                className="flex flex-row items-center">
                                <Image
                                    src={"/studysync.png"}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                ></Image>
                                <h1 className="font-mono font-medium">
                                    StudySync
                                </h1>
                            </Link>
                            <div className="flex flex-row gap-2 items-center">
                                <Link href="/chats">
                                    <Users2 size={24} className="hover:text-primary-500 duration-300" />
                                </Link>
                                <UserButton afterSignOutUrl="/" />

                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )

}