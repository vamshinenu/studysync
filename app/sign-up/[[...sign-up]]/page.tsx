"use client";

import { useState } from "react";
import { useSignUp, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { isLoaded: _isLoaded, isSignedIn, user } = useUser();


  if (!_isLoaded) {
    return null;
  }

  if (!loading && isSignedIn) {
    console.log("redirecting");
    redirect("/chats");
  }


  function handleInput(e: any, digit: number) {
    const inputValue = e.target.value;
    const maxLength = 1; // Maximum length for each input field

    // @ts-ignore
    const newCode = [...code];
    newCode[digit - 1] = inputValue;
    setCode(newCode.join(""));

    if (digit < 6) {
      if (inputValue.length === maxLength && digit < 6) {
        const nextInput = document.getElementById(`input-${digit + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
      // Check for the previous input when deleting characters
      else if (inputValue.length === 0 && digit > 1) {
        const prevInput = document.getElementById(`input-${digit - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
    else {
      const currentCode = newCode.join("");
      if (currentCode.length === 6) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
          input.blur();
        });

        // onPressVerify(e);
      }
      else if (inputValue.length === 0 && digit === 6) {
        const prevInput = document.getElementById(`input-${digit - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  }



  // start the sign up process.
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setLoading(true);
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const validateEmail = await fetch("/api/validate-email", {
        method: "POST",
        body: JSON.stringify({ emailAddress }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      // ! UNCOMMENT THIS
      if (!validateEmail.ok) {
      toast.error("Email not recognized as a college mail.");
      return;
      }
      await signUp.create({
        emailAddress,
        password,
      });
      console.log("here is the error 1");

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);

    } catch (err: any) {
      // toast.error(err);
      toast.error(err.errors[0].longMessage);

      console.error(JSON.stringify(err, null, 2));
      return;
    }
    toast.success("Welcome to StudySync!, please verify your email.");
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: { preventDefault: () => void; }) => {
    setLoading(true);
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push("/chats");
        toast.success("Thank you verifying your email, have fun!")
      }
    } catch (err: any) {
      console.log(err);
      console.error(JSON.stringify(err, null, 2));
      toast.error(err.errors[0].longMessage);
      return;
    }
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
      {!pendingVerification && (
        <section className="relative flex  w-full min-h-screen flex-col justify-center items-center">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-2 md:space-y-4 flex flex-col justify" action="#">
                <Input type="email" name="email" onChange={(e) => setEmailAddress(e.target.value)} id="email" placeholder="coolkid@school.edu" />
                <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" />
                <Button variant={'secondary'} size={'lg'} onClick={handleSubmit} disabled={!isLoaded} >Sign up</Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  have an account?<Link href="/sign-in"><Button variant={'link'}>Sign in</Button></Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      )}
      {
        pendingVerification && (
          <section className="relative flex  w-full min-h-screen flex-col justify-center items-center">
            <Card className="max-w-lg w-full">
              <CardHeader>
                <CardTitle className="text-center">Email Verification</CardTitle>
                <CardDescription className="text-center">We have sent you an OTP to email {emailAddress}</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col space-y-8">
                    <div className="flex flex-row items-center justify-center mx-auto w-full max-w-md gap-1">
                      <Input type="text" id="input-1" className=" flex flex-col items-center text-center w-14 h-14 text-xl" maxLength={1} onChange={(e) => handleInput(e, 1)} />
                      <Input type="text" id="input-2" className=" flex flex-col items-center text-center w-14 h-14 text-xl" maxLength={1} onChange={(e) => handleInput(e, 2)} />
                      <Input type="text" id="input-3" className=" flex flex-col items-center text-center w-14 h-14 text-xl" maxLength={1} onChange={(e) => handleInput(e, 3)} />
                      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        - </h3>
                      <Input type="text" id="input-4" className=" flex flex-col items-center text-center w-14 h-14 text-xl" maxLength={1} onChange={(e) => handleInput(e, 4)} />
                      <Input type="text" id="input-5" className=" flex flex-col items-center text-center w-14 h-14 text-xl" maxLength={1} onChange={(e) => handleInput(e, 5)} />
                      <Input type="text" id="input-6" className=" flex flex-col items-center text-center w-14 h-14 text-xl" maxLength={1} onChange={(e) => handleInput(e, 6)} />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="justify-center">
                <Button
                  onClick={onPressVerify}
                >
                  Verify Account
                </Button>
              </CardFooter>
            </Card>
          </section>
        )
      }
    </div>
  );
}