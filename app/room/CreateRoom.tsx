'use client';

import { Room } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateRoom() {
    const { data: session, status } = useSession();
    const id = session?.user?.id;
    const [room, setRoom] = useState<Room[]>([]);
    const router = useRouter();
    const handleCreateRoom = async () => {
        // ルームを作成
        const url = 'http://localhost:3000/api/room';
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player1: id,
            }),
        };
        await fetch(url, params);

        // 作成したルームIDを取得
        const res = await fetch(`http://localhost:3000/api/room/search?player1=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        setRoom(data);
        const roomId = data[0].id;
        router.push(`/room/${roomId}`);
    };
    return (
        <div>
            <p>新規ルーム作成</p>
            <button onClick={() => handleCreateRoom()}>ルームを作成</button>
        </div>
    );
}
