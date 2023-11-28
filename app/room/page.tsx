'use client';
import { useSession } from 'next-auth/react';
import CreateRoom from './CreateRoom';
import EnterRoom from './EnterRoom';
import SearchRoom from './SearchRoom';

export default function Home() {
    const { data: session, status } = useSession();

    return (
        <>
            <div>
                <SearchRoom />
            </div>
            <div>
                <EnterRoom />
            </div>
            <div>
                <CreateRoom />
            </div>
        </>
    );
}
