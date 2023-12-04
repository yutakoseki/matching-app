import { NextRequest, NextResponse } from 'next/server';

// Prisma Clientのインスタンスをインポート
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    // リクエストボディ
    const { roomId, player2 } = await req.json();
    const res = await prisma.room.update({
        where: {
            id: roomId,
            player2: null,
        },
        data: {
            player2: player2,
            next_turn: player2,
            users: {
                create: {
                    user: { connect: { id: player2 } },
                },
            },
        },
    });

    return NextResponse.json(res);
}
