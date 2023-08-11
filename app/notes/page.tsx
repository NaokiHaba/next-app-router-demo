import "server-only";

import ErrorBoundary from '@/components/ErrorBoundary';
import FetchError from '@/components/FetchError';
import Loading from '@/components/Loading';
import { apiUrl } from "@/constants/api";
import Link from 'next/link';
import { Suspense } from 'react';
import NoteList from './NoteList';
import { zNotes } from "./type";


// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// 0の場合 ... 静的な生成が行われず、常に動的にページを生成する
// 0以上の数値の場合 ... その秒数経過後にリクエストがあった際にページを再生成する
// falseの場合 ... ビルド時に静的に生成した後、ページを再生成しない
export const revalidate = 0;

export const metadata = {
    title: 'ノート一覧',
}

const getNotes = async () => {
    const res = await fetch(`${apiUrl}/notes`, {cache: 'no-store'});
    const data = await res.json();
    const notes = zNotes.parse(data);
    return notes;
};

export default async function Page() {
    const notes = await getNotes();
    return (
        <main className="mx-2 sm:mx-4 relative">
            <Link href="/notes"
                  className="absolute top-0 right-2 z-10 text-white bg-pink-500 hover:bg-pink-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2">
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="4 4 8 8"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                          clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">New Note</span>
            </Link>
            <h2 className='mb-6 text-gray-400 text-xs'>List Notes</h2>
            <ErrorBoundary fallback={<FetchError/>}>
                <Suspense fallback={<Loading/>}>
                    <NoteList initialState={notes}/>
                </Suspense>
            </ErrorBoundary>
        </main>
    )
}