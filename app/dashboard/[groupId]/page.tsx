import Messages from "@/app/components/Messages";
import Message from "@/app/components/Message";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VerifyUser from "@/app/components/VerifyUser";
import Image from "next/image";
import Groups from "@/app/components/Groups";


export default async function Home(

    { params }: { params: { groupId: string } }
) {

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
        <div className="flex flex-col w-full h-screen items-center">
            <div className="flex flex-col w-full h-full max-w-screen-2xl lg:px-4 gap-2">
                <div className="flex flex-row justify-between w-full max-w-screen-2xl px-2 lg:px-8 items-center backdrop-blur-lg bg-slate-100 py-2">
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
                <Groups />
                <div className="flex flex-col w-full rounded-lg bg-zinc-50 overflow-y-auto h-full px-2">
                    <Messages groupId={params.groupId} />
                    <div className="h-4"></div>
                    <Message groupId={params.groupId} />
                    <div className="h-4"></div>
                </div>
            </div>
        </div>
    );
}