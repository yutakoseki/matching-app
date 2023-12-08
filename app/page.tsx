'use client';
import { useSession } from 'next-auth/react';
import Login from './components/Login';
import Logout from './components/Logout';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Home() {
    const { data: session, status } = useSession();

    return (
        <div className="bg-zinc-800">
            {status === 'authenticated' ? (
                <div>
                    <p>セッションの期限：{session.expires}</p>
                    <p>ID：{session.user?.id}</p>
                    <p>ようこそ、{session.user?.name}さん</p>
                    <img src={session.user?.image ?? ``} alt="" style={{ borderRadius: '50px' }} />
                    <div>
                        <Logout />
                    </div>
                </div>
            ) : (
                <>
                    <Login />
                </>
            )}
        </div>
    );
}
