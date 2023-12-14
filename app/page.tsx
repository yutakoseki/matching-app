'use client';
import { useSession } from 'next-auth/react';
import Login from './components/Login';
import Logout from './components/Logout';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Home() {
    const { data: session, status } = useSession();
    const [cookies, setCookie, RemoveCookie] = useCookies(['session', 'profile']);

    // 初回レンダリング時にセッションをクッキーへ保存
    useEffect(() => {
        if (status === 'authenticated') {
            setCookie('session', session);
            console.log('login session', session);
        }
    }, [status]);

    return (
        <div className="bg-zinc-800">
            {status === 'authenticated' ? (
                <div>
                    <p>セッションの期限：{session.expires}</p>
                    <p>ID：{session.user?.id}</p>
                    <p>ユーザーID：{session.user?.userid}</p>
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
