import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import Logout from './Logout';
import Link from 'next/link';

export default function Login() {
    const { data: session, status } = useSession();

    if (status !== 'authenticated' || !session) {
        return (
            <div>
                <p>あなたはログインしていません</p>
                <div>
                    <button onClick={() => signIn('google', {}, { prompt: 'login' })}>
                        Googleでログイン
                    </button>
                </div>
                <div>
                    <button onClick={() => signIn('github', {}, { prompt: 'login' })}>
                        Githubでログイン
                    </button>
                </div>
                <div>
                    <button onClick={() => signIn('Email', {}, { prompt: 'login' })}>
                        メールアドレスでログイン
                    </button>
                </div>
                <div>
                    <Link href="/signup">Sign Up</Link>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div>ログイン中です</div>
                <div>
                    <Logout />
                </div>
            </>
        );
    }
}
