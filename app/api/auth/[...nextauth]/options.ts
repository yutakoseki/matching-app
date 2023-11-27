import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GetUsersList from '@/components/users/getUsersList';
import { User } from '@/types';

export const options: NextAuthOptions = {
    providers: [
        // google認証
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // Github認証
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        }),
        // メール認証
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            // メルアド認証処理
            async authorize(credentials) {
                const users = await GetUsersList();
                // const users = [
                //     { id: '1', email: 'user1@example.com', password: 'password1' },
                //     { id: '2', email: 'user2@example.com', password: 'password2' },
                //     { id: '3', email: 'abc@abc', password: '123' },
                // ];

                console.log(users);

                const user = users.find((user: User) => user.email === credentials?.email);

                if (user && user?.password === credentials?.password) {
                    return { id: user.id, name: user.email, email: user.email, role: 'admin' };
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user, account, profile, isNewUser }) => {
            // 注意: トークンをログ出力してはダメです。
            console.log('in jwt', { user, token, account, profile });

            if (user) {
                token.user = user;
                const u = user as any;
                token.role = u.role;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        session: ({ session, token }) => {
            console.log('in session', { session, token });
            token.accessToken;
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                },
            };
        },
    },
};
