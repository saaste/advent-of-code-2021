import { readInput } from "../helpers/input";
import { Grid } from "./Grid";
import { Node } from "./Node";

const inputFile = `${__dirname}/../../inputs/day-11.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const grid = new Grid(input);

    let firstSyncStep = 0;
    let currentStep = 0;
    while (firstSyncStep === 0) {
        if (grid.isFullOfZeroes()) {
            firstSyncStep = currentStep
            break;
        }
        grid.increaseAll();
        grid.flash();
        grid.resetNodes();
        currentStep++;
    }

    return firstSyncStep;
}

export default solve;
