import { NextRequest, NextResponse } from 'next/server';

// Prisma Clientのインスタンスをインポート
import prisma from '@/lib/prisma';

export async function GET() {
    const userArray = await prisma.user.findMany();
    // Response を jsonで返す
    return NextResponse.json(userArray);
}

export async function POST(req: NextRequest) {
    // リクエストボディ
    const { userid, name, email, password } = await req.json();
    const res = await prisma.user.create({
        data: {
            userId: userid,
            name: name,
            email: email,
            password: password,
            profile: {
                create: { bio: '' },
            },
        },
    });

    return NextResponse.json(res);
}
