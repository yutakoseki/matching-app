'use client';
import React, { useState, useEffect } from 'react';
import supabase from '@/lib/suapbase';
import { Room } from '@/types';
import { useParams, useRouter } from 'next/navigation';

export default function Home() {
    const [player1, setPlayer1] = useState<string>('');
    const [player2, setPlayer2] = useState<string>('');
    const router = useRouter();
    const params = useParams();
    const roomId = params.roomId;

    // DBの変更をリアルタイムで検知
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
                    const data = payload.new as Room;
                    const player2FromData = data.player2;
                    setPlayer2(player2FromData);
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // プレイヤーが揃ったかチェック
    useEffect(() => {
        if (player2) {
            const roomId = params.roomId;
            router.push(`/game/${roomId}`);
        } else {
            const roomId = params.roomId;
            const fetchData = async () => {
                // 再レンダリングした際にフェッチ
                const res = await fetch(`http://localhost:3000/api/room/player?roomId=${roomId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                setPlayer2(data[0].player2);
            };
            fetchData();
        }
    }, [player2]);

    return (
        <div className="w-screen h-screen bg-white">
            <p>対戦相手待ち...</p>
        </div>
    );
}
