import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='px-8 rounded-xl py-8 bg-slate-100 flex flex-col gap-2 items-center'>
            <h1 className="text-2xl text-center font-bold">Not found</h1>
            <p>{`Sorry, we couldn't find the group you were looking for.`}</p>
            <Link className='bg-slate-200 px-4 py-2 hover:bg-primary-400 duration-300 rounded-lg hover:text-white' href="/chats">Return</Link>
        </div>
    )
}