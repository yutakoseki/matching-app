'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { profileSchema } from '@/lib/validationSchema';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';

import { Select } from '@/components/ui/select';
import AgeSelect from '@/components/AgeSelect';
import GenderSelect from '@/components/GenderSelect';
import PrefectureSelect from '@/components/PrefectureSelect';
import HeightSelect from '@/components/HeightSelect';
import StyleSelect from '@/components/StyleSelect';
import { AlignJustify, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Upload from '@/components/Upload';

export default function ProfileForm() {
    const [profile, setProfile] = useState<User>();
    const [cookies, setCookie, RemoveCookie] = useCookies(['profile']);
    const router = useRouter();

    useEffect(() => {
        setProfile(cookies.profile);
    }, []);

    // フォーム
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        // デフォルト値
        defaultValues: {
            userid: cookies.profile.userId,
            name: cookies.profile.name,
            email: cookies.profile.email,
            password: cookies.profile.password,
            bio: cookies.profile.profile.bio ?? '',
            age: cookies.profile.profile.age?.toString() ?? '',
            gender: cookies.profile.profile.gender ?? '',
            prefecture: cookies.profile.profile.prefecture ?? '',
            city: cookies.profile.profile.city ?? '',
            birthplace: cookies.profile.profile.birthplace ?? '',
            height: cookies.profile.profile.height?.toString() ?? '',
            style: cookies.profile.profile.style ?? '',
        },
    });

    // 登録
    function onSubmit(values: z.infer<typeof profileSchema>) {
        var apiUserId: string = '';
        var apiName: string = '';
        var apiEmail: string = '';
        var apiPassword: string = '';
        var apiBio: string = '';
        var apiAge: string = '';
        var apiGender: string = '';
        var apiPrefecture: string = '';
        var apiCity: string = '';
        var apiBirthplace: string = '';
        var apiHeight: string = '';
        var apiStyle: string = '';

        // ユーザーID
        if (!values.userid) {
            apiUserId = profile?.userId?.toString() ?? '';
        } else {
            apiUserId = values.userid;
        }

        // 名前
        if (!values.name) {
            apiName = profile?.name?.toString() ?? '';
        } else {
            apiName = values.name;
        }

        // メールアドレス
        if (!values.email) {
            apiEmail = profile?.email ?? '';
        } else {
            apiEmail = values.email;
        }

        // パスワード
        if (!values.password) {
            apiPassword = profile?.password ?? '';
        } else {
            apiPassword = values.password;
        }

        apiBio = values?.bio?.toString() ?? ''; // 自己紹介
        apiAge = values?.age?.toString() ?? ''; // 年齢
        apiGender = values?.gender?.toString() ?? ''; // 性別
        apiPrefecture = values?.prefecture?.toString() ?? ''; // 都道府県
        apiCity = values?.city?.toString() ?? ''; // 市区町村
        apiBirthplace = values?.birthplace?.toString() ?? ''; // 出身地
        apiHeight = values?.height?.toString() ?? ''; // 身長
        apiStyle = values?.style?.toString() ?? ''; // スタイル

        const updateProfile = async () => {
            if (profile?.id?.toString() === undefined) {
                return;
            }
            const url = 'http://localhost:3000/api/profile/edit';
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: profile.id,
                    userId: apiUserId,
                    name: apiName,
                    email: apiEmail,
                    password: apiPassword,
                    bio: apiBio,
                    age: parseInt(apiAge, 10) || 0,
                    gender: apiGender,
                    prefecture: apiPrefecture,
                    city: apiCity,
                    birthplace: apiBirthplace,
                    height: parseInt(apiHeight, 10) || 0,
                    style: apiStyle,
                }),
            };

            try {
                const response = await fetch(url, params);
                if (response.ok) {
                    RemoveCookie('profile');
                    router.push(`/profile/${profile.id}`);
                } else {
                    alert('更新に失敗しました');
                }
            } catch (error) {
                alert('更新に失敗しました');
            }
        };
        updateProfile();
    }

    return (
        <>
            {/* プロフィールヘッダー */}
            <div className="w-full h-16 fixed top-0 z-20 bg-secondary text-secondary-foreground flex text-center justify-center items-center">
                <div className="w-1/5 h-full flex items-center justify-start">
                    <Link href={`/profile/${profile?.id}`}>
                        <ChevronLeft strokeWidth={1} size={40} />
                    </Link>
                </div>
                <div className="w-full h-full flex items-center justify-start ml-8">
                    {profile && <div className="text-xl truncate">{profile.userId}</div>}
                </div>
                <div className="w-full h-full flex items-center justify-end pr-4">
                    <AlignJustify strokeWidth={1} size={30} />
                </div>
            </div>
            <div className="w-full h-full my-20">
                {/* プロフィール画像アップロード */}
                <div className="w-screen h-1/5 flex items-center justify-center">
                    <Upload />
                </div>
                {/* プロフィール詳細 */}
                <div className="w-screen h-4/5 p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="userid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ユーザーID</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={profile?.userId?.toString() ?? ''}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ユーザー名</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={profile?.name?.toString() ?? ''}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>メールアドレス</FormLabel>
                                        <FormControl>
                                            <Input placeholder={profile?.email} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>パスワード</FormLabel>
                                        <FormControl>
                                            <Input placeholder={profile?.password} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>自己紹介</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={profile?.profile?.bio ?? ''}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>年齢</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <AgeSelect
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>性別</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <GenderSelect
                                                    value={
                                                        field.value ? field.value.toString() : ''
                                                    }
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="prefecture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>都道府県</FormLabel>
                                        <FormControl>
                                            <PrefectureSelect
                                                value={field.value ? field.value.toString() : ''}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>市区町村</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={
                                                    profile?.profile.city
                                                        ? profile.profile.city.toString()
                                                        : ''
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="birthplace"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>出身地</FormLabel>
                                        <FormControl>
                                            <PrefectureSelect
                                                value={field.value ? field.value.toString() : ''}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>身長</FormLabel>
                                        <FormControl>
                                            <HeightSelect
                                                value={field.value ? field.value.toString() : ''}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="style"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>スタイル</FormLabel>
                                        <FormControl>
                                            <StyleSelect
                                                value={field.value ? field.value.toString() : ''}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                登録
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}
