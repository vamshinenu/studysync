import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



export default async function Home() {

  const user = await currentUser();
  console.log(user);

  if (user) {
    redirect("/chats")
  }

  return (
    <div className="flex flex-col w-full h-full items-center ">
      <div className="flex flex-row fixed justify-between w-full max-w-screen-2xl px-6 py-4 border-b items-center backdrop-blur-lg ">
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
      <div className="mt-20 w-full h-full max-w-screen-2xl px-4  dark:bg-gray-900 flex flex-col items-center">
        <section className="">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Welcome to StudySync</h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">We’re a unique academic community platform exclusively accessible via academic emails. Join our vibrant community and create or join interest groups, connect with like-minded individuals, and explore new horizons. Our platform is designed to help you with your academic journey and beyond.</p>
              <Link href="/sign-in" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Sign In
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </Link>
              <Link href="/sign-up" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Sign Up
              </Link>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <Image
                src={"/main-landing-transparent.png"}
                alt="people chatting on a phone"
                width={
                  500
                }
                height={
                  500
                }
              />
              {/* <Image src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" /> */}
            </div>
          </div>
        </section>
        <div className="max-w-screen-xl items-center flex flex-col">
          <section className="bg-slate-100 px-8 py-8 rounded-2xl ">
            <h1 className="text-3xl font-bold pb-8">
              What do we do?
            </h1>
            <div className="flex flex-col gap-4 md:gap-8 w-full md:flex-row items-center">
              <div className="flex flex-col gap-4 md:gap-8 md:w-1/2 w-full"> {/* Set the width to half (w-1/2) */}
                <div className="bg-slate-200 rounded-xl px-6 py-6">
                  <h1 className="text-xl font-bold">Location Based Groups</h1>
                  <span className="text-slate-500">
                    Connect with like-minded students and faculty members in your area with our location-based groups feature.
                  </span>
                </div>
                <div className="bg-slate-200 rounded-xl px-6 py-6">
                  <h1 className="text-xl font-bold">Interest Group Creation</h1>
                  <span className="text-slate-500">
                    Create your own interest group and connect with other members of your academic community who share your interests.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:gap-8 md:w-1/2 w-full"> {/* Set the width to half (w-1/2) */}
                <div className="bg-slate-200 rounded-xl px-6 py-6">
                  <h1 className="text-xl font-bold">Academic Emails</h1>
                  <span className="text-slate-500">
                    Our academic email exclusive access ensures that our platform remains a secure and academic-focused environment.
                  </span>
                </div>
                <div className="bg-slate-200 rounded-xl px-6 py-6">
                  <h1 className="text-xl font-bold">Customizable Profiles</h1>
                  <span className="text-slate-500">
                    Create a profile that truly reflects your academic and personal interests, with our customizable profile feature.
                  </span>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>



  );
}
