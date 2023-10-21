"use client";

import { useRef } from "react";
import useStore from "@/store";


export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;

}

export default function UserInit({ currentUser }: { currentUser: User }) {

    const setCurrentUser = useStore((state: any) => state.setUser);

    const isInit = useRef(false);

    if (!isInit.current) {

        const _currentUser = {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            avatar: currentUser.avatar,
        }
        setCurrentUser(_currentUser);
        isInit.current = true;
    }
    return null;
}

