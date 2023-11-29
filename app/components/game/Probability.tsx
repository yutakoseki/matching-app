// ひっくり変える確率を求める
export default function Probability(observer: number[]) {
    let probability: number = 0;
    let reversedStone: number[] = [];
    for (let i = 1; i <= 32; i++) {
        // 90%
        if ((i - 1) % 2 === 0) {
            probability = Math.random();
            if (probability > 0.9) {
                reversedStone.push(observer[i - 1]);
            }
            continue;
        }
        // 70%
        if ((i - 2) % 2 === 0) {
            probability = Math.random();
            if (probability > 0.7) {
                reversedStone.push(observer[i - 1]);
            }
            continue;
        }
    }
    return reversedStone;
}
