'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, ChevronLeft, AlignJustify } from 'lucide-react';
import Link from 'next/link';
import { DateTimeFormatOptions } from 'intl';

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

    // 日付型の修正
    const formatDateTime = (dateTimeString: string) => {
        const options: DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString('ja-JP', options).replace(/[/]/g, '-');
    };

    return (
        <>
            {/* プロフィールヘッダー */}
            <div className="w-full h-16 fixed top-0 z-20 bg-secondary text-secondary-foreground flex text-center justify-center items-center">
                <div className="w-full h-full flex items-center justify-start ml-8">
                    {profile && <div className="text-xl truncate">{profile.userId}</div>}
                </div>
                <div className="w-full h-full flex items-center justify-end pr-4">
                    <AlignJustify strokeWidth={1} size={30} />
                </div>
            </div>
            <div className="h-full">
                {/* ユーザートップ */}
                <div className="h-48 pt-4">
                    {profile && (
                        <>
                            <div className="w-full h-full pt-2">
                                <div className="w-full h-2/5 flex">
                                    <div className="w-1/4 h-full flex text-center justify-end items-center">
                                        <div className="h-20 w-20 rounded-full bg-slate-500">
                                            image
                                        </div>
                                    </div>
                                    <div className="w-3/4 h-full flex text-center pr-6">
                                        <div className="w-1/3 h-full flex flex-col items-center justify-center ">
                                            <div>1203</div>
                                            <div className="text-sm">投稿</div>
                                        </div>
                                        <div className="w-1/3 h-full flex flex-col items-center justify-center">
                                            <div>1203</div>
                                            <div className="text-sm">フォロー中</div>
                                        </div>
                                        <div className="w-1/3 h-full flex flex-col items-center justify-center ">
                                            <div>1203</div>
                                            <div className="text-sm">フォロワー</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-2/5">
                                    <div className="w-full h-1/6 pl-4">
                                        <div className="flex items-center text-sm">
                                            {profile.name}
                                        </div>
                                    </div>
                                    <div className="w-full h-5/6 pt-2 px-4">
                                        <div className="line-clamp-3 text-sm">
                                            {profile.profile?.bio}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-1/5 flex justify-between items-center px-4">
                                    <div className="w-1/2 h-6 flex items-center justify-center rounded-3xl text-xs bg-secondary">
                                        <Link href={`/profile/edit/${profile.id}`}>
                                            プロフィールを編集
                                        </Link>
                                    </div>
                                    <div className="w-1/2 h-6 flex items-center justify-center rounded-3xl text-xs bg-secondary">
                                        <Link href={`/profile/edit/${profile.id}`}>
                                            プロフィールをシェア
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* ユーザーメイン */}
                <div className="w-screen h-fit">
                    <Tabs defaultValue="profile" className="w-screen h-12">
                        <TabsList className="w-full h-full flex justify-between">
                            <TabsTrigger value="post" className=" w-full h-full">
                                ポスト
                            </TabsTrigger>
                            <TabsTrigger value="profile" className="w-full h-full">
                                プロフィール
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="account"></TabsContent>
                        <TabsContent value="profile">
                            {/* profileがあれば表示 */}
                            {profile && (
                                <div className="p-8">
                                    <div className="flex mb-4 w-full h-full">
                                        <label className="w-1/3 h-full">年齢：</label>
                                        <div className="w-2/3 h-full">
                                            {profile.profile?.age
                                                ? profile.profile.age.toString()
                                                : '未設定'}
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <label className="w-1/3 h-full">性別：</label>
                                        <div className="w-2/3 h-full">
                                            {profile.profile?.gender
                                                ? profile.profile.gender
                                                : '未設定'}
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <label className="w-1/3 h-full">身長：</label>
                                        <div className="w-2/3 h-full">
                                            {profile.profile?.height
                                                ? profile.profile.height.toString()
                                                : '未設定'}
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <label className="w-1/3 h-full">スタイル：</label>
                                        <div className="w-2/3 h-full">
                                            {profile.profile?.style
                                                ? profile.profile.style
                                                : '未設定'}
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <label className="w-1/3 h-full">都道府県：</label>
                                        <div className="w-2/3 h-full">
                                            {profile.profile?.prefecture
                                                ? profile.profile.prefecture
                                                : '未設定'}
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <label className="w-1/3 h-full">市区町村：</label>
                                        <div className="w-2/3 h-full">
                                            {profile.profile?.city
                                                ? profile.profile.city
                                                : '未設定'}
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <label className="w-1/3 h-full">出身地：</label>
                                        <div className="w-2/3 h-full">
                                            {profile.profile?.birthplace
                                                ? profile.profile.birthplace
                                                : '未設定'}
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <label className="w-1/3 h-full">登録日：</label>
                                        <div className="w-2/3 h-full">
                                            {formatDateTime(profile.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
