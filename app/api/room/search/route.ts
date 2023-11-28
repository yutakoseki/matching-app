import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const player1 = searchParams.get('player1');
    const roomArray = await prisma.room.findMany({
        where: {
            player1: player1 !== null ? player1 : undefined,
            player2: null,
        },
    });

    // Response を json で返す
    return NextResponse.json(roomArray);
}
