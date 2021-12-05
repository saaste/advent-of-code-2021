import { readInput } from "../helpers/input";
import { calculateOverlaps, parsePipes } from "./utils";

const inputFile = `${__dirname}/input.txt`;

const solve = () => {
    const input = readInput(inputFile).filter((s) => s.length > 1);
    const pipes = parsePipes(input);
    return calculateOverlaps(pipes);
}

export default solve;
