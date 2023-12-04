'use client';
import { useEffect, useState } from 'react';
import Observation from './Observation';
import Probability from './Probability';
import Stone from './Stone';
import supabase from '@/lib/suapbase';
import { Room } from '@/types';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function Board() {
    // ルーム情報
    const params = useParams();
    const roomId: string = params.roomId.toString();

    // プレイヤー情報
    const { data: session, status } = useSession();
    const [userid, setUserid] = useState<string>('');
    const [player1Id, setPlayer1Id] = useState<string>('');
    const [player2Id, setPlayer2Id] = useState<string>('');
    const [count, setCount] = useState<number>(1);
    const [turn, setTurn] = useState<string>('Player1');
    const [boardValues, setBoardValues] = useState(Array(64).fill(null));
    const [player1, setPlayer1] = useState<number[]>([]);
    const [prePlayer1, setPrePlayer1] = useState<number[]>([]);
    const [player2, setPlayer2] = useState<number[]>([]);
    const [prePlayer2, setPrePlayer2] = useState<number[]>([]);
    const [winner, setWinner] = useState<string>('');
    const [isObserving, setIsObserving] = useState<boolean>(false);

    const [countPlayer1, setCountPlayer1] = useState<number>(0);
    const [player1_stone90, setPlayer1_stone90] = useState<number[]>([]);
    const [player1_stone70, setPlayer1_stone70] = useState<number[]>([]);

    const [countPlayer2, setCountPlayer2] = useState<number>(0);
    const [player2_stone90, setPlayer2_stone90] = useState<number[]>([]);
    const [player2_stone70, setPlayer2_stone70] = useState<number[]>([]);

    // 次の手番の石の管理
    const [nextPlayer1Stone, setNextPlayer1Stone] = useState<number>(1);
    const [nextPlayer1Stone90, setNextPlayer1Stone90] = useState<boolean>(true);
    const [nextPlayer1Stone70, setNextPlayer1Stone70] = useState<boolean>(false);
    const [nextPlayer2Stone, setNextPlayer2Stone] = useState<number>(1);
    const [nextPlayer2Stone90, setNextPlayer2Stone90] = useState<boolean>(true);
    const [nextPlayer2Stone70, setNextPlayer2Stone70] = useState<boolean>(false);
    const [nextPlayer, setNextPlayer] = useState<string>('');
    const [kifu1, setKifu1] = useState<number[]>([]);
    const [kifu2, setKifu2] = useState<number[]>([]);

    // 初回レンダリング
    useEffect(() => {
        setUserid(session?.user?.id || '');
        // apiからroom情報を取得
        const fetchRoom = async () => {
            const res = await fetch(`http://localhost:3000/api/room/all?roomId=${roomId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            const apiPlayer1Id = data[0].player1;
            const apiPlayer2Id = data[0].player2;
            const apiNextPlayer = data[0].next_turn;
            const apiKifu1 = data[0].player1_kifu;
            const apiKifu2 = data[0].player2_kifu;
            setPlayer1Id(apiPlayer1Id);
            setPlayer2Id(apiPlayer2Id);
            setNextPlayer(apiNextPlayer);
            setKifu1(apiKifu1);
            setKifu2(apiKifu2);
        };
        fetchRoom();
    }, []);

    // リアルタイムでroom更新を検知
    useEffect(() => {
        const channel = supabase
            .channel('realtime room')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Room',
                },
                (payload) => {
                    const data = payload.new as Room;
                    const realtimeNextPlayer = data.next_turn;
                    const realtimeKifu1 = data.player1_kifu;
                    const realtimeKifu2 = data.player2_kifu;
                    const realtimePlayer190 = data.kifu1_90;
                    const realtimePlayer170 = data.kifu1_70;
                    const realtimePlayer290 = data.kifu2_90;
                    const realtimePlayer270 = data.kifu2_70;

                    console.log('data.kifu1_90:', data.kifu1_90);
                    setNextPlayer(realtimeNextPlayer);
                    setKifu1(realtimeKifu1);
                    setKifu2(realtimeKifu2);
                    setPlayer1_stone90(realtimePlayer190);
                    setPlayer1_stone70(realtimePlayer170);
                    setPlayer2_stone90(realtimePlayer290);
                    setPlayer2_stone70(realtimePlayer270);
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [nextPlayer]);

    // 更新時に盤面をレンダリング

    // 石打
    const handleClickEvent = (index: number) => {
        let clickNumber = index + 1;
        let kifu90 = 0;
        let kifu70 = 0;
        // カウントアップ
        setCount((prevCount) => prevCount + 1);

        const newBoardValues = [...boardValues];
        newBoardValues[index] = 1;
        setBoardValues(newBoardValues);

        if (userid !== nextPlayer) {
            // if (!player1.includes(clickNumber)) {
            // player1の手番のカウント
            // setCountPlayer1((prevCount) => prevCount + 1);
            // 石の確率事に配列に格納して管理
            const resStoneProbability: number = Stone(countPlayer1);
            if (resStoneProbability === 90) {
                if (userid === player1Id) {
                    setPlayer1_stone90((prevPlayer1_stone90) => [
                        ...prevPlayer1_stone90,
                        clickNumber,
                    ]);
                }
                if (userid === player2Id) {
                    setPlayer2_stone90((prevPlayer2_stone90) => [
                        ...prevPlayer2_stone90,
                        clickNumber,
                    ]);
                }
                kifu90 = clickNumber;
            }
            if (resStoneProbability === 70) {
                if (userid === player1Id) {
                    setPlayer1_stone70((prevPlayer1_stone70) => [
                        ...prevPlayer1_stone70,
                        clickNumber,
                    ]);
                }
                if (userid === player2Id) {
                    setPlayer1_stone70((prevPlayer1_stone70) => [
                        ...prevPlayer1_stone70,
                        clickNumber,
                    ]);
                }
                kifu70 = clickNumber;
            }
            if (userid === player1Id) {
                setPlayer1((prevPlayer1) => [...prevPlayer1, clickNumber]);
            }
            if (userid === player2Id) {
                setPlayer2((prevPlayer2) => [...prevPlayer2, clickNumber]);
            }
            // setTurn('Player2');

            // 次の手番の石を表示
            if (nextPlayer1Stone === 1) {
                setNextPlayer1Stone(2);
                setNextPlayer1Stone90(false);
                setNextPlayer1Stone70(true);
            }
            if (nextPlayer1Stone === 2) {
                setNextPlayer1Stone(1);
                setNextPlayer1Stone70(false);
                setNextPlayer1Stone90(true);
            }
            // }
        }

        // 後攻
        // if (userid !== nextPlayer) {
        //     console.log('後攻');
        //     if (!player2.includes(clickNumber)) {
        //         // player2の手番のカウント
        //         setCountPlayer2((prevCount) => prevCount + 1);
        //         // 石の確率事に配列に格納して管理
        //         const resStoneProbability: number = Stone(countPlayer2);
        //         if (resStoneProbability === 90) {
        //             setPlayer2_stone90((prevPlayer2_stone90) => [
        //                 ...prevPlayer2_stone90,
        //                 clickNumber,
        //             ]);
        //         }
        //         if (resStoneProbability === 70) {
        //             setPlayer2_stone70((prevPlayer2_stone70) => [
        //                 ...prevPlayer2_stone70,
        //                 clickNumber,
        //             ]);
        //         }
        //         setPlayer2((prevPlayer2) => [...prevPlayer2, clickNumber]);
        //         setTurn('Player1');

        //         // 次の手番の石を表示
        //         if (nextPlayer2Stone === 1) {
        //             setNextPlayer2Stone(2);
        //             setNextPlayer2Stone90(false);
        //             setNextPlayer2Stone70(true);
        //         }
        //         if (nextPlayer2Stone === 2) {
        //             setNextPlayer2Stone(1);
        //             setNextPlayer2Stone70(false);
        //             setNextPlayer2Stone90(true);
        //         }
        //     }
        // }

        // dbに棋譜を保存
        const fetchKifu = async () => {
            let apiKifu1 = [];
            let apiKifu2 = [];
            let apiKifu190: number[] = [];
            let apiKifu170: number[] = [];
            let apiKifu290: number[] = [];
            let apiKifu270: number[] = [];
            let apiNextTurn = '';
            let apiCount = count + 1;

            if (player1_stone90.length > 0) apiKifu190 = player1_stone90;
            if (player1_stone70.length > 0) apiKifu170 = player1_stone70;
            if (player2_stone90.length > 0) apiKifu290 = player2_stone90;
            if (player2_stone70.length > 0) apiKifu270 = player2_stone70;

            // 先行
            if (nextPlayer === player2Id) {
                apiNextTurn = player1Id;
                apiKifu1.push(clickNumber);
                if (kifu90 > 0) apiKifu190.push(kifu90);
                if (kifu70 > 0) apiKifu170.push(kifu70);
            }
            // 後攻
            if (nextPlayer === player1Id) {
                apiNextTurn = player2Id;
                apiKifu2.push(clickNumber);
                if (kifu90 > 0) apiKifu290.push(kifu90);
                if (kifu70 > 0) apiKifu270.push(kifu70);
            }

            console.log('roomId:', roomId);
            console.log('next_turn:', apiNextTurn);
            console.log('player1_kifu:', apiKifu1);
            console.log('player2_kifu:', apiKifu2);
            console.log('kifu1_90:', apiKifu190);
            console.log('kifu1_70:', apiKifu170);
            console.log('kifu2_90:', apiKifu290);
            console.log('kifu2_70:', apiKifu270);
            console.log('turn_count:', apiCount);

            const url = 'http://localhost:3000/api/room/kifu';
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomId: roomId,
                    next_turn: apiNextTurn,
                    player1_kifu: apiKifu1,
                    player2_kifu: apiKifu2,
                    kifu1_90: apiKifu190,
                    kifu1_70: apiKifu170,
                    kifu2_90: apiKifu290,
                    kifu2_70: apiKifu270,
                    turn_count: apiCount,
                }),
            };
            const response = await fetch(url, params);
        };
        fetchKifu();
    };

    // 重複を削除
    function removeCommonElements(preStones: number[], reversedStones: number[]) {
        const newStones = preStones.filter((item) => !reversedStones.includes(item));
        return newStones;
    }

    // 観測ボタン
    const handleObservation = (turn: string) => {
        // 現状の棋譜をpre配列に格納しておく
        setPrePlayer1(player1);
        setPrePlayer2(player2);
        setIsObserving(true);

        // 観測
        const observedStones1: number[] = []; // 観測された石
        const observedStones2: number[] = []; // 観測された石
        // 確率を計算
        const resReversedStones1: number[] = Probability(player1);
        const resReversedStones2: number[] = Probability(player2);
        // 相手の石になったものを手持ちから削除
        const resRemoved1: number[] = removeCommonElements(player1, resReversedStones1);
        const resRemoved2: number[] = removeCommonElements(player2, resReversedStones2);
        // 観測する配列に追加
        observedStones1.push(...resRemoved1);
        observedStones2.push(...resRemoved2);
        // 反転した相手の石を追加
        observedStones1.push(...resReversedStones2);
        observedStones2.push(...resReversedStones1);

        // 観測者から勝敗判定
        if (turn === 'Player1') {
            const result: any = Observation({ turn, observedStones1, observedStones2 });
            setWinner(result);
        } else {
            const result: any = Observation({ turn, observedStones2, observedStones1 });
            setWinner(result);
        }
        setPlayer1(observedStones1);
        setPlayer2(observedStones2);
    };

    // ゲーム再開ボタン
    const handlePlayGame = () => {
        setPlayer1(prePlayer1);
        setPlayer2(prePlayer2);
        setIsObserving(false);
    };

    return (
        <>
            <div>{turn}</div>
            <div>{count}手目</div>
            <div className="bord text-center">
                {[...Array(8)].map((_, rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {[...Array(8)].map((_, colIndex) => {
                            const index = rowIndex * 8 + colIndex;
                            const buttonValue = index + 1;

                            // 条件に基づいてクラスを組み合わせる
                            let buttonClass = `square w-20 h-20 border rounded-full`;
                            if (isObserving) {
                                buttonClass += ` ${
                                    player1.includes(buttonValue) ? 'bg-cyan-700 text-white' : ''
                                } ${player2.includes(buttonValue) ? 'bg-rose-700 text-white' : ''}`;
                            } else {
                                buttonClass += ` ${
                                    player1_stone90.includes(buttonValue)
                                        ? 'bg-cyan-700 text-white'
                                        : ''
                                }
                                ${
                                    player1_stone70.includes(buttonValue)
                                        ? 'bg-cyan-500 text-white'
                                        : ''
                                }
                                ${
                                    player2_stone90.includes(buttonValue)
                                        ? 'bg-rose-700 text-white'
                                        : ''
                                }
                                ${
                                    player2_stone70.includes(buttonValue)
                                        ? 'bg-rose-500 text-white'
                                        : ''
                                }`;
                            }

                            return (
                                <button
                                    key={colIndex}
                                    className={buttonClass}
                                    value={buttonValue}
                                    onClick={() => handleClickEvent(index)}
                                >
                                    {buttonValue}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div>
                {isObserving ? (
                    <button value="playGame" onClick={() => handlePlayGame()}>
                        ゲームを再開する
                    </button>
                ) : (
                    <button
                        value="observation"
                        onClick={() => handleObservation(turn)}
                        className="relative px-6 py-3 font-bold text-white rounded-lg group"
                    >
                        <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-cyan-700 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-rose-700 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
                        <span className="relative">Observation !</span>
                    </button>
                )}
            </div>
            <div>{winner ? `Winner: ${winner}` : ''}</div>
            <div className="flex text-center">
                <div className="w-1/2">
                    <div>Player1 :次量子石</div>
                    {nextPlayer1Stone90 && (
                        <button className="square w-20 h-20 border rounded-full bg-cyan-700 text-white">
                            90
                        </button>
                    )}
                    {nextPlayer1Stone70 && (
                        <button className="square w-20 h-20 border rounded-full bg-cyan-500 text-white">
                            70
                        </button>
                    )}
                </div>
                <div className="w-1/2">
                    <div>Player2 :次量子石</div>
                    {nextPlayer2Stone90 && (
                        <button className="square w-20 h-20 border rounded-full bg-rose-700 text-white">
                            90
                        </button>
                    )}
                    {nextPlayer2Stone70 && (
                        <button className="square w-20 h-20 border rounded-full bg-rose-500 text-white">
                            70
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
