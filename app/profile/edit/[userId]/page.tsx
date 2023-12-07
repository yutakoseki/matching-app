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
            name: cookies.profile.name,
            email: cookies.profile.email,
            password: cookies.profile.password,
            bio: cookies.profile?.bio?.toString() ?? '',
        },
    });

    // 登録
    function onSubmit(values: z.infer<typeof profileSchema>) {
        var apiName: string = '';
        var apiEmail: string = '';
        var apiPassword: string = '';
        var apiBio: string = '';
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

        // 自己紹介
        apiBio = values?.bio?.toString() ?? '';

        console.log('apiBio', apiBio);

        const updateProfile = async () => {
            if (profile?.id?.toString() === undefined) {
                return;
            }
            const url = 'http://localhost:3000/api/profile/edit';
            // リクエストパラメータ
            const params = {
                method: 'POST',
                // JSON形式のデータのヘッダー
                headers: {
                    'Content-Type': 'application/json',
                },
                // リクエストボディ
                body: JSON.stringify({
                    userId: profile.id,
                    name: apiName,
                    email: apiEmail,
                    password: apiPassword,
                    bio: apiBio,
                }),
            };

            try {
                // APIへのリクエスト
                const response = await fetch(url, params);
                if (response.ok) {
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ユーザー名</FormLabel>
                            <FormControl>
                                <Input placeholder={profile?.name?.toString() ?? ''} {...field} />
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
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">登録</Button>
            </form>
        </Form>
    );
}
