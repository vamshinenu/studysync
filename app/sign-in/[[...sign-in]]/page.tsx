"use client";
import { useEffect, useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();



  const { isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  // start the sign In process.
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }


    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard")
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
    <div className="flex flex-col w-full h-full justify-center">
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
      <section className="bg-gray-50 dark:bg-gray-900  w-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex flex-row items-center">
                Sign in to <Link href={'/'} className="font-mono font-bold text-primary-600 flex flex-row items-center"> <Image
                  src={"/studysync.png"}
                  alt="logo"
                  width={40}
                  height={40}
                ></Image>
                  StudySync
                </Link>

              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" onChange={(e) => setEmailAddress(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <Link href="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                </div>
                <button onClick={handleSubmit} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
{/* 
<form>
        <div>
          <label htmlFor="email">Email</label>
          <input onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" />
        </div>
        <button onClick={handleSubmit}>Sign In</button>
      </form>
    </div> */}

