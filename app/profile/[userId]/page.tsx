'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Profile() {
    // const { data: session, status } = useSession();
    const [profile, setProfile] = useState<User>();
    const [cookies, setCookie, RemoveCookie] = useCookies(['session', 'profile']);
    const router = useRouter();
    // プロフィールを取得
    useEffect(() => {
        const getProfile = async () => {
            const userId = cookies.session.user.id;
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

    const handleClick = () => {
        router.push(`/profile/edit/${cookies.session.user.id}`);
    };

    return (
        <>
            <h1>プロフィール</h1>
            <Button onClick={() => handleClick()}>編集</Button>
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
