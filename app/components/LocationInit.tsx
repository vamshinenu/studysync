"use client";

import { useRef } from "react";
import useStore from "@/store";


export interface Location {
    longitude: number;
    latitude: number;
}

export default function LocationInit({ currentLocation }: { currentLocation: Location }) {

    const setLongitude = useStore((state: any) => state.setLongitude);
    const setLatitude = useStore((state: any) => state.setLatitude);


    const isInit = useRef(false);

    if (!isInit.current) {
        setLongitude(currentLocation.longitude);
        setLatitude(currentLocation.latitude);
        isInit.current = true;
    }
    return null;
}

