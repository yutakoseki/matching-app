'use client';
import { useState } from 'react';
import Observation from './Observation';
import Probability from './Probability';
import Stone from './Stone';

export default function Board() {
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
    const [player1_stone30, setPlayer1_stone30] = useState<number[]>([]);
    const [player1_stone10, setPlayer1_stone10] = useState<number[]>([]);

    const [countPlayer2, setCountPlayer2] = useState<number>(0);
    const [player2_stone90, setPlayer2_stone90] = useState<number[]>([]);
    const [player2_stone70, setPlayer2_stone70] = useState<number[]>([]);
    const [player2_stone30, setPlayer2_stone30] = useState<number[]>([]);
    const [player2_stone10, setPlayer2_stone10] = useState<number[]>([]);

    // 石打
    const handleClickEvent = (index: number) => {
        let clickNumber = index + 1;
        // カウントアップ
        setCount((prevCount) => prevCount + 1);

        const newBoardValues = [...boardValues];
        newBoardValues[index] = 1;
        setBoardValues(newBoardValues);

        // カウントが奇数回目か偶数回目かで分ける
        if (count % 2 === 0) {
            // 偶数回目（後攻）
            if (!player2.includes(clickNumber)) {
                // player2の手番のカウント
                setCountPlayer2((prevCount) => prevCount + 1);
                // 石の確率事に配列に格納して管理
                const resStoneProbability: number = Stone(countPlayer2);
                if (resStoneProbability === 90) {
                    setPlayer2_stone90((prevPlayer2_stone90) => [
                        ...prevPlayer2_stone90,
                        clickNumber,
                    ]);
                }
                if (resStoneProbability === 70) {
                    setPlayer2_stone70((prevPlayer2_stone70) => [
                        ...prevPlayer2_stone70,
                        clickNumber,
                    ]);
                }
                if (resStoneProbability === 30) {
                    setPlayer2_stone30((prevPlayer2_stone30) => [
                        ...prevPlayer2_stone30,
                        clickNumber,
                    ]);
                }
                if (resStoneProbability === 10) {
                    setPlayer2_stone10((prevPlayer2_stone10) => [
                        ...prevPlayer2_stone10,
                        clickNumber,
                    ]);
                }
                setPlayer2((prevPlayer2) => [...prevPlayer2, clickNumber]);
                setTurn('Player1');
            }
        } else {
            // 奇数回目（先行）
            if (!player1.includes(clickNumber)) {
                // player1の手番のカウント
                setCountPlayer1((prevCount) => prevCount + 1);
                // 石の確率事に配列に格納して管理
                const resStoneProbability: number = Stone(countPlayer1);
                if (resStoneProbability === 90) {
                    setPlayer1_stone90((prevPlayer1_stone90) => [
                        ...prevPlayer1_stone90,
                        clickNumber,
                    ]);
                }
                if (resStoneProbability === 70) {
                    setPlayer1_stone70((prevPlayer1_stone70) => [
                        ...prevPlayer1_stone70,
                        clickNumber,
                    ]);
                }
                if (resStoneProbability === 30) {
                    setPlayer1_stone30((prevPlayer1_stone30) => [
                        ...prevPlayer1_stone30,
                        clickNumber,
                    ]);
                }
                if (resStoneProbability === 10) {
                    setPlayer1_stone10((prevPlayer1_stone10) => [
                        ...prevPlayer1_stone10,
                        clickNumber,
                    ]);
                }
                setPlayer1((prevPlayer1) => [...prevPlayer1, clickNumber]);
                setTurn('Player2');
            }
        }
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
                                } ${
                                    player2.includes(buttonValue) ? 'bg-cyan-50 text-cyan-700' : ''
                                }`;
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
                                    player1_stone30.includes(buttonValue)
                                        ? 'bg-cyan-200 text-cyan-600'
                                        : ''
                                }
                                ${
                                    player1_stone10.includes(buttonValue)
                                        ? 'bg-cyan-50 text-cyan-600'
                                        : ''
                                }
                                ${
                                    player2_stone90.includes(buttonValue)
                                        ? 'bg-cyan-50 text-cyan-600'
                                        : ''
                                }
                                ${
                                    player2_stone70.includes(buttonValue)
                                        ? 'bg-cyan-200 text-cyan-600'
                                        : ''
                                }
                                ${
                                    player2_stone30.includes(buttonValue)
                                        ? 'bg-cyan-500 text-white'
                                        : ''
                                }
                                ${
                                    player2_stone10.includes(buttonValue)
                                        ? 'bg-cyan-700 text-white'
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
                    <button value="observation" onClick={() => handleObservation(turn)}>
                        観測
                    </button>
                )}
            </div>
            <div>{winner ? `Winner: ${winner}` : ''}</div>
        </>
    );
}
