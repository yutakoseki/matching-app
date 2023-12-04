import { NextRequest, NextResponse } from 'next/server';

// Prisma Clientのインスタンスをインポート
import prisma from '@/lib/prisma';

export async function GET() {
    const roomArray = await prisma.room.findMany({
        where: {
            player2: null,
        },
    });
    // Response を jsonで返す
    return NextResponse.json(roomArray);
}

export async function POST(req: NextRequest) {
    // リクエストボディ
    const { player1, turn_count } = await req.json();
    const res = await prisma.room.create({
        data: {
            player1: player1,
            turn_count: turn_count,
            users: {
                create: {
                    user: { connect: { id: player1 } },
                },
            },
        },
    });

    return NextResponse.json(res);
}
