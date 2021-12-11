import { readInput } from "../helpers/input";
import { Grid } from "./Grid";

const inputFile = `${__dirname}/../../inputs/day-11.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const grid = new Grid(input);

    for (let step = 0; step < 100; step++) {
        grid.increaseAll();
        grid.flash();
        grid.resetNodes();
    }

    return grid.getFlashes();
}

export default solve;
