'use client';
import React, { useState, useEffect } from 'react';
import Board from '@/app/game/Board';
import { useParams } from 'next/navigation';
import supabase from '@/lib/suapbase';

export default function Game() {
    const [player1, setPlayer1] = useState<string>('');
    const [player2, setPlayer2] = useState<string>('');
    const [ready, setReady] = useState<boolean>(false);
    const [roomId, setRoomId] = useState<string>('');
    const params = useParams();

    useEffect(() => {
        const channel = supabase
            .channel('realtime todos')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Room',
                },
                (payload) => {
                    console.log(payload);
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // URLからルームIDを取得
            setRoomId(params.roomId.toString());
            // ルーム情報をフェッチ
            const res = await fetch(
                `http://localhost:3000/api/room/search?roomId=${params.roomId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await res.json();

            setPlayer1(data[0].player1);
            setPlayer2(data[0].player2);

            if (data[0].player1 !== null && data[0].player2 !== null) {
                setReady(true);
            }
        };

        fetchData();
    }, [params.roomId]);

    return (
        <div className="w-screen h-screen bg-white">
            {ready ? (
                <>
                    <h1>ここにユーザー情報表示</h1>
                    <Board />
                </>
            ) : (
                <p>対戦相手待ち...</p>
            )}
        </div>
    );
}
