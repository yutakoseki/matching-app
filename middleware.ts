export { default } from 'next-auth/middleware'; // defaultをママ使う。
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 認証が必要なページ
export const config = {
    matcher: ['/((?!welcome|api|login|signup).*)'], // ?!で否定です。
};
