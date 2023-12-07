'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Profile() {
    // const { data: session, status } = useSession();
    const [profile, setProfile] = useState<User>();
    const [cookies, setCookie, RemoveCookie] = useCookies(['session', 'profile']);
    // プロフィールを取得
    useEffect(() => {
        const getProfile = async () => {
            // const userId = session?.user?.id;
            const userId = cookies.session.user.id;
            const profile = cookies.profile;
            const res = await fetch(`http://localhost:3000/api/profile?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setCookie('profile', data[0]);
            setProfile(data[0]);
        };
        getProfile();
    }, []);

    return (
        <>
            <h1>プロフィール</h1>
            <Button>
                <Link href={`/profile/edit/${cookies.session.user.id}`}>編集</Link>
            </Button>
            {/* profileがあれば表示 */}
            {profile && (
                <div>
                    <div className="flex mb-4">
                        <label>ID：</label>
                        <div>{profile.id}</div>
                    </div>
                    <div className="flex mb-4">
                        <label>名前：</label>
                        <div>{profile.name}</div>
                    </div>
                    <div className="flex mb-4">
                        <label>Email：</label>
                        <div>{profile.email}</div>
                    </div>
                    <div className="flex mb-4">
                        <label>パスワード：</label>
                        <div>{profile.password}</div>
                    </div>
                    <div className="flex mb-4">
                        <label>登録日：</label>
                        <div>{profile.createdAt}</div>
                    </div>
                </div>
            )}
        </>
    );
}
