import { checkWin } from './WinningPattern';

type ObservationProps = {
    turn: string;
    observedStones1: number[];
    observedStones2: number[];
};

export default function Observation({ turn, observedStones1, observedStones2 }: ObservationProps) {
    let isWin: boolean = false;

    let firstPlayerStone: number[] = [];
    let secondPlayerStone: number[] = [];
    if (turn === 'Player1') {
        firstPlayerStone = observedStones1;
        secondPlayerStone = observedStones2;
        // 先攻の判定
        isWin = checkWin(firstPlayerStone);
        if (isWin) {
            return 'Player1';
        }

        // 後攻の判定
        isWin = checkWin(secondPlayerStone);
        if (isWin) {
            return 'Player2';
        }
    } else {
        firstPlayerStone = observedStones2;
        secondPlayerStone = observedStones1;
        // 先攻の判定
        isWin = checkWin(firstPlayerStone);
        if (isWin) {
            return 'Player2';
        }

        // 後攻の判定
        isWin = checkWin(secondPlayerStone);
        if (isWin) {
            return 'Player1';
        }
    }
}
