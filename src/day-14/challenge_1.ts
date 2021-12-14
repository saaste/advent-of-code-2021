import { readInput } from "../helpers/input";
import { getResult } from "./Solver";

const inputFile = `${__dirname}/../../inputs/day-14.txt`;

const solve = () => {
    const input = readInput(inputFile);
    return getResult(input, 10);
}

export default solve;
