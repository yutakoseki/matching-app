'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
            // データがあるか確認
            if (data && data[0]) {
                setCookie('profile', JSON.stringify(data[0]));
                console.log('json', JSON.stringify(data[0]));
                setProfile(data[0]);
                console.log('data', data[0]);
            } else {
                alert('プロフィールデータが取得できませんでした。');
            }
        };
        getProfile();
    }, []);

    const handleClick = () => {
        router.push(`/profile/edit/${cookies.session.user.id}`);
    };

    return (
        <>
            <div className="h-1/5 mb-4">
                {profile && (
                    <div>
                        <div className="flex w-full mt-4">
                            <div className="w-1/4 flex text-center justify-center items-center">
                                <div className="h-20 w-20 rounded-full bg-slate-500">image</div>
                            </div>
                            <div className="w-3/4 pt-4 pl-4">
                                <div className="flex">
                                    <div>{profile.name}</div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="pr-4 truncate">@{profile.id}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="line-clamp-3">{profile.profile?.bio}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-screen bg-slate-400">
                <Tabs defaultValue="account" className="w-screen bg-slate-700">
                    <TabsList className="w-full">
                        <TabsTrigger value="account">プロフィール</TabsTrigger>
                        <TabsTrigger value="password">ポスト</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
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
                            <label>登録日：</label>
                            <div>{profile.createdAt}</div>
                        </div>
                        <div className="flex mb-4">
                            <label>自己紹介：</label>
                            <div>{profile.profile?.bio}</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
