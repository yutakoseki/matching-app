'use client';

import { useState } from 'react';
import { Room } from '@/types';

export default function SearchRoom() {
    const [roomList, setRoomList] = useState<Room[]>([]);

    const handleSearchRoom = async () => {
        const url = 'http://localhost:3000/api/room';

        // APIへリクエスト
        const res = await fetch(url, {
            cache: 'no-store',
        });

        // レスポンスボディを取り出す
        const data = await res.json();
        setRoomList(data);
    };

    return (
        <div>
            <p>空きルーム一覧</p>
            {roomList.map((room: Room, index) => {
                return (
                    <>
                        <div className="flex">
                            <div key={room.id}>{index} :</div>
                            <div key={room.id}>{room.id}</div>
                        </div>
                    </>
                );
            })}
            <button onClick={() => handleSearchRoom()}>空きルーム更新</button>
        </div>
    );
}
