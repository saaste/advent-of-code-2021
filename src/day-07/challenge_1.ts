import { readInputAsString } from "../helpers/input";
import { median } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-07.txt`;

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
