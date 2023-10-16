"use client";

import { Image } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SpeedDial() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group flex flex-col items-center">
            <div className={`flex-col items-center mb-4 space-y-2 fixed bottom-12 ${isOpen ? 'flex' : 'hidden'} duration-300`}>
                <button type="button"
                    onClick={() => toast.message('Image uploads will be added soon! have fun chatting!')}
                    className="flex justify-center items-center w-12 h-12 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image className="w-6 h-6" />
                    <span className="sr-only">Share</span>
                </button>
                <div role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Share
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
            <button type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center text-white bg-primary-700 rounded-full w-10 h-10 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 focus:outline-none dark:focus:ring-primary-800 relative">
                <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>


    )
}