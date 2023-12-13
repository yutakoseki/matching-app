'use client';

import { useRouter } from 'next/navigation';
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
import { registerUserSchema } from '@/lib/validationSchema';

export default function Signup() {
    const router = useRouter();

    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            userid: '',
            name: '',
            email: '',
            password: '',
        },
    });
    function onSubmit(values: z.infer<typeof registerUserSchema>) {
        const createUser = async () => {
            const url = 'http://localhost:3000/api/register';
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: values.userid,
                    name: values.name,
                    email: values.email,
                    password: values.password,
                }),
            };
            try {
                await fetch(url, params);

                // 画面ログイン画面へ遷移
                router.push('/login');
            } catch (error) {
                alert('登録に失敗しました');
                console.log('500 Internal Server Error: ', error);
            }
        };
        createUser();
    }

    return (
        <div className="flex items-center justify-center w-full h-full p-8 -my-16">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 bg-secondary w-full h-auto rounded-md"
                >
                    <div className="p-2">
                        <div className="p-2">
                            <FormField
                                control={form.control}
                                name="userid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ユーザーID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="userID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="p-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ユーザー名</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="p-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>メールアドレス</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="p-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>パスワード</FormLabel>
                                        <FormControl>
                                            <Input placeholder="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            登録
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
