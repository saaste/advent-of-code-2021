import { readInput } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-08.txt`;

const countUniqueDigits = (output: string[]): number => {
    let count = 0;
    for (const digits of output) {
        if (digits.length === 2 || digits.length === 4 || digits.length === 3 || digits.length === 7) {
            count++;
        }
    }
    return count;
}

const solve = () => {
    const input = readInput(inputFile);
    let uniqueDigitsCount = 0;
    for (const entry of input) {
        const [ _, output ] = entry.split(' | ');
        const outputDigits = output.split(' ');
        uniqueDigitsCount += countUniqueDigits(outputDigits);
    }
    return uniqueDigitsCount;
}

export default solve;
