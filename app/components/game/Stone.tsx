// プレイヤーごとの石の情報を管理する
export default function Stone(countPlayer1: number) {
    let stoneProbability: number = 0;

    // 90%
    if (countPlayer1 % 2 === 0) {
        stoneProbability = 90;
    }
    // 70%
    if ((countPlayer1 - 1) % 2 === 0) {
        stoneProbability = 70;
    }

    return stoneProbability;
}
