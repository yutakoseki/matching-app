import { NextRequest, NextResponse } from 'next/server';

// Prisma Clientのインスタンスをインポート
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    // リクエストボディ
    const {
        roomId,
        next_turn,
        player1_kifu,
        player2_kifu,
        kifu1_90,
        kifu1_70,
        kifu2_90,
        kifu2_70,
        turn_count,
    } = await req.json();

    console.log('roomId:', roomId);
    console.log('next_turn:', next_turn);
    console.log('player1_kifu:', player1_kifu);
    console.log('player2_kifu:', player2_kifu);
    console.log('kifu1_90:', kifu1_90);
    console.log('kifu1_70:', kifu1_70);
    console.log('kifu2_90:', kifu2_90);
    console.log('kifu2_70:', kifu2_70);
    console.log('turn_count:', turn_count);

    const res = await prisma.room.update({
        where: {
            id: roomId,
        },
        data: {
            next_turn: next_turn,
            player1_kifu: player1_kifu,
            player2_kifu: player2_kifu,
            kifu1_90: kifu1_90,
            kifu1_70: kifu1_70,
            kifu2_90: kifu2_90,
            kifu2_70: kifu2_70,
            turn_count: turn_count,
        },
    });

    return NextResponse.json(res);
}
