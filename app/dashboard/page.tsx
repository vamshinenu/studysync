import Messages from "../components/Messages";
import Message from "../components/Message";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VerifyUser from "../components/VerifyUser";
import Image from "next/image";


export default async function Home() {


    const user = await currentUser();

    if (!user) {
        console.log('no user');
        redirect('/sign-in');
    }

    if (!user.firstName || !user.lastName) {
        console.log('no name');
        return (
            <VerifyUser />
        );
    }


    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-row justify-between w-full max-w-screen-2xl px-8 items-center backdrop-blur-lg bg-slate-100 py-2">
                <div className="flex flex-row items-center">
                    <Image
                        src={"/studysync.png"}
                        alt="logo"
                        width={40}
                        height={40}
                    ></Image>
                    <h1 className="font-mono font-medium">
                        StudySync
                    </h1>
                </div>
                <UserButton afterSignOutUrl="/" />
            </div>

            <div className="flex flex-col w-full h-full max-w-screen-2xl px-8">
                <h1 className="text-lg">
                    Groups
                </h1>
                <div className="h-2"></div>
                <div className="flex flex-row gap-2 overflow-x-scroll w-full h-24">
                    {/* <h1 className="px-6 bg-slate-100 rounded-lg w-full text-center">Groups will be added soon, till then use this common chat</h1> */}

                    <div className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                        <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                        <span className="text-xs text-slate-500">2 members</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                        <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Piano</span>
                        <span className="text-xs text-slate-500">4 members</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                        <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Fortnite club</span>
                        <span className="text-xs text-slate-500">2 members</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                        <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                        <span className="text-xs text-slate-500">2 members</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                        <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Coding Projects</span>
                        <span className="text-xs text-slate-500">2 members</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                        <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                        <span className="text-xs text-slate-500">2 members</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                        <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                        <span className="text-xs text-slate-500">2 members</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                        <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                        <span className="text-xs text-slate-500">2 members</span>
                    </div>
                </div>
                <div className="h-4"></div>
                <h1 className="text-lg">
                    Chat
                </h1>
                <div className="h-2"></div>
                <div className="flex flex-col w-full rounded-lg bg-zinc-50 overflow-y-auto">
                    <Messages />
                    <div className="h-4"></div>
                    <Message />
                    <div className="h-4"></div>
                </div>
            </div>
        </div>
    );
}
