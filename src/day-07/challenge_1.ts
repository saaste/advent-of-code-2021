import { readInputAsString } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-07.txt`;

const median = (numbers: number[]): number => {
    numbers.sort((a, b) => a - b);
    const half = Math.floor(numbers.length / 2);
    if (numbers.length % 2) return numbers[half];

    return (numbers[half - 1] + numbers[half]) / 2.0;
}

const solve = () => {
    const input = readInputAsString(inputFile).split(",").map((n) => parseInt(n, 10));
    const targetPosition = median(input);
    let fuelUsed = 0;
    for (const position of input) {
        fuelUsed += Math.abs(position - targetPosition);
    }
    return fuelUsed;
}

export default solve;
