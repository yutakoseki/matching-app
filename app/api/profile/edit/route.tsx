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
    const {
        id,
        userId,
        name,
        email,
        password,
        bio,
        age,
        gender,
        prefecture,
        city,
        birthplace,
        height,
        style,
    } = await req.json();
    console.log('server bio', bio);
    const res = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            userId: userId,
            name: name,
            email: email,
            password: password,
            profile: {
                update: {
                    bio: bio,
                    age: age,
                    gender: gender,
                    birthplace: birthplace,
                    prefecture: prefecture,
                    city: city,
                    height: height,
                    style: style,
                },
            },
        },
    });

    return NextResponse.json(res);
}
