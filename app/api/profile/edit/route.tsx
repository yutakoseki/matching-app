import { NextRequest, NextResponse } from 'next/server';

// Prisma Clientのインスタンスをインポート
import prisma from '@/lib/prisma';

export async function GET() {
    const userArray = await prisma.user.findMany();
    // Response を jsonで返す
    return NextResponse.json(userArray);
}

// プロフィール修正
export async function POST(req: NextRequest) {
    const { userId, name, email, password, bio } = await req.json();
    console.log('server bio', bio);
    const res = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: name,
            email: email,
            password: password,
            profile: {
                update: {
                    bio: bio,
                },
            },
        },
    });

    return NextResponse.json(res);
}
