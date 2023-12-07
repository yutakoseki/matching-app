import { NextRequest, NextResponse } from 'next/server';

// Prisma Clientのインスタンスをインポート
import prisma from '@/lib/prisma';
import Email from 'next-auth/providers/email';

export async function GET() {
    const userArray = await prisma.user.findMany();
    // Response を jsonで返す
    return NextResponse.json(userArray);
}

export async function POST(req: NextRequest) {
    // リクエストボディ
    const { name, email, password } = await req.json();
    const res = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });

    return NextResponse.json(res);
}
