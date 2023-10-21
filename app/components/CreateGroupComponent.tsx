"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import useStore from "@/store";


export default function CreateGroupComponent() {

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const longitude = useStore((state: any) => state.longitude);
    const latitude = useStore((state: any) => state.latitude);
    const user = useStore((state: any) => state.user);

    const createGroup = useMutation(api.groups.createGroup);

    const handleCreateGroup = (e: { preventDefault: () => void; }) => {
        if (!groupName || !groupDescription) {
            toast.error("Group name and description are required to create a group.")
        }

        createGroup({
            groupName: groupName,
            groupDescription: groupDescription,
            userId: user.id,
            latitude,
            longitude
        }).catch((err) => {
            toast.error("Unable to create group, please try again later.");
        }).then((res) => {
            console.log(res);
        });
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button>
                    Create Group
                </Button>
            </SheetTrigger>
            <SheetContent side={'bottom'}>
                <SheetHeader>
                    <SheetTitle>Create a group</SheetTitle>
                    <SheetDescription>
                        Create a group to chat with your friends, make sure to give it a description and unique name. It will help our systems to better suggest your group to other users.
                    </SheetDescription>
                </SheetHeader>
                <div className="gap-2 flex flex-col mt-2">
                    <Separator />
                    <Input placeholder="FootBall Club" value={groupName} onChange={
                        (e) => setGroupName(e.target.value)
                    } />
                    <Textarea placeholder="We are best local football players join us."
                        value={groupDescription}
                        onChange={
                            (e) => setGroupDescription(e.target.value)
                        }
                    />
                </div>
                <SheetFooter className="mt-2">
                    <SheetClose asChild>
                        <Button type="submit"
                            onClick={handleCreateGroup}
                        >Create Group!</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}