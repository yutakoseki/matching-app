import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('roomId');
    const roomArray = await prisma.room.findMany({
        where: {
            id: id !== null ? id : undefined,
        },
    });

    // Response を json で返す
    return NextResponse.json(roomArray);
}
