import { NextRequest, NextResponse } from 'next/server';

// Prisma Clientのインスタンスをインポート
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const userArray = await prisma.user.findMany({
        where: {
            id: userId !== null ? userId : undefined,
        },
        include: {
            profile: true,
        },
    });
    return NextResponse.json(userArray);
}
