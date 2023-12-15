import { NextRequest, NextResponse } from 'next/server';

// Prisma Clientのインスタンスをインポート
import prisma from '@/lib/prisma';

// プロフィール修正
export async function POST(req: NextRequest) {
    const { id, image } = await req.json();
    const res = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            image: image,
        },
    });

    return NextResponse.json(res);
}
