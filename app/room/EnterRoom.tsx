'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function EnterRoom() {
    const { data: session, status } = useSession();
    const id = session?.user?.id;
    const [roomId, setRoomId] = useState<string>('');
    const changeRoomIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(e.target.value);
    };
    const handleEnterRoom = async () => {
        const url = 'http://localhost:3000/api/room/update';
        // リクエストパラメータ
        const params = {
            method: 'POST',
            // JSON形式のデータのヘッダー
            headers: {
                'Content-Type': 'application/json',
            },
            // リクエストボディ
            body: JSON.stringify({
                roomId: roomId,
                player2: id,
            }),
        };

        // APIへのリクエスト
        await fetch(url, params);
        setRoomId('');
    };
    return (
        <div>
            <p>ルームに参加</p>
            <label>ルームID</label>
            <input
                type="text"
                name="roomId"
                placeholder="ルームID"
                value={roomId}
                onChange={changeRoomIdInput}
            />
            <button onClick={() => handleEnterRoom()}>参加する</button>
        </div>
    );
}
