import { readInput } from "../helpers/input";
import { Grid } from "./Grid";
import { parseInstruction } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-13.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const grid = new Grid(input);
    const instructions = parseInstruction(input);
    const { direction, point } = instructions[0];

    if (direction === "U") {
        grid.foldUpFrom(point);
    } else {
        grid.foldLeftFrom(point);
    }

    return grid.dotsVisible();
}

export default solve;
