import { readInput } from "../helpers/input";
import { SnailfishNumber } from "./SnailfishNumber";

const inputFile = `${__dirname}/../../inputs/day-18.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const snailFishNumbers = input.filter((s) => s.length > 0).map((s) => SnailfishNumber.from(s));
    const sum = snailFishNumbers.reduce((prev: SnailfishNumber | undefined, number: SnailfishNumber) => {
        if (prev === undefined) return number;

        const sum = prev.add(number)
        sum.reduce();
        return sum;
    }, undefined);
    return sum?.magnitude();
}

export default solve;
