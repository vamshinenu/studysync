"use client";

import { ChangeEvent, useState } from "react";
import { useSignUp, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState(""); // [1
  const [code, setCode] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);



  const { isLoaded: _isLoaded, isSignedIn, user } = useUser();
  console.log(_isLoaded, isSignedIn, user);


  if (!_isLoaded) {
    console.log("here is the error 2");

    return null;
  }

  if (!loading && isSignedIn) {
    console.log("redirecting");
    redirect("/chats");
  }

  // Function to handle OTP code input
  function handleInput(e: any, digit: number) {
    const inputValue = e.target.value;
    const maxLength = 1; // Maximum length for each input field

    if (inputValue.length <= maxLength) {
      // Update the code state with the current input
      // @ts-ignore
      const newCode = [...code];
      newCode[digit - 1] = inputValue;
      setCode(newCode.join(""));

      // When the user enters a digit in the current input field,
      // move the focus to the next input field (if available).
      if (digit < 6) {
        const nextInput = e.target.parentElement.parentElement.children[digit].querySelector('input');
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  }

  // start the sign up process.
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      // here check if its a gannon email or not. or basically if its a student or not. by using collegeDomains array.
      // if not a student, then return an error.

      const validateEmail = await fetch("/api/validate-email", {
        method: "POST",
        body: JSON.stringify({ emailAddress }),
        headers: {
          "Content-Type": "application/json",
        },
      })

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
        router.push("/dashboard");
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
        // want this in center of the screen
        <section className="relative flex  w-full min-h-screen flex-col justify-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0  w-full">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex flex-row items-center">
                  Sign up to <Link href={'/'} className="font-mono font-bold text-primary-600 flex flex-row items-center"> <Image
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
                  <button onClick={handleSubmit} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    have an account? <Link href="/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

      )}
      {
        pendingVerification && (
          // want this in center of the screen
          <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
              <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="font-semibold text-3xl">
                    <p>Email Verification</p>
                  </div>
                  <div className="flex flex-row text-sm font-medium text-gray-400">
                    <p>We have sent a code to your email {emailAddress}</p>
                  </div>
                </div>

                <div>
                  <form>
                    <div className="flex flex-col space-y-16">
                      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md gap-2">
                        <div className="w-20 h-20">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primary-700"
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleInput(e, 1)}
                          />
                        </div>
                        <div className="w-20 h-20">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primary-700"
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleInput(e, 2)}
                          />
                        </div>
                        <div className="w-20 h-20">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primary-700"
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleInput(e, 3)}
                          />
                        </div>
                        <div className="w-20 h-20">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primary-700"
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleInput(e, 4)}
                          />
                        </div>
                        <div className="w-20 h-20">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primary-700"
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleInput(e, 5)}
                          />
                        </div>
                        <div className="w-20 h-20">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primary-700"
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleInput(e, 6)}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-5">
                        <div>
                          <button
                            onClick={onPressVerify}
                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-primary-700 border-none text-white text-sm shadow-sm"
                          >
                            Verify Account
                          </button>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                          <p>{`Didn't receive code?`}</p>{" "}
                          <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">
                            Resend
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}