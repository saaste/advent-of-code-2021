import { readInput } from "../helpers/input";
import { SnailfishNumber } from "./SnailfishNumber";

const inputFile = `${__dirname}/../../inputs/day-18.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const snailFishNumbers = input.filter((s) => s.length > 0).map((s) => SnailfishNumber.from(s));

    let maxMagnitude = 0;
    for (let i = 0; i < snailFishNumbers.length - 1; i++) {
        const a = snailFishNumbers[i];
        for (let j = i + 1; j < snailFishNumbers.length; j++) {
            const b = snailFishNumbers[j];
            const c1 = a.add(b);
            const c2 = b.add(a);
            c1.reduce();
            c2.reduce();
            maxMagnitude = Math.max(maxMagnitude, c1.magnitude(), c2.magnitude());
        }

    }

    return maxMagnitude;
}

export default solve;
