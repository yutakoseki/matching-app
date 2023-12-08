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

    if (status === 'authenticated') {
        setCookie('session', session);
        router.push('/');
    }

    return <Login />;
}
