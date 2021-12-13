import { readInput } from "../helpers/input";
import { Grid } from "./Grid";
import { parseInstruction } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-13.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const grid = new Grid(input);
    const instructions = parseInstruction(input);
    
    for (const instruction of instructions) {
        const { direction, point } = instruction;
        if (direction === "U") {
            grid.foldUpFrom(point);
        } else {
            grid.foldLeftFrom(point);
        }
    }

    return grid.toString();
}

export default solve;
