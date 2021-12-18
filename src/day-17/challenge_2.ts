import { readInputAsString } from "../helpers/input";
import { AutoAim } from "./AutoAim";

const inputFile = `${__dirname}/../../inputs/day-17.txt`;

const solve = () => {
    const input = readInputAsString(inputFile);
    const autoAim = new AutoAim(input);
    const bestVelocity = autoAim.findOptimalTrajectory(300);
    return bestVelocity.hittingVelocities.length;
}

export default solve;
