'use client';
import React, { useState, useEffect } from 'react';
import supabase from '@/lib/suapbase';
import { Room } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
    const [player1, setPlayer1] = useState<string>('');
    const [player2, setPlayer2] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomId = searchParams.get('roomId');

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
            router.push(`/game/${roomId}`);
        }

        // 再レンダリングした際にフェッチ
        
    }, [player2]);

    return (
        <div className="w-screen h-screen bg-white">
            <p>対戦相手待ち...</p>
        </div>
    );
}
