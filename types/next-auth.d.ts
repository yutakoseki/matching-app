import NextAuth from 'next-auth';

import type { DefaultSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user?: {
            id: string;
            userid?: string | null;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}
