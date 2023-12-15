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
            image: 'https://idapqluhqmvmvtwjnwnq.supabase.co/storage/v1/object/public/pictures/profiles/default/chinanago.png',
            profile: {
                create: { bio: '' },
            },
        },
    });

    return NextResponse.json(res);
}