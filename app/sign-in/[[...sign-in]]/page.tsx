"use client";
import { useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);



  const { isLoaded: _isLoaded, isSignedIn, user } = useUser();


  if (!_isLoaded) {
    console.log("loading");

    return null;
  }

  if (!loading && isSignedIn) {
    console.log("redirecting");

    redirect("/chats");

  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }


    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });

        router.push("/chats")
      }
      else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }

    } catch (err: any) {
      toast.error(err.errors[0].longMessage);
      console.error("error", err.errors[0])
      return;
    }
    toast.success("Welcome back!");
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="fixed w-full max-w-screen-2xl px-6 py-4 border-b items-center backdrop-blur-lg top-0">
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
      </div>
      <section className="relative flex  w-full min-h-screen flex-col justify-center items-center">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent >
            <form className="space-y-2 md:space-y-4  flex flex-col justify-center" action="#">
              <Input type="email" onChange={(e) => setEmailAddress(e.target.value)} placeholder="coolkid@school.edu" />
              <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" required />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label
                    htmlFor="Remember me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
              </div>
              <Button variant={'secondary'} size={'lg'} onClick={handleSubmit} disabled={!isLoaded} > Sign in</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?<Link href="/sign-up"><Button variant={'link'}>Sign up</Button></Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}