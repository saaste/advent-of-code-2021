import { readInputAsNumbers } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-01.txt`;

export const solve = () => {
    const input = readInputAsNumbers(inputFile);
    let increases = 0;
    let previousSum = 0;
    input.map((value, index) => {
        if (index > 2) {
            const sum = value + input[index - 1] + input[index - 2];
            if (sum > previousSum) increases++;
            previousSum = sum;
        }
    });
    return increases;
}

export default solve;
