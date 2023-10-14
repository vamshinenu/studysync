"use client";

import { toast } from "sonner";

export default function Groups() {

    return (
        <>
            <h1 className="text-lg">
                Groups
            </h1>
            <div className="flex flex-row gap-2 overflow-x-scroll w-full h-32">
                {/* <h1 className="px-6 bg-slate-100 rounded-lg w-full text-center">Groups will be added soon, till then use this common chat</h1> */}
                <div
                    onClick={
                        () => toast.message('Groups will be added soon, till then use this common chat')
                    }
                    className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </div>
                <div
                    onClick={
                        () => toast.message('Groups will be added soon, till then use this common chat')
                    }
                    className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Piano</span>
                    <span className="text-xs text-slate-500">4 members</span>
                </div>
                <div
                    onClick={
                        () => toast.message('Groups will be added soon, till then use this common chat')
                    }
                    className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Fortnite club</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </div>
                <div
                    onClick={
                        () => toast.message('Groups will be added soon, till then use this common chat')
                    }
                    className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </div>
                <div
                    onClick={
                        () => toast.message('Groups will be added soon, till then use this common chat')
                    }
                    className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Coding Projects</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </div>
                <div
                    onClick={
                        () => toast.message('Groups will be added soon, till then use this common chat')
                    }
                    className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </div>
                <div
                    onClick={
                        () => toast.message('Groups will be added soon, till then use this common chat')
                    }
                    className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </div>
                <div
                    onClick={
                        () => toast.message('Groups will be added soon, till then use this common chat')
                    }
                    className="rounded-lg bg-slate-50 h-20 w-60 flex-shrink-0 text-center justify-center flex flex-col group duration-300 hover:bg-slate-200 border-slate-300 hover:border-transparent border">
                    <span className="text-xl font-bold group-hover:text-primary-500 duration-300">Chess</span>
                    <span className="text-xs text-slate-500">2 members</span>
                </div>
            </div>
        </>
    )
}