'use client';

import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const { data: session, status } = useSession();
    const [cookies, setCookie, RemoveCookie] = useCookies(['session']);
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            setCookie('session', session);
            console.log('login session', session);
            router.push('/');
        }
    }, [status]);

    return <Login />;
}
