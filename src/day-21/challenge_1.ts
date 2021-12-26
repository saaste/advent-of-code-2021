import { readInput } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-21.txt`;

let die = 0;

const solve = () => {
    const input = readInput(inputFile);

    let playerPoints1 = 0;
    let playerPoints2 = 0;

    let playerPosition1 = parseInt(input[0].slice(-2).trim(), 10);
    let playerPosition2 = parseInt(input[1].slice(-2).trim(), 10);

    let playerTurn = 1;
    let throwCount = 0;

    while (playerPoints1 < 1000 && playerPoints2 < 1000) {
        throwCount += 3;
        const steps = throwDie() + throwDie() + throwDie()

        if (playerTurn === 1) {
            playerPosition1 = move(playerPosition1, steps);
            playerPoints1 += playerPosition1;
        } else {
            playerPosition2 = move(playerPosition2, steps);
            playerPoints2 += playerPosition2;
        }

        playerTurn = playerTurn === 1 ? 2 : 1;
    }

    return Math.min(playerPoints1, playerPoints2) * throwCount;
}

const throwDie = (): number => {
    if (die === 100) {
        die = 1;
    } else {
        die++;
    }
    return die;
}

const move = (currentPosition: number, steps: number): number => {
    const result = (currentPosition + steps) % 10;
    if (result === 0) {
        return 10;
    }

    return result;
}

export default solve;
