import { readInputAsString } from "../helpers/input";
import { initialize, simulateDays } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-06.txt`;

const solve = () => {
    const fishes = readInputAsString(inputFile).split(",").map((n) => parseInt(n, 10));
    const daysToOffspring = simulateDays(initialize(fishes), 256)
    return [...daysToOffspring.values()].map((group) => group).reduce((sum, a) => sum + a, 0);
}

export default solve;
