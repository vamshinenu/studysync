import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VerifyUser from "../components/VerifyUser";
import Link from "next/link";
import { toast } from "sonner";


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
        <div className="flex flex-col w-full h-full max-w-screen-2xl items-center px-2 lg:px-8 ">
            <div className="flex flex-col gap-2 overflow-x-scroll w-full h-full">
                <Link
                    href="/chats/3svke9nyhr3ftfn6j8391zkb9jzc030"
                    className="rounded-lg bg-slate-50 h-20 w-full px-4 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 hover:border-transparent border border-primary-400 cursor-pointer">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Global</span>
                    <span className="text-xs text-slate-500">Use this as part of beta testing</span>
                </Link>
                <Link
                    href={"/chats"}
                    className="rounded-lg bg-slate-50 h-20 w-full px-4 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </Link>
                <Link
                    href={"/chats"}
                    className="rounded-lg bg-slate-50 h-20 w-full px-4 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Legos Club</span>
                    <span className="text-xs text-slate-500">4 members</span>
                </Link>
                <Link
                    href={"/chats"}
                    className="rounded-lg bg-slate-50 h-20 w-full px-4 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Fortnite club</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </Link>
                <Link
                    href={"/chats"}
                    className="rounded-lg bg-slate-50 h-20 w-full px-4 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Emo</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </Link>
                <Link
                    href={"/chats"}
                    className="rounded-lg bg-slate-50 h-20 w-full px-4 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Coding Projects</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </Link>
                <Link
                    href={"/chats"}
                    className="rounded-lg bg-slate-50 h-20 w-full px-4 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Gym Bros</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </Link>
                <Link
                    href={"/chats"}
                    className="rounded-lg bg-slate-50 h-20 w-full px-4 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Cooking Club</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </Link>
            </div>
        </div>
    );
}
